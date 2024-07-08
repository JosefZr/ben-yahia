"use client";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format, formatISO } from 'date-fns';
import { getOpeningTimes } from '../user/utils/helpers';
import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from 'react-query';
import { Button } from '@nextui-org/react';
import { createReservation, getAppointmentsByDate } from '../user/api/appointment';

export default function CalendarComponentLanding({ days = [], closeDays = [], onCloseModal, id, comment }) {
    const [date, setDate] = useState({
        justDate: null,
        time: null,
    });
    const [reservedTimes, setReservedTimes] = useState([]);
    const queryClient = useQueryClient();

    const mutation = useMutation(createReservation, {
        onSuccess: async () => {
            try {
                // Invalidate and refetch appointments query
                await queryClient.invalidateQueries('appointments');
                // Fetch the latest appointments after invalidating the query
                const latestAppointments = await getAppointmentsByDate(format(date.justDate, 'yyyy-MM-dd'));
                // Update the reserved times state with the latest appointments
                setReservedTimes(latestAppointments);
                toast.success('Reservation is set correctly');
                if (onCloseModal) onCloseModal(); // Close the modal if provided
            } catch (error) {
                console.error('Error occurred during reservation:', error);
                toast.error('Reservation is not set correctly');
            }
        },
        onError: (error) => {
            console.error('Error occurred during reservation:', error);
            toast.error('Reservation is not set correctly');
        }
    });

    const { isLoading: isGetting, mutate: getAppointmentsTimes } = useMutation({
        mutationFn: (date) => getAppointmentsByDate(date),
        onSuccess: (res) => {
            toast.success('Appointments fetched successfully');
            setReservedTimes(() => res); // Set the reserved times with the fetched appointments
            console.log('Reserved Times:', res.map((item) => item.time));
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    useEffect(() => {
        if (date.justDate) {
            const formattedDateSelect = format(date.justDate, 'yyyy-MM-dd');
            getAppointmentsTimes(formattedDateSelect);
            console.log('Updated Reserved Times:', reservedTimes.map((item) => item.time)); // Log the updated state here
        }
    }, [date.justDate, getAppointmentsTimes]);

    const handleCreateReservation = () => {
        const userId= id
        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        const { justDate, time } = date;
        if (justDate && time) {
            const formattedDate = format(justDate, 'yyyy-MM-dd');
            console.log('Selected Date and Time:', { formattedDate, time, id, comment });
            mutation.mutate({ date: formattedDate, time, userId:parseInt(userId), note:comment });
        }
    };

    const times = date.justDate && getOpeningTimes(date.justDate, days);
    const availableTimes = times?.filter(time => !reservedTimes.find(appointment => appointment.time === format(time, 'HH:mm')));

    return (
        <div className='flex flex-col justify-center items-center'>
            {date.justDate ? (
                <div className='flex flex-col items-center'>
                    {availableTimes && availableTimes.length > 0 ? (
                        <div className='flex flex-row flex-wrap gap-4'>
                            {availableTimes.map((time, i) => (
                                <div key={`time-${i}`} className='rounded-full bg-gray-100 p-2'>
                                    <button type='button' onClick={() => {
                                        setDate((prev) => ({ ...prev, time: format(time, 'HH:mm') }));
                                    }}>
                                        {format(time, 'HH:mm')}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-red-500'>All times are taken for this date. Please choose another date.</div>
                    )}
                </div>
            ) : (
                <Calendar
                    minDate={new Date()}
                    className="REACT-CALENDAR p-2"
                    view='month'
                    tileDisabled={({ date }) => closeDays.includes(formatISO(date))}
                    onClickDay={(selectedDate) => {
                        setDate((prev) => ({ ...prev, justDate: selectedDate }));
                    }}
                >
                    Calendar
                </Calendar>
            )}
            <div className='w-[80%] flex flex-row-reverse gap-5 items-start pt-4 justify-start '>
                <Button onClick={onCloseModal} variant='solid' color='danger' className='rounded-2xl'>Cancel</Button>
                {date.justDate && date.time && (
                    <Button onClick={handleCreateReservation} color='success' className='rounded-2xl'>Confirm</Button>
                )}
            </div>
        </div>
    );
}
