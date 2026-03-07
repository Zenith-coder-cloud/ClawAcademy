import "server-only";
import { NextRequest } from "next/server";
import { supabaseAdmin } from "./supabaseAdmin";

/**
 * Extract client IP in a spoof-resistant way.
 * 1. req.ip (platform-provided, not spoofable on Vercel)
 * 2. x-forwarded-for LAST entry (rightmost is set by the trusted proxy)
 * 3. x-real-ip
 * 4. 'unknown'
 */
export function getClientIp(req: NextRequest): string {
  if (req.ip) return req.ip;

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map((s) => s.trim());
    return ips[ips.length - 1] ?? "unknown";
  }

  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Check IP-based rate limit using Supabase `rate_limits` table.
 * Returns true if request is allowed, false if rate limit exceeded.
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMinutes: number
): Promise<boolean> {
  const db = supabaseAdmin();
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMinutes * 60 * 1000);

  // Try to get existing rate limit entry
  const { data: existing } = await db
    .from("rate_limits")
    .select("*")
    .eq("key", key)
    .single();

  if (!existing) {
    // First request — create entry
    await db.from("rate_limits").insert({
      key,
      requests: 1,
      window_start: now.toISOString(),
    });
    return true;
  }

  const entryWindowStart = new Date(existing.window_start);

  if (entryWindowStart < windowStart) {
    // Window expired — reset
    await db
      .from("rate_limits")
      .update({ requests: 1, window_start: now.toISOString() })
      .eq("key", key);
    return true;
  }

  if (existing.requests >= maxRequests) {
    return false;
  }

  // Increment
  await db
    .from("rate_limits")
    .update({ requests: existing.requests + 1 })
    .eq("key", key);
  return true;
}
