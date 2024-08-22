// In apiSettings.js
"use server"
import prisma from '@/app/lib/prisma';

export async function findSettings() {
    try {
        let settings = await prisma.settings.findMany({
            include: {
                days: true, // Fetch related day settings
            },
        });

        // If no settings exist, create a new row
        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    maxAppointmentPerDay: 0,
                    days: {
                        create: [
                            { dayOfWeek: 0, openTime: '08:00', closeTime: '13:00' }, // Sunday
                            { dayOfWeek: 1, openTime: '08:00', closeTime: '13:00' }, // Monday
                            { dayOfWeek: 2, openTime: '08:00', closeTime: '13:00' }, // Tuesday
                            { dayOfWeek: 3, openTime: '08:00', closeTime: '13:00' }, // Wednesday
                            { dayOfWeek: 4, openTime: '08:00', closeTime: '13:00' }, // Thursday
                            { dayOfWeek: 5, openTime: '08:00', closeTime: '13:00' }, // Friday
                            { dayOfWeek: 6, openTime: '08:00', closeTime: '13:00' }  // Saturday
                        ],
                    },
                },
                include: {
                    days: true,
                },
            });
        }

        console.log("Settings:", settings);
        return settings;
    } catch (err) {
        console.error("Error getting the settings:", err);
        throw err;
    }
}

export async function updateSetting(newSettings, id) {
    try {
        const { maxAppointmentPerDay, ...daySettings } = newSettings;
        const updatedSettings = await prisma.settings.update({
            where: { id: id },
            data: {
                maxAppointmentPerDay: parseInt(maxAppointmentPerDay) || undefined,
                days: {
                    update: daySettings, // Update day settings
                },
            },
            include: {
                days: true,
            },
        });
        return updatedSettings;
    } catch (err) {
        console.error('Failed to update setting', err);
        throw err;
    }
}
