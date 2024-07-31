import React, { useState } from 'react'
import CustomButton from './Button'
import {Modal, Input, ModalBody, ModalHeader, Select, SelectItem, useDisclosure, Button, ModalFooter, ModalContent } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { handleEmailName } from '../login/action';
import { formatISO } from 'date-fns';
import "../user/style/calendar.css";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
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
    const e = useTranslations("Error")
    const action = useTranslations("callAction")
    const [id,setUserId] = useState("");
    const [comment,setComment] = useState("");
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
        { key: 'Bridges', label: t("Bridges.title") },
        { key: 'Check', label: t("Check.title") },
        { key: 'Whitening', label: t("Whitening.title") },
        { key: 'Scaling', label: t("Scaling.title") },
        { key: 'Root', label: t("Root.title") },
        { key: 'Wisdom', label: t("Wisdom.title") },
        { key: 'Denture', label: t("Denture.title") },
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
                        autocomplete="email" // Adding autocomplete attribute
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className=' flex flex-col w-full'>
                    <label htmlFor='note'>Service</label>
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
                <CustomButton radius="xl" size="lg" className=' self-end min-w-40 bg-light-green' color='primary' type="submit" onPress={onOpen}>
                    {action('text')}
                </CustomButton>
            </form>
            <Modal size='lg' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 items-center">       
                        <Image
                            src="/logo/White Black Simple Illustration Dental Clinic Logo.png"
                            alt='logo'
                            width={200}
                            height={200}
                            className=' rounded-full'
                            quality={90}
                        />
                    </ModalHeader>
                    <ModalBody className="flex flex-col items-center text-center">
                        <h1 className=' text-3xl font-semibold mb-4'>{e("title")}</h1>
                        <p className='text-lg'>{e("description")}</p>
                    </ModalBody>
                    <ModalFooter className="flex justify-center">
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    );
}