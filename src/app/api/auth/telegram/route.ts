import { createHmac, createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Verify Telegram hash (Login Widget uses SHA256 of bot token as secret)
  const { hash, ...userData } = data;
  const botToken = process.env.TELEGRAM_BOT_TOKEN!;
  const secret = createHash("sha256").update(botToken).digest();

  const checkString = Object.keys(userData)
    .sort()
    .map((k) => `${k}=${userData[k]}`)
    .join("\n");

  const hmac = createHmac("sha256", secret).update(checkString).digest("hex");

  if (hmac !== hash) {
    return NextResponse.json({ error: "Invalid hash" }, { status: 401 });
  }

  // Check data is not older than 1 hour
  const authDate = parseInt(userData.auth_date);
  if (Date.now() / 1000 - authDate > 3600) {
    return NextResponse.json({ error: "Auth data expired" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      photo_url: userData.photo_url,
    },
  });
}
