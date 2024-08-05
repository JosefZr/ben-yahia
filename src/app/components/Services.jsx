"use client";
import React, { useEffect, useRef } from 'react';
import AboutCards from './AboutCards';
import { useSectionInView } from '@/hooks/useSectionInView';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useServices } from '../lib/data';

export default function Services() {
    const services = useServices();
    const r = useTranslations('Navbar');
    const { ref: refView } = useSectionInView(r("services.name"), 0.1);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0.4 1"]
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

    const s = useTranslations('Services');

    useEffect(() => {
        const handleScroll = () => {
            const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const revealTop = reveals[i].getBoundingClientRect().top;
                const revealPoint = 150;

                if (revealTop < windowHeight - revealPoint) {
                    reveals[i].classList.add('activation');
                } else {
                    reveals[i].classList.remove('activation');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.div
            ref={ref}
            id="services"
            style={{ scale: scaleProgress, opacity: opacityProgress }}
            className='max-lg:mx-5 max-w-screen-lg mx-auto'
        >
            <motion.div
                initial={"offscreen"}
                whileInView={"onscreen"}
                transition={{ staggerChildren: 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
                ref={refView}
                className='flex flex-col justify-center col-span-full text-center max-sm:text-center mx-auto mb-14 gap-10'
            >
                <h1 
                    className='reveal capitalize font-bold sm:text-7xl text-5xl whitespace-normal text-light-green'>
                    {s("header.title")}
                </h1>
            </motion.div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-10 justify-center'>
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`about-card reveal-${index % 2 === 0 ? 'left' : 'right'}`}
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
        </motion.div>
    );
}
