"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import image from "../../../../public/lb/pic1.jpg";
import { textAboutAnimate, imageAboutAnimate, slideInButtonsPlay } from "../../lib/Animation";
import { uselbFeaturs } from "@/app/lib/data";

function Features() {
    const features = uselbFeaturs();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"],
    });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    return (
        <motion.div 
            className='text-center scroll-mt-28  mx-0 rounded-3xl'
            id='nous'
            ref={ref}
            style={{ scale: scaleProgress, opacity: opacityProgress }}
        >
            <motion.section 
                className='bg-transparent flex xl:flex-row flex-col justify-center gap-10 max-sm:mx-5 mx-auto md:px-10 md:py-10 pb-10 items-start max-xl:items-center rounded-xl'
            >
                <motion.div  
                    variants={imageAboutAnimate} 
                    initial="offscreen" 
                    whileInView="onscreen" 
                    transition={{ staggerChildren: 1 }} 
                    viewport={{ once: false, amount: 0.3 }}
                    className='flex items-center flex-col gap-10'
                >
                    <motion.h1 variants={textAboutAnimate} className='xl:hidden capitalize font-bold sm:text-7xl text-5xl whitespace-normal text-light-purple'>Let me update you with some features about dental</motion.h1>
                    <Image  
                        src={image}
                        alt='cabin'
                        width={400}
                        quality={90}
                        style={{ height: 'auto' }}
                        className='rounded-xl'
                    />
                </motion.div>
                <motion.div 
                    className='flex flex-col max-xl:text-center text-start gap-10 px-4 max-xl:w-full w-[50%] pt-5'   
                    initial="offscreen" 
                    whileInView="onscreen" 
                    transition={{ staggerChildren: 0.5 }} 
                    viewport={{ once: false, amount: 0.5 }}
                >
                    <motion.h1 variants={textAboutAnimate} className='max-xl:hidden relative capitalize font-bold sm:text-6l text-5xl whitespace-normal text-light-purple'>Let me update you with some features about dental</motion.h1>
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
                                className='text-4xl font-bold max-sm:text-lg  capitalize text-default-700 text-bold-green leading-10'
                            >
                                • {feature.name}
                            </motion.h2>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.section>
        </motion.div>
    );
}

export default Features;
