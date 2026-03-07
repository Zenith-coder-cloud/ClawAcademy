import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { TIERS, type TierKey } from "@/lib/paymentConfig";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const walletAddress = req.headers.get("x-wallet-address");
    const telegramId = req.headers.get("x-telegram-id");

    if (!walletAddress && !telegramId) {
      return NextResponse.json(
        { tier: "free", blocks: [0, 1, 2] },
        { status: 200 }
      );
    }

    const db = supabaseAdmin();

    let query = db.from("users").select("tier, wallet_address, telegram_id");

    if (walletAddress) {
      query = query.eq("wallet_address", walletAddress.toLowerCase());
    } else if (telegramId) {
      query = query.eq("telegram_id", telegramId);
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
