import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { TIERS, type TierKey } from "@/lib/paymentConfig";
import { verifySession, SESSION_COOKIE } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get(SESSION_COOKIE)?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { tier: "free", blocks: [0, 1, 2] },
        { status: 200 }
      );
    }

    const session = await verifySession(sessionToken);
    if (!session) {
      return NextResponse.json(
        { tier: "free", blocks: [0, 1, 2] },
        { status: 200 }
      );
    }

    const db = supabaseAdmin();

    let query = db.from("users").select("tier, wallet_address, telegram_id");

    if (session.walletAddress) {
      // ilike = case-insensitive match — works regardless of how address was stored
      query = query.ilike("wallet_address", session.walletAddress);
    } else if (session.telegramId) {
      query = query.eq("telegram_id", session.telegramId);
    } else {
      return NextResponse.json(
        { tier: "free", blocks: [0, 1, 2] },
        { status: 200 }
      );
    }

    const { data: user, error } = await query.single();

    if (error || !user) {
      return NextResponse.json(
        { tier: "free", blocks: [0, 1, 2] },
        { status: 200 }
      );
    }

    const tier = (user.tier as TierKey) || "free";
    const tierConfig = TIERS[tier as TierKey];
    const blocks = tierConfig ? [...tierConfig.blocks] : [0, 1, 2];

    return NextResponse.json({ tier, blocks });
  } catch (err) {
    console.error("GET /api/user/tier error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
