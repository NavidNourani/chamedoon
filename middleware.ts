import { getToken } from "next-auth/jwt";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fa"],
  defaultLocale: "fa",
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const nextUrl = request.nextUrl.clone();
  // Check if the user is authenticated
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  const isAuthPageOrIntro =
    request.nextUrl.pathname.includes("/login") ||
    request.nextUrl.pathname.includes("/error") ||
    request.nextUrl.pathname.includes("/signup") ||
    request.nextUrl.pathname.includes("/intro");

  if (!isAuthenticated && !isAuthPageOrIntro) {
    // Redirect unauthenticated users to the login page
    nextUrl.pathname = "/intro";
    // const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(nextUrl);
  }

  if (isAuthenticated && isAuthPageOrIntro) {
    // Redirect authenticated users away from the login page
    nextUrl.pathname = "/";
    return NextResponse.redirect(nextUrl);
  }

  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
