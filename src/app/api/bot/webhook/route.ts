import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function generateCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendTelegramMessage(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId = message.chat?.id;
    const text = message.text || "";
    const from = message.from;

    if (text.startsWith("/start")) {
      const code = generateCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      const db = supabaseAdmin();
      await db.from("auth_codes").insert({
        telegram_id: from.id,
        telegram_username: from.username || null,
        telegram_first_name: from.first_name || null,
        telegram_photo_url: null,
        code,
        expires_at: expiresAt,
        used: false,
      });

      await sendTelegramMessage(
        chatId,
        `👋 Привет, ${from.first_name}!\n\nВаш код входа в <b>Claw Academy</b>:\n\n<b>🔑 ${code}</b>\n\nКод действителен <b>10 минут</b>.\n\nВведите его на сайте: https://www.clawacademy.io/login`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ ok: true });
  }
}
