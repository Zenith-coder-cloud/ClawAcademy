import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code || code.length !== 4) {
      return NextResponse.json({ error: "Неверный код" }, { status: 400 });
    }

    const db = supabaseAdmin();

    // Find valid code
    const { data: authCode, error } = await db
      .from("auth_codes")
      .select("*")
      .eq("code", code)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !authCode) {
      return NextResponse.json(
        { error: "Неверный или устаревший код" },
        { status: 401 }
      );
    }

    // Mark code as used
    await db.from("auth_codes").update({ used: true }).eq("id", authCode.id);

    // Upsert user
    const { data: user } = await db
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
