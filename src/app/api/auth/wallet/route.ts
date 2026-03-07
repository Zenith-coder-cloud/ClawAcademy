import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifyMessage } from "viem";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const dynamic = "force-dynamic";

// GET — generate nonce
export async function GET() {
  try {
    const nonce = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    const db = supabaseAdmin();

    const { error } = await db.from("auth_nonces").insert({
      nonce,
      expires_at: expiresAt,
    });

    if (error) {
      console.error("Failed to insert nonce:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({ nonce });
  } catch (err) {
    console.error("GET /api/auth/wallet error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — verify signature, authenticate user
export async function POST(req: NextRequest) {
  try {
    const { address, message, signature } = await req.json();

    if (!address || !message || !signature) {
      return NextResponse.json(
        { error: "Missing address, message, or signature" },
        { status: 400 }
      );
    }

    // Extract nonce from message
    const nonceMatch = message.match(/Nonce: ([a-f0-9]+)/);
    if (!nonceMatch) {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }
    const nonce = nonceMatch[1];

    const db = supabaseAdmin();

    // Check nonce exists, not used, not expired
    const { data: nonceRecord, error: nonceError } = await db
      .from("auth_nonces")
      .select("*")
      .eq("nonce", nonce)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (nonceError || !nonceRecord) {
      return NextResponse.json(
        { error: "Invalid or expired nonce" },
        { status: 401 }
      );
    }

    // Verify signature using viem
    const isValid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Mark nonce as used
    const { error: updateError } = await db
      .from("auth_nonces")
      .update({ used: true, address })
      .eq("id", nonceRecord.id);

    if (updateError) {
      console.error("Failed to mark nonce as used:", updateError);
    }

    // Upsert user with wallet address
    const { data: user, error: userError } = await db
      .from("users")
      .upsert(
        {
          wallet_address: address.toLowerCase(),
          first_name: address.slice(0, 6) + "..." + address.slice(-4),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "wallet_address" }
      )
      .select()
      .single();

    if (userError) {
      console.error("Failed to upsert user:", userError);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user?.id,
        wallet_address: address,
        first_name: address.slice(0, 6) + "..." + address.slice(-4),
        tier: user?.tier || "free",
      },
    });
  } catch (err) {
    console.error("POST /api/auth/wallet error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
