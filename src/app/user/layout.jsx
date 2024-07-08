"use client"
import { Providers } from '@/providers';
import React from 'react';
import "../[locale]/globals.css"

import { QueryClientProvider, QueryClient } from 'react-query'; // Correct import
import { Toaster } from 'react-hot-toast';
import SideBar from './components/SideBar';
import Header from './components/Header';
import ClientProviders from '../[locale]/ClientProviders';
export default function RootLayout({ children }) {
    const queryClient = new QueryClient({
        defaultOptions:{
            queries: {
                staleTime: 60* 1000,},
        }
    }); // Create a new instance of QueryClient

    return (
        <html lang="en" className="scroll-smooth relative" suppressHydrationWarning>
            <body  suppressHydrationWarning={true}>
            
            <ClientProviders>

                <div className='flex flex-row justify-between '>
                    <SideBar />
                    <main className='flex flex-col w-full mx-10'>
                        <Header/>
                        {children}
                    </main>
                </div>
            </ClientProviders>

            {/* <Toaster position='top-center' gutter={12} containerStyle={{margin:'8px'}} toastOptions={{
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
            }}/> */}
            </body>
        </html>
     
    );
}
