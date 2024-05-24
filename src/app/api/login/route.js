
import prisma from "@/app/lib/prisma";
import * as jose from "jose"
import { localStorage } from 'node-fetch';
export async function POST(request) {
        const { email, password } = await request.json();
        // Validate data
        if (!email || !password) {
            return new Response("Missing email or password", { status: 400 });
        }

        // Look for user in the database
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
        }

        console.log(user.role)
        console.log(user.id);
        // If the user is not found or the password is incorrect, return an error
        if (user.password !== password) {
            return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
        }        
        //create a jwt token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET,
            )
            const alg = 'HS256'
            
            const jwt = await new jose.SignJWT({})
                .setProtectedHeader({ alg })
                .setExpirationTime('72h')
                .setSubject(user.id)
                .setAudience(user.role)
                .sign(secret)
            
        // If the user is found and the password is correct, return success response
        // return new Response(JSON.stringify({ message: "Login successful", user }), { status: 200 });
        return Response.json({token:jwt , role : user.role})
}