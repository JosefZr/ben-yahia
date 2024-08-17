"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import CustomButton from '../../components/Button';
import { useDisclosure } from '@nextui-org/react';
import CustomEnglishModal from '@/app/components/CustomEnglishModal';
import useReveal from '@/hooks/useReveal';

function HeroLb() {
  const targetRef = useRef(null);
  const [applyTransform, setApplyTransform] = useState(false);
  const [height, setHeight] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.5]);

  useEffect(() => {
    const handleResize = () => {
        const shouldApply = (window.innerWidth > 100 && window.innerHeight > 750) || (window.innerWidth > 768 && window.innerHeight > 430)  ;
      const isHeightSmall = window.innerHeight < 500
      setHeight(isHeightSmall);
      setApplyTransform(shouldApply);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useReveal("vertical");
  useReveal("horizontal");
  return (
    <motion.section
      style={applyTransform ? { opacity } : {}}
      ref={targetRef}
      className="sm:h-screen sm:scroll-m-20 flex items-center justify-evenly flex-col mb-32"
      id='accueil'
    > 
      <motion.div 
        className={`fixed ${height ? 'relative' : 'max-md:relative'}`}
        style={applyTransform ? { scale } : { position: 'relative' }}
      >
        <div className='flex items-center justify-between flex-row gap-5 max-md:flex-col xl:max-w-6xl max-[500px]:mx-1 mx-10 mt-20 max-sm:mt-28'>
          <div className='flex items-center justify-center'>
                <Image
                  src="/purple.webp"
                  alt='White and Black Simple Illustration Dental Clinic Logo'
                  width={400}
                  height={700}
                  quality={90}
                  priority
                  className='hero-horizontal-left rounded-xl object-cover shadow-xl'
                />
              </div>
          <div className='flex flex-col items-start max-md:items-center gap-4 mb-4'>
            <h1 className='hero-vertical text-center text-3xl min-[300px]:text-5xl sm:text-5xl lg:text-6xl font-bold md:text-left capitalize text-bold-purple'>Do You really need an Implant?</h1>
            <h2 className='hero-vertical text-center min-[300px]:text-3xl sm:text-4xl lg:text-3xl font-bold md:text-left capitalize text-light-purple'>If not we won’t place one.</h2>
            <p className='hero-horizontal-right max-w-md max-sm:text-center md:text-left text-center xl:max-w-2xl lg:max-w-xl md:max-w-md text-xl dark:text-gray-50'>We’re here to <span className='text-word-purple'>help you</span> make the right decision that’s best for you.</p>
            <div className='hero-horizontal-right flex sm:flex-row flex-col gap-2 sm:gap-8'>
                <CustomButton 
                  size="lg" 
                  onPress={onOpen}
                  className=" rounded-2xl bg-black text-[#F3EEF3] font-semibold"
                >
                  Make an Appointment
                </CustomButton>
                <CustomEnglishModal isOpen={isOpen} onOpenChange={onOpenChange}/>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default HeroLb;
