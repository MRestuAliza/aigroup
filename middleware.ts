import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes yang tidak memerlukan authentication
const PUBLIC_ROUTES = ["/", "/landing", "/auth"];

// Routes yang memerlukan authentication
const PROTECTED_ROUTES = ["/dashboard", "/collections", "/profile", "/authenticated"];

// Callback untuk custom authorization
export default withAuth(
  function middleware(req: NextRequest & { nextauth: any }) {
    const { pathname } = req.nextUrl;
    const session = req.nextauth.token;

    // Jika user tidak authenticated
    if (!session) {
      // Jika mencoba akses protected route, redirect ke landing
      if (pathname.startsWith("/dashboard") || 
          pathname.startsWith("/collections") || 
          pathname.startsWith("/profile") ||
          pathname.startsWith("/authenticated")) {
        return NextResponse.redirect(new URL("/landing", req.url));
      }
      return NextResponse.next();
    }

    if (session) {
      if (pathname === "/landing" || pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
    pages: {
      signIn: "/landing",
      error: "/auth/error",
    },
  }
);

// Config untuk routes mana saja yang perlu di-check oleh middleware
export const config = {
  matcher: [
    // Protected routes
    "/dashboard/:path*",
    "/collections/:path*",
    "/profile/:path*",
    "/authenticated/:path*",
    // Public routes yang perlu redirect jika sudah login
    "/",
    "/landing",
  ],
};
