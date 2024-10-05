import { getToken } from "next-auth/jwt";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fa"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl.clone();
  // Check if the user is authenticated
  const token = await getToken({ req: request });
  const isAuth = !!token;
  const isAuthPage =
    request.nextUrl.pathname.includes("/login") ||
    request.nextUrl.pathname.includes("/error") ||
    request.nextUrl.pathname.includes("/signup");

  if (!isAuth && !isAuthPage) {
    // Redirect unauthenticated users to the login page
    nextUrl.pathname = "/login";
    // const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(nextUrl);
  }

  if (isAuth && isAuthPage) {
    // Redirect authenticated users away from the login page
    nextUrl.pathname = "/";
    return NextResponse.redirect(nextUrl);
  }

  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
