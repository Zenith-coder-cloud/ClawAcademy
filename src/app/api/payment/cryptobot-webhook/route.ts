import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const apiToken = process.env.CRYPTOBOT_API_TOKEN;
    if (!apiToken) {
      console.error("CRYPTOBOT_API_TOKEN not set");
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const bodyText = await req.text();
    const signature = req.headers.get("crypto-pay-api-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify HMAC-SHA256: key = SHA256(api_token), message = body
    const secret = crypto.createHash("sha256").update(apiToken).digest();
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(bodyText)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("CryptoBot webhook: invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const body = JSON.parse(bodyText);

    if (body.update_type !== "invoice_paid") {
      return NextResponse.json({ ok: true });
    }

    const invoice = body.payload as {
      invoice_id: number;
      payload: string;
      status: string;
    };

    let parsed: { tier: string; telegramId?: number; walletAddress?: string };
    try {
      parsed = JSON.parse(invoice.payload);
    } catch {
      console.error("CryptoBot webhook: invalid payload JSON:", invoice.payload);
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { tier, telegramId, walletAddress } = parsed;
    const db = supabaseAdmin();

    // Update payment status
    const { error: paymentError } = await db
      .from("payments")
      .update({
        status: "confirmed",
        confirmed_at: new Date().toISOString(),
      })
      .eq("cryptobot_invoice_id", invoice.invoice_id.toString())
      .eq("status", "pending");

    if (paymentError) {
      console.error("CryptoBot webhook: payment update failed:", paymentError);
    }

    // Update user tier
    const tierUpdate = {
      tier,
      tier_updated_at: new Date().toISOString(),
    };

    if (telegramId) {
      const { error: userError } = await db
        .from("users")
        .update(tierUpdate)
        .eq("telegram_id", telegramId);

      if (userError) {
        console.error("CryptoBot webhook: user tier update failed:", userError);
        return NextResponse.json({ error: "Failed to update tier" }, { status: 500 });
      }
    } else if (walletAddress) {
      const { error: userError } = await db
        .from("users")
        .update(tierUpdate)
        .eq("wallet_address", walletAddress.toLowerCase());

      if (userError) {
        console.error("CryptoBot webhook: user tier update failed:", userError);
        return NextResponse.json({ error: "Failed to update tier" }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/payment/cryptobot-webhook error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
