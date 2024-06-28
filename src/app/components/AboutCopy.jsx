"use client"
import React, { useRef} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSectionInView } from '@/hooks/useSectionInView';
import { Button, Input, Textarea} from "@nextui-org/react";
import image from "../../../public/services/pexels-shkrabaanthony-5215024.jpg"
import Image from 'next/image';
import CustomButton from './Button';
function AboutCopy() {
  
    const { ref: refView } = useSectionInView("Contact",0.5);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0 0.5"]
    });
    const scalProgress = useTransform(scrollYProgress, [0,1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0,1], [0.6, 1]);

    return (
        <motion.div 
            ref={ref}
            style={{ scale: scalProgress, opacity: opacityProgress }}
            className='text-center scroll-mt-28   mx-auto  rounded-3xl'
            id='Contact'
        >
            <section ref={refView} className='max-w-5xl mx-auto '>
            <header className='flex flex-col justify-center col-span-full text-left max-sm:text-center mx-10 pb-10 gap-5'>
                    <h1 className='font-semibold text-5xl capitalize text-primary'>
                        Services de haute qualité <br /> pour vous
                    </h1>
                </header>
                <div className='flex flex-row-reverse max-md:flex-col justify-center items-center rounded-md  w-full mx-auto '>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1399.4967976968865!2d4.743600647479474!3d36.07190868443337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128cbd8220c8e483%3A0xec384411432f8300!2sCabinet%20dentaire%20Dr.%20M.%20Benyahia!5e0!3m2!1sar!2sdz!4v1719099444995!5m2!1sar!2sdz"
                        width="600"
                        height="450"
                        className='border-0  rounded-lg w-[70%]'
                        allowFullScreen="true"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className='flex flex-col gap-5  bg-slate-200 dark:bg-default-200 rounded-3xl px-10 py-3 w-[40%] max-md:w-[70%]'>
                        <div className='flex flex-col items-center justify-center text-center'>
                            <Image
                                src={image}
                                height={100}
                                alt='assistant'
                                className='rounded-full'
                                
                            />
                            <h1 className=' font-medium text-xl text-primary'>Comment puis-je t&apos;aider?</h1>
                        </div>
                        <form action="" className=' flex flex-col gap-4 relative'>
                            <Input
                                type="nom"
                                label="Prénom"
                                labelPlacement="outside"
                                placeholder="Entrer Votre Nom"
                            />
                            <Input
                                type="email"
                                label="Email"
                                labelPlacement="outside"
                                placeholder="Enter Votre Email"
                            />
                            <Input
                                type="email"
                                label="Email"
                                labelPlacement="outside"
                                placeholder="Enter Votre Email"
                                className=' h-10'
                            />
                            <CustomButton radius="full" className='' color='primary' >
                                Envoyer un message
                            </CustomButton>
                        </form>
                    </div>
                </div>            
                </section>
        </motion.div>
    )
}

export default AboutCopy;
