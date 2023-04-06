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
  // if user.type === "new", redirect
  else if (token.type === "new" && pathName !== "/new-user") {
    return NextResponse.redirect(new URL("/new-user", req.url))
  }
  // // but otherwise, don't let them visit the new user page
  else if (token.type !== "new" && pathName === "/new-user")  {
    return NextResponse.redirect(new URL("/", req.url))
  }
  // only let participants see their entries
  else if (token.type !== "participant" && pathName === "/entries") {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next();
}

export const config = {
  // matcher: ['/rodeos/:path*', '/account', '/participants', '/api/rodeos/:path*', '/api/auth/account']
  // matcher: ['/rodeos/:path*', '/account', '/participants', '/api/rodeos/:path*', '/entries', '/new-user']
  matcher: ['/rodeos/:path*', '/account', '/participants', '/entries', '/new-user'] // removing api/rodeos for now to get around seed session issue
}
