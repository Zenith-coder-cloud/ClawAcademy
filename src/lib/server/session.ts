import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

const rawSecret = process.env.SESSION_SECRET
if (!rawSecret && process.env.NODE_ENV === 'production') {
  throw new Error('SESSION_SECRET environment variable is required in production')
}
const SESSION_SECRET = new TextEncoder().encode(rawSecret ?? 'fallback-dev-secret-32-chars-min-xx')
const SESSION_COOKIE = 'ca_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export type SessionPayload = {
  userId?: string
  telegramId?: number
  walletAddress?: string
  tier: string
}

export async function createSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SESSION_SECRET)
}

export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SESSION_SECRET)
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export { SESSION_COOKIE, MAX_AGE }
