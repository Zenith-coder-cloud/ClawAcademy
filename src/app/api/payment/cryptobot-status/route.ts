import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const dynamic = "force-dynamic";

const CRYPTOBOT_API = "https://pay.crypt.bot/api";

export async function GET(req: NextRequest) {
  try {
    const invoiceId = req.nextUrl.searchParams.get("invoice_id");
    if (!invoiceId) {
      return NextResponse.json({ error: "Missing invoice_id" }, { status: 400 });
    }

    const apiToken = process.env.CRYPTOBOT_API_TOKEN;
    if (!apiToken) {
      console.error("CRYPTOBOT_API_TOKEN not set");
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const res = await fetch(`${CRYPTOBOT_API}/getInvoices?invoice_ids=${invoiceId}`, {
      headers: { "Crypto-Pay-API-Token": apiToken },
    });

    const data = await res.json();
    if (!data.ok || !data.result?.items?.length) {
      return NextResponse.json({ status: "unknown" });
    }

    const invoice = data.result.items[0];
    const status = invoice.status;

    // If paid, ensure tier is updated (fallback if webhook missed)
    if (status === "paid") {
      const db = supabaseAdmin();

      // Find the payment record
      const { data: payment } = await db
        .from("payments")
        .select("tier, telegram_id, wallet_address, status")
        .eq("cryptobot_invoice_id", invoiceId)
        .single();

      if (payment && payment.status !== "confirmed") {
        const tierUpdate = {
          tier: payment.tier,
          tier_updated_at: new Date().toISOString(),
        };

        // Update user tier
        if (payment.telegram_id) {
          await db.from("users").update(tierUpdate).eq("telegram_id", payment.telegram_id);
        } else if (payment.wallet_address) {
          await db.from("users").update(tierUpdate).or(
            `wallet_address.eq.${payment.wallet_address},wallet_address.eq.${payment.wallet_address.toLowerCase()}`
          );
        }

        // Mark payment as confirmed
        await db
          .from("payments")
          .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
          .eq("cryptobot_invoice_id", invoiceId)
          .eq("status", "pending");
      }
    }

    return NextResponse.json({ status });
  } catch (err) {
    console.error("GET /api/payment/cryptobot-status error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
