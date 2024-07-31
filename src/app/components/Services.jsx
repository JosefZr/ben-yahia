"use client"
import React, { useRef } from 'react';
import AboutCards from './AboutCards';
import { useSectionInView } from '@/hooks/useSectionInView';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { headerAnimate } from '../lib/Animation';
import { useServices } from '../lib/data';
export default function Services() {
    const services= useServices()
    const r = useTranslations('Navbar');
    const { ref: refView } = useSectionInView(r("services.name"), 0.1);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0.4 1"]
    });

    const scalProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

    const s = useTranslations('Services');

    return (
        <motion.div
            ref={ref}
            id="services"
            style={{ scale: scalProgress, opacity: opacityProgress }}
            className='max-lg:mx-5 max-w-screen-lg mx-auto'
        >
            <motion.div
                initial={"offscreen"}
                whileInView={"onscreen"}
                transition={{ staggerChildren: 0.5 }}
                viewport={{ once: false, amount: 0.5 }}
                ref={refView}
                className='flex flex-col justify-center col-span-full text-left max-sm:text-center mx-auto mb-14 gap-10'
            >
                <motion.h1 variants={headerAnimate} className='capitalize font-bold sm:text-7xl text-5xl whitespace-normal text-light-green'>
                    {s("header.title")}
                </motion.h1>
            </motion.div>
            <motion.div className='grid sm:grid-cols-1 md:grid-cols-2 gap-10 justify-center mx-auto'>
                {services.map((service, index) => (
                    <AboutCards
                        key={index}
                        titre={service.titre}
                        content={service.content}
                        image={service.image}
                        icon={service.icon}
                        direction={service.direction}
                        index={index} // Pass index if needed inside AboutCards
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}
