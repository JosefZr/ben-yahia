import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@nextui-org/react';
import Image from 'next/image';
import CustomButton from '@/app/components/Button';

export default function SignupForm() {
    // const [formData, setFormData] = useState({ email: '', password: '', name: '', lastname: '' });
    // const [signupSuccess, setSignupSuccess] = useState(false);
    // const [signupError, setSignupError] = useState('');

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await signup({ formData });
    //         if (response.success) {
    //             setSignupSuccess(true);
    //             setSignupError('');
    //             redirect('/login'); // Redirect to login page after successful signup
    //         } else {
    //             setSignupSuccess(false);
    //             setSignupError(response.error);
    //         }
    //     } catch (error) {
    //         console.error('Error occurred during signup:', error);
    //         setSignupSuccess(false);
    //         setSignupError('An unexpected error occurred.');
    //     }
    // };

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    return (
        <motion.div className="container scroll-mt-28 mt-10 p-10 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <div className='flex flex-col justify-center items-center gap-3'>
                <Image src={image} alt="logo" height={150} />
                <h1 className='capitalize text-2xl font-semibold'>Sign in to your account</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full mx-auto'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="name">Name :</label>
                            <Input
                                key="name"
                                type="text"
                                name='name'
                                id='name'
                                variant='bordered'
                                size='lg'
                                autoComplete='current-name'
                                placeholder='Name'
                                radius='lg'
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="lastname">Last Name :</label>
                            <Input
                                key="lastname"
                                type="text"
                                name='lastname'
                                id='lastname'
                                variant='bordered'
                                size='lg'
                                autoComplete='current-lastname'
                                placeholder='Last Name'
                                radius='lg'
                                onChange={handleChange}
                                value={formData.lastname}
                            />
                        </div>
                    </div>
                    <label htmlFor="email">E-mail :</label>
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
                        onChange={handleChange}
                        value={formData.email}
                    />
                    {signupError && <p className="text-red-500">{signupError}</p>}
                    <label htmlFor="password">Password :</label>
                    <Input
                        key="password"
                        type="password"
                        name='password'
                        id='password'
                        variant='bordered'
                        size='lg'
                        autoComplete='current-password'
                        placeholder='Enter your password'
                        radius='lg'
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <div className='container pt-5'>
                        <CustomButton type="submit" size="lg" variant="shadow" color="primary" className="w-full mx-auto">
                            Sign Up
                        </CustomButton>
                    </div>
                    {signupSuccess && <p>You have successfully signed up! Redirecting to login page...</p>}
                </form>
            </div>
        </motion.div>
    );
}
