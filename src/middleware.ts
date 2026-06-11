import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Lightweight gate for the dashboard. If the session cookie is missing,
// redirect to the login page before the route even renders. Full signature
// verification happens in the server components and API routes (Node runtime).
const SESSION_COOKIE = "abdishukri_admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and the auth endpoints through.
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
