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

  // Check if current page is public or protected
  const isPublicPage = PUBLIC_PAGES.includes(pathname) || 
                       PUBLIC_PAGES.some(page => pathname.startsWith(page))
  const isProtectedPage = PROTECTED_PAGES.some(page => pathname.startsWith(page))

  // If authenticated user tries to access auth pages, redirect to dashboard
  if (isAuthenticated && isPublicPage && pathname !== '/') {
    return Response.redirect(new URL('/dashboard', req.nextUrl))
  }

  // If unauthenticated user tries to access protected pages, redirect to signin
  if (!isAuthenticated && isProtectedPage) {
    const from = pathname + (req.nextUrl.search || '');
    return Response.redirect(
      new URL(`/signin?from=${encodeURIComponent(from)}`, req.nextUrl)
    )
  }

  // Allow all other requests
  return
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}