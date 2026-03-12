import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { checkRateLimit, getClientIp } from "@/lib/server/rateLimit";

export const dynamic = "force-dynamic";

const CRYPTOBOT_API = "https://pay.crypt.bot/api";

export async function GET(req: NextRequest) {
  try {
    const invoiceId = req.nextUrl.searchParams.get("invoice_id");
    if (!invoiceId) {
      return NextResponse.json({ error: "Missing invoice_id" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const rateLimitKey = `cryptobot-status:${invoiceId}:${ip}`;
    const allowed = await checkRateLimit(rateLimitKey, 10, 1);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const apiToken = process.env.CRYPTOBOT_API_TOKEN;
    if (!apiToken) {
      console.error("CRYPTOBOT_API_TOKEN not set");
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const res = await fetch(`${CRYPTOBOT_API}/getInvoices?invoice_ids=${invoiceId}`, {
      headers: {
        "Crypto-Pay-API-Token": apiToken,
      },
    });

    const data = await res.json();
    if (!data.ok || !data.result?.items?.length) {
      return NextResponse.json({ status: "unknown" });
    }

    const invoice = data.result.items[0];

    // Webhook fallback: if CryptoBot reports paid but webhook may not have delivered
    if (invoice.status === "paid") {
      try {
        const db = supabaseAdmin();

        // Look up pending payment by invoice id
        const { data: payment } = await db
          .from("payments")
          .select("id, status, tier, telegram_id, wallet_address")
          .eq("cryptobot_invoice_id", invoiceId)
          .eq("status", "pending")
          .maybeSingle();

        if (payment) {
          // Webhook hasn't processed it yet — update payment row
          const { error: paymentError } = await db
            .from("payments")
            .update({
              status: "confirmed",
              confirmed_at: new Date().toISOString(),
            })
            .eq("id", payment.id);

          if (paymentError) {
            console.error("cryptobot-status: payment update failed:", paymentError);
          } else {
            // Update user tier
            const tierUpdate = {
              tier: payment.tier,
              tier_updated_at: new Date().toISOString(),
            };

            if (payment.telegram_id) {
              const { error: userError } = await db
                .from("users")
                .update(tierUpdate)
                .eq("telegram_id", payment.telegram_id);

              if (userError) {
                console.error("cryptobot-status: user tier update failed:", userError);
              }
            } else if (payment.wallet_address) {
              const lower = payment.wallet_address.toLowerCase();
              const { error: userError } = await db
                .from("users")
                .update(tierUpdate)
                .or(`wallet_address.eq.${lower},wallet_address.eq.${payment.wallet_address}`);

              if (userError) {
                console.error("cryptobot-status: user tier update failed:", userError);
              }
            }
          }
        }
      } catch (dbErr) {
        console.error("cryptobot-status: DB fallback error:", dbErr);
      }
    }

    return NextResponse.json({ status: invoice.status });
  } catch (err) {
    console.error("GET /api/payment/cryptobot-status error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
