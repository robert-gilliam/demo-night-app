import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Skip auth check if admin/[eventId]/submissions
    if (req.nextUrl.pathname.endsWith("/submissions")) {
      return NextResponse.next();
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/api/auth/signin",
    },
  },
);

export const config = {
  matcher: ["/admin/:path*"],
};
