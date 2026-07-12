import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "hl_admin_pw";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (!isAdminApi && !isAdminPage) return NextResponse.next();

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const valid =
    !!cookie && !!process.env.ADMIN_PASSWORD && cookie === process.env.ADMIN_PASSWORD;

  if (valid) return NextResponse.next();

  if (isAdminApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
