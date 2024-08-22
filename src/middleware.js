// middleware.js
import { jwtMiddleware } from './jwtMiddleware'; 
import { intlMiddleware } from './intlMiddleware'; 
import { NextResponse } from 'next/server';

export default async function combinedMiddleware(request) {
  const url = new URL(request.url);

  // Apply internationalization middleware only to the landing page
  if (url.pathname === '/' || url.pathname.startsWith('/fr') || url.pathname.startsWith('/en')) {
    return intlMiddleware(request);
  }

  // Apply JWT authentication middleware to admin and user paths
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/user')) {
    return jwtMiddleware(request);
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
