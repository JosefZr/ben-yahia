"use client";
import CustomButton from '@/app/components/Button';
import { Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'; // Import useEffect
import image from "../../../public/_0990d51c-9f15-4894-bfc9-da15152c1185-removebg.png";
import Image from 'next/image';
import { handleLogin } from './action';
import { redirect } from 'next/navigation'; // Ensure this import is correct

export default function Login() {
    const [email, setEmail] = useState('');
    const [rrole, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { success, error , role } = await handleLogin(email, password);
        if (success) {
            setLoginSuccess(true)
            setRole(role)
        } else {
            console.error('Login Error:', error);
            // Handle login error
        }
    };

    return (
        <div className='container max-w-unit-9xl mx-auto my-auto max-h-full'>
            <motion.div className="container scroll-mt-28 mt-10 p-10 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <div className='flex flex-col justify-center to-black items-center gap-3'>
                    <Image src={image} alt="logo" height={150}/>
                    <h1 className='capitalize text-2xl font-semibold'>Sign in to your account</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3  w-full mx-auto'>
                        <label htmlFor="email">E-mail :</label>
                        <Input
                            type="email"
                            placeholder='name@example.com'
                            variant='bordered'
                            autoComplete='email'
                            size='lg'
                            radius='lg'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password">Password :</label>
                        <Input
                            type="password"
                            placeholder='Enter your password'
                            variant='bordered'
                            size='lg'
                            autoComplete='current-password'
                            radius='lg'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='flex flex-row'>
                            <Link rel="stylesheet" href="" className='text-primary'>
                                Forgot password ?
                            </Link>
                        </div>
                        <div className='container'>
                            <CustomButton type="submit" size="lg" variant="shadow" color="primary" className="w-full mx-auto ">
                                log in to your account
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
