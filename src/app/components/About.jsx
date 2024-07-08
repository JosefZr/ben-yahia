"use client"
import React, { useRef} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSectionInView } from '@/hooks/useSectionInView';
import { RiShieldCheckLine } from "react-icons/ri";
import { Image,} from "@nextui-org/react";
import CustomButton from './Button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

function About() {
    const qualitys =[{
        key:"1",
        text:"Top quality dental Team"
    },
    {
        key:"2",
        text:"experienced doctors over 30 years"
    },
    {
        key:"3",
        text:"enrollment is quick and easy"

    },
    {
        key:"4",
        text:"confertable envirmant"

    }    
] 
    const r = useTranslations('Navbar')
    const { ref: refView } = useSectionInView(r("us.name"),0.5);
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
            className='text-center scroll-mt-28 container mx-auto rounded-3xl'
            id='nous'
        >
            <section ref={refView} className='bg-transparent flex xl:flex-row flex-col justify-around max-sm:mx-5 mx-auto gap-10 md:px-10 md:py-10 pb-10 items-center rounded-xl'>
                <div>
                    <Image  
                        src='https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt='cabin'
                        height={400}
                        />
                </div>
                <div className='flex flex-col text-start gap-7 px-4'>
                    <h1 className=' capitalize  font-bold sm:text-6xl text-4xl whitespace-normal'> why choose us for <br />all your dental tratments? </h1>
                    <h2 className='text-lg capitalize text-default-700'>we use only the best quality materials on the market in order to provide the best products to our patiens</h2>
                        {qualitys.map((text)=>{
                            return(
                                <div key={text.key} className='flex flex-row items-center text-2xl capitalize gap-4 '>
                                    <RiShieldCheckLine className=' text-blue-600 text-4xl'/>
                                    <span key={text.text} className=' text-xl font-medium'>{text.text}</span>
                                </div>
                            ) 
                        })}
                    <CustomButton as={Link} href="/login" color='primary' size="lg" className="xl:w-60 ">Book an Appointment</CustomButton>
                </div>

                {/* <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 max-w-4xl max-w-8xl"
                    shadow="sm"
                >
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                        <div className="relative sm:col-span-10 col-span-7 md:col-span-6">
                        <Image
                            alt="Album cover"
                            className="object-cover"
                            height={200}
                            shadow="md"
                            src="https://images.pexels.com/photos/6809668/pexels-photo-6809668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            width="100%"
                            />
                        </div>
                        <div className='flex flex-col col-span-7 md:col-span-6'>
                            <div className="flex sm:justify-between items-center justify-center">
                                <div className="flex flex-col gap-5">
                                    <h1 className="text-2xl font-bold mt-2 capitalize">pourquoi nous?</h1>
                                    <h2 className="font-semibold text-foreground/90" >special dental care</h2>
                                    <h2 className="font-semibold text-foreground/90">special dental care</h2>
                                    <h2 className="font-semibold text-foreground/90">special dental care</h2>
                                    <h2 className="font-semibold text-foreground/90">special dental care</h2>
                                </div>
                            </div>
                            <div className=' flex sm:justify-start justify-center mt-5'>
                                <CustomButton color="primary" >prendre un rendivous </CustomButton>
                            </div>
                        </div>
                    </div>
                </Card> */}
            
            
            </section>
        </motion.div>
    )
}

export default About;
