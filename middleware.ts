import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// The middleware is used to refresh the user's session before loading Server Component routes
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}

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
  matcher: ["/dashboard/:path*"],
};