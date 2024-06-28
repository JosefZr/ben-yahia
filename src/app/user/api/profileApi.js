"use server" 
import prisma from '@/app/lib/prisma';
export async function getUserCredantials({ userId }) {
    const idUser = parseInt(userId, 10);
    if (isNaN(idUser)) {
        throw new Error("Invalid userId");
    }

    try{
        const user = await prisma.user.findMany(
            {
                where: {id:idUser},
            }
        );
        console.log("back :" ,user)
        return user;
    }catch(err){
        console.log("Error:", err);
    }
}
export async function editProfileInfo(data) {
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