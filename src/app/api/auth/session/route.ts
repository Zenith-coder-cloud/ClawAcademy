import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/server/session";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { TIERS, type TierKey } from "@/lib/paymentConfig";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // Always read tier fresh from DB
  const db = supabaseAdmin();
  let query = db.from("users").select("tier, telegram_username, first_name, wallet_address");
  if (session.walletAddress) {
    const lower = session.walletAddress.toLowerCase();
    query = query.or(`wallet_address.eq.${lower},wallet_address.eq.${session.walletAddress}`);
  } else if (session.telegramId) {
    query = query.eq("telegram_id", session.telegramId);
  } else {
    return NextResponse.json({ ok: true, session });
  }
  const { data: user, error: dbError } = await query.maybeSingle();
  console.log("[session] db lookup:", { walletAddress: session.walletAddress, telegramId: session.telegramId, user, dbError });
  const tier = (user?.tier || "free") as TierKey;
  const tierConfig = TIERS[tier];
  const blocks = tierConfig ? [...tierConfig.blocks] : [0];
  const walletAddress = user?.wallet_address ?? session.walletAddress ?? null;
  return NextResponse.json({
    ok: true,
    session: {
      ...session,
      tier,
      walletAddress,
      telegramUsername: user?.telegram_username ?? null,
      firstName: user?.first_name ?? null,
    },
    tier,
    blocks,
    walletAddress,
    telegramUsername: user?.telegram_username ?? null,
    firstName: user?.first_name ?? null,
  });
}
