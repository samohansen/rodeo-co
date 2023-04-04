import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  if (!token) {
    const pathname = req.nextUrl.pathname;
    const url = new URL(`/login`, req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  // todo: if user.type === "new", redirect to /account
  return NextResponse.next();
}

export const config = {
  matcher: ['/rodeos/:path*', '/account', '/participants']
}
