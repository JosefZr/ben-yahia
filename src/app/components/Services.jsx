"use client"
import React, { useRef } from 'react';
import AboutCards from './AboutCards';
import { useSectionInView } from '@/hooks/useSectionInView';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Header from './Header';

export default function Services() {
    const t = useTranslations('Services');
    const services = [
        {
            titre: t("Implant.title"),
            content: t('Implant.description'),
            image: '/services/implant.jpg',
            icon: "https://img.icons8.com/?size=100&id=GSlkzWZjhPmT&format=png&color=214030"
        },{
            titre: t("Braces.title"),
            content: t('Braces.description'),
            image: "/services/braces.jpg",
            icon: "https://img.icons8.com/?size=100&id=ZDLptEjyNsEC&format=png&color=214030"
        },{
            titre: t("Crown.title"),
            content: t('Crown.description'),
            image: "/services/crown.jpg",
            icon: "https://img.icons8.com/?size=100&id=2j8774BkNjto&format=png&color=214030"
        },{
            titre: t("Filling.title"),
            content: t('Filling.description'),
            image: "/services/filling.jpg",
            icon: "https://img.icons8.com/?size=100&id=9RFbbtSrKPzM&format=png&color=214030"
        },{
            titre: t("Bridges.title"),
            content: t('Bridges.description'),
            image: "/services/bridges.jpg",
            icon: "https://img.icons8.com/?size=100&id=Ax1nHq12vdvJ&format=png&color=214030"
        },{
            titre: t("Check.title"),
            content: t('Check.description'),
            image: "/services/check.jpg",
            icon: "https://img.icons8.com/?size=100&id=Qynk0dQDDiY4&format=png&color=214030"
        },{
            titre: t("Whitening.title"),
            content: t('Whitening.description'),
            image: "/services/whitening.jpg",
            icon: "https://img.icons8.com/?size=100&id=TEEyuMyShFK0&format=png&color=214030"
        },{
            titre: t("Scaling.title"),
            content: t('Scaling.description'),
            image: "/services/scaling.jpg",
            icon: "https://img.icons8.com/?size=100&id=7A92Y2BcmAqx&format=png&color=214030"
        },{
            titre: t("Root.title"),
            content: t('Root.description'),
            image: "/services/root.jpg",
            icon: "https://img.icons8.com/?size=100&id=olmK5dbavUrn&format=png&color=214030"
        },{
            titre: t("Wisdom.title"),
            content: t('Wisdom.description'),
            image: "/services/wisdom.jpg",
            icon: "https://img.icons8.com/?size=100&id=eAO25vPIMU17&format=png&color=214030"
        },{
            titre: t("Denture.title"),
            content: t('Denture.description'),
            image: "/services/dentures.jpg",
            icon: "https://img.icons8.com/?size=100&id=wpfUlRXFcAiU&format=png&color=214030"
        },
        

    ];
    const r = useTranslations('Navbar');
    const { ref: refView } = useSectionInView(r("services.name"), 0.1);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0.4 1"]
    });
    const scalProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    
    const s = useTranslations('Services')
    return (
        <motion.div 
            ref={ref} 
            id="services" 
            style={{ scale: scalProgress, opacity: opacityProgress }}
            className=' max-lg:mx-5 max-w-screen-lg mx-auto'
        >
            <div ref={refView} className='flex flex-col justify-center col-span-full text-left max-sm:text-center mx-auto mb-14 gap-10'>
                <Header  title={s("header.title")}/>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-10 justify-center mx-auto'>
                {services.map((service,index) => (
                    <AboutCards 
                        key={index} 
                        titre={service.titre} 
                        content={service.content} 
                        image={service.image} 
                        icon={service.icon} 
                    />
                ))}
            </div>
        </motion.div>
    );
}
