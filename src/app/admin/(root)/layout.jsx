"use client";
import { Nunito_Sans } from "next/font/google";
import React from 'react';
import Sidbar from '../global/Sidbar';
import TopBar from '../global/Topbar';
import ClientProviders from '@/app/[locale]/ClientProviders';
import '../../[locale]/globals.css';
import SideNav from "../global/nav-side";

// Move the font loader to the module scope
const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth relative" suppressHydrationWarning>
            <body className={nunito.className} suppressHydrationWarning={true}>
                <ClientProviders>
                <div className="flex min-h-screen">
                        <SideNav />
                        <main className="flex-1 ml-0 md:ml-60 overflow-scroll">
                            <TopBar />
                            {children}
                        </main>
                    </div>

                </ClientProviders>
            </body>
        </html>
    );
}
