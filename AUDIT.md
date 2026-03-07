# Claw Academy Frontend Audit (Next.js)

Date: 2026-03-07  
Scope: Full manual audit of all files under `src/` (text files reviewed line-by-line; binary assets like fonts/favicon are not source code)

## Executive Summary
The project has multiple authentication and webhook security gaps that allow account/session forgery and bot endpoint abuse. The most severe issue is wallet login without cryptographic proof-of-ownership, combined with client-trusted `localStorage` auth state. Telegram webhook requests are also unauthenticated, and auth codes are weak with no rate limiting.

Top risks:
- **CRITICAL**: Wallet auth bypass (no signature verification, client-only trust)
- **CRITICAL**: Telegram webhook endpoint accepts unauthenticated requests
- **HIGH**: 4-digit auth code brute-force feasibility (no rate limit, low entropy)
- **HIGH**: No replay protection for webhook updates

## Summary Table

| ID | Severity | Category | Finding | Location |
|---|---|---|---|---|
| S1 | CRITICAL | Auth | WalletConnect login has no signature verification and no server session | `src/components/ConnectWalletButton.tsx:15-34`, `src/app/dashboard/page.tsx:29-36` |
| S2 | CRITICAL | Webhook Security | Telegram webhook authenticity is not verified (no secret token/signature check) | `src/app/api/bot/webhook/route.ts:19-54` |
| S3 | HIGH | Auth / Rate Limiting | OTP/auth code is 4 digits, generated with `Math.random`, no brute-force protection | `src/app/api/bot/webhook/route.ts:6-8`, `src/app/api/auth/verify-code/route.ts:9-24` |
| S4 | HIGH | Replay Attack | Webhook has no replay/idempotency checks (`update_id` dedupe absent) | `src/app/api/bot/webhook/route.ts:21-50` |
| S5 | HIGH | Auth Design | Dashboard authorization is based on mutable `localStorage` object (`tg_user`) | `src/app/dashboard/page.tsx:29-43` |
| S6 | HIGH | Abuse Prevention | No rate limiting on auth and webhook endpoints | `src/app/api/auth/telegram/route.ts:6-40`, `src/app/api/auth/verify-code/route.ts:6-67`, `src/app/api/bot/webhook/route.ts:19-54` |
| S7 | MEDIUM | Race Condition | Code consumption is not atomic; parallel requests can race before `used=true` update | `src/app/api/auth/verify-code/route.ts:16-35` |
| S8 | MEDIUM | Input Validation | API routes parse and trust unvalidated JSON structures | `src/app/api/auth/telegram/route.ts:7-17`, `src/app/api/bot/webhook/route.ts:21-28`, `src/app/api/auth/verify-code/route.ts:8-11` |
| S9 | MEDIUM | Error Handling | DB and Telegram API errors are mostly ignored; failures can create inconsistent state | `src/app/api/bot/webhook/route.ts:34-42`, `src/app/api/auth/verify-code/route.ts:34-50` |
| S10 | MEDIUM | XSS/Injection | Telegram message uses `parse_mode: HTML` with unescaped user first name | `src/app/api/bot/webhook/route.ts:15-16`, `src/app/api/bot/webhook/route.ts:46` |
| S11 | LOW | Cryptographic Hygiene | Telegram hash compare is not constant-time (`!==`) | `src/app/api/auth/telegram/route.ts:19-23` |
| S12 | LOW | Env/Secret Architecture | `supabaseAdmin` lives in shared module; currently safe, but future client import risk | `src/lib/supabase.ts:10-20` |
| S13 | LOW | Frontend Security Headers | No CSP and explicit hardening headers found in app code | entire `src/` (no `middleware.ts` / header policy setup) |
| S14 | MEDIUM | Performance | Global `Web3Provider` wraps entire app, hydrating wallet stack on non-web3 routes | `src/app/layout.tsx:44`, `src/components/Web3Provider.tsx:1-24` |

## Detailed Findings

### S1 — CRITICAL — Wallet auth bypass (no signature verification)
- **Where**:
  - `src/components/ConnectWalletButton.tsx:15-34`
  - `src/app/dashboard/page.tsx:29-43`
- **Problem**:
  - A user is considered authenticated immediately when wallet is connected client-side.
  - No nonce challenge, no signed message, no backend verification, no server-issued session.
  - `localStorage` is populated with arbitrary identity data and then trusted by dashboard.
- **Impact**:
  - Any attacker can forge `localStorage.tg_user` and access protected UI without proving wallet ownership.
  - Cannot enforce real authorization boundaries.
