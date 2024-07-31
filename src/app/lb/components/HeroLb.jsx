"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import image from "../../../../public/logo/White Black Simple Illustration Dental Clinic Logo.png";
import CustomButton from '../../components/Button';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { FaPlay } from "react-icons/fa";
import {slideInButtonsPlay,banner} from "../../lib/Animation"

function HeroLb() {
    const targetRef = useRef(null);
    const [applyTransform, setApplyTransform] = useState(false);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.5]);

    

    return (
        <motion.section
            style={applyTransform ? { opacity } : {}}
            ref={targetRef}
            className="sm:h-screen sm:scroll-m-20 flex items-center justify-evenly flex-col"
            id='accueil'
        >
            <motion.div 
                className="max-md:relative"
            >
                <div className='flex items-center justify-between flex-row gap-5 max-md:flex-col  xl:max-w-6xl max-[500px]:mx-1 mx-10 mt-20 max-sm:mt-28'>
                    <div className='flex items-center justify-center ' >
                        <motion.div >
                        <motion.div 
                            className="relative" 
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ ease: "easeInOut", duration: 1.6 }}
                        >
                            <Image
                            src="/purple.jpg"
                            alt='White and Black Simple Illustration Dental Clinic Logo'
                            width={400}
                            height={700}
                            quality={90}
                            priority
                            className='  rounded-xl object-cover shadow-xl'
                            />
                        </motion.div>
                        </motion.div>
                    </div>
                    <motion.div className='flex flex-col items-start max-md:items-center gap-4  mb-4' variants={banner}>
                        <motion.h1   
                        className='text-center text-3xl min-[300px]:text-5xl sm:text-5xl  lg:text-6xl font-bold  md:text-left  capitalize text-bold-purple'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
                        >
                        Do You really need an Implant ?
                        </motion.h1>
                        <motion.h2   
                        className='text-center   min-[300px]:text-3xl sm:text-4xl  lg:text-3xl font-bold md:text-left capitalize text-light-purple'
                        initial={{ opacity: 0, y: -80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
                        >
                        If not we won’t place one.
                        </motion.h2>
                        <motion.p 
                        className='max-w-md max-sm:text-center  md:text-left text-center xl:max-w-2xl lg:max-w-xl md:max-w-md text-xl dark:text-gray-50'
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
                        >
                        We’re here to <span className=' text-word-purple'>help you</span> make the right decision that’s best for you.
                        </motion.p>
                        <div className='flex sm:flex-row flex-col  gap-2 sm:gap-8'>
                        <motion.div 
                            variants={slideInButtonsPlay(0)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <CustomButton 
                            as={Link} 
                            href="#" 
                            size="lg" 
                            className="rounded-2xl bg-black text-[#F3EEF3] font-semibold"
                            >
                            Make an Appointment
                            </CustomButton>
                        </motion.div>
                        </div>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
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
                        </Modal>
                    </motion.div>
                    </div>
            </motion.div>
        </motion.section>
    );
}

export default HeroLb;
