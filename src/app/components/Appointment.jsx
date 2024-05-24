"use client"
import { useSectionInView } from '@/hooks/useSectionInView';
import { Input } from '@nextui-org/react';
import { useScroll,motion, useTransform } from 'framer-motion';
import React, { useRef } from 'react'
function Appointment() {
    const { ref: refView } = useSectionInView("rendez-vous",0.5);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.8 1"]
        
    });
    const scalProgress = useTransform(scrollYProgress, [0,1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0,1], [0.6, 1]);

    
    return (
        <motion.div 
            className="container mx-auto scroll-mt-28 max-w-8xl" 
            ref={ref} 
            id='rendez-vous'
            style={{scale: scalProgress, opacity: opacityProgress }}>
            <div className='flex flex-col justify-around'ref={refView}>
                
                <h1 className='capitalize text-5xl font-semibold'>book online <br /> now <span className=' font-extrabold text-primary'>.</span></h1>
                <Input
                    key="insize1"
                    type="email"
                    label={`Your Name`}
                    variant='bordered'
                    size='lg'
                    labelPlacement="inside"
                    description="inside"
                    radius='full'
                />
                <Input
                    key="insize2"
                    type="email"
                    label={`Email Address`}
                    variant='bordered'
                    size='lg'
                    labelPlacement="inside"
                    description="inside"
                    radius='full'
                />
                <Input
                    key="insize3"
                    type="date"
                    label={`rendez-vous`}
                    variant='bordered'
                    size='lg'
                    labelPlacement="inside"
                    description="inside"
                    radius='full'
                />
            </div>
            <div >
                
            </div>

        </motion.div>
    )
}

export default Appointment