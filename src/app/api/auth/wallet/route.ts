import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAddress, verifyMessage } from "viem";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { checkRateLimit, getClientIp } from "@/lib/server/rateLimit";
import { createSession, SESSION_COOKIE, MAX_AGE } from "@/lib/server/session";

export const dynamic = "force-dynamic";

// S8 — Input validation for wallet auth
const walletAuthSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  message: z.string().min(1).max(1000),
  signature: z.string().regex(/^0x[a-fA-F0-9]+$/),
  chainId: z.coerce.number().int().positive().optional(),
  issuedAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
});

// GET — generate nonce
export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
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
    const ip = getClientIp(req);
    const allowed = await checkRateLimit(`wallet-verify:${ip}`, 10, 1);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    console.log("[wallet-auth POST] body keys:", Object.keys(body));

    // S8 — Validate input
    const parsed = walletAuthSchema.safeParse(body);
    if (!parsed.success) {
      console.error("[wallet-auth POST] zod validation failed:", parsed.error.format());
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { address, message, signature, issuedAt, expiresAt } =
      parsed.data;
    console.log("[wallet-auth POST] parsed address:", address);
    console.log("[wallet-auth POST] message lines:", message.split("\n"));

    // Validate expiration — message must not be expired
    const now = Date.now();
    if (new Date(expiresAt).getTime() <= now) {
      console.error("[wallet-auth POST] message expired, expiresAt:", expiresAt, "now:", new Date().toISOString());
      return NextResponse.json({ error: "Message expired" }, { status: 400 });
    }

    // Validate issuedAt — must not be older than 10 minutes
    if (now - new Date(issuedAt).getTime() > 10 * 60 * 1000) {
      console.error("[wallet-auth POST] message too old, issuedAt:", issuedAt, "now:", new Date().toISOString());
      return NextResponse.json({ error: "Message too old" }, { status: 400 });
    }

    const lines = message.split(/\r?\n/);
    const getLineValue = (prefix: string) => {
      const line = lines.find((item) => item.startsWith(prefix));
      return line ? line.slice(prefix.length).trim() : "";
    };

    const messageAddressRaw = getLineValue("Адрес: ");
    const nonce = getLineValue("Код: ");
    const messageIssuedAt = getLineValue("Выдан: ");
    const messageExpiresAt = getLineValue("Истекает: ");

    console.log("[wallet-auth POST] parsed from message — address:", messageAddressRaw, "nonce:", nonce?.slice(0, 8) + "...", "issuedAt:", messageIssuedAt, "expiresAt:", messageExpiresAt);

    if (!messageAddressRaw || !nonce || !messageIssuedAt || !messageExpiresAt) {
      console.error("[wallet-auth POST] invalid message format — missing fields:", {
        hasAddress: !!messageAddressRaw,
        hasNonce: !!nonce,
        hasIssuedAt: !!messageIssuedAt,
        hasExpiresAt: !!messageExpiresAt,
      });
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    let normalizedAddress: `0x${string}`;
    let normalizedMessageAddress: `0x${string}`;
    try {
      normalizedAddress = getAddress(address as `0x${string}`);
      normalizedMessageAddress = getAddress(messageAddressRaw as `0x${string}`);
    } catch (addrErr) {
      console.error("[wallet-auth POST] getAddress failed:", addrErr);
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    if (normalizedAddress !== normalizedMessageAddress) {
      console.error("[wallet-auth POST] address mismatch:", normalizedAddress, "vs", normalizedMessageAddress);
      return NextResponse.json({ error: "Address mismatch" }, { status: 400 });
    }

    if (messageIssuedAt !== issuedAt || messageExpiresAt !== expiresAt) {
      console.error("[wallet-auth POST] timestamp mismatch — message:", messageIssuedAt, messageExpiresAt, "body:", issuedAt, expiresAt);
      return NextResponse.json({ error: "Message mismatch" }, { status: 400 });
    }

    const db = supabaseAdmin();

    // Check nonce exists, not used, not expired
    console.log("[wallet-auth POST] looking up nonce:", nonce.slice(0, 8) + "...");
    const { data: nonceRecord, error: nonceError } = await db
      .from("auth_nonces")
      .select("*")
      .eq("nonce", nonce)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (nonceError) {
      console.error("[wallet-auth POST] nonce lookup failed:", nonceError.code, nonceError.message, nonceError.details);
    }

    if (nonceError || !nonceRecord) {
      return NextResponse.json(
        { error: "Invalid or expired nonce" },
        { status: 401 }
      );
    }
    console.log("[wallet-auth POST] nonce found, id:", nonceRecord.id);

    // Verify signature using viem
    let isValid: boolean;
    try {
      isValid = await verifyMessage({
        address: normalizedAddress,
        message,
        signature: signature as `0x${string}`,
      });
      console.log("[wallet-auth POST] verifyMessage result:", isValid);
    } catch (verifyErr) {
      console.error("[wallet-auth POST] verifyMessage threw:", verifyErr);
      return NextResponse.json({ error: "Signature verification failed" }, { status: 401 });
    }

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Mark nonce as used — delete it so it can't be reused
    const { error: deleteError } = await db
      .from("auth_nonces")
      .delete()
      .eq("id", nonceRecord.id);

    if (deleteError) {
      console.error("[wallet-auth POST] failed to delete used nonce:", deleteError);
    }

    // Upsert user with wallet address
    console.log("[wallet-auth POST] upserting user for wallet:", normalizedAddress.toLowerCase());
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
      console.error("[wallet-auth POST] upsert user failed:", userError.code, userError.message, userError.details);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
    console.log("[wallet-auth POST] user upserted, id:", user?.id);

    const sessionToken = await createSession({
      userId: user?.id,
      walletAddress: normalizedAddress.toLowerCase(),
      tier: (user?.tier as string) || "free",
    });
    console.log("[wallet-auth POST] session created successfully");

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
    console.error("[wallet-auth POST] UNCAUGHT error:", err);
    console.error("[wallet-auth POST] error stack:", err instanceof Error ? err.stack : "no stack");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
