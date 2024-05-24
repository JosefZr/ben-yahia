"use client"
import React, { useRef } from 'react';
import AboutCards from './AboutCards';
import { useSectionInView } from '@/hooks/useSectionInView';
import { useScroll, useTransform ,motion} from 'framer-motion';

export default function Services() {
    const services = [
        {
            titre:"plombage dentaire",
            content:"on dans la mesure de soulager vos douleurs causée par les algies dentaires, on s'assure de restairer le dent comme elle était dejà auparavant ",
            image:"/services/tooth_3895130.png"
        },
        {
            titre:"prothése ",
            content:"on assure ke confectionnement des prothése dentaire, les coiffe unitaire pour combler et compenser le manque ou l'absence totale de vos dents et vous redonner vos sourire naturelle.",
            image:"/services/braces_3895081.png"
        },
        {
            titre:"blanchiment",
            content:"on traite les maladie qui touchele support des dent par offrir un détartage professionnele, un eclairecissement des dents meme aussi traiter les gingivites",
            image:"/services/implant_3895214.png"
        },
        {
            titre:"orthopédie dento faciale",
            content:"on offre a vous des traitement orthoontique pour traiter et corriger les malocclisions, les chevauchements dentaires, par l'intermediares des appareils bien précise suivi par des contentions.",
            image:"/services/anesthetic_3895151.png"
        },
    ]
    const { ref: refView } = useSectionInView("services",0.7);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"]
        
    });
    const scalProgress = useTransform(scrollYProgress, [0,1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0,1], [0.6, 1]);
    return (
        <motion.div 
            ref={ref} 
            id="services" 
            style={{scale: scalProgress, opacity: opacityProgress }}
            className='scroll-mt-28'
            >
            <div ref={refView} className=' flex flex-col justify-center col-span-full text-center max-w-4xl mx-auto m-4 gap-10'>
                <h2 className='text-4xl font-bold leading-10'>
                    Nos services
                </h2>
                <h1 className='font-bold text-5xl capitalize text-primary'>what we offer for you</h1>
                <p className=''>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus blanditiis reprehenderit quae labore dignissimos mollitia maxime corporis dolor voluptatem similique ducimus illum repudiandae inventore incidunt odio ipsum, aliquam nobis quisquam.</p>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-10 justify-center mx-auto max-w-screen-xl '>
            {services.map((service)=>{
                return(
                    <AboutCards titre={service.titre} key={service.titre} content={service.content} image={service.image}/>
                )
            })}
            </div>
        </motion.div>
    );
}
