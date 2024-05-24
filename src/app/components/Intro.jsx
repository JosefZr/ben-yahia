"use client"
import { motion } from 'framer-motion'
import {Link} from 'next/link';

import Image from 'next/image'
import CustomButton from './Button'
import { RiPhoneFill } from "react-icons/ri";
import { LuCalendarClock } from "react-icons/lu";
import { useSectionInView } from '@/hooks/useSectionInView';
import "../globals.css"

function Intro() {
    const { ref } = useSectionInView("accueil",0.5);
    return (
        <section className='flex items-center justify-around flex-col md:flex-row-reverse lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto gap-10 sm:gap-0 scroll-m-20' 
            id='accueil'
        >
            <div className='flex items-center justify-center pt-20' 
            ref={ref}
            >
                <motion.div className="relative" initial={{opacity:0,y:100 ,scale:0}} animate={{opacity:1, scale:1,y:0}}   transition={{type:"tween", duration:"0.2"}}>
                    <Image 
                        src="https://images.unsplash.com/photo-1588776813941-dcf9c55e84d2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt='Profile Picture'
                        width="400"
                        height="400"
                        quality="95"
                        priority={true}
                        className='md:h-80 md:w-80 xl:h-100 xl:w-100 h-60 w-60 rounded-full object-cover border-[0.35rem] border-white shadow-xl'
                    />
                    <span className='absolute -top-10 -right-0 text-8xl '>
                        👋 
                    </span>
                </motion.div>
            </div>
            <motion.div className='flex flex-col gap-10 mt-10' mx-auto initial={{opacity:0, y:-100}} animate={{opacity:1, y:0}}>
                <h1 className=' mx-auto xl:text-9xl lg:text-8xl sm:text-7xl text-6xl font-bold'>Exceptional <br/><span className="font-bold text-primary ">Dental</span> Care</h1>
                <p className='max-w-md md:text-left text-center xl:max-w-2xl lg:max-w-xl md:max-w-md  text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quod reiciendis velit molestiae. Eius iste, perspiciatis beatae nostrum voluptatum ad modi at aut consectetur est repudiandae nemo ratione assumenda odit.
                </p>
                <div className='flex sm:flex-row flex-col items-center gap-2 sm:gap-8'>
                    <CustomButton as={Link} color='primary' size="lg">Book an Appointment</CustomButton>
                    <CustomButton as={Link} color="primary" variant='ghost' size="lg" icon={<RiPhoneFill />}>05-52-00-25-02</CustomButton>
                </div>
                <div className='flex justify-center sm:justify-start  items-center flex-row gap-8 ' >
                    <CustomButton icon={<LuCalendarClock />} size="lg" color="primary" variant="flat"/>
                    <div className='flex flex-col '>
                        <h1>Opening Hours</h1>
                        <p>Sat-Fry 8:00 - 16:00</p>
                    </div>
                </div>
            </motion.div>
            
        </section>
    )
}

export default Intro