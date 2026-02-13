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
  
  // Log cookie names for debugging
  if (cookieHeader) {
    const cookieNames = cookieHeader.split(";").map(c => c.split("=")[0].trim());
    const authCookies = cookieNames.filter(c => c.includes("auth") || c.includes("session"));
    console.log("[MIDDLEWARE] Cookie names found:", authCookies);
    
    // Log full cookie values (first 50 chars) for debugging
    if (authCookies.length > 0) {
      const cookieValues = cookieHeader.split(";").filter(c => {
        const name = c.split("=")[0].trim();
        return authCookies.includes(name);
      });
      console.log("[MIDDLEWARE] Auth cookie values (first 50 chars):", cookieValues.map(c => c.substring(0, 50)));
    }
  }

  // Try to get token with explicit cookie name matching our config
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token" // Match the name in our config
  });
  
  console.log("[MIDDLEWARE] Token found:", !!token, "Token email:", token?.email || "none");

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
