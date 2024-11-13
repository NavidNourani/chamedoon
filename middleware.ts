import { getToken } from "next-auth/jwt";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fa"],
  defaultLocale: "fa",
});

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl.clone();
  // Check if the user is authenticated
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  if (
    !request.nextUrl.pathname.startsWith("/fa") &&
    !request.nextUrl.pathname.startsWith("/en")
  ) {
    nextUrl.pathname = `/fa${request.nextUrl.pathname}`;
    return NextResponse.redirect(nextUrl);
  }

  const protectedRoutes = request.nextUrl.pathname.includes("/app");
  if (!isAuthenticated && protectedRoutes) {
    // Redirect unauthenticated users to the login page
    nextUrl.pathname = "/";

    return NextResponse.redirect(nextUrl);
  }

  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
