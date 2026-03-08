import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "viem";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import {
  verifySession,
  createSession,
  SESSION_COOKIE,
  MAX_AGE,
} from "@/lib/server/session";

export const dynamic = "force-dynamic";

const linkSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  message: z.string().min(1),
  signature: z.string().regex(/^0x[a-fA-F0-9]+$/),
});

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await verifySession(token);
    if (!session || !session.telegramId) {
      return NextResponse.json(
        { error: "Telegram session required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = linkSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    const { address, message, signature } = parsed.data;

    // Verify signature
    const isValid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const db = supabaseAdmin();
    const walletLower = address.toLowerCase();

    // Check if wallet is already used by another user
    const { data: existing } = await db
      .from("users")
      .select("id, telegram_id")
      .eq("wallet_address", walletLower)
      .single();

    if (existing && existing.telegram_id !== session.telegramId) {
      return NextResponse.json(
        { error: "Wallet already linked to another account" },
        { status: 409 }
      );
    }

    // Update user: link wallet
    const { error: updateError } = await db
      .from("users")
      .update({
        wallet_address: walletLower,
        wallet_linked_at: new Date().toISOString(),
      })
      .eq("telegram_id", session.telegramId);

    if (updateError) {
      console.error("link-wallet update error:", updateError);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // Update session cookie with walletAddress
    const newToken = await createSession({
      ...session,
      walletAddress: walletLower,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("POST /api/auth/link-wallet error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
