import "server-only";

const CACHE_TTL_MS = 60_000;
const priceCache = new Map<string, { price: number; ts: number }>();

const COIN_ID_MAP: Record<"BNB" | "ETH" | "MATIC", string> = {
  BNB: "binancecoin",
  ETH: "ethereum",
  MATIC: "matic-network",
};

const HARDCODED_FALLBACK: Record<"BNB" | "ETH" | "MATIC", number> = {
  BNB: 600,
  ETH: 3000,
  MATIC: 1,
};

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function getNativeTokenPrice(
  symbol: "BNB" | "ETH" | "MATIC"
): Promise<number> {
  const cached = priceCache.get(symbol);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.price;
  }

  try {
    const res = await fetchWithTimeout(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`,
      3000
    );
    if (res.ok) {
      const data = (await res.json()) as { price?: string };
      const price = Number.parseFloat(data.price ?? "");
      if (Number.isFinite(price) && price > 0) {
        priceCache.set(symbol, { price, ts: Date.now() });
        return price;
      }
    }
  } catch {
    // fall through to next source
  }

  const coinId = COIN_ID_MAP[symbol];
  try {
    const res = await fetchWithTimeout(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
      5000
    );
    if (res.ok) {
      const data = (await res.json()) as Record<string, { usd?: number }>;
      const price = data[coinId]?.usd;
      if (typeof price === "number" && Number.isFinite(price) && price > 0) {
        priceCache.set(symbol, { price, ts: Date.now() });
        return price;
      }
    }
  } catch {
    // fall through to hardcoded fallback
  }

  const fallbackPrice = HARDCODED_FALLBACK[symbol];
  priceCache.set(symbol, { price: fallbackPrice, ts: Date.now() });
  return fallbackPrice;
}

export { getNativeTokenPrice };
