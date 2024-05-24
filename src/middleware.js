import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import * as jose from "jose"
import prisma from "@/app/lib/prisma";
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    //check for kooke 
    const cookie = cookies().get('Authorization')
    if(!cookie){
        return NextResponse.redirect(new URL("/login",request.url));
    }
     //validate it 
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const jwt =cookie.value;  
    try{
        const {payload}  = await jose.jwtVerify(jwt, secret, {})
        console.log("payload",payload);
        console.log("id",payload.sub) ;
    }catch(e){
        return NextResponse.redirect(new URL("/login",request.url));
    }   
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/admin/:path*',
}