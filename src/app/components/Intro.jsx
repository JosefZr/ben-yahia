"use client"
import { useEffect, useRef } from 'react';
import Hero from './Hero';
import Reserving from './Reserving';
import { motion, useScroll, useTransform } from 'framer-motion';

function Intro() {
    const Loader =({setLoading})=>{
        useEffect(()=>{
            const timer = setTimeout(()=>{
                setLoading(false);
            },4000);
            return ()=> clearTimeout(timer)
        })
    }
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    return (
        <motion.section
            style={{ opacity }}
            ref={targetRef}
            className="relative h-screen scroll-m-20 flex items-center justify-evenly flex-col"
            id='accueil'
        >
            <motion.div 
                className='fixed '
                style={{scale}}
            >
                <Hero />
                <Reserving />
            </motion.div>
        </motion.section>
    );
}

export default Intro;
