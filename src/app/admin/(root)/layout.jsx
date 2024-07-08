"use client";
import { Nunito_Sans } from "next/font/google";
import React from 'react';
import Sidbar from '../global/Sidbar';
import TopBar from '../global/Topbar';
import ClientProviders from '@/app/[locale]/ClientProviders';
import '../../[locale]/globals.css';

// Move the font loader to the module scope
const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth relative" suppressHydrationWarning>
            <body className={nunito.className} suppressHydrationWarning={true}>
                <ClientProviders>
                    <div className='flex flex-row justify-between min-h-screen '>
                        <Sidbar />
                        <main className='w-full overflow-x-auto'>
                            <TopBar />
                            {children}
                        </main>
                    </div>
                </ClientProviders>
            </body>
        </html>
    );
}
