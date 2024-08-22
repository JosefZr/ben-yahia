// middlewares/jwtMiddleware.js
import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function jwtMiddleware(request) {
  const cookie = request.cookies.get('Authorization');
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret);
    console.log('payload', payload);
    console.log('id', payload.sub);

    const response = NextResponse.next();
    response.headers.set('X-User-Id', payload.sub);
    response.headers.set('X-User-Role', payload.role);

    return response;
  } catch (e) {
    console.error('JWT verification failed:', e);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
