"use server"
import prisma from '@/app/lib/prisma';

export async function findSettings() {
    try {
        const settings = await prisma.settings.findUnique({
            where: {
                id: 1,
            }
        });
        console.log("Settings:", settings);
        return settings;
    } catch(err) {
        console.error("Error getting the settings:", err);
        throw err;
    }
}
export async function updateSetting(newSettings){
    try{
        const { maxAppointmentPerDay, ...settings } = newSettings;
        const data = { ...settings }; // Initialize data with settings object
        if (maxAppointmentPerDay !== undefined) {
            data.maxAppointmentPerDay = parseInt(maxAppointmentPerDay); // Assign maxAppointmentPerDay if defined
        }
        const updatedSettings = await prisma.settings.update({
            where: { id: 1 },
            data: data // Use the updated data object

        })
        return updatedSettings
    }catch(err){
        console.error('Failed to update setting',err);
    }
}