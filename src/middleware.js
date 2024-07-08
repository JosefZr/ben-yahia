import { NextResponse } from 'next/server';
import * as jose from 'jose';
import createMiddleware from 'next-intl/middleware';

// Middleware for handling JWT authentication and user role extraction
async function middleware1(request) {
  // Check for the Authorization cookie
  const cookie = request.cookies.get('Authorization');
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Validate the JWT
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret);
    console.log('payload', payload);
    console.log('id', payload.sub);

    // Inject user ID and role in the request by adding headers
    const response = NextResponse.next();
    response.headers.set('X-User-Id', payload.sub);
    response.headers.set('X-User-Role', payload.role);

    return response;
  } catch (e) {
    console.error('JWT verification failed:', e);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Internationalization middleware from next-intl
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr'],
  // Used when no locale matches
  defaultLocale: 'en',
});

// Combined middleware function
export default async function combinedMiddleware(request) {
  const url = new URL(request.url);

  // Apply internationalization middleware only to the landing page
  if (url.pathname === '/' || url.pathname.startsWith('/fr') || url.pathname.startsWith('/en')) {
    return intlMiddleware(request);
  }

  // Apply JWT authentication middleware to admin and user paths
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/user')) {
    return middleware1(request);
  }

  return NextResponse.next();
}

// Configuration for the middleware
export const config = {
  matcher: [
    '/', 
    '/:locale(fr|en)', 
    '/admin/:path*', 
    '/user/:path*'
  ],
};