- **Fix**:
  - Implement SIWE-style flow: backend issues nonce -> wallet signs -> backend verifies signature and chain/address -> issue secure `httpOnly` session cookie.
  - Server-gate dashboard content by session, not client storage.

### S2 — CRITICAL — Telegram webhook authenticity missing
- **Where**: `src/app/api/bot/webhook/route.ts:19-54`
- **Problem**:
  - Endpoint accepts any POST payload as Telegram update.
  - No validation of Telegram webhook secret (`X-Telegram-Bot-Api-Secret-Token`) or equivalent authenticity control.
- **Impact**:
  - Anyone can trigger `/start` flow, create auth codes, and message arbitrary chats if `chatId` is supplied.
- **Fix**:
  - Configure webhook with secret token and verify request header on every call.
  - Reject missing/mismatched secret with 401.

### S3 — HIGH — Weak OTP/auth code and brute-force risk
- **Where**:
  - `src/app/api/bot/webhook/route.ts:6-8`
  - `src/app/api/auth/verify-code/route.ts:9-24`
- **Problem**:
  - Code is only 4 digits and generated with `Math.random()`.
  - No per-IP/user attempt throttling, no lockout, no backoff.
- **Impact**:
  - Practical online brute force within validity window, especially with distributed attempts.
- **Fix**:
  - Increase entropy (at least 6-8 digits or alphanumeric one-time token from CSPRNG).
  - Enforce per-IP and per-telegram_id rate limits + failed-attempt lockouts.
  - Consider single-use random token link instead of short numeric code.

### S4 — HIGH — Webhook replay attacks possible
- **Where**: `src/app/api/bot/webhook/route.ts:21-50`
- **Problem**:
  - No dedupe on Telegram `update_id`; identical update can be resent repeatedly.
- **Impact**:
  - Duplicate code issuance, spam, unnecessary DB writes, abuse amplification.
- **Fix**:
  - Store processed `update_id` with TTL and reject duplicates.
  - Optionally enforce idempotency on `(telegram_id, command, time-window)`.

### S5 — HIGH — Client-side mutable auth state
- **Where**: `src/app/dashboard/page.tsx:29-43`
- **Problem**:
  - Authorization is based purely on `localStorage.getItem("tg_user")`.
  - No JWT/cookie/session validation with backend.
- **Impact**:
  - Any script/user can set fake data and bypass frontend access control.
- **Fix**:
  - Move auth to server sessions (httpOnly, secure, sameSite cookie).
  - Protect dashboard route server-side and return user data from trusted backend source.

### S6 — HIGH — Missing rate limiting on sensitive endpoints
- **Where**:
  - `src/app/api/auth/telegram/route.ts:6-40`
  - `src/app/api/auth/verify-code/route.ts:6-67`
  - `src/app/api/bot/webhook/route.ts:19-54`
- **Problem**:
  - No request throttling for hash verification, code verification, and webhook ingestion.
- **Impact**:
  - Enables brute-force, credential-stuffing style attempts, and resource abuse.
- **Fix**:
  - Add IP+route rate limit middleware (Redis/Upstash recommended) with strict limits on auth routes.
  - Add per-identity limits (telegram_id, code attempts).

### S7 — MEDIUM — Non-atomic code consumption race
- **Where**: `src/app/api/auth/verify-code/route.ts:16-35`
- **Problem**:
  - Read valid unused code, then separate update to `used=true`; parallel requests can both pass select phase.
- **Impact**:
  - Potential multi-use of one-time code under concurrent requests.
- **Fix**:
  - Use single atomic DB operation/RPC: `UPDATE ... WHERE id=? AND used=false AND expires_at>now() RETURNING *`.
  - Enforce unique constraints and transaction boundaries.

### S8 — MEDIUM — Incomplete input validation/sanitization
- **Where**:
  - `src/app/api/auth/telegram/route.ts:7-17`
  - `src/app/api/auth/verify-code/route.ts:8-11`
  - `src/app/api/bot/webhook/route.ts:21-28`
- **Problem**:
  - Raw `req.json()` data is trusted with minimal structural checks.
- **Impact**:
  - Unexpected types/fields can trigger logic errors and edge-case bypasses.
- **Fix**:
  - Validate payloads with schema library (`zod`/`valibot`), strict types, and reject unknown/invalid fields.

### S9 — MEDIUM — Weak operational error handling
- **Where**:
  - `src/app/api/bot/webhook/route.ts:34-42`
  - `src/app/api/auth/verify-code/route.ts:34-50`
