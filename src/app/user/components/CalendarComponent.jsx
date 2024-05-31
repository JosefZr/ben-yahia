"use client";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, formatISO } from 'date-fns';
import { getOpeningTimes } from '../utils/helpers';
import { createReservation } from '../api/appointment';
import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from 'react-query';
import { Button } from '@nextui-org/react';
import CustomButton from '@/app/components/Button';

export default function CalendarComponent({ days = [], closeDays = [], onCloseModal }) {
    const [date, setDate] = useState({
        justDate: null,
        time: null,
    });

    const queryClient = useQueryClient();

    const mutation = useMutation(createReservation, {
        onSuccess: () => {
            // Invalidate and refetch appointments query
            queryClient.invalidateQueries('appointments');
            toast.success('Reservation is set correctly');
            if (onCloseModal) onCloseModal(); // Close the modal if provided
        },
        onError: (error) => {
            console.error('Error occurred during reservation:', error);
            toast.error('Reservation is not set correctly');
        }
    });

    const handleCreateReservation = () => {
        const userId = localStorage.getItem("id");
        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        const { justDate, time } = date;
        if (justDate && time) {
            const formattedDate = format(justDate, 'yyyy-MM-dd');
            console.log('Selected Date and Time:', { formattedDate, time });
            mutation.mutate({ date: formattedDate, time, userId: parseInt(userId) });
        }
    };

    const times = date.justDate && getOpeningTimes(date.justDate, days);

    return (
        <div className='flex flex-col justify-center items-center'>
            {date.justDate ? (
                <div className='flex flex-row flex-wrap gap-4'>
                    {times?.map((time, i) => (
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
                <Button onClick={onCloseModal} variant='solid' color='danger'  className=' rounded-2xl'>Cancel</Button>
                {date.justDate && date.time && (
                    <Button onClick={handleCreateReservation} color='success' className=' rounded-2xl'>Confirm</Button>
                )}
            </div>
        </div>
    );
}
