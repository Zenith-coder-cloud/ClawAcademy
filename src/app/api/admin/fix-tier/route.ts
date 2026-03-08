import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const adminSecret = req.headers.get("x-admin-secret");
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { wallet_address, tier } = await req.json();
  if (!wallet_address || !tier) return NextResponse.json({ error: "Missing params" }, { status: 400 });
  const db = supabaseAdmin();
  const lower = wallet_address.toLowerCase();
  const { data, error } = await db
    .from("users")
    .update({ tier, tier_updated_at: new Date().toISOString() })
    .or(`wallet_address.eq.${lower},wallet_address.eq.${wallet_address}`)
    .select("id, wallet_address, tier");
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
