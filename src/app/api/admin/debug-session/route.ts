import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/server/session";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: "No ca_session cookie" });

  const session = await verifySession(token);
  if (!session) return NextResponse.json({ error: "Invalid JWT — SESSION_SECRET mismatch?", tokenPreview: token.slice(0, 30) });

  const db = supabaseAdmin();
  
  let dbResult = null;
  if (session.walletAddress) {
    const { data, error } = await db.from("users")
      .select("tier, wallet_address")
      .eq("wallet_address", session.walletAddress.toLowerCase())
      .single();
    dbResult = { data, error: error?.message };
  } else if (session.telegramId) {
    const { data, error } = await db.from("users")
      .select("tier, telegram_id")
      .eq("telegram_id", session.telegramId)
      .single();
    dbResult = { data, error: error?.message };
  }

  return NextResponse.json({
    session,
    dbResult,
    walletLower: session.walletAddress?.toLowerCase(),
  });
}
