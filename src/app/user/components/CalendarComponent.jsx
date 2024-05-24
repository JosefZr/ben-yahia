"use client";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format, formatISO, isBefore, parse } from 'date-fns';
import { getOpeningTimes, roundNearestMinutes } from '../utils/helpers';
import { getUserIdFromToken } from '@/app/login/action';

export default function CalendarComponent({ days = [], closeDays = [] }) {
  const [date, setDate] = useState({
      justDate: null,
      dateTime: null,
  });

  useEffect(() => {
      const fetchData = async () => {
          if (date.dateTime) {
              try {
                  // Get the user ID from the token
                  const userId = await getUserIdFromToken();
                  console.log('Selected Date and Time:', date.dateTime);
                  console.log('User ID:', userId);

                  // Make an API call to save the appointment
                  const response = await fetch('/api/appointments', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ userId, dateTime: date.dateTime })
                  });
                  const data = await response.json();
                  if (data.success) {
                      console.log('Appointment booked successfully:', data);
                      redirect('/accueil');
                  } else {
                      console.error('Error booking appointment:', data.error);
                  }
              } catch (error) {
                  console.error('Error:', error);
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