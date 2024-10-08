"use client";
import React from 'react';
import "../[locale]/globals.css"
import ClientProviders from "../[locale]/ClientProviders";

// Configure the font correctly
import { nunitoSans } from '@/utils/font';
export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth relative" suppressHydrationWarning>
            <body className={nunitoSans.className} suppressHydrationWarning={true}>
                <ClientProviders>
                <div className="flex min-h-screen">
                        <main className="flex-1 ml-0 md:ml-60 overflow-scroll">
                            {children}
                        </main>
                    </div>

                </ClientProviders>
            </body>
        </html>
    );
}
