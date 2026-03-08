import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const adminSecret = req.headers.get("x-admin-secret");
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { wallet_address, telegram_id, tier } = await req.json();
  if (!tier) return NextResponse.json({ error: "Missing tier" }, { status: 400 });
  const db = supabaseAdmin();
  let query = db.from("users").update({ tier, tier_updated_at: new Date().toISOString() });
  if (telegram_id) {
    query = query.eq("telegram_id", telegram_id);
  } else if (wallet_address) {
    const lower = wallet_address.toLowerCase();
    query = query.or(`wallet_address.eq.${lower},wallet_address.eq.${wallet_address}`);
  } else {
    return NextResponse.json({ error: "Missing wallet_address or telegram_id" }, { status: 400 });
  }
  const { data, error } = await query.select("id, wallet_address, telegram_id, tier");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, updated: data });
}

export async function GET(req: NextRequest) {
  const adminSecret = req.headers.get("x-admin-secret");
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("users")
    .select("id, wallet_address, telegram_id, tier, tier_updated_at, created_at")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ users: data });
}
