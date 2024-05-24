"use client"
import CustomButton from '@/app/components/Button';
import { Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, {  useState } from 'react'
import image from "../../../../public/_0990d51c-9f15-4894-bfc9-da15152c1185-removebg.png"
import Image from 'next/image';
import { login } from '@/app/login/action';

export default function LoginForm() {

        // const [formData, setFormData] = useState({ email: '', password: '' });

        // const handleSubmit = async (event) => {
        //     event.preventDefault();
        //     await login({ formData });
        // };
    
        // const handleChange = (event) => {
        //     const { name, value } = event.target;
        //     setFormData({ ...formData, [name]: value });
        // };
        
    return (
        <motion.div 
            className="container scroll-mt-28  mt-10 p-10 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <div className='flex flex-col justify-center to-black items-center gap-3' >
                <Image src={image} alt="logo" height={150}/>
                <h1 className='capitalize text-2xl font-semibold'>sign in to your account</h1>
                <form  className='flex flex-col gap-3  w-full mx-auto'>
                <label htmlFor="email" >E-mail :</label>
                <Input
                    key="email"
                    name='email' 
                    id='email' 
                    type="email"
                    placeholder='name@example.com'
                    variant='bordered'
                    autoComplete='email'
                    size='lg'
                    radius='lg'
                    // onChange={handleChange} 
                    // value={formData.email}
                />
                <label htmlFor="password">Password :</label>
                <Input
                    key="password"
                    type="password"
                    name='password'  
                    id='password' 
                    variant='bordered'
                    size='lg'
                    autoComplete='current-password'
                    placeholder='enter your password'
                    radius='lg'
                    // onChange={handleChange} 
                    // value={formData.password}
                    
                />
                {/* <Input
                    key="insize3"
                    type="date"
                    label={`rendez-vous`}
                    variant='bordered'
                    size='lg'
                    labelPlacement="inside"
                    description="inside"
                    radius='full'
                /> */}
                <div className='flex flex-row'>
                
                    <Link rel="stylesheet" href="" className=' text-primary'>
                        Forgot password ?
                    </Link>
                </div>
                <div className='container  '>
                    <CustomButton type="submit" size="lg" variant="shadow" color="primary" className="w-full  mx-auto ">
                        log in to your account
                    </CustomButton>
                    
                </div>
                </form>
            </div>
        </motion.div>
    )
}
