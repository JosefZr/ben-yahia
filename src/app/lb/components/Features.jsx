"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { slideInButtonsPlay } from "../../lib/Animation";
import { uselbFeaturs } from "@/app/lib/data";
import { useSectionInView } from '@/hooks/useSectionInView';
import useReveal from '@/hooks/useReveal';

function Features() {
    const features = uselbFeaturs();
    const ref = useRef(null);
    const { ref: refView } = useSectionInView("features", 0.3);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"],
    });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
    useReveal("horizontal")
    useReveal("vertical")

    return (
        <motion.div 
            className='text-center scroll-mt-28 max-w-[1300px] max-sm:mx-0  mx-auto rounded-3xl mb-20 '
            id='features'
            ref={refView}
            style={{ scale: scaleProgress, opacity: opacityProgress }}
        >
            <section className='bg-transparent flex lg:flex-row flex-col justify-center gap-10 max-sm:mx-3 mx-auto  md:py-10 pb-10 items-start max-xl:items-center rounded-xl'>
                <div className='flex items-center flex-col gap-10'>
                    <h1 className='reveal-vertical lg:hidden capitalize font-bold sm:text-7xl text-5xl whitespace-normal text-light-purple'>Why choose implants over other solutions❓</h1>
                    <div className=' flex items-center flex-col gap-10'>
                        <Image  
                            src="/lb/pic1.webp"
                            alt='cabin'
                            width={500}
                            height={500}
                            quality={90}
                            style={{ height: 'auto' }}
                            className='reveal-horizontal-left rounded-xl pointer-events-none'
                        />
                    </div>  
                </div>
                <div className='flex flex-col max-lg:text-center text-start gap-10 px-4 max-xl:w-full w-[50%] pt-5 max-[450px]:px-0'>
                    <h1 className='reveal-horizontal-right max-lg:hidden relative capitalize font-bold sm:text-6xl text-5xl whitespace-normal text-light-purple'>Why choose implants over other solutions❓</h1>
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        exit="exit"
                        variants={{
                            animate: {
                                transition: {
                                    staggerChildren: 0.5,
                                },
                            },
                        }}
                        viewport={{ once: false, amount: 0.5 }}
                        className=' flex flex-col gap-3'
                    >
                        {features.map((feature, index) => (
                            <motion.h2 
                                key={index} 
                                variants={slideInButtonsPlay(index)}
                                className='text-5xl font-bold max-[450px]:text-3xl  capitalize text-default-700 text-bold-green leading-[4rem]'
                            >
                                • {feature.name}
                            </motion.h2>
                        ))}
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}

export default Features;
