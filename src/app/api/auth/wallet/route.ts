import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAddress, verifyMessage } from "viem";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { checkRateLimit, getClientIp } from "@/lib/server/rateLimit";
import { createSession, SESSION_COOKIE, MAX_AGE } from "@/lib/server/session";

export const dynamic = "force-dynamic";
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://www.clawacademy.io",
  "Access-Control-Allow-Credentials": "true",
};

const withCors = (response: NextResponse) => {
  response.headers.set(
    "Access-Control-Allow-Origin",
    corsHeaders["Access-Control-Allow-Origin"]
  );
  response.headers.set(
    "Access-Control-Allow-Credentials",
    corsHeaders["Access-Control-Allow-Credentials"]
  );
  return response;
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// S8 — Input validation for wallet auth
const walletAuthSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  message: z.string().min(1).max(1000),
  signature: z.string().regex(/^0x[a-fA-F0-9]+$/),
  chainId: z.coerce.number().int().positive(),
  issuedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
});

// GET — generate nonce
export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const allowed = await checkRateLimit(`wallet-nonce:${ip}`, 20, 1);
    if (!allowed) {
      return withCors(
        NextResponse.json({ error: "Too many requests" }, { status: 429 })
      );
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
      return withCors(
        NextResponse.json({ error: "Server error" }, { status: 500 })
      );
    }

    const issuedAt = new Date().toISOString();
    return withCors(NextResponse.json({ nonce, issuedAt, expiresAt }));
  } catch (err) {
    console.error("GET /api/auth/wallet error:", err);
    return withCors(NextResponse.json({ error: "Server error" }, { status: 500 }));
  }
}

// POST — verify signature, authenticate user
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const allowed = await checkRateLimit(`wallet-verify:${ip}`, 10, 1);
    if (!allowed) {
      return withCors(
        NextResponse.json({ error: "Too many requests" }, { status: 429 })
      );
    }

    const body = await req.json();

    // S8 — Validate input
    const parsed = walletAuthSchema.safeParse(body);
    if (!parsed.success) {
      return withCors(
        NextResponse.json({ error: "Invalid request data" }, { status: 400 })
      );
    }

    const { address, message, signature, chainId, issuedAt, expiresAt } =
      parsed.data;

    // Validate expiration — message must not be expired
    const now = Date.now();
    if (new Date(expiresAt).getTime() <= now) {
      return withCors(
        NextResponse.json({ error: "Message expired" }, { status: 400 })
      );
    }

    // Validate issuedAt — must not be older than 10 minutes
    if (now - new Date(issuedAt).getTime() > 10 * 60 * 1000) {
      return withCors(
        NextResponse.json({ error: "Message too old" }, { status: 400 })
      );
    }

    const lines = message.split(/\r?\n/);
    const getLineValue = (prefix: string) => {
      const line = lines.find((item) => item.startsWith(prefix));
      return line ? line.slice(prefix.length).trim() : "";
    };

    const messageAddressRaw = getLineValue("Адрес: ");
    const nonce = getLineValue("Nonce: ");
    const messageIssuedAt = getLineValue("Выдан: ");
    const messageExpiresAt = getLineValue("Истекает: ");

    if (!messageAddressRaw || !nonce || !messageIssuedAt || !messageExpiresAt) {
      return withCors(
        NextResponse.json({ error: "Invalid message format" }, { status: 400 })
      );
    }

    let normalizedAddress: `0x${string}`;
    let normalizedMessageAddress: `0x${string}`;
    try {
      normalizedAddress = getAddress(address as `0x${string}`);
      normalizedMessageAddress = getAddress(messageAddressRaw as `0x${string}`);
    } catch {
      return withCors(
        NextResponse.json({ error: "Invalid address" }, { status: 400 })
      );
    }

    if (normalizedAddress !== normalizedMessageAddress) {
      return withCors(
        NextResponse.json({ error: "Address mismatch" }, { status: 400 })
      );
    }

    if (messageIssuedAt !== issuedAt || messageExpiresAt !== expiresAt) {
      return withCors(
        NextResponse.json({ error: "Message mismatch" }, { status: 400 })
      );
    }

    const db = supabaseAdmin();

    // Check nonce exists, not used, not expired
    const { data: nonceRecord, error: nonceError } = await db
      .from("auth_nonces")
      .select("*")
      .eq("nonce", nonce)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (nonceError) {
      console.error("Nonce lookup failed:", nonceError);
    }

    if (nonceError || !nonceRecord) {
      return withCors(
        NextResponse.json(
          { error: "Invalid or expired nonce" },
          { status: 401 }
        )
      );
    }

    // Verify signature using viem
    const isValid = await verifyMessage({
      address: normalizedAddress,
      message,
      signature: signature as `0x${string}`,
    });

    if (!isValid) {
      return withCors(
        NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      );
    }

    // Mark nonce as used — delete it so it can't be reused
    const { error: deleteError } = await db
      .from("auth_nonces")
      .delete()
      .eq("id", nonceRecord.id);

    if (deleteError) {
      console.error("Failed to delete used nonce:", deleteError);
    }

    // Upsert user with wallet address
    const { data: user, error: userError } = await db
      .from("users")
      .upsert(
        {
          wallet_address: normalizedAddress.toLowerCase(),
          first_name: address.slice(0, 6) + "..." + address.slice(-4),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "wallet_address" }
      )
      .select()
      .single();

    if (userError) {
      console.error("Failed to upsert user:", userError);
      return withCors(
        NextResponse.json({ error: "Server error" }, { status: 500 })
      );
    }

    const sessionToken = await createSession({
      userId: user?.id,
      walletAddress: normalizedAddress.toLowerCase(),
      tier: (user?.tier as string) || "free",
    });
    const response = withCors(NextResponse.json({
      ok: true,
      user: {
        id: user?.id,
        wallet_address: address,
        first_name: address.slice(0, 6) + "..." + address.slice(-4),
        tier: user?.tier || "free",
      },
    }));
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
    return withCors(NextResponse.json({ error: "Server error" }, { status: 500 }));
  }
}
