import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Simple middleware: redirect unauthenticated users away from /dashboard.
 * Checks for the next-auth session token cookie (JWT strategy).
 */
export function middleware(request: NextRequest) {
  const hasSessionToken = request.cookies.has("authjs.session-token") ||
    request.cookies.has("__Secure-authjs.session-token") ||
    request.cookies.has("next-auth.session-token") ||
    request.cookies.has("__Secure-next-auth.session-token");

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardRoute && !hasSessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
