import React from 'react'
import { motion } from 'framer-motion'
import {Link} from 'next/link';
import { FaPlay } from "react-icons/fa";
import Image from 'next/image'
import CustomButton from './Button';
import image from "../../../public/logo/White Black Simple Illustration Dental Clinic Logo.png"
import { useSectionInView } from '@/hooks/useSectionInView';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react"
import { useTranslations } from 'next-intl';
export default function Hero() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const t = useTranslations('Index');
    const heroTitle = t('title');
    const styledHeroTitle = heroTitle.split(' ').map((word, index) => 
        word.toLowerCase() === 'care' || word.toLowerCase()=== "soucions"
        ? <span key={index} className='text-bold-green font-bold'>{word}</span>
        : word
    ).reduce((prev, curr) => [prev, ' ', curr]);
    const r = useTranslations('Navbar')
    const { ref } = useSectionInView(r("home.name"),0.5);
    return (
        <div className=' flex items-center justify-evenly flex-row-reverse max-md:flex-col  max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-6xl mx-auto mt-20'>
        <div className='flex items-center justify-center pt-20' ref={ref}>
            <motion.div className="relative" initial={{opacity:0,y:100 ,scale:0}} animate={{opacity:1, scale:1,y:0}} transition={{type:"tween", duration:"0.2"}}>
                <Image 
                    src={image}
                    alt='Profile Picture'
                    width="400"
                    height="400"
                    quality="95"
                    className='md:h-80 md:w-80 xl:h-100 xl:w-100 h-60 w-60 rounded-full object-cover   shadow-xl'
                />
                {/* <span className='absolute -top-10 -right-0 text-8xl '>
                    👋 
                </span> */}
            </motion.div>
        </div>
        <motion.div className='flex flex-col items-start max-md:items-center gap-5 sm:max-w-[70%] mb-10' initial={{opacity:0, y:-100}} animate={{opacity:1, y:0}}>
            <h1 className='text-center text-3xl min-[300px]:text-5xl sm:text-7xl xl:text-8xl lg:text-8xl  font-medium sm:max-w-[90%]  md:text-left capitalize text-light-green'>{styledHeroTitle}</h1>
            <p className='max-w-md max-sm:text-center md:text-left text-center xl:max-w-2xl lg:max-w-xl md:max-w-md text-xl dark:text-gray-50'>
                    {t("subtitle")}
            </p>
            <div className='flex sm:flex-row flex-col items-center gap-2 sm:gap-8'>
                <CustomButton as={Link}  size="lg" className="rounded-3xl bg-light-green text-gray-100">Get Starting</CustomButton>
                <Button onPress={onOpen} isIconOnly  size='lg' className=' rounded-full bg-light-green text-gray-100' ><FaPlay /></Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                    <ModalBody className=' px-0 py-0'>
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/hFGDJlPFAt0?si=_ibl-dtmT8Uism1O" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
            {/* <div className='flex justify-center sm:justify-start  items-center min-[300px]:gap-8 max-[300px]:flex-col  flex-row' >
                <CustomButton icon={<LuCalendarClock />} size="lg" color="primary" variant="flat"/>
                <div className='flex flex-col max-[300px]:text-center'>
                    <h1>Opening Hours</h1>
                    <p>Sat-Fry 8:00 - 16:00</p>
                </div>
            </div> */}
            
        </motion.div>
        </div>
    )
}
