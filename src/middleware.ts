import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname
  const token = await getToken({ req })

  // console.log('middleware',req)

  // if user not authenticated, redirect to login page with callbackUrl
  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathName);
    return NextResponse.redirect(url);
  } 
  // if user.type === "new", redirect to /account
  else if (token.type === "new" && pathName !== "/account") {
    return NextResponse.redirect(new URL("/account", req.url))
  }
  return NextResponse.next();
}

export const config = {
  // matcher: ['/rodeos/:path*', '/account', '/participants', '/api/rodeos/:path*', '/api/auth/account']
  matcher: ['/rodeos/:path*', '/account', '/participants', '/api/rodeos/:path*']
}
