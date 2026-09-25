import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Must match SESSION_COOKIE_NAME in lib/auth.ts and the cookie set by
 * app/api/auth/login/route.ts.
 */
const SESSION_COOKIE_NAME = 'jcf_admin_session';

/**
 * Edge-compatible admin session check.
 *
 * Intentionally does NOT import lib/auth.ts (that module uses next/headers
 * cookies() which is for Server Components / Route Handlers, not Edge middleware).
 * Verification uses the same cookie name, HS256 algorithm, and JWT_SECRET
 * as the existing login flow.
 */
async function hasValidAdminSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return false;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim().length < 16) {
    // No default secret — misconfiguration means unauthenticated.
    return false;
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    // Expired, tampered, or otherwise invalid token.
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Matcher already limits to /dashboard, but keep an explicit guard.
  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  const isAuthenticated = await hasValidAdminSession(request);

  if (!isAuthenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Run only for dashboard routes. Public pages and /api/* are excluded.
 */
export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};