"use server"
import prisma from "@/app/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createReservation(time , userData) {
    // check if id exist 
    if (!prisma) {
        throw new Error("Prisma not initialized");
    }
    const id = userData.id ; 

    try {
        const reservation = await prisma.appointment.create({
            data: {
                date:time,
                userId:id
            }
        });
        if (reservation) {
            return { success: true };
        }
    } catch (error) {
        // Check for specific errors and throw custom error messages
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "200") {
                throw new Error("error in reservation.");
            } else {
                throw new Error("An unexpected error occurred during reservation.");
            }
        } else {
            throw error;
        }
    } finally {
        // Close the connection to the database
        await prisma.$disconnect()
    }
}
