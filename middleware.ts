/**
 * NextAuth Middleware
 * Location: middleware.ts (root)
 * Protects routes and manages authentication state
 */

import { auth } from "@/auth"

// Public pages that don't require authentication
const PUBLIC_PAGES = [
  '/',
  '/signin',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/otp',
  '/github/callback',
  '/linkedin/callback',
];

// Protected pages that require authentication
const PROTECTED_PAGES = [
  '/dashboard',
  '/setup-org',
  '/basic-details',
  '/org-preference',
  '/finish-setup',
];

export default auth((req) => {
  const isAuthenticated = !!req.auth?.user
  const pathname = req.nextUrl.pathname

  // Allow API routes
  if (pathname.startsWith('/api/auth') || pathname.startsWith('/api')) {
    return
  }

  // Allow static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp)$/)
  ) {
    return
  }

  // If authenticated, redirect away from auth pages
  if (isAuthenticated) {
    if (pathname === '/signin' || pathname === '/signup') {
      return Response.redirect(new URL('/dashboard', req.nextUrl))
    }
    return
  }

  // If NOT authenticated
  if (!isAuthenticated) {
    const isProtectedPage = PROTECTED_PAGES.some(page => pathname.startsWith(page))
    const isPublicPage = PUBLIC_PAGES.includes(pathname)

    // Redirect to signin if accessing protected page
    if (isProtectedPage || (!isPublicPage && pathname !== '/')) {
      let from = pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return Response.redirect(
        new URL(`/signin?from=${encodeURIComponent(from)}`, req.nextUrl)
      );
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}