"use client";
import CustomButton from '@/app/components/Button';
import { Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { handleLogin } from './action';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import image from "../../../public/_0990d51c-9f15-4894-bfc9-da15152c1185-removebg.png";

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [rrole, setRole] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');  // State to manage login error message

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
        <div className='max-w-2xl mx-auto my-auto max-h-full'>
            <motion.div className="scroll-mt-28 mt-10 p-10 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <div className='flex flex-col justify-center items-center gap-3'>
                    <Image src={image} alt="logo" height={150} />
                    <h1 className='capitalize text-2xl font-semibold'>Sign in to your account</h1>
                    <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col gap-3 w-full mx-auto'>
                        <label htmlFor="email">E-mail :</label>
                        <Input
                            {...register("email", { required: "Cette case est obligatoire" })}
                            id='email'
                            type="email"
                            placeholder='name@example.com'
                            variant='bordered'
                            autoComplete='email'
                            size='lg'
                            radius='lg'
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        <label htmlFor="password">Password :</label>
                        <Input
                            {...register("password", { required: "Cette case est obligatoire" })}
                            type="password"
                            autoComplete="current-password"
                            id="password"
                            placeholder='Enter your password'
                            variant='bordered'
                            size='lg'
                            radius='lg'
                        />
                        {errors.password && <span className="text-red-500">Mot De Passe est requis</span>}
                        {loginError && <p className="text-red-500">{loginError}</p>} {/* Display login error */}
                        <div className='flex flex-row'>
                        vous n&apos;avez pas de compte ?  
                            <Link href="\signup" className='text-primary'>
                                    s&apos;inscrire                            </Link>
                        </div>
                        <div className='container'>
                            <CustomButton type="submit" size="lg" variant="shadow" color="primary" className="w-full mx-auto">
                                Log in to your account
                            </CustomButton>
                        </div>
                        {(loginSuccess && rrole === "USER") && redirect("/user")}
                        {(loginSuccess && rrole === "ADMIN") && redirect("/admin")}
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
