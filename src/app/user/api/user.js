import { NextResponse } from "next/server";
import * as jose from "jose";

export async function GET(request) {
  const cookie = request.cookies.get("Authorization");

  if (!cookie) {
    return new NextResponse(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret);
    return new NextResponse(JSON.stringify({ id: payload.sub, role: payload.role }), {
      status: 200,
    });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return new NextResponse(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }
}
