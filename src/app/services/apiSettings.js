"use server"
import prisma from '@/app/lib/prisma';
export async function getSettings() {
    try{
        const settings = await prisma.settings.findFirst()
        console.log("back :" ,settings)
        return settings;
    }catch(err){
        console.log("Error:", err);
    }
}
export async function findSettings() {
    try {
        let settings = await prisma.settings.findFirst();
        
        // If no settings exist, create a new row
        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    // Define default values for the settings
                    maxAppointmentPerDay: 0,
                    dimanche: '',
                    lundi: '',
                    mardi: '',
                    mercredi: '',
                    jeudi: '',
                    vendredi: '',
                    samedi: '',
                }
            });
        }

        console.log("Settings:", settings);
        return settings;
    } catch(err) {
        console.error("Error getting the settings:", err);
        throw err;
    }
}
export async function updateSetting(newSettings,id){
    try{
        const { maxAppointmentPerDay, ...settings } = newSettings;
        const data = { ...settings }; // Initialize data with settings object
        if (maxAppointmentPerDay !== undefined) {
            data.maxAppointmentPerDay = parseInt(maxAppointmentPerDay); // Assign maxAppointmentPerDay if defined
        }
        const updatedSettings = await prisma.settings.update({
            where: { id: id },
            data: data // Use the updated data object

        })
        return updatedSettings
    }catch(err){
        console.error('Failed to update setting',err);
    }
}