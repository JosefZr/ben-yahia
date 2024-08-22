import React, { useCallback, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay, parseISO } from 'date-fns';
import toast from 'react-hot-toast';
import { Button, Select, SelectItem } from '@nextui-org/react';
import CheckoutStepper from './Stepper';
import useFetchClosedDays from '@/app/admin/hooks/useFetchClosedDays';
import useCreateReservation from '../hooks/useCreateReservation';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { IoIosCalendar } from 'react-icons/io';
import { maladie, service } from '@/app/lib/data';

export default function CalendarComponent4({ days = [], onCloseModal, userId }) {
    const services = service();
    const maladies = maladie();
    const [date, setDate] = useState({ justDate: null });
    const [note, setNote] = useState('');
    const [painLevel, setPainLevel] = useState(null);
    const [additionalNote, setAdditionalNote] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const { fetchedClosedDays = [], isLoading, isError } = useFetchClosedDays();
    const colorMap = {
        1: 'bg-red-50',
        2: 'bg-red-100',
        3: 'bg-red-200',
        4: 'bg-red-300',
    };
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

    const handleCreateReservation = () => {
        const { justDate } = date;
        if (justDate) {
            const formattedDate = format(justDate, 'yyyy-MM-dd');
            createReservationMutate({ date: formattedDate, userId: parseInt(userId), note, additionalNote, painLevel});
        } else {
            toast.error('Please select a date');
        }
    };

    const stepsConfig = useMemo(() => [
        {
            name: "sélectioner la date",
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
            name: "exprimer votre condition",
            Component: () => null, // We'll render the Note component separately
        },
        {
            name: "Success",
            Component: () => (
                <div className='flex flex-col gap-5 items-center'>
                    <FaRegCircleCheck size={50} className="text-success shadow-lg shadow-success-100 rounded-full" />
                    <h1 className='text-4xl font-semibold text-center text-default-800'>Your <span className='text-success'>appointment request</span> has been successfully submitted!</h1>
                    <p className='text-md font-light text-default-500'>We'll be in touch shortly to confirm</p>
                    <div className="text-lg font-normal text-default-600 border-y-1 border-default-100 py-5 pl-5 flex flex-row items-center">
                        Requested Appointment Date :
                        <div className="flex flex-row items-center gap-2 pl-3">
                            <IoIosCalendar className="text-default-600 text-xl font-bold" />
                            {format(date.justDate, 'yyyy-MM-dd')}
                        </div>
                    </div>
                </div>
            ),
        },
    ], [date.justDate, fetchedClosedDays, tileClassName]);

    const handleStepperNext = () => {
        if (currentStep === 2) {
            // Validate notes before proceeding to the last step
            if (!note || !additionalNote || !painLevel) {
                toast.error('Please fill out all required fields.');
                return;
            }
        }
        if (currentStep === 1) {
            if (!date.justDate) {
                toast.error('Please select a date');    
                return;
            }
        }

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
            {currentStep === 2 && (
                <div className='w-full p-4'>
                    <form className='flex flex-col max-sm:flex-col items-center gap-4 relative'>
                        <div className='flex flex-col items-start w-full'>
                            <label htmlFor='service'>Les Services Disponibles</label>
                            <Select
                                label="selectionner un service"
                                id='service'
                                size='sm'
                                radius='lg'
                                onChange={handleNoteChange}
                                variant='faded'
                            >
                                {services.map((service) => (
                                    <SelectItem key={service.name}>
                                        {service.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className='flex flex-col items-start w-full'>
                            <label htmlFor='maladie'>maladie:</label>
                            <Select
                                label="selectionner une maladie"
                                id='maladie'
                                size='sm'
                                radius='lg'
                                onChange={handleAdditionalNoteChange}
                                variant='faded'
                            >
                                {maladies.map((maladie) => (
                                    <SelectItem key={maladie.name}>
                                        {maladie.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className='flex flex-col gap-4 items-center w-full'>
                            <label htmlFor='pain-level' className='mb-2 text-lg font-medium'>Sélectionnez votre niveau de douleur :</label>
                            <div className='flex w-full max-w-md'>
                                {[1, 2, 3, 4].map(level => (
                                    <div
                                        key={level}
                                        onClick={() => setPainLevel(level.toString())}
                                        className={`flex-1 h-12 flex items-center justify-center cursor-pointer border  border-gray-300 ${colorMap[level]} ${painLevel === level
                                            ? 'border-red-500'
                                            : 'hover:border-red-500'
                                        }`}
                                    >
                                    <span role="img" aria-label={`pain level ${level}`}>
                                            {level === 1 && '🙂'}
                                            {level === 2 && '😕'}
                                            {level === 3 && '😣'}
                                            {level === 4 && '😭'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {painLevel && (
                                <p className='mt-2 text-sm text-default-600'>
                                    Niveau de douleur sélectionné : <strong>
                                            {painLevel ==="1" && "douleur absente "}
                                            {painLevel ==="2" && "douleur faible "}
                                            {painLevel ==="3" && "douleur intense "}
                                            {painLevel ==="4" && "douleur extrêmement intense"}
                                    </strong>
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            )}
            <div className='w-full flex gap-5 items-start pt-4 justify-center'>
                <Button onClick={handleStepperNext} className='rounded-2xl bg-light-green text-white'>
                    {currentStep === stepsConfig.length ? 'Finish' : 'Next'}
                </Button>
                <Button onClick={onCloseModal} variant='solid' className='rounded-2xl bg-red-700 text-white'>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
