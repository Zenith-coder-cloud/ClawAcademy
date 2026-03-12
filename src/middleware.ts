import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "ca_session";

function getSecret(): Uint8Array {
  const s = process.env.SESSION_SECRET ?? "fallback-dev-secret-32-chars-min-xx";
  return new TextEncoder().encode(s);
}

async function getTier(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return (payload as { tier?: string }).tier ?? "free";
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Redirect bare domain to www
  const host = request.headers.get("host") || "";
  if (host === "clawacademy.io") {
    const url = request.nextUrl.clone();
    url.host = "www.clawacademy.io";
    return NextResponse.redirect(url, { status: 301 });
  }

  // 2) Protect course block routes
  const blockMatch = pathname.match(/^\/dashboard\/course\/block\/(\d+)/);
  if (blockMatch) {
    const blockNum = parseInt(blockMatch[1], 10);

    // Block 0 is free
    if (blockNum === 0) return NextResponse.next();

    const tier = await getTier(request);

    // Not logged in → redirect to login
    if (!tier) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Block 1-2: requires any paid tier (genesis/pro/elite)
    if (blockNum <= 2) {
      if (tier === "free") {
        const dashUrl = request.nextUrl.clone();
        dashUrl.pathname = "/dashboard";
        dashUrl.searchParams.set("upgrade", "1");
        return NextResponse.redirect(dashUrl);
      }
      return NextResponse.next();
    }

    // Block 3+: requires pro or elite
    if (tier !== "pro" && tier !== "elite") {
      const dashUrl = request.nextUrl.clone();
      dashUrl.pathname = "/dashboard";
      dashUrl.searchParams.set("upgrade", "1");
      return NextResponse.redirect(dashUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
