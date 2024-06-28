"use client"
import { Input } from '@nextui-org/react';
import React from 'react'
import { GetSettings } from './useSettings';
import useUpdateSettings from './useUpdateSettings';

export default function Settings() {
    const { isLoading, settings } = GetSettings();
    const {
        maxAppointmentPerDay,
        dimanche,
        lundi,
        mardi,
        mercredi,
        jeudi,
        vendredi,
        samedi
    } = settings || {};
    const { isUpdating, updateSettings } = useUpdateSettings(settings ? settings.id : null);    
    if (isLoading) return <div>Loading...</div>;

    function handleUpdate(e,field){
        const{ value} = e.target;
        if(!value) return;
        updateSettings({[field]:value})

    }

    return (
        <div className='flex bg-gray-100 mx-5 rounded-3xl'>
            <form className='flex flex-col items-center justify-start py-5 gap-5 px-12 w-fit'>
                <Input 
                    id='maxAppointmentPerDay'
                    label="max de rendez-vous par jour"
                    labelPlacement="outside-left"
                    className='flex justify-between '
                    variant='bordered'
                    defaultValue={maxAppointmentPerDay}
                    onBlur={(e)=>handleUpdate(e,"maxAppointmentPerDay")}
                    disabled={isUpdating}
                />
                <Input 
                    id='samedi'
                    label="soin dentaire du samedi"
                    labelPlacement="outside-left"
                    className='flex justify-between  gap-10'
                    variant='bordered'
                    defaultValue={samedi}
                    onBlur={(e)=>handleUpdate(e,"samedi")}
                    disabled={isUpdating}
                />

                <Input 
                    id='dimanche'
                    label="soin dentaire du dimanche"
                    labelPlacement="outside-left"
                    className='flex justify-between  gap-10'
                    variant='bordered'
                    defaultValue={dimanche}
                    onBlur={(e)=>handleUpdate(e,"dimanche")}
                    disabled={isUpdating}
                />
                <Input 
                    id='lundi'
                    label="soin dentaire du lundi"
                    labelPlacement="outside-left"
                    className='flex justify-between  gap-5'
                    variant='bordered'
                    defaultValue={lundi}
                    onBlur={(e)=>handleUpdate(e,"lundi")}
                    disabled={isUpdating}
                />
                <Input 
                    id='mardi'
                    label="soin dentaire du mardi"
                    labelPlacement="outside-left"
                    className='flex justify-between  gap-5'
                    variant='bordered'
                    defaultValue={mardi}
                    onBlur={(e)=>handleUpdate(e,"mardi")}
                    disabled={isUpdating}
                />
                <Input 
                    id='mercredi'
                    label="soin dentaire du mercredi"
                    labelPlacement="outside-left"
                    className='flex justify-between  gap-5'
                    variant='bordered'
                    defaultValue={mercredi}
                    onBlur={(e)=>handleUpdate(e,"mercredi")}
                    disabled={isUpdating}
                />
                <Input 
                    id='jeudi'
                    label="soin dentaire du jeudi"
                    labelPlacement="outside-left"
                    className='flex justify-between  gap-5'
                    variant='bordered'
                    defaultValue={jeudi}
                    onBlur={(e)=>handleUpdate(e,"jeudi")}
                    disabled={isUpdating}
                />
                <Input 
                    id='vendredi'
                    label="soin dentaire du venfredi"
                    labelPlacement="outside-left"
                    className='flex justify-between  gap-5'
                    variant='bordered'
                    defaultValue={vendredi}
                    onBlur={(e)=>handleUpdate(e,"vendredi")}
                    disabled={isUpdating}
                />

            </form>
        </div>
        
    );
}
