"use client";
import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import MyNavbar from "../components/Navbar";
import Intro from "../components/Intro";
import Loader from "../components/Loader";
import Services from "../components/Services";

const About = dynamic(() => import('../components/About'));
const AboutCopy = dynamic(() => import('../components/AboutCopy'));
const Footer = dynamic(() => import('../components/Footer'));

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleContextMenu = (event) => event.preventDefault();
    const handleKeydown = (event) => {
      if (event.key === 'PrintScreen' || (event.ctrlKey && event.key === 'p')) {
        event.preventDefault();
        alert("Screenshots and printing are disabled on this website!");
      }
    };

    if (loading) {
      document.querySelector('body').classList.add('loading');
    } else {
      document.querySelector('body').classList.remove('loading');
    }
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading ? (
        <Loader 
          setLoading={setLoading} 
          exit={{ opacity: 0, transition: { ease: "easeInOut", duration: 3.8 } }}
        />
      ) : (
        <div className="relative min-h-screen overflow-hidden  dark:bg-zinc-950 bg-slate-50">
          {/* Transparent overlay to interfere with screenshots */}
          <div className="screenshot-protection fixed inset-0 z-50 pointer-events-none "></div>

          {/* Background elements */}
          {/* <div className="bg-[#dbd7fd] absolute top-[-6rem] -z-10 right-[1rem] h-[31.25rem] w-[68.75rem] rounded-full blur-[10rem]"></div>
          <div className="bg-[#fbe2e3] absolute top-[10rem] -z-10 left-[-35rem] h-[31.25rem] w-[50.25rem] rounded-full blur-[10rem] sm:left-[-20rem] md:left-[-28rem] lg:left-[-28rem] xl:left-[5rem] 2xl:left-[50rem]"></div> */}
          <MyNavbar />
          <Intro />
          <div className="relative z-20 overflow-x-clip">
            {/* <div className="bg-[#fbe2e3] absolute top-1/4 -z-10 right-[11rem] h-[31.25rem] w-[68.75rem] rounded-full blur-[10rem]"></div>
            <div className="bg-[#dbd7fd] absolute top-1/4 -z-10 right-[-35rem] h-[31.25rem] w-[50.25rem] rounded-full blur-[10rem] sm:right-[-20rem] md:right-[-28rem] lg:right-[-28rem] xl:right-[5rem] 2xl:right-[-50rem]"></div> */}

            <Services />
            {/* <div className="bg-[#dbd7fd] absolute top-1/2 -z-10 right-[-50rem] h-[31.25rem] w-[68.75rem] rounded-full blur-[10rem]"></div>
            <div className="bg-[#fbe2e3] absolute top-1/2 -z-10 left-[-50rem] h-[31.25rem] w-[50.25rem] rounded-full blur-[10rem] sm:left-[-20rem] md:left-[-28rem] lg:left-[-28rem] xl:left-[5rem] 2xl:left-[50rem]"></div> */}
            <Suspense>
              <About />
              {/* <div className="bg-[#dbd7fd] absolute top-3/4 -z-10 right-[1rem] h-[31.25rem] w-[68.75rem] rounded-full blur-[10rem]"></div>
              <div className="bg-[#fbe2e3] absolute top-3/4 -z-10 left-[-35rem] h-[31.25rem] w-[50.25rem] rounded-full blur-[10rem] sm:left-[-20rem] md:left-[-28rem] lg:left-[-28rem] xl:left-[5rem] 2xl:left-[50rem]"></div> */}

              <AboutCopy />
              <Footer />
            </Suspense>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
