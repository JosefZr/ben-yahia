"use server"
import { cookies } from "next/headers";
export async function handleLogin(email, password) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_URL+'/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            const json = await res.json();

            // Set the JWT token as a cookie
            cookies().set('Authorization', json.token, {
                secure: true,
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3),
                path: '/',
                sameSite: 'strict'
            });

            // Log the token value for debugging
            console.log('JWT token:', json.token);

            return { success: true , role : json.role, userId:json.userId };
        } else {
            const errorData = await res.json();
            console.error('Error:', errorData.error);
            // Handle login error
            return { success: false, error: errorData.error };
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle client-side error
        return { success: false, error: "An internal client-side error occurred" };
    }
}

export async function getUserIdFromToken() {
    try {
        const token = cookies().get('Authorization');
        if (!token) {
            throw new Error('No token found');
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.sub; // Assuming the user ID is stored in the 'sub' field

        return userId;
    } catch (error) {
        console.error('Error getting user ID from token:', error);
        throw new Error('Invalid or expired token');
    }
}