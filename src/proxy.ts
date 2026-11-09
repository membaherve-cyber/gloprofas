import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "fr"];

/**
 * English is the primary language of the site.
 * Unprefixed URLs always resolve to /en. French is reached explicitly
 * via /fr or the in-page language switcher — never inferred from
 * the browser's Accept-Language header.
 */
function detectLocale(_request: NextRequest): string {
  return "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/video") ||
    pathname === "/icon.svg" ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (firstSegment && locales.includes(firstSegment)) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images|video|icon.svg|robots.txt|sitemap.xml).*)"],
};
