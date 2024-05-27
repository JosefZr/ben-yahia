import prisma from "@/app/lib/prisma";
import * as jose from "jose";

export async function POST(request) {
  const { email, password } = await request.json();

  // Validate data
  if (!email || !password) {
    return new Response("Missing email or password", { status: 400 });
  }

  // Look for user in the database
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  // If the user is not found or the password is incorrect, return an error
  if (user.password !== password) {
    return new Response(
      JSON.stringify({ error: "Invalid email or password" }),
      { status: 401 }
    );
  }

  // Create a JWT token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new jose.SignJWT({ id: user.id, role: user.role })
    .setProtectedHeader({ alg })
    .setExpirationTime("72h")
    .setSubject(user.id.toString())
    .sign(secret);

  // If the user is found and the password is correct, return success response
  return new Response(JSON.stringify({ token: jwt, role: user.role }), {
    status: 200,
  });
}