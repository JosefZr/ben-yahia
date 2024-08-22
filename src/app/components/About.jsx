"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform} from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSectionInView } from '@/hooks/useSectionInView';
import useReveal from '@/hooks/useReveal';
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
    useReveal("horizontal")
    useReveal("vertical")

    return (
        <motion.div 
            className='text-center scroll-mt-28 max-sm:mx-0 mx-auto rounded-3xl mb-20'
            id='nous'
            ref={ref}
            style={{ scale: scalProgress, opacity: opacityProgress }}
        >
            <section 
                ref={refView}
                className='bg-transparent flex xl:flex-row flex-col justify-center gap-10 max-sm:mx-5 mx-auto md:px-10 md:py-10 pb-10 items-start max-xl:items-center  rounded-xl'
                >
                <div className=' flex items-center flex-col gap-10'>
                    <h1 className='reveal-vertical xl:hidden capitalize  font-bold sm:text-7xl text-5xl whitespace-normal text-light-green'>{t('title')} </h1>
                    <Image  
                        src="/lhadj.webp"
                        alt='cabin'
                        width={350}
                        height={600}
                        style={{ width: 'auto', height: 'auto' }}
                        className='pointer-events-none reveal-horizontal-left rounded-xl'
                        />
                    </div>
                <div className='flex flex-col max-xl:text-center text-start gap-10 px-4 max-xl:w-full w-[50%] pt-5'>
                    <h1 className='reveal-horizontal-right max-xl:hidden relative capitalize  font-bold sm:text-7xl text-5xl whitespace-normal text-light-green'>{t('title')} </h1>
                    <h2 className='reveal-horizontal-right text-2xl max-sm:text-lg capitalize text-default-700 text-bold-green leading-10 '>{t("description")}</h2>
                </div>
            </section>
        </motion.div>
    )
}

export default About;
