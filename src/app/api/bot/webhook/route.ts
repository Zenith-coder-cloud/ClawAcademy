import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { checkRateLimit } from "@/lib/server/rateLimit";

export const dynamic = "force-dynamic";

// S10 — HTML escape to prevent injection
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// S3 — Cryptographically secure 6-digit code
function generateCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

// S8 — Input validation schema
const webhookSchema = z.object({
  update_id: z.number(),
  message: z
    .object({
      message_id: z.number().optional(),
      from: z
        .object({
          id: z.number(),
          first_name: z.string(),
          username: z.string().optional().nullable(),
        })
        .passthrough()
        .optional(),
      chat: z
        .object({
          id: z.number(),
        })
        .passthrough()
        .optional(),
      text: z.string().optional(),
    })
    .passthrough()
    .optional(),
});

async function sendTelegramMessage(chatId: number, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    console.error("TELEGRAM_BOT_TOKEN not set");
    return;
  }
  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
  if (!res.ok) {
    console.error("Telegram sendMessage failed:", await res.text());
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const allowed = await checkRateLimit(`webhook-${ip}`, 60, 1);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // S2 — Verify Telegram webhook secret token (REQUIRED)
    const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Webhook: TELEGRAM_WEBHOOK_SECRET not configured");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }
    const headerSecret = req.headers.get("x-telegram-bot-api-secret-token");
    if (headerSecret !== secret) {
      console.error("Webhook: invalid secret token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // S8 — Validate input
    const parsed = webhookSchema.safeParse(body);
    if (!parsed.success) {
      console.error("Webhook: invalid payload", parsed.error.issues);
      return NextResponse.json({ ok: true }); // Telegram expects 200
    }

    const { update_id, message } = parsed.data;

    // S4 — Replay attack prevention: deduplicate update_id
    const db = supabaseAdmin();

    const { data: existing } = await db
      .from("processed_updates")
      .select("update_id")
      .eq("update_id", update_id)
      .single();

    if (existing) {
      return NextResponse.json({ ok: true }); // Already processed
    }

    if (!message) return NextResponse.json({ ok: true });

    const chatId = message.chat?.id;
    const text = message.text || "";
    const from = message.from;

    if (text.startsWith("/start") && chatId && from) {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (!botToken) {
        console.error("TELEGRAM_BOT_TOKEN not set — cannot send code");
        return NextResponse.json({ ok: true }); // ack to Telegram but skip
      }

      const code = generateCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      // S9 — Check for DB errors
      const { error: insertError } = await db.from("auth_codes").insert({
        telegram_id: from.id,
        telegram_username: from.username || null,
        telegram_first_name: from.first_name || null,
        telegram_photo_url: null,
        code,
        expires_at: expiresAt,
        used: false,
      });

      if (insertError) {
        console.error("Webhook: failed to insert auth code:", insertError);
        // Still return 200 for Telegram but log the error
      } else {
        // S10 — Escape user name to prevent HTML injection
        const safeName = escapeHtml(from.first_name);
        await sendTelegramMessage(
          chatId,
          `👋 Привет, ${safeName}!\n\nВаш код входа в <b>Claw Academy</b>:\n\n<b>🔑 ${code}</b>\n\nКод действителен <b>10 минут</b>.\n\nВведите его на сайте: https://www.clawacademy.io/login`
        );
      }
    }

    // S4 — Record processed update_id
    const { error: updateIdError } = await db.from("processed_updates").insert({
      update_id,
      processed_at: new Date().toISOString(),
    });

    if (updateIdError) {
      console.error("Webhook: failed to record update_id:", updateIdError);
    }

    // S4 — Lazy cleanup: delete entries older than 24h (fire and forget)
    db.from("processed_updates")
      .delete()
      .lt("processed_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .then(({ error }) => {
        if (error) console.error("Webhook: cleanup error:", error);
      });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ ok: true }); // Telegram requires 200
  }
}
