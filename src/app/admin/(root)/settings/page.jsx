"use client"
import { Input } from '@nextui-org/react';
import React from 'react';
import { GetSettings } from './useSettings';
import useUpdateSettings from './useUpdateSettings';

export default function Settings() {
    const { isLoading, settings } = GetSettings();
    const { isUpdating, updateSettings } = useUpdateSettings(settings ? settings.id : null);
    console.log('Fetched settings:', settings); // Add this line
    if (isLoading) return <div>Loading...</div>;

    const handleUpdate = (e, field, day) => {
        const { value } = e.target;
        if (!value) return;
        updateSettings({ [field]: value, day });
    };

    return (
        <div className='justify-center flex flex-row max-md:flex-col'>
            <div className='flex bg-default-50 mx-5 rounded-3xl'>
                <form className='flex flex-col items-center justify-start py-5 gap-5 px-12 w-fit'>
                    <Input
                        id='maxAppointmentPerDay'
                        label="Max de rendez-vous par jour"
                        labelPlacement="outside-left"
                        className='flex justify-between '
                        variant='bordered'
                        defaultValue={settings.maxAppointmentPerDay.toString()}
                        onBlur={(e) => handleUpdate(e, "maxAppointmentPerDay")}
                        disabled={isUpdating}
                    />
                    {['samedi', 'dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].map((day) => (
                        <Input
                            key={day}
                            id={day}
                            label={`Soin dentaire du ${day}`}
                            labelPlacement="outside-left"
                            className='flex justify-between  gap-5'
                            variant='bordered'
                            defaultValue={settings[day]}
                            onBlur={(e) => handleUpdate(e, day)}
                            disabled={isUpdating}
                        />
                    ))}
                </form>
            </div>
        </div>
    );
}
