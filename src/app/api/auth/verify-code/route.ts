import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { checkRateLimit } from "@/lib/server/rateLimit";

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
      // RPC not available — fallback to non-atomic (will be fixed when RPC is created)
      console.error("redeem_auth_code RPC not available, using fallback:", rpcError.message);

      const { data: found, error: findError } = await db
        .from("auth_codes")
        .select("*")
        .eq("code", code)
        .eq("used", false)
        .gt("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (findError || !found) {
        return NextResponse.json(
          { error: "Неверный или устаревший код" },
          { status: 401 }
        );
      }

      // S9 — Check update result
      const { error: updateError } = await db
        .from("auth_codes")
        .update({ used: true })
        .eq("id", found.id);

      if (updateError) {
        console.error("verify-code: failed to mark code as used:", updateError);
        return NextResponse.json(
          { error: "Ошибка сервера" },
          { status: 500 }
        );
      }

      authCode = found;
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

    return NextResponse.json({
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
  } catch (err) {
    console.error("verify-code error:", err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
