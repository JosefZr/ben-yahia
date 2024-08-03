"use client";
import CustomButton from '@/app/components/Button';
import { Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';
import { Image } from "@nextui-org/react";
import { handleLogin } from './action';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { VscKey } from "react-icons/vsc";

import { IoIosMail } from "react-icons/io";
import { EyeSlashFilledIcon } from '../components/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../components/EyeFilledIcon';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [role, setRole] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');  // State to manage login error message
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const onSubmit = async (data) => {
        const { email, password } = data;
        const { success, error, role, userId } = await handleLogin({ email, password });
        if (success) {
            setLoginSuccess(true);
            setRole(role);
            localStorage.setItem("id", userId);
            setLoginError(''); // Clear any previous error
        } else {
            setLoginSuccess(false);
            setLoginError(error); // Set the error message
        }
    };

    const onError = (errors) => {
        console.log(errors);
    };

    return (
        <div className='max-w-xl mx-auto my-auto max-h-full'>
            <motion.div className="scroll-mt-28 mt-10 p-10 bg-slate-100 dark:bg-slate-800 rounded-xl px-20">
                <div className='flex flex-col justify-start items-center gap-3'>
                    <div className='  flex flex-row justify-start items-center font-extrabold text-md'>
                        <Image
                            src="/logo/Remove background project.png"
                            alt="Logo" 
                            width={80}
                            className=" min-w-10"
                        /> 
                        <h1 className="md:max-[920px]:hidden max-[500px]:hidden ">Light STOMATOLOGY</h1>    
                    </div>
                    <div className=' flex items-start w-full pb-5'>
                        <h1 className='capitalize text-2xl font-semibold'>Log in</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col gap-3 w-full mx-auto'>
                        <label htmlFor="email">Email Address</label>
                        <Input
                            {...register("email", { required: "Cette case est obligatoire" })}
                            id='email'
                            type="email"
                            placeholder='Entrer votre Email'
                            variant='bordered'
                            startContent={<IoIosMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                            autoComplete='email'
                            size='lg'
                            radius='lg'
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        <label htmlFor="password">password</label>
                        <Input
                            {...register("password", { required: "Cette case est obligatoire" })}
                            autoComplete="current-password"
                            id="password"
                            placeholder='Enter your password'
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
                            variant='bordered'
                            startContent={<VscKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                            size='lg'
                            radius='lg'
                        />
                        {errors.password && <span className="text-red-500">Mot De Passe est requis</span>}
                        {loginError && <p className="text-red-500">{loginError}</p>} {/* Display login error */}
                        <div className='flex flex-row'>
                        vous n&apos;avez pas de compte ?  
                            <Link href="\signup" className='text-light-green'>
                                    s&apos;inscrire                           
                            </Link>
                        </div>
                        <div className='container'>
                            <CustomButton type="submit" size="lg" variant="shadow"  className="w-full mx-auto bg-light-green text-white">
                                Log in to your account
                            </CustomButton>
                        </div>
                        {(loginSuccess && role === "USER") && redirect("/user")}
                        {(loginSuccess && role === "ADMIN") && redirect("/admin")}
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
