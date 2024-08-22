"use server";
import prisma from "@/app/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
export async function createReservation({ date, time, userId,note,additionalNote,painLevel }) {
        if(!userId){
            throw new Error("userId is required")
        }
        if(!time){
            time=""
        }
        const userIdInt = parseInt(userId, 10);

        if (!prisma) {
        throw new Error("Prisma not initialized");
        }
    
        try {
        // Combine date and time into a single ISO 8601 string
        const dateTimeString = `${date}`; // Adjust this if the timezone offset is required
        const dateTime = new Date(dateTimeString);
    
        // Ensure the date object is valid
        if (isNaN(dateTime)) {
            throw new Error("Invalid date format");
        }
    
        const reservation = await prisma.appointment.create({
            data: {
            date: dateTime,
            time: time,
            userId: userIdInt,
            note:note,
            additinalNote:additionalNote,
            painLevel:painLevel
            }
        });
    
        if (reservation) {
            return { success: true };
        } else {
            throw new Error("Failed to create reservation");
        }
        } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "200") {
            throw new Error("Error in reservation.");
            } else {
            throw new Error("An unexpected error occurred during reservation.");
            }
        } else {
            throw error;
        }
        } finally {
        await prisma.$disconnect();
        }
    }
export async function getAppointments({ userId }) {
    const userIdAppointment = parseInt(userId, 10);

    if (isNaN(userIdAppointment)) {
        throw new Error("Invalid userId");
    }

    try {
        const appointments = await prisma.appointment.findMany({
            where: { userId: userIdAppointment },
        });
        console.log("Fetched appointments:", appointments);
        return appointments;
    } catch (err) {
        console.log("Error:", err);
        throw new Error("An error occurred while fetching appointments.");
    }
}
export async function getAppointmentsByDate(date) {
    try {
        const formattedDate = new Date(date);
        console.log("Querying appointments for date:", date);

        const appointments = await prisma.appointment.findMany({
            where: {
                date: {
                    equals: formattedDate,
                },
            },
        });
        
        appointments.forEach(appointment => {
            console.log("Appointment date in DB:", appointment.date);
        });

        console.log("Fetched appointments by date:", appointments);
        return appointments;
    } catch (err) {
        console.error("Error fetching appointments by date:", err);
        throw new Error("An error occurred while fetching appointments.");
    }
}

export async function deleteAppointment(id){
    let res=await  prisma.appointment.delete({where:{id}});
    if (res) {
        return `appointment with id ${id} deleted.`;
    } else {
        throw new Error(`Couldn't delete appointment with id ${id}.`);
    }
}
