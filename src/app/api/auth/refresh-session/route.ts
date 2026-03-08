import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import {
  verifySession,
  createSession,
  SESSION_COOKIE,
  MAX_AGE,
} from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }

    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const db = supabaseAdmin();

    // Look up fresh user data by userId or walletAddress
    let query = db.from("users").select("id, tier, wallet_address, telegram_id");
    if (session.userId) {
      query = query.eq("id", session.userId);
    } else if (session.walletAddress) {
      query = query.ilike("wallet_address", session.walletAddress);
    } else {
      return NextResponse.json({ error: "No user identifier" }, { status: 400 });
    }

    const { data: user, error: dbError } = await query.single();
    if (dbError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newTier = (user.tier as string) || "free";

    const newToken = await createSession({
      userId: user.id,
      telegramId: session.telegramId,
      walletAddress: session.walletAddress ?? user.wallet_address,
      tier: newTier,
    });

    const response = NextResponse.json({ ok: true, tier: newTier });
    response.cookies.set(SESSION_COOKIE, newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("refresh-session error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
