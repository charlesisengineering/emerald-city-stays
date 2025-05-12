import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// This middleware will handle authentication using NextAuth
export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify which routes should be protected by the middleware
export const config = {
  matcher: ["/dashboard/:path*", "/manuals/:path*"],
};