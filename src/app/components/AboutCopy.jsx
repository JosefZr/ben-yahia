"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSectionInView } from '@/hooks/useSectionInView';
import { Input, Textarea } from "@nextui-org/react";
import Image from 'next/image';
import CustomButton from './Button';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { handleEmailSubmit } from '../api/email/route';
import useReveal from '@/hooks/useReveal';

function AboutCopy() {
    const r = useTranslations('Navbar');
    const t = useTranslations('Email');
    const { ref: refView } = useSectionInView(r("contact.name"), 0.2);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0 0.5"]
    });
    const scalProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    const { register, handleSubmit } = useForm();
    const onSubmit =async (data) => {
        const { email, name, comment } = data;
        console.log(data)
        const { success, error } = await handleEmailSubmit({ name, email,comment });

            if (success) {
                toast.success('email sent succefuly')
            }
            else{
                toast.error(error);
            }
    };
    useReveal("horizontal")
    useReveal("vertical")
    return (
        <motion.div 
            ref={ref}
            style={{ scale: scalProgress, opacity: opacityProgress }}
            className='text-center scroll-mt-28 mx-auto  rounded-3xl mb-20'
            id='Contact'
        >
            <section ref={refView} className='max-w-5xl mx-auto '>
                <header className='flex flex-col justify-center col-span-full text-left max-sm:text-center mx-10 pb-10 gap-5'>
                    <h1 className='reveal-vertical capitalize text-center font-bold md:text-6xl text-5xl whitespace-normal text-light-green'>
                        {t("title")}
                    </h1>
                </header>
                <div className='flex flex-row-reverse max-md:flex-col-reverse justify-center items-center max-md:gap-2 md:h-[450px] mx-5 max-md:mx-10 max-[440px]:mx-3'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1399.4967976968865!2d4.743600647479474!3d36.07190868443337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128cbd8220c8e483%3A0xec384411432f8300!2sCabinet%20dentaire%20Dr.%20M.%20Benyahia!5e0!3m2!1sar!2sdz!4v1719099444995!5m2!1sar!2sdz"
                        width="600"
                        height="450"
                        className='reveal-horizontal-right rounded-tr-2xl rounded-br-3xl w-[70%] sm:w-[600px] max-sm:w-full max-md:rounded-3xl'
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Carte de localisation du cabinet dentaire Dr. M. Benyahia" // Ajout du titre ici
                    />
                    <div className='reveal-horizontal-left flex flex-col justify-center gap-5 bg-default-200 rounded-bl-2xl rounded-tl-3xl max-md:rounded-3xl px-10 md:max-lg:px-3 h-full w-[40%] sm:w-[600px] max-sm:w-full  max-[500px]:px-5 max-md:py-5'>
                        <div className='flex flex-col items-center justify-center text-center'>
                            <Image
                                src="/logo/l7adj-2.webp"
                                width={120}
                                height={120}
                                style={{ width: 'auto', height: 'auto' }}
                                quality={90}
                                alt='assistant'
                                className='rounded-full pointer-events-none'
                            />
                            <h1 className='font-medium text-xl'>{t("question")}</h1>
                        </div>
                        <form className='flex flex-col gap-4 relative' onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                {...register("name")}
                                type="text"
                                name="name"
                                label="Prénom"
                                labelPlacement="inside"
                                placeholder="Entrer Votre Nom"
                                required
                            />
                            <Input
                                {...register("email")}
                                type="email"
                                label="Email"
                                name="email"
                                labelPlacement="inside"
                                placeholder="Enter Votre Email"
                                required
                            />
                            <Textarea
                                {...register("comment")}
                                label="Description"
                                placeholder="Enter your description"
                                name="comment"
                                classNames={{
                                    base: "w-full",
                                    input: "resize-y min-h-[40px]"
                                }}
                                required
                            />
                            <CustomButton radius="xl" className='w-fit self-end bg-light-green text-white' type='submit'>
                                Envoyer un message
                            </CustomButton>
                        </form>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}

export default AboutCopy;
