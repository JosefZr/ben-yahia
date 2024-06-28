"use server";
import prisma from '@/app/lib/prisma';

export async function addRating(data) {
    if (!prisma) {
        throw new Error("Prisma client is not initialized");
    }

    console.log("Received data:", data);

    if (!data || !data.name || !data.email || !data.description || data.rating === undefined) {
        console.error("Missing required data fields:", data);
        throw new Error("Missing required data fields");
    }

    const { rating, name, email, description } = data;

    try {
        const newRating = await prisma.rating.create({
            data: {
                name:name,
                email:email,
                comment:description,
                rating,
            },
        });
        console.log("New rating created:", newRating);
        return newRating;
    } catch (error) {
        console.error("Error creating rating:", error);
        throw error;
    }
}
export default async function getTotalRatings(){
    try{
        const ratings = await prisma.rating.findMany();
        console.log("back :" ,ratings)
        return ratings;
    }catch(err){
        console.log("Error:", err);
        throw new Error("Failed to fetch ratings");
    }
}