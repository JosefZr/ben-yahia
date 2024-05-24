"use server" 
import prisma from '@/app/lib/prisma';
export async function getPatients() {
    try{
        const admins = await prisma.user.findMany(
            {
                where: {role:"USER"},
            }
        );
        console.log("back :" ,admins)
        return admins;
    }catch(err){
        console.log("Error:", err);
    }
}
export async function deletePatient(id){
    let res=await  prisma.user.delete({where:{id}});
    if (res) {
        return `User with id ${id} deleted.`;
    } else {
        throw new Error(`Couldn't delete user with id ${id}.`);
    }
}
//add a patient to the database
export async function addPatient(data){
    const { age, ...patientData } = data;

    const ageInt = parseInt(age);
    const newData = await prisma.user.create({
        data: {
            ...patientData,
            age: ageInt, // Pass the integer value of age
            role:"USER"
        },
        });
    return newData;
};
export async function editPatientInfo(data) {
    try {
        // Extract the id from the data
        const { id, age, ...updatedData } = data;

        // Convert the age field to an integer
        const ageInt = parseInt(age);

        // Update the patient with the provided id
        const editedData = await prisma.user.update({
            where: { id },
            data: {
                ...updatedData,
                age: ageInt // Pass the integer value of age
            },
        });
        return editedData;
    } catch (err) {
        console.error("Error:", err);
        throw err; // Throw the actual error received from Prisma
    }
}
