import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifyMessage } from "viem";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { checkRateLimit } from "@/lib/server/rateLimit";
import { createSession, SESSION_COOKIE, MAX_AGE } from "@/lib/server/session";

export const dynamic = "force-dynamic";

// S8 — Input validation for wallet auth
const walletAuthSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  message: z.string().min(1).max(1000),
  signature: z.string().regex(/^0x[a-fA-F0-9]+$/),
  chainId: z.number().int().positive(),
  issuedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
});

// GET — generate nonce
export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown";
    const allowed = await checkRateLimit(`wallet-nonce:${ip}`, 20, 1);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

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

    const issuedAt = new Date().toISOString();
    return NextResponse.json({ nonce, issuedAt, expiresAt });
  } catch (err) {
    console.error("GET /api/auth/wallet error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — verify signature, authenticate user
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown";
    const allowed = await checkRateLimit(`wallet-verify:${ip}`, 10, 1);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();

    // S8 — Validate input
    const parsed = walletAuthSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { address, message, signature, chainId, issuedAt, expiresAt } = parsed.data;

    // Validate expiration — message must not be expired
    const now = Date.now();
    if (new Date(expiresAt).getTime() <= now) {
      return NextResponse.json({ error: "Message expired" }, { status: 400 });
    }

    // Validate issuedAt — must not be older than 10 minutes
    if (now - new Date(issuedAt).getTime() > 10 * 60 * 1000) {
      return NextResponse.json({ error: "Message too old" }, { status: 400 });
    }

    // Extract nonce from message
    const nonceMatch = message.match(/Nonce: ([a-f0-9]+)/);
    if (!nonceMatch) {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }
    const nonce = nonceMatch[1];

    // Reconstruct expected SIWE message and verify it matches
    const expectedMessage = [
      'clawacademy.io wants you to sign in with your Ethereum account:',
      address,
      '',
      'Sign in to Claw Academy',
      '',
      'URI: https://www.clawacademy.io',
      'Version: 1',
      'Chain ID: ' + chainId,
      'Nonce: ' + nonce,
      'Issued At: ' + issuedAt,
      'Expiration Time: ' + expiresAt,
    ].join('\n');

    if (message !== expectedMessage) {
      return NextResponse.json({ error: "Message mismatch" }, { status: 400 });
    }

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

    const sessionToken = await createSession({
      userId: user?.id,
      walletAddress: address.toLowerCase(),
      tier: (user?.tier as string) || "free",
    });
    const response = NextResponse.json({
      ok: true,
      user: {
        id: user?.id,
        wallet_address: address,
        first_name: address.slice(0, 6) + "..." + address.slice(-4),
        tier: user?.tier || "free",
      },
    });
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("POST /api/auth/wallet error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
