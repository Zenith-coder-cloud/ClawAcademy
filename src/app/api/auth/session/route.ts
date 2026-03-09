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
  try {
    const db = supabaseAdmin();
    let query = db.from("users").select("tier");
    if (session.walletAddress) {
      query = query.eq("wallet_address", session.walletAddress.toLowerCase());
    } else if (session.telegramId) {
      query = query.eq("telegram_id", session.telegramId);
    }
    const { data: user } = await query.single();
    if (user?.tier) {
      const tier = user.tier as TierKey;
      const tierConfig = TIERS[tier];
      const blocks = tierConfig ? [...tierConfig.blocks] : [0, 1, 2];
      return NextResponse.json({ ok: true, session: { ...session, tier }, tier, blocks });
    }
  } catch {}

  return NextResponse.json({ ok: true, session });
}
