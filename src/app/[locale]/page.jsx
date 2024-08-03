"use client"
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Loader = dynamic(() => import('../components/Loader'));

const SectionDivider = dynamic(() => import('../components/SectionDivider'));
const Services = dynamic(() => import('../components/Services'));
const About = dynamic(() => import('../components/About'));
const AboutCopy = dynamic(() => import('../components/AboutCopy'));
const Footer = dynamic(() => import('../components/Footer'));

import { motion , AnimatePresence } from "framer-motion";
import MyNavbar from "../components/Navbar";
import Intro from "../components/Intro";

export default function Home() {
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    loading
    ? document.querySelector('body').classList.add('loading')
    : document.querySelector("body").classList.add('loading');
  },[loading])
  return (
    <AnimatePresence>
    {loading ?(
      <Loader setLoading={setLoading }exit={{ opacity: 0, transition: { ease: "easeInOut", duration: 3.8 } }}/>
    ):(
      <div className="relative min-h-screen overflow-hidden">
        {/* Background elements */}
        <div className="bg-[#dbd7fd] absolute top-[-6rem] -z-10 right-[1rem] h-[31.25rem] w-[68.75rem] rounded-full blur-[10rem]"></div>
        <div className="bg-[#fbe2e3] absolute top-[10rem] -z-10 left-[-35rem] h-[31.25rem] w-[50.25rem] rounded-full blur-[10rem] sm:left-[-20rem] md:left-[-28rem] lg:left-[-28rem] xl:left-[5rem] 2xl:left-[50rem]"></div>
        <motion.div  initial={{ opacity: 0, y: -80 }}
            animate={{opacity: 1, y:0}}
            transition={{ ease:"easeInOut",duration:1, delay:.4}}>
          <MyNavbar />
        </motion.div>
        <Intro />
        <div className="relative z-20  overflow-x-clip">
          <div className="bg-[#fbe2e3] absolute top-1/4 -z-10 right-[11rem] h-[31.25rem] w-[68.75rem] rounded-full blur-[10rem]"></div>
          <div className="bg-[#dbd7fd] absolute top-1/4 -z-10 right-[-35rem] h-[31.25rem] w-[50.25rem] rounded-full blur-[10rem] sm:right-[-20rem] md:right-[-28rem] lg:right-[-28rem] xl:right-[5rem] 2xl:right-[-50rem]"></div>

          <Services />
          <div className="bg-[#dbd7fd] absolute top-1/2 -z-10 right-[-50rem] h-[31.25rem] w-[68.75rem] rounded-full blur-[10rem]"></div>
          <div className="bg-[#fbe2e3] absolute top-1/2 -z-10 left-[-50rem] h-[31.25rem] w-[50.25rem] rounded-full blur-[10rem] sm:left-[-20rem] md:left-[-28rem] lg:left-[-28rem] xl:left-[5rem] 2xl:left-[50rem]"></div>
          <SectionDivider />

          <About />

          <div className="bg-[#dbd7fd] absolute top-3/4 -z-10 right-[1rem] h-[31.25rem] w-[68.75rem] rounded-full blur-[10rem]"></div>
          <div className="bg-[#fbe2e3] absolute top-3/4 -z-10 left-[-35rem] h-[31.25rem] w-[50.25rem] rounded-full blur-[10rem] sm:left-[-20rem] md:left-[-28rem] lg:left-[-28rem] xl:left-[5rem] 2xl:left-[50rem]"></div>
           {/* <SectionDivider /> */}


          <SectionDivider />
          <AboutCopy />
          <SectionDivider />

        </div>
        <Footer />

      </div>
    )}
    </AnimatePresence>
  );
}
