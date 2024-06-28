"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin({ email, password }) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/login', {
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

            return { success: true, role: json.role, userId: json.userId };
        } else {
            const errorData = await res.json();
            console.error('Error:', errorData.error);
            return { success: false, error: errorData.error };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: "An internal client-side error occurred" };
    }
}
export async function handleLogout() {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
            return { success: true };
        } else {
            console.error('Logout failed');
            return { success: false };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false };
    }
}