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

  // Debug logging
  const cookieHeader = request.headers.get("cookie");
  console.log("[MIDDLEWARE] Pathname:", pathname, "Has cookies:", !!cookieHeader);

  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  console.log("[MIDDLEWARE] Token found:", !!token);

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

  // Allow public access to auth routes and home
  if (pathname.startsWith("/auth") || pathname === "/") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/discovery-practice/:path*",
    "/dashboard/:path*",
    "/sessions/:path*",
    "/profile/:path*",
    "/api/sessions/:path*",
    "/api/user/:path*",
    "/api/progress/:path*",
    "/auth/:path*",
  ],
};
