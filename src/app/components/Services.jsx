"use client";
import React, { useRef } from 'react';
import AboutCards from './AboutCards';
import { useSectionInView } from '@/hooks/useSectionInView';
import { useTranslations } from 'next-intl';
import { useServices } from '../lib/data';
import useReveal from '@/hooks/useReveal';

export default function Services() {
    const services = useServices();
    const r = useTranslations('Navbar');
    const { ref: refView } = useSectionInView(r("services.name"), 0.1);
    const ref = useRef(null);

    const s = useTranslations('Services');

    useReveal('vertical');
    useReveal('horizontal');

    return (
        <div
            ref={ref}
            id="services"
            className='max-lg:mx-5 max-w-screen-lg mx-auto mb-20'
        >
            <div
                ref={refView}
                className='flex flex-col justify-center col-span-full text-center max-sm:text-center mx-auto mb-14 gap-10'
            >
                <h1 
                    className='reveal-vertical capitalize font-bold sm:text-7xl text-5xl whitespace-normal text-light-green'>
                    {s("header.title")}
                </h1>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-10 justify-center'>
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`about-card reveal-horizontal-${index % 2 === 0 ? 'left' : 'right'}`}
                    >
                        <AboutCards
                            titre={service.titre}
                            content={service.content}
                            image={service.image}
                            icon={service.icon}
                            direction={service.direction}
                            index={index}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
