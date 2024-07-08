import React, { useState } from 'react'
import CustomButton from './Button'
import { Input, Select, SelectItem } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { handleEmailName } from '../login/action';
import Modal from './Modal';
import { formatISO } from 'date-fns';
import "../user/style/calendar.css";
import CalendarComponentLanding from './CalendarComponentLanding';
import { useTranslations } from 'next-intl';
const closeDays = [
    formatISO(new Date(2024, 6, 30)), // Example closed day
    // Add other closed days here
];

const days = [
    { dayOfWeek: 0, openTime: '08:00', closeTime: '18:00' }, // Sunday
    { dayOfWeek: 1, openTime: '08:00', closeTime: '18:00' }, // Monday
    { dayOfWeek: 2, openTime: '08:00', closeTime: '18:00' }, // Tuesday
    { dayOfWeek: 3, openTime: '08:00', closeTime: '18:00' }, // Wednesday
    { dayOfWeek: 4, openTime: '08:00', closeTime: '18:00' }, // Thursday
    { dayOfWeek: 5, openTime: '08:00', closeTime: '18:00' }, // Friday
    { dayOfWeek: 6, openTime: '08:00', closeTime: '18:00' }, // Saturday
];
export default function Reserving() {
    const [id,setUserId] = useState("");
    const [comment,setComment] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        const {name, email, note } = data;
        const { success, error, userId } = await handleEmailName({ name, email });
        if (success) {
            console.log(userId)
            setUserId(()=>userId)
            setComment(()=>note)
        } else {
            console.log(error)
        }
    };
    const onError = (errors) => {
        console.log(errors);
    };
    const t = useTranslations("Services");

    const services = [
        { key: 'Implant', label: t("Implant.title") },
        { key: 'Braces', label: t("Braces.title") },
        { key: 'Crown', label: t("Crown.title") },
        { key: 'Filling', label: t("Filling.title") },
    ];
    return (
        <div className=' bg-default rounded-lg p-8 '>
        <form onSubmit={handleSubmit(onSubmit, onError)} className=' flex flex-row max-sm:flex-col items-center gap-4 relative'>
            <div className=' flex flex-col w-full'>
                <label htmlFor="email">Name</label>
                <Input
                    {...register("name", { required: "this information is required" })}
                    id='name'
                    type="text"
                    labelPlacement="outside"
                    placeholder="Enter Your Name"
                    size='lg'
                    variant='faded'
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className=' flex flex-col w-full'>
                <label htmlFor='email'>Email</label>
                <Input
                    {...register("email", { required: "this information is required" })}
                    id='email'
                    type="email"
                    labelPlacement="outside"
                    placeholder="Enter Your Email"
                    size='lg'
                    variant='faded'
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className=' flex flex-col w-full'>
                <label htmlFor='note'>Service</label>
                {/* <Input
                {...register("note", { required: "this information is required" })}
                    id='note'
                    type="service"
                    labelPlacement="outside"
                    placeholder="Enter Votre Email"
                    className=' h-10'
                /> */}
                <Select 
                {...register("note", { required: "this information is required" })}
                    label="Select a service" 
                    className="max-w-xs" 
                    id='note'
                    size='sm'
                    radius='lg'
                    variant='faded'
                >
                    {services.map((service) => (
                    <SelectItem key={service.label}>
                        {service.label}
                    </SelectItem>
                    ))}
                </Select>
                {errors.note && <p className="text-red-500">{errors.note.message}</p>}
            </div>
            {/* <div className=' flex flex-col w-full'>
                <label htmlFor='date'>Date</label>
                <Input
                    {...register("date", { required: "this information is required" })}
                    id='date'
                    type="date"
                    labelPlacement="outside"
                    placeholder="Enter Votre Email"
                    className=' h-10'
                />
                {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div> */}
            <Modal>
                <Modal.Open opens="calendar">
                    <CustomButton radius="full" size="lg" className=' self-end min-w-36 bg-light-green' color='primary' type="submit" onClick={()=>handleSubmit(onSubmit, onError)}>
                        Take Appointment
                    </CustomButton>
                </Modal.Open>
                <Modal.Window name="calendar">
                    {id?(
                        <CalendarComponentLanding days={days} closeDays={closeDays} id={id} comment={comment} />
                    ):(
                        <div> this email is note registred in please regester to make ur reservation
                        </div>
                    )}
                </Modal.Window>
            </Modal>
            {/* <CustomButton type="submit" radius="full" className=' self-end min-w-32' color='primary' >
                Take Appointment
            </CustomButton> */}
        </form>
            {/* <button onClick={handleVerifyClick}>Verify</button> */}
        </div>
    )
}
