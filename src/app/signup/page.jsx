"use client";
import { useForm } from 'react-hook-form';
import CustomButton from '../components/Button';
import { motion } from 'framer-motion';
import { Input, Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image';
import image from "../../../public/logo/White Black Simple Illustration Dental Clinic Logo.webp"
import { redirect } from 'next/navigation'; // Import redirect from Next.js
import { signup } from './action';
import { useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { EyeSlashFilledIcon } from '../components/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../components/EyeFilledIcon';

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signupError, setSignupError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const onSubmit = async (formData) => {
        try {
            const response = await signup({ formData });
            if (response.success) {
                setSignupSuccess(true);
                setSignupError('');
            } else {
                setSignupSuccess(false);
                setSignupError(response.error);
            }
        } catch (error) {
            console.error('Error occurred during signup:', error);
            setSignupSuccess(false);
            setSignupError('An unexpected error occurred.');
        }
    };

    return (
        <div className='container mx-auto max-w-2xl'>
            <motion.div className="container scroll-mt-28 mt-10 p-10 bg-default-50 rounded-xl">
                <div className='flex flex-col justify-center items-center gap-3'>
                    <Image src={image} alt="logo" height={200} />
                    <h1 className='capitalize text-2xl font-semibold'>Sign in to your account</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full mx-auto'>
                        <div className='flex flex-row justify-between gap-3'>
                            <div className='flex flex-col gap-3 w-full'>
                                <Input
                                    {...register("name", { required: "Name is required" })}
                                    id='name'
                                    variant='flat'
                                    size='md'
                                    label="Prénom"
                                    autoComplete=""
                                    placeholder='Entrer votre Prénom'
                                    radius='md'
                                />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <Input
                                    {...register("lastname", { required: "Last name is required" })}
                                    id='lastname'
                                    variant='flat'
                                    size='md'
                                    label="Nom"
                                    autoComplete='current-lastname'
                                    placeholder='Entrer votre Nom'
                                    radius='md'
                                />
                                {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
                            </div>
                        </div>
                        <div className='flex flex-row justify-between gap-3'>
                            <div className='flex flex-col gap-3 w-full'>
                                <Input
                                    {...register("age", { required: "Age is required", pattern: { value: /^[0-9]+$/, message: "Invalid age" } })}
                                    id='age'
                                    variant='flat'
                                    size='md'
                                    autoComplete='current-age'
                                    label="Age"
                                    placeholder='Entrer votre Age'
                                    radius='md'
                                />
                                {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <Input
                                    {...register("phone", { required: "Phone number is required", pattern: { value: /^[0-9]+$/, message: "Invalid phone number" } })}
                                    id='phone'
                                    variant='flat'
                                    size='md'
                                    label="N° Telephone "
                                    autoComplete='current-phone'
                                    placeholder='Entrer votre numéro de Telephone '
                                    radius='md'
                                />
                                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Select
                                {...register("sex", { required: "Sexe is required" })}
                                id='sex'
                                label="Choisiser votre sex"
                                size='sm'
                            >
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </Select>
                            {errors.sexe && <p className="text-red-500">{errors.sexe.message}</p>}
                        </div>
                        <Input
                            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                            id='email'
                            type="email"
                            placeholder='name@example.com'
                            variant='flat'
                            label="Email"
                            startContent={<IoIosMail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                            autoComplete='email'
                            size='md'
                            radius='md'
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        <Input
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                            id='password'
                            variant='flat'
                            label="Mot de Pass"
                            size='md'
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            autoComplete='current-password'
                            placeholder='Enter your password'
                            radius='md'
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        {signupError && <p className="text-red-500">{signupError}</p>}
                        <div className='container pt-5'>
                            <CustomButton type="submit" size="lg" variant="shadow" color="primary" className="w-full mx-auto">
                                Sign Up
                            </CustomButton>
                            {signupSuccess && redirect("/login")}
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
