"use server"
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


// Define the GET function to handle the GET request
export async function GET() {
    try {
        // Fetch data from the database
        const data = await prisma.user.findMany();

        // Return the fetched data as a JSON response
        return NextResponse.json(data);
    } catch (error) {
        // Log the error
        console.log("Error fetching posts:", error);
        
        // Return an error response with status code 500 (Internal Server Error)
        return NextResponse.error("Internal Server Error", 500);
    }
}
