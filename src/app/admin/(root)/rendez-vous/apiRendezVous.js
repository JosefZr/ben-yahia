"use server" 
import prisma from '@/app/lib/prisma';
export async function getAppointment() {
    try{
        const appointments = await prisma.appointment.findMany();
        console.log("back :" ,appointments)
        return appointments;
    }catch(err){
        console.log("Error:", err);
    }
}
export async function getUserWithAppointmentId(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) }, // Fix typo and ensure ID is an integer
        });
        console.log("back:", user);
        return user;
    } catch (err) {
        console.error("Error:", err);
        throw err; // Ensure errors are also serialized as plain objects
    }
}
export async function deleteAppointment(id){
    let res=await  prisma.appointment.delete({where:{id}});
    if (res) {
        return `User with id ${id} deleted.`;
    } else {
        throw new Error(`Couldn't delete user with id ${id}.`);
    }
}