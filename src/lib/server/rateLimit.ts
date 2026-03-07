import "server-only";
import { supabaseAdmin } from "./supabaseAdmin";

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
