"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay, parseISO } from 'date-fns';
import { getOpeningTimes } from '../utils/helpers';
import toast from 'react-hot-toast';
import { Button } from '@nextui-org/react';
import CheckoutStepper from './Stepper'; 
import Note from './Note';
import useFetchClosedDays from '@/app/admin/hooks/useFetchClosedDays';
import useCreateReservation from '../hooks/useCreateReservation';
import useGetAppointmentsByDate from '../hooks/useGetAppointments';
import AdditionalNote from './AdditionalNote';

export default function CalendarComponent2({ days = [], onCloseModal, userId }) {
    const [date, setDate] = useState({
        justDate: null,
        time: null,
    });
    const [note, setNote] = useState('');
    const [additionalNote, setAdditionalNote] = useState('');
    const [reservedTimes, setReservedTimes] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const { fetchedClosedDays = [], isLoading, isError } = useFetchClosedDays();

    const tileClassName = useCallback(({ date: tileDate, view }) => {
        const minDate = new Date();
        if (view === 'month') {
            if (date.justDate && isSameDay(tileDate, date.justDate)) {
                return 'bg-light-green text-white rounded-xl';
            }
            if (
                tileDate < minDate ||
                fetchedClosedDays.some((closedDay) => isSameDay(parseISO(closedDay.date), tileDate))
            ) {
                return 'bg-default-200 text-default-700 cursor-not-allowed';
            }
            return 'hover:bg-default-200 hover:text-default-700 rounded-xl';
        }
        return null;
    }, [date.justDate, fetchedClosedDays]);

    const handleNoteChange = useCallback((e) => {
        setNote(e.target.value);
    }, []);

    const handleAdditionalNoteChange = useCallback((e) => {
        setAdditionalNote(e.target.value);
    }, []);

    const { mutate: createReservationMutate, isLoading: isCreating } = useCreateReservation(onCloseModal);

    const { isGetting, getAppointmentsTimes } = useGetAppointmentsByDate(setReservedTimes);

    useEffect(() => {
        if (date.justDate) {
            const formattedDateSelect = format(date.justDate, 'yyyy-MM-dd');
            getAppointmentsTimes(formattedDateSelect);
        }
    }, [date.justDate, getAppointmentsTimes]);

    const handleCreateReservation = () => {
        const { justDate, time } = date;
        if (justDate && time) {
            const formattedDate = format(justDate, 'yyyy-MM-dd');
            createReservationMutate({ date: formattedDate, time, userId: parseInt(userId), note, additionalNote });
        } else {
            toast.error('Please select both date and time');
        }
    };

    const times = date.justDate && getOpeningTimes(date.justDate, days);
    const availableTimes = times?.filter(time => !reservedTimes.find(appointment => appointment.time === format(time, 'HH:mm')));

    const stepsConfig = useMemo(() => [
        {
            name: "Choosing date",
            Component: () => (
                <Calendar
                    minDate={new Date()}
                    className="w-[450px] max-w-full bg-white dark:bg-black rounded-[15px] border border-default-100 shadow-2xl p-2 font-manrope leading-[1.125em]"
                    view='month'
                    tileDisabled={({ date }) =>
                        fetchedClosedDays.some((closedDay) => isSameDay(parseISO(closedDay.date), date))
                    }
                    onClickDay={(selectedDate) => setDate((prev) => ({ ...prev, justDate: selectedDate }))}
                    value={date.justDate}
                    tileClassName={tileClassName}
                />
            ),
        },
        {
            name: "Choose Time",
            Component: () => (
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
            ),
        },
        {
            name: "Confirm Reservation",
            Component: () => null, // We'll render the Note component separately
        },
    ], [date.justDate, availableTimes, fetchedClosedDays, tileClassName]);

    const handleStepperNext = () => {
        if (currentStep === stepsConfig.length) {
            handleCreateReservation();
        } else {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <CheckoutStepper
                stepsConfig={stepsConfig}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />

            {currentStep === 3 && (
                <div className='w-full p-4'>
                    <Note
                        value={note}
                        onChange={handleNoteChange}
                    />    
                    <AdditionalNote
                        value={additionalNote}
                        onChange={handleAdditionalNoteChange}
                    />            
                </div>
            )}

            <div className='w-full flex gap-5 items-start pt-4 justify-center'>
                <Button onClick={handleStepperNext}  className='rounded-2xl bg-light-green text-white'>
                    {currentStep === stepsConfig.length ? 'Finish' : 'Next'}
                </Button>
                <Button onClick={onCloseModal} variant='solid'  className='rounded-2xl bg-red-700 text-white'>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
