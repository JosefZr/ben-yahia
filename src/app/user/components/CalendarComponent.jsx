"use client";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format, formatISO, isBefore, parse } from 'date-fns';
import { getOpeningTimes, roundNearestMinutes } from '../utils/helpers';
import { createReservation } from '../api/appointment';
import toast from 'react-hot-toast';

export default function CalendarComponent({ days = [], closeDays = [] }) {
    const [date, setDate] = useState({
        justDate: null,
        dateTime: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/getID", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = response;
            console.log(userData)
            const time= date.dateTime
            if (date.dateTime) {
                try {
                    // Get the user ID from the token
                    console.log('Selected Date and Time:', date.dateTime);
                    const response = await createReservation({ time } , userData);
                    
                    if (response.success) {
                        toast.success('reservation is set correctly')
                    } else {
                        toast.error('reservation is not set correctly')
                    }
                } catch (error) {
                    console.error('Error occurred during reservation:', error);
                }
            }
        };
        fetchData();
    }, [date.dateTime]);

    const times = date.justDate && getOpeningTimes(date.justDate, days);

    return (
        <div className='flex flex-col justify-center items-center'>
            {date.justDate ? (
                <div className='flex flex-row flex-wrap gap-4'>
                    {times?.map((time, i) => (
                        <div key={`time-${i}`} className='rounded-full bg-gray-100 p-2'>
                            <button type='button' onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}>
                                {format(time, 'kk:mm')}
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
        </div>
    );
}