import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/server/session";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const db = supabaseAdmin();

  let userQuery = db.from("users").select("id");
  if (session.walletAddress) {
    userQuery = userQuery.eq("wallet_address", session.walletAddress.toLowerCase());
  } else if (session.telegramId) {
    userQuery = userQuery.eq("telegram_id", session.telegramId);
  } else {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { data: user } = await userQuery.maybeSingle();
  if (!user) {
    return NextResponse.json({ messages: [] });
  }

  const { data: messages } = await db
    .from("chat_messages")
    .select("role, content, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(20);

  // Get messages left info
  const today = new Date().toISOString().split("T")[0];
  const { data: ctx } = await db
    .from("user_context")
    .select("messages_today, last_message_date")
    .eq("user_id", user.id)
    .maybeSingle();

  let messagesToday = 0;
  if (ctx) {
    const lastDate = ctx.last_message_date
      ? new Date(ctx.last_message_date).toISOString().split("T")[0]
      : null;
    messagesToday = lastDate === today ? (ctx.messages_today || 0) : 0;
  }

  // Get tier
  let tierQuery = db.from("users").select("tier");
  if (session.walletAddress) {
    tierQuery = tierQuery.eq("wallet_address", session.walletAddress.toLowerCase());
  } else if (session.telegramId) {
    tierQuery = tierQuery.eq("telegram_id", session.telegramId);
  }
  const { data: tierRow } = await tierQuery.maybeSingle();
  const tier = tierRow?.tier || "free";

  return NextResponse.json({
    messages: messages || [],
    messagesLeft: tier === "elite" ? null : 50 - messagesToday,
  });
}
