import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

const authMiddleware = withAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export default function proxy(req: NextRequest, evt: any) {
  return (authMiddleware as any)(req, evt);
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/crm/:path*"],
};