- **Problem**:
  - Insert/update/upsert errors are not checked consistently.
  - Webhook always returns `{ok:true}` even on internal failure.
- **Impact**:
  - Silent data inconsistency and difficult incident diagnosis.
- **Fix**:
  - Check and log structured errors for each DB/API call.
  - Return meaningful status codes where appropriate; avoid masking all failures as success.

### S10 — MEDIUM — HTML injection surface in bot message formatting
- **Where**: `src/app/api/bot/webhook/route.ts:15-16`, `src/app/api/bot/webhook/route.ts:46`
- **Problem**:
  - `parse_mode: "HTML"` with interpolated `from.first_name` without escaping.
- **Impact**:
  - User-controlled Telegram fields can break markup or inject clickable content in bot messages.
- **Fix**:
  - Escape HTML entities for any user-controlled value or disable HTML parse mode.

### S11 — LOW — Non-constant-time hash comparison
- **Where**: `src/app/api/auth/telegram/route.ts:19-23`
- **Problem**:
  - Uses direct string comparison `hmac !== hash`.
- **Impact**:
  - Minor timing side-channel risk.
- **Fix**:
  - Use `crypto.timingSafeEqual(Buffer.from(hmac, "hex"), Buffer.from(hash, "hex"))` after length/format checks.

### S12 — LOW — Supabase service-role architecture risk (no direct leak observed)
- **Where**: `src/lib/supabase.ts:10-20`
- **Problem**:
  - Service-role client helper is colocated with browser helper in importable module.
- **Impact**:
  - No direct exposure now, but accidental client import risk grows over time.
- **Fix**:
  - Move admin client to server-only module (`src/lib/server/supabaseAdmin.ts`) and add `import "server-only"`.

### S13 — LOW — Missing explicit CSP/security headers
- **Where**: app-wide (`src/` has no CSP/header enforcement code)
- **Problem**:
  - No explicit `Content-Security-Policy`, `X-Frame-Options`, etc.
- **Impact**:
  - Reduced mitigation depth for XSS/clickjacking and third-party script risk.
- **Fix**:
  - Add security headers in `next.config`/middleware/platform config.
  - Start with restrictive CSP, then allow required Telegram/WalletConnect domains explicitly.

### S14 — MEDIUM — Performance: unnecessary global client provider scope
- **Where**:
  - `src/app/layout.tsx:44`
  - `src/components/Web3Provider.tsx:1-24`
- **Problem**:
  - Wallet/Web3 providers wrap the full app, including pages that do not require wallet features.
- **Impact**:
  - Increased client JS/hydration cost on all routes.
- **Fix**:
  - Scope Web3 provider to login/wallet-required route segment only.
  - Keep non-interactive marketing pages as server-only where possible.

## Requested Check Matrix
- API auth/HMAC correctness: Telegram login hash flow is broadly correct; hardening still required.
- Rate limiting: Missing.
- Input sanitization: Insufficient schema validation.
- Supabase service key exposure: No direct exposure detected in current `src/`; architectural hardening recommended.
- TG HMAC algorithm: Correct pattern, but improve compare/validation.
- WalletConnect signature verification: Missing (critical).
- Env vars client exposure: Only `NEXT_PUBLIC_*` values are exposed; no direct service key leak found.
- Bot webhook replay attacks: Protection missing.
- Frontend XSS/localStorage/CORS/CSP:
  - XSS: No `dangerouslySetInnerHTML`, but Telegram HTML parse-mode interpolation is a concern.
  - localStorage: Used unsafely as auth truth.
  - CORS: Not the primary issue; webhook authenticity is.
  - CSP: Not explicitly configured.

## Prioritized Action List
1. Implement server-side session auth now: SIWE nonce/signature verification + Telegram session issuance in secure `httpOnly` cookies; remove auth trust from `localStorage`.
2. Authenticate Telegram webhook with secret token and add replay/idempotency protection based on `update_id`.
3. Replace 4-digit `Math.random` code with high-entropy CSPRNG token and add strict rate limiting + lockouts to `/api/auth/verify-code`.
4. Make code redemption atomic in the database (single conditional update returning row).
5. Add centralized schema validation for all API request bodies.
6. Add CSP and security headers with required Telegram/WalletConnect allowlists.
7. Move Supabase admin client to `server-only` module to prevent accidental client import.
8. Scope Web3 providers to wallet-required route segments to reduce global hydration cost.
