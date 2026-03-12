import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createPublicClient, http, parseEther } from "viem";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import {
  SUPPORTED_CHAINS,
  PAYMENT_ADDRESS,
  TIERS,
  type TierKey,
} from "@/lib/paymentConfig";
import { checkRateLimit, getClientIp } from "@/lib/server/rateLimit";
import { verifySession, SESSION_COOKIE } from "@/lib/server/session";

export const dynamic = "force-dynamic";

const verifySchema = z.object({
  tx_hash: z.string().regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid transaction hash format'),
  wallet_address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  tier: z.enum(["genesis", "pro", "elite"]).optional(),
});

function withinTolerance(actual: bigint, expected: bigint): boolean {
  const diff =
    actual > expected ? actual - expected : expected - actual;
  return diff * BigInt(100) <= expected; // 1% tolerance
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = verifySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { tx_hash, wallet_address } = parsed.data;

    const ip = getClientIp(req);
    const rateLimitKey = `payment-verify:${wallet_address || ip}`;
    const allowed = await checkRateLimit(rateLimitKey, 10, 5);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const db = supabaseAdmin();

    // 1) Find pending payment
    const { data: payment, error: paymentError } = await db
      .from("payments")
      .select("*")
      .eq("wallet_address", wallet_address.toLowerCase())
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json(
        { error: "No pending payment found" },
        { status: 404 }
      );
    }

    // 1.5) Check tx_hash uniqueness
    const { data: existingPayment } = await db
      .from("payments")
      .select("id")
      .eq("tx_hash", tx_hash)
      .eq("status", "confirmed")
      .limit(1)
      .maybeSingle();

    if (existingPayment) {
      return NextResponse.json(
        { error: "Transaction already used" },
        { status: 400 }
      );
    }

    // 2) Get chain config
    const chain = SUPPORTED_CHAINS.find((c) => c.id === payment.chain_id);
    if (!chain) {
      return NextResponse.json(
        { error: "Unsupported chain" },
        { status: 400 }
      );
    }

    // 3) Verify transaction on-chain
    const client = createPublicClient({
      transport: http(chain.rpcUrl),
    });

    const [tx, receipt] = await Promise.all([
      client.getTransaction({ hash: tx_hash as `0x${string}` }),
      client.getTransactionReceipt({ hash: tx_hash as `0x${string}` }),
    ]);

    if (receipt.status !== "success") {
      return NextResponse.json(
        { success: false, error: "Transaction not confirmed" },
        { status: 400 }
      );
    }

    if (
      receipt.to?.toLowerCase() !== PAYMENT_ADDRESS.toLowerCase() &&
      tx.to?.toLowerCase() !== PAYMENT_ADDRESS.toLowerCase()
    ) {
      // For ERC-20 transfers, tx.to is the token contract, not PAYMENT_ADDRESS
      // We check the logs below for USDT; for native we need tx.to === PAYMENT_ADDRESS
      if (payment.token === "native") {
        return NextResponse.json(
          { success: false, error: "Invalid recipient" },
          { status: 400 }
        );
      }
    }

    const tierConfig = TIERS[payment.tier as TierKey];

    // 4) Verify amount
    if (payment.token === "USDT") {
      // Decode ERC-20 Transfer logs
      const transferLogs = receipt.logs.filter(
        (log) =>
          log.address.toLowerCase() === chain.usdtAddress.toLowerCase() &&
          log.topics[0] ===
            "0xddf252ad1be2c89b69c2b068fc378daa0952546f14e7b510b17cf65228be46e3"
      );

      const matchingLog = transferLogs.find(
        (log) =>
          log.topics[2] &&
          ("0x" + log.topics[2].slice(26)).toLowerCase() ===
            PAYMENT_ADDRESS.toLowerCase()
      );

      if (!matchingLog || !matchingLog.data) {
        return NextResponse.json(
          { success: false, error: "No matching USDT transfer found" },
          { status: 400 }
        );
      }

      // Verify Transfer.from matches wallet_address
      if (
        !matchingLog.topics[1] ||
        ("0x" + matchingLog.topics[1].slice(26)).toLowerCase() !==
          wallet_address.toLowerCase()
      ) {
        return NextResponse.json(
          { success: false, error: "Transaction sender does not match wallet address" },
          { status: 400 }
        );
      }

      const transferredAmount = BigInt(matchingLog.data);
      // USDT uses 6 decimals on most chains
      const expectedAmount = BigInt(
        Math.round(tierConfig.price_usd * 1_000_000)
      );

      if (!withinTolerance(transferredAmount, expectedAmount)) {
        return NextResponse.json(
          { success: false, error: "Amount mismatch" },
          { status: 400 }
        );
      }
    } else {
      // Native token — verify sender matches wallet_address
      if (tx.from.toLowerCase() !== wallet_address.toLowerCase()) {
        return NextResponse.json(
          { success: false, error: "Transaction sender does not match wallet address" },
          { status: 400 }
        );
      }

      if (tx.to?.toLowerCase() !== PAYMENT_ADDRESS.toLowerCase()) {
        return NextResponse.json(
          { success: false, error: "Invalid recipient" },
          { status: 400 }
        );
      }

      const expectedAmount = payment.amount
        ? parseEther(payment.amount)
        : BigInt(Math.round((tierConfig.price_usd / chain.nativeRate) * 1e18));

      if (!withinTolerance(tx.value, expectedAmount)) {
        return NextResponse.json(
          { success: false, error: "Amount mismatch" },
          { status: 400 }
        );
      }
    }

    // 5) Update payment status
    const { error: updatePaymentError } = await db
      .from("payments")
      .update({
        status: "confirmed",
        tx_hash,
        confirmed_at: new Date().toISOString(),
      })
      .eq("id", payment.id);

    if (updatePaymentError) {
      console.error("Failed to update payment:", updatePaymentError);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // 6) Update user tier
    const tierUpdate = {
      tier: payment.tier,
      tier_updated_at: new Date().toISOString(),
    };

    const sessionToken = req.cookies.get(SESSION_COOKIE)?.value;
    const session = sessionToken ? await verifySession(sessionToken) : null;

    let updatedUsers: { id: string; tier: string }[] | null = null;
    let updateUserError: { message?: string } | null = null;

    // 6.1) Primary: session user (telegram_id preferred, else wallet_address)
    if (session?.telegramId) {
      const result = await db
        .from("users")
        .update(tierUpdate)
        .eq("telegram_id", session.telegramId)
        .select("id, tier");
      updatedUsers = result.data ?? null;
      updateUserError = result.error ?? null;
    } else if (session?.walletAddress) {
      const sessionLower = session.walletAddress.toLowerCase();
      const result = await db
        .from("users")
        .update(tierUpdate)
        .or(`wallet_address.eq.${sessionLower},wallet_address.eq.${session.walletAddress}`)
        .select("id, tier");
      updatedUsers = result.data ?? null;
      updateUserError = result.error ?? null;
    } else if (payment.user_id) {
      const result = await db
        .from("users")
        .update(tierUpdate)
        .eq("id", payment.user_id)
        .select("id, tier");
      updatedUsers = result.data ?? null;
      updateUserError = result.error ?? null;
    } else if (payment.telegram_id) {
      const result = await db
        .from("users")
        .update(tierUpdate)
        .eq("telegram_id", payment.telegram_id)
        .select("id, tier");
      updatedUsers = result.data ?? null;
      updateUserError = result.error ?? null;
    }

    if (updateUserError) {
      console.error("Failed to update user tier (primary):", updateUserError);
      // Will attempt fallback below; if all fallbacks fail, rollback happens at end
    }

    console.log("[verify] primary tier update result:", JSON.stringify(updatedUsers), "error:", updateUserError?.message);

    // 6.2) Fallback: payer wallet address from payment/tx
    if (!updatedUsers || updatedUsers.length === 0) {
      const lower = wallet_address.toLowerCase();
      const result = await db
        .from("users")
        .update(tierUpdate)
        .or(`wallet_address.eq.${lower},wallet_address.eq.${wallet_address}`)
        .select("id, tier");
      updatedUsers = result.data ?? null;
      updateUserError = result.error ?? null;

      if (updateUserError) {
        console.error("Failed to update user tier (wallet fallback):", updateUserError);
      }
      console.log("[verify] wallet fallback update result:", JSON.stringify(updatedUsers), "error:", updateUserError?.message);
    }

    if (!updatedUsers || updatedUsers.length === 0) {
      // Rollback: revert payment to pending so it can be retried
      await db
        .from("payments")
        .update({ status: "pending", tx_hash: null, confirmed_at: null })
        .eq("id", payment.id);

      console.error("[verify] tier update failed — payment rolled back to pending:", payment.id);
      return NextResponse.json(
        { success: false, error: "Payment received but user account not found. Please contact support." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      tier: payment.tier,
      updated: updatedUsers?.length ?? 0,
    });
  } catch (err) {
    console.error("POST /api/payment/verify error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
