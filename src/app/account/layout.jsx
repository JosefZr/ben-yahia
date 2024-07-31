"use client";
import { Nunito_Sans } from '@next/font/google';

import React from 'react';
import "../[locale]/globals.css"
import ClientProviders from "../[locale]/ClientProviders";

// Move the font loader to the module scope
const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth relative" suppressHydrationWarning>
            <body className={nunito.className} suppressHydrationWarning={true}>
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
