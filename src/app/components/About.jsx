"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform} from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSectionInView } from '@/hooks/useSectionInView';
import {textAboutAnimate, imageAnimate} from "../lib/Animation"
function About() {
    const t = useTranslations('About');
    const r = useTranslations('Navbar')
    const { ref: refView } = useSectionInView(r("us.name"), 0.3);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"],
        offset: ["0 1", "0 0.5"]
    });
    const scalProgress = useTransform(scrollYProgress, [0,1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0,1], [0.6, 1]);
    
    return (
        <motion.div 
            className='text-center scroll-mt-28 container mx-auto rounded-3xl'
            id='nous'
            ref={ref}
            style={{ scale: scalProgress, opacity: opacityProgress }}
        >
            <motion.section 
                ref={refView}
                className='bg-transparent flex xl:flex-row flex-col justify-center gap-10 max-sm:mx-5 mx-auto md:px-10 md:py-10 pb-10 items-start max-xl:items-center  rounded-xl'
                >
                <motion.div  
                    initial={"offscreen"} 
                    whileInView={"onscreen"} 
                    transition={{ staggerChildren: 1 }} 
                    viewport={{ once: false, amount: 0.3 }}
                    className=' flex items-center flex-col gap-10'
                >
                    <motion.h1 variants={textAboutAnimate} className='xl:hidden capitalize  font-bold sm:text-7xl text-5xl whitespace-normal text-light-green'>{t('title')} </motion.h1>
                    <motion.div  
                        
                        initial={"offscreen"} 
                        whileInView={"onscreen"} 
                        viewport={{once:false, amount: 0.1 }}
                        variants={imageAnimate('left')}
                        className=' flex items-center flex-col gap-10'
                >
                    <Image  
                        src="/lhadj.webp"
                        alt='cabin'
                        width={400}
                        height={700}
                        style={{ width: 'auto', height: 'auto' }}
                        className=' rounded-xl'
                        />
                </motion.div>
                    
                </motion.div>
                <motion.div 
                    className='flex flex-col max-xl:text-center text-start gap-10 px-4 max-xl:w-full w-[50%] pt-5'   
                    initial={"offscreen"} 
                    whileInView={"onscreen"} 
                    transition={{staggerChildren: 0.1 }} 
                    viewport={{once: false, amount: 0.1 }}
                >
                    <motion.h1 variants={textAboutAnimate} className='max-xl:hidden relative capitalize  font-bold sm:text-7xl text-5xl whitespace-normal text-light-green'>{t('title')} </motion.h1>
                    <motion.h2 variants={textAboutAnimate} className='text-2xl max-sm:text-lg capitalize text-default-700 text-bold-green leading-10 '>{t("description")}</motion.h2>
                </motion.div>
            </motion.section>
        </motion.div>
    )
}

export default About;
