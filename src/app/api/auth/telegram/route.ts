import { createHmac, createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/server/rateLimit";

export const dynamic = "force-dynamic";

// S8 — Input validation
const telegramAuthSchema = z
  .object({
    hash: z.string(),
    id: z.number(),
    auth_date: z.number(),
    first_name: z.string(),
  })
  .passthrough(); // Allow additional Telegram fields like last_name, username, photo_url

export async function POST(req: NextRequest) {
  try {
    // S6 — Rate limiting: 10 requests per minute per IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const rateLimitKey = `telegram-auth:${ip}`;

    const allowed = await checkRateLimit(rateLimitKey, 10, 1);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const data = await req.json();

    // S8 — Validate input
    const parsed = telegramAuthSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Verify Telegram hash (Login Widget uses SHA256 of bot token as secret)
    const { hash, ...userData } = parsed.data;
    const botToken = process.env.TELEGRAM_BOT_TOKEN!;
    const secret = createHash("sha256").update(botToken).digest();

    const checkString = Object.keys(userData)
      .sort()
      .map((k) => `${k}=${userData[k as keyof typeof userData]}`)
      .join("\n");

    const hmac = createHmac("sha256", secret).update(checkString).digest("hex");

    // S11 — Constant-time comparison to prevent timing attacks
    const hmacBuf = Buffer.from(hmac, "hex");
    const hashBuf = Buffer.from(hash, "hex");
    if (
      hmacBuf.length !== hashBuf.length ||
      !timingSafeEqual(hmacBuf, hashBuf)
    ) {
      return NextResponse.json({ error: "Invalid hash" }, { status: 401 });
    }

    // Check data is not older than 1 hour
    const authDate = userData.auth_date;
    if (Date.now() / 1000 - authDate > 3600) {
      return NextResponse.json(
        { error: "Auth data expired" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: userData.id,
        first_name: userData.first_name,
        last_name: (userData as Record<string, unknown>).last_name,
        username: (userData as Record<string, unknown>).username,
        photo_url: (userData as Record<string, unknown>).photo_url,
      },
    });
  } catch (err) {
    console.error("telegram auth error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
