import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import CustomButton from './Button';
import { useSectionInView } from '@/hooks/useSectionInView';
import { useTranslations } from 'next-intl';
import useReveal from '@/hooks/useReveal';
export default function Hero() {

  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const t = useTranslations('Index');
  const r = useTranslations('Navbar');
  const heroTitle = t('title');

  const styledHeroTitle = heroTitle.split(' ').map((word, index) => 
    word.toLowerCase() === 'care' || word.toLowerCase() === "souriez"
      ? <span key={index} className='text-bold-green font-bold'>{word}</span>
      : word
  ).reduce((prev, curr) => [prev, ' ', curr]);

  const { ref } = useSectionInView(r("home.name"), 0.5);
  useReveal("vertical");
  useReveal("horizontal");
  return (
    <div className='flex items-center justify-evenly flex-row-reverse max-md:flex-col max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-6xl mx-auto mt-20'>
      <div className='flex items-center justify-center' ref={ref}>
        <motion.div>
          <motion.div 
            className="relative" 
            layoutId='main-image-1' 
            transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1.6 }}
          >
            <Image
              src="/logo/White Black Simple Illustration Dental Clinic Logo.webp"
              alt='White and Black Simple Illustration Dental Clinic Logo'
              width={400}
              height={400}
              priority // Indique que cette image doit être chargée en priorité
              quality={80} // Ajuste la qualité de l'image pour un meilleur compromis entre qualité et taille
              className='md:h-80 md:w-80 xl:h-100 xl:w-100 h-60 w-60 rounded-full object-cover shadow-xl pointer-events-none'
            />
          </motion.div>
        </motion.div>
      </div>
      <div className='flex flex-col items-start max-md:items-center gap-5 sm:max-w-[70%] mb-4' 
      // variants={banner}
      >
        <h1 className='hero-vertical text-center max-sm:px-5 text-3xl min-[300px]:text-4xl sm:text-7xl xl:text-8xl lg:text-8xl font-medium sm:max-w-[95%] md:text-left capitalize text-light-green'
          // initial={{ opacity: 0, y: 80 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
        >
          {styledHeroTitle}
        </h1>
        
        
        <div className='flex sm:flex-row flex-col items-center gap-2 sm:gap-8'>
          {/* <motion.div 
            variants={slideInButtonsPlay(0)}
            initial="initial"
            animate="animate"
            exit="exit"
          > */}
            <CustomButton 
              as={Link} 
              href="#" 
              size="lg" 
              className="reveal-vertical rounded-3xl bg-light-green text-gray-100"
            >
              Invest in your smile - it`&lsquo;s worth it !
            </CustomButton>
          {/* </motion.div> */}
          {/* <motion.div 
            variants={slideInButtonsPlay(1)}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Button 
              onPress={onOpen} 
              isIconOnly 
              size='lg' 
              className='rounded-full bg-light-green text-gray-100'
            >
              <FaPlay />
            </Button>
          </motion.div> */}
        </div>
        {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody className='px-0 py-0'>
                  <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/hFGDJlPFAt0?si=_ibl-dtmT8Uism1O" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal> */}
      </div>
    </div>
  );
}
