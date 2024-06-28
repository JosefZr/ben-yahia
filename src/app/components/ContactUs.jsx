"use client";
import React, { useRef } from 'react';
import { useSectionInView } from '@/hooks/useSectionInView';
import { Input } from '@nextui-org/react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import image from "../../../public/services/pexels-shkrabaanthony-5215024.jpg";

export default function ContactUs() {
    const { ref: refView } = useSectionInView("Contact", 0.1);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0 0.4"]
    });

    const scalProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

    return (
        <motion.div ref={ref} style={{ scale: scalProgress, opacity: opacityProgress}} id="Contact" className="relative">
            <section ref={refView} className="max-w-5xl mx-auto relative">
                <header className='flex flex-col justify-center col-span-full text-left max-sm:text-center mx-auto mb-14 gap-10'>
                    <h1 className='font-semibold text-5xl capitalize text-primary'>
                        Services de haute qualité <br /> pour vous
                    </h1>
                </header>
                <div className='flex flex-row-reverse justify-center gap-5'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1399.4967976968865!2d4.743600647479474!3d36.07190868443337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128cbd8220c8e483%3A0xec384411432f8300!2sCabinet%20dentaire%20Dr.%20M.%20Benyahia!5e0!3m2!1sar!2sdz!4v1719099444995!5m2!1sar!2sdz"
                        width="600"
                        height="450"
                        className='border-0 w-[60%]'
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className='flex flex-col w-[40%] gap-5'>
                        <div className='flex flex-col items-center justify-center text-center mx-auto'>
                            <Image
                                src={image}
                                height={100}
                                alt='assistant'
                                className='rounded-full'
                            />
                            <h1>Comment puis-je t&apos;aider?</h1>
                        </div>
                        <form action="">
                            <Input
                                type="email"
                                label="Email"
                                labelPlacement="outside"
                                placeholder="Enter your email"
                            />
                            <Input
                                type="email"
                                label="Email"
                                labelPlacement="outside"
                                placeholder="Enter your email"
                            />
                            <Input
                                type="email"
                                label="Email"
                                labelPlacement="outside"
                                placeholder="Entrer Votre Email"
                            />
                        </form>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
