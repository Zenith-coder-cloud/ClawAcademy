import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { verifySession, SESSION_COOKIE } from "@/lib/server/session";
import { TIERS, type TierKey } from "@/lib/paymentConfig";

export const dynamic = "force-dynamic";

const CRYPTOBOT_API = "https://pay.crypt.bot/api";

const createSchema = z.object({
  tier: z.enum(["genesis", "pro", "elite"]),
});

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    const { tier } = parsed.data;
    const tierConfig = TIERS[tier as TierKey];
    const priceUsd = tierConfig.price_usd;

    const apiToken = process.env.CRYPTOBOT_API_TOKEN;
    if (!apiToken) {
      console.error("CRYPTOBOT_API_TOKEN not set");
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const identifier = session.telegramId
      ? { telegramId: session.telegramId }
      : { walletAddress: session.walletAddress };

    const invoiceRes = await fetch(`${CRYPTOBOT_API}/createInvoice`, {
      method: "POST",
      headers: {
        "Crypto-Pay-API-Token": apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        asset: "USDT",
        amount: priceUsd.toString(),
        description: `ClawAcademy — ${tierConfig.name} доступ`,
        payload: JSON.stringify({ tier, ...identifier }),
        paid_btn_name: "callback",
        paid_btn_url: "https://www.clawacademy.io/dashboard?tier_updated=1",
        expires_in: 3600,
      }),
    });

    const invoiceData = await invoiceRes.json();
    if (!invoiceData.ok) {
      console.error("CryptoBot createInvoice error:", invoiceData);
      return NextResponse.json({ error: "Failed to create invoice" }, { status: 502 });
    }

    const invoice = invoiceData.result;

    // Save pending payment
    const db = supabaseAdmin();

    // Look up user
    let userId: string | null = null;
    if (session.telegramId) {
      const { data: user } = await db
        .from("users")
        .select("id")
        .eq("telegram_id", session.telegramId)
        .single();
      userId = user?.id ?? null;
    } else if (session.walletAddress) {
      const { data: user } = await db
        .from("users")
        .select("id")
        .eq("wallet_address", session.walletAddress.toLowerCase())
        .single();
      userId = user?.id ?? null;
    }

    const { error: insertError } = await db.from("payments").insert({
      user_id: userId,
      wallet_address: session.walletAddress?.toLowerCase() ?? null,
      telegram_id: session.telegramId ?? null,
      tier,
      chain_id: 0,
      token: "USDT",
      amount: priceUsd.toString(),
      amount_usd: priceUsd,
      status: "pending",
      payment_method: "cryptobot",
      cryptobot_invoice_id: invoice.invoice_id.toString(),
    });

    if (insertError) {
      console.error("Failed to insert CryptoBot payment:", insertError);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({
      invoice_url: invoice.pay_url,
      invoice_id: invoice.invoice_id,
    });
  } catch (err) {
    console.error("POST /api/payment/cryptobot-create error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
