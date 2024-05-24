"use client"
import { Providers } from '@/providers';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query'; // Correct import
import { Toaster } from 'react-hot-toast';
import SideBar from './components/SideBar';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export default function RootLayout({ children }) {
    const queryClient = new QueryClient({
        defaultOptions:{
            queries: {
                staleTime: 60* 1000,},
        }
    }); // Create a new instance of QueryClient
    return (
        <QueryClientProvider client={queryClient}>
            <Providers>
                <div className='flex flex-row justify-between '>
                    <SideBar />
                    <main className='flex flex-col w-full'>
                        <div className='h-10 flex flex-row items-center bg-gray-50 text-black'>
                            <ThemeSwitcher/>
                        </div>  
                        {children}
                    </main>
                </div>
            </Providers>
            <Toaster position='top-center' gutter={12} containerStyle={{margin:'8px'}} toastOptions={{
                success:{
                    duration: 3000,
                },
                error:{
                    duration:5000,
                },
                style:{
                    fontSize:'16px',
                    maxWidth:'500px',
                    padding:"16px 24px",
                    backgroundColor:"wheat",
                    color:"black"
                }
            }}/>
        </QueryClientProvider>
    );
}
