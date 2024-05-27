import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { NextRequest } from 'next/server';

export async function middleware(request) {
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

// Apply middleware to specific paths
export const config = {
  matcher: ['/admin/:path*'],
};
