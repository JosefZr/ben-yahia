"use client"
import React, { useRef } from 'react';
import AboutCards from './AboutCards';
import { useSectionInView } from '@/hooks/useSectionInView';
import { useScroll, useTransform ,motion} from 'framer-motion';

export default function Services() {
    const services = [
        {
            titre:"plombage dentaire",
            content:"On dans la mesure de soulager vos douleurs causée par les algies dentaires, on s'assure de restairer le dent comme elle était dejà auparavant ",
            image:"https://images.pexels.com/photos/6627536/pexels-photo-6627536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            titre:"prothése ",
            content:"On assure ke confectionnement des prothése dentaire, les coiffe unitaire pour combler et compenser le manque ou l'absence totale de vos dents et vous redonner vos sourire naturelle.",
            image:"https://images.pexels.com/photos/6529121/pexels-photo-6529121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            titre:"blanchiment",
            content:"On traite les maladie qui touchele support des dent par offrir un détartage professionnele, un eclairecissement des dents meme aussi traiter les gingivites",
            image:"https://images.pexels.com/photos/4687905/pexels-photo-4687905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            titre:"orthopédie dento faciale",
            content:"On offre a vous des traitement orthoontique pour traiter et corriger les malocclisions, les chevauchements dentaires, par l'intermediares des appareils bien précise suivi par des contentions.",
            image:"https://images.pexels.com/photos/287227/pexels-photo-287227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
    ]
    const { ref: refView } = useSectionInView("services",0.1);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0.4 1"]
        
    });
    const scalProgress = useTransform(scrollYProgress, [0,1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0,1], [0.8, 1]);
    return (
        <motion.div 
            ref={ref} 
            id="services" 
            style={{scale: scalProgress, opacity: opacityProgress }}
            className='scroll-mt-28 max-lg:mx-5 max-w-screen-lg mx-auto'
        >
            <div ref={refView} className=' flex flex-col justify-center col-span-full text-left max-sm:text-center mx-auto mb-14 gap-10'>
                <h1 className='font-semibold text-5xl capitalize text-primary'>Services de haute qualité <br /> pour vous</h1>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-10 justify-center mx-auto  '>
            {services.map((service)=>{
                return(
                    <AboutCards titre={service.titre} key={service.titre} content={service.content} image={service.image}/>
                )
            })}
            </div>
        </motion.div>
    );
}
