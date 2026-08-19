import { NextResponse, type NextRequest } from "next/server";

const PREVIEW_COOKIE = "__prerender_bypass";

export function proxy(request: NextRequest) {
  if (!request.cookies.has(PREVIEW_COOKIE)) {
    return NextResponse.next();
  }
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
