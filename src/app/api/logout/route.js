"use server"
// pages/api/logout.js
import { cookies } from "next/headers";

export async function POST() {
    // const json = await res.json();

  // Clear the JWT token cookie
  cookies().set('Authorization', "",{
    secure: true,
    httpOnly: true,
    expires: new Date(0), // Set the cookie expiration date to a past date to delete it
    path: '/',
    sameSite: 'strict'
  });
//   cookies().delete('Authorization')

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}