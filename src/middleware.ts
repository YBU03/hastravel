import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/hastrans/admin/login") return NextResponse.next();
  if (await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.next();
  return NextResponse.redirect(new URL("/hastrans/admin/login", req.url));
}

export const config = { matcher: ["/hastrans/admin", "/hastrans/admin/:path*"] };
