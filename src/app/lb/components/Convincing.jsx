"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import image from "../../../../public/lb/pic2.webp";
import { textAboutAnimate, imageAboutAnimate, imageAnimate } from "../../lib/Animation";
import { uselbFeaturs } from "@/app/lib/data";

function Convincing() {
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
            className='text-center scroll-mt-28 max-w-[1300px] mx-auto container rounded-3xl'
            id='nous'
            ref={ref}
            style={{ scale: scaleProgress, opacity: opacityProgress }}
        >
            <motion.section 
                className='bg-transparent flex xl:flex-row-reverse flex-col justify-center gap-5 max-sm:mx-0 mx-auto md:px-10 md:py-10 pb-10 max-sm:px-5 max-[400px]:px-2 items-start max-xl:items-center rounded-xl'
            >
                <motion.div  
                    initial="offscreen" 
                    whileInView="onscreen" 
                    transition={{ staggerChildren: 1 }} 
                    viewport={{ once: false, amount: 0.3 }}
                    className='flex items-center flex-col gap-10'
                >
                    <motion.h1 variants={textAboutAnimate} className='xl:hidden capitalize font-bold sm:text-7xl text-5xl whitespace-normal max-[400px]:text-3xl'>
                        Dental implants are not only an <span className='text-word-purple'>Aesthetic</span> Procedure But also a <span className='text-word-purple'>Healthy</span> One
                    </motion.h1>
                    <motion.div  
                    
                    initial="offscreen" 
                    whileInView="onscreen" 
                    transition={{ staggerChildren: 1 }} 
                    viewport={{ once: false, amount: 0.3 }}
                    variants={imageAnimate('left')}
                    className='flex items-center flex-col gap-5'
                >
                    <Image  
                        src={image}
                        alt='cabin'
                        width={500}
                        height={500}
                        quality={90}
                        style={{ height: 'auto' }}
                        className='rounded-xl'
                    />
                </motion.div>
                </motion.div>
                <motion.div 
                    className='flex flex-col max-xl:text-center text-start gap-5 max-xl:w-full w-[50%] pt-5'   
                    initial="offscreen" 
                    whileInView="onscreen" 
                    transition={{staggerChildren: 0.4 }} 
                    viewport={{once: false, amount: 0.2 }}
                >
                    <motion.h1 variants={textAboutAnimate} className='max-xl:hidden relative capitalize font-bold max-sm:text-3xl text-5xl whitespace-normal '>
                        Dental implants are not only an <span className='text-word-purple'>Aesthetic</span> Procedure But also a <span className='text-word-purple'>Healthy</span> One
                    </motion.h1>
                    <motion.h2   
                        className='text-center xl:text-left max-sm:text-3xl sm:text-5xl  font-bold capitalize'
                        variants={textAboutAnimate}
                        // initial={{  x: 200,opacity: 0}}
                        // whileInView={{ x: 0, opacity: 1 }}
                        // viewport={{amount:"some"}}
                        // transition={{ type: "spring",  bounce: 0.4,
                        //     duration: 0.5 }}
                    >
                        They prevent Bone Loss
                    </motion.h2>
                </motion.div>
            </motion.section>
        </motion.div>
    );
}

export default Convincing;
