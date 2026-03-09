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
  let users: Array<{
    tier: string | null;
    telegram_username: string | null;
    first_name: string | null;
    wallet_address: string | null;
    telegram_id: number | null;
  }> = [];
  let dbError: unknown = null;

  if (session.walletAddress && session.telegramId) {
    const lower = session.walletAddress.toLowerCase();
    const result = await db
      .from("users")
      .select("tier, telegram_username, first_name, wallet_address, telegram_id")
      .or(`telegram_id.eq.${session.telegramId},wallet_address.eq.${lower},wallet_address.eq.${session.walletAddress}`);
    users = result.data ?? [];
    dbError = result.error ?? null;
  } else if (session.walletAddress) {
    const lower = session.walletAddress.toLowerCase();
    const result = await db
      .from("users")
      .select("tier, telegram_username, first_name, wallet_address, telegram_id")
      .or(`wallet_address.eq.${lower},wallet_address.eq.${session.walletAddress}`);
    users = result.data ?? [];
    dbError = result.error ?? null;
  } else if (session.telegramId) {
    const result = await db
      .from("users")
      .select("tier, telegram_username, first_name, wallet_address, telegram_id")
      .eq("telegram_id", session.telegramId);
    users = result.data ?? [];
    dbError = result.error ?? null;
  } else {
    return NextResponse.json({ ok: true, session });
  }

  const tierRank: Record<TierKey, number> = {
    free: 0,
    genesis: 1,
    pro: 2,
    elite: 3,
  };

  const bestTier = users.reduce<TierKey>((acc, u) => {
    const key = (u.tier as TierKey) || "free";
    return tierRank[key] > tierRank[acc] ? key : acc;
  }, "free");

  const tgUser = session.telegramId
    ? users.find((u) => u.telegram_id === session.telegramId)
    : null;
  const walletUser = session.walletAddress
    ? users.find(
        (u) =>
          u.wallet_address?.toLowerCase() ===
          session.walletAddress?.toLowerCase()
      )
    : null;
  const displayUser = tgUser ?? walletUser ?? users[0] ?? null;

  console.log("[session] db lookup:", {
    walletAddress: session.walletAddress,
    telegramId: session.telegramId,
    usersCount: users.length,
    dbError,
  });

  const tierConfig = TIERS[bestTier];
  const blocks = tierConfig ? [...tierConfig.blocks] : [0];
  const walletAddress =
    tgUser?.wallet_address ??
    walletUser?.wallet_address ??
    session.walletAddress ??
    null;

  return NextResponse.json({
    ok: true,
    session: {
      ...session,
      tier: bestTier,
      walletAddress,
      telegramUsername: tgUser?.telegram_username ?? null,
      firstName: tgUser?.first_name ?? displayUser?.first_name ?? null,
    },
    tier: bestTier,
    blocks,
    walletAddress,
    telegramUsername: tgUser?.telegram_username ?? null,
    firstName: tgUser?.first_name ?? displayUser?.first_name ?? null,
  });
}
