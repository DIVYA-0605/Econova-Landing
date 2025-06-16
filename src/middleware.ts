import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en-US', 'es-ES'];
const defaultLocale = 'en-US';

// Add static file extensions that should bypass locale routing
const staticFileExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if it's a static file
  const isStaticFile = staticFileExtensions.some(ext => pathname.endsWith(ext));
  if (isStaticFile) {
    return NextResponse.next();
  }
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|favicon.ico|.*\\.).*)',
  ],
}