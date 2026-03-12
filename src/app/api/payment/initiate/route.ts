import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import {
  TIERS,
  SUPPORTED_CHAINS,
  PAYMENT_ADDRESS,
  type TierKey,
} from "@/lib/paymentConfig";
import { checkRateLimit, getClientIp } from "@/lib/server/rateLimit";
import { getNativeTokenPrice } from "@/lib/server/priceOracle";

export const dynamic = "force-dynamic";

const initiateSchema = z.object({
  tier: z.enum(["genesis", "pro", "elite"]),
  chain_id: z.number().int(),
  token: z.enum(["USDT", "native"]),
  wallet_address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = initiateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);
    const rateLimitKey = `payment-initiate:${parsed.data.wallet_address || ip}`;
    const allowed = await checkRateLimit(rateLimitKey, 10, 5);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { tier, chain_id, token, wallet_address } = parsed.data;

    const chain = SUPPORTED_CHAINS.find((c) => c.id === chain_id);
    if (!chain) {
      return NextResponse.json(
        { error: "Unsupported chain" },
        { status: 400 }
      );
    }

    const tierConfig = TIERS[tier as TierKey];
    const priceUsd = tierConfig.price_usd;

    let amount: string;
    if (token === "USDT") {
      amount = priceUsd.toFixed(6);
    } else {
      const liveRate = await getNativeTokenPrice(
        chain.nativeCurrency as "BNB" | "ETH" | "MATIC"
      ).catch(() => chain.nativeRate);
      amount = (priceUsd / liveRate).toFixed(6);
    }

    const db = supabaseAdmin();

    // Look up user by wallet_address (may not exist)
    const { data: user } = await db
      .from("users")
      .select("id")
      .eq("wallet_address", wallet_address.toLowerCase())
      .single();

    const { data: payment, error: insertError } = await db
      .from("payments")
      .insert({
        user_id: user?.id ?? null,
        wallet_address: wallet_address.toLowerCase(),
        tier,
        chain_id,
        token,
        amount,
        amount_usd: priceUsd,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !payment) {
      console.error("Failed to insert payment:", insertError);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({
      payment_address: PAYMENT_ADDRESS,
      amount,
      ...(token === "USDT" && { token_contract: chain.usdtAddress }),
      chain_id,
      tier,
      amount_usd: priceUsd,
      payment_id: payment.id,
    });
  } catch (err) {
    console.error("POST /api/payment/initiate error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
