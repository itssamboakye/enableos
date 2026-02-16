import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // CRITICAL: Skip middleware for NextAuth API routes
  // NextAuth handles its own authentication flow including OAuth callbacks
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Get session token - use explicit cookie name to match NextAuth config
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token" // Match the name in our config
  });

  // Protect admin routes (authentication check only - admin role check happens in page)
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
    // Admin role check is done in the page component using requireAdmin()
  }

  // Protect authenticated routes
  if (
    pathname.startsWith("/discovery-practice") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/sessions") ||
    pathname.startsWith("/profile")
  ) {
    if (!token) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Protect API routes that require authentication
  if (
    pathname.startsWith("/api/sessions") ||
    pathname.startsWith("/api/user") ||
    pathname.startsWith("/api/progress")
  ) {
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  // Protect admin API routes (authentication check only - admin role check happens in route)
  if (pathname.startsWith("/api/admin")) {
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    // Admin role check is done in the API route using requireAdmin()
  }

  // Allow public access to auth routes and home
  if (pathname.startsWith("/auth") || pathname === "/") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/discovery-practice/:path*",
    "/dashboard/:path*",
    "/sessions/:path*",
    "/profile/:path*",
    "/api/admin/:path*",
    "/api/sessions/:path*",
    "/api/user/:path*",
    "/api/progress/:path*",
    "/auth/:path*",
  ],
};
