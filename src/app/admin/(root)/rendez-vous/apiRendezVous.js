"use server" 
import prisma from '@/app/lib/prisma';
export async function getAppointment() {
    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                user: true, // Include related user data
            },
        });
        console.log("back :", appointments);
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
    if (!id) {
        throw new Error("Appointment ID is required");
    }
    let res=await  prisma.appointment.delete({where:{id}});
    if (res) {
        return `User with id ${id} deleted.`;
    } else {
        throw new Error(`Couldn't delete user with id ${id}.`);
    }
}
export async function addCancelReason(reason, id) {
    try {
        if (!id) {
            throw new Error("Reason and ID are required.");
        }
        if(!reason ){
            throw new Error("Reason is required");
        }

        const result = await prisma.appointment.update({
            where: { id: id },
            data: {
                cancelNote: reason,
                status: "annuler",
                isCancelled:true
            },
        });

        return result;
    } catch (err) {
        throw err;
    }
}
export async function AddingTime(id, time,type){
    try{
        if(!time){
            throw new Error("Time is required");
        }
        if(!id){
            throw new Error("ID is required");
        }
        const result = await prisma.appointment.update({
            where:{id:id},
            data:{
                time:time,
                status:"confirmed",
                type:type
            }
        })
        return result
    }catch(err){
        throw err
    }
}


