import { NextRequest, NextResponse } from "next/server";

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
      headers: {
        "Crypto-Pay-API-Token": apiToken,
      },
    });

    const data = await res.json();
    if (!data.ok || !data.result?.items?.length) {
      return NextResponse.json({ status: "unknown" });
    }

    const invoice = data.result.items[0];
    return NextResponse.json({ status: invoice.status });
  } catch (err) {
    console.error("GET /api/payment/cryptobot-status error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
