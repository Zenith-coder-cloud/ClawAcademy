import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { checkRateLimit, getClientIp } from "@/lib/server/rateLimit";
import { createSession, SESSION_COOKIE, MAX_AGE } from "@/lib/server/session";

export const dynamic = "force-dynamic";

// S8 — Input validation: 6-digit code
const verifyCodeSchema = z.object({
  code: z
    .string()
    .length(6)
    .regex(/^\d+$/),
});

export async function POST(req: NextRequest) {
  try {
    // S6 — Rate limiting: 5 requests per 15 minutes per IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const rateLimitKey = `verify-code:${ip}`;

    const allowed = await checkRateLimit(rateLimitKey, 5, 15);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await req.json();

    // S8 — Validate input
    const parsed = verifyCodeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Неверный код" },
        { status: 400 }
      );
    }

    const { code } = parsed.data;
    const db = supabaseAdmin();

    // S7 — Atomic code redemption via RPC (prevents race condition)
    // Falls back to SELECT+UPDATE if RPC not available yet
    let authCode: Record<string, unknown> | null = null;

    const { data: rpcResult, error: rpcError } = await db.rpc(
      "redeem_auth_code",
      { p_code: code }
    );

    if (rpcError) {
      console.error("redeem_auth_code RPC failed:", rpcError.message);
      return NextResponse.json(
        { error: "Code redemption failed, please try again" },
        { status: 500 }
      );
    } else {
      // RPC returned result
      if (!rpcResult || (Array.isArray(rpcResult) && rpcResult.length === 0)) {
        return NextResponse.json(
          { error: "Неверный или устаревший код" },
          { status: 401 }
        );
      }
      authCode = Array.isArray(rpcResult) ? rpcResult[0] : rpcResult;
    }

    if (!authCode) {
      return NextResponse.json(
        { error: "Неверный или устаревший код" },
        { status: 401 }
      );
    }

    // Upsert user
    const { data: user, error: upsertError } = await db
      .from("users")
      .upsert(
        {
          telegram_id: authCode.telegram_id,
          telegram_username: authCode.telegram_username,
          first_name: authCode.telegram_first_name,
          photo_url: authCode.telegram_photo_url,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "telegram_id" }
      )
      .select()
      .single();

    if (upsertError) {
      console.error("verify-code: failed to upsert user:", upsertError);
      return NextResponse.json(
        { error: "Ошибка сервера" },
        { status: 500 }
      );
    }

    const sessionToken = await createSession({
      userId: user?.id,
      telegramId: authCode.telegram_id as number,
      tier: (user?.tier as string) || "free",
    });
    const response = NextResponse.json({
      ok: true,
      user: {
        id: user?.id,
        telegram_id: authCode.telegram_id,
        first_name: authCode.telegram_first_name,
        username: authCode.telegram_username,
        photo_url: authCode.telegram_photo_url,
        tier: user?.tier || "free",
      },
    });
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("verify-code error:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
