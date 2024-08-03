import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import "./hor.css"
import { imageAnimate } from '@/app/lib/Animation';

const headerAnimate = (i) => ({
    initial: {
        opacity: 0,
        y: -50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .5,
            delay: i * 0.3,
            ease: [0.215, 0.61, 0.355, 1],
        }
    },
});

export default function InfiniteScroll() {
    const {isOpen: isInfoOpen, onOpen: onInfoOpen, onOpenChange: onInfoOpenChange} = useDisclosure();
    const {isOpen: isVideoOpen, onOpen: onVideoOpen, onOpenChange: onVideoOpenChange} = useDisclosure();

    const [imageSrc, setImageSrc] = useState('/lb/invitation.webp');
    const [languageButton, setLanguageButton] = useState('french');

    const handleImageChange = () => {
        setImageSrc(prevSrc => prevSrc === '/lb/invitation.webp' ? '/lb/invitationFr.webp' : '/lb/invitation.webp');
        setLanguageButton(prevLng => prevLng ==="french"? "english":"french")
    };

    return (
        <>
        <div className='relative mx-auto flex gap-4 flex-col text-center place-content-center xl:max-w-[1200px] max-[500px]:px-2 pb-20'>
            <motion.div 
                initial="initial"
                whileInView="animate"
                exit="exit"
                variants={{
                    animate: {
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
                viewport={{ once: false, amount: 0.5 }}
                className=' flex flex-col gap-5'
            >
                <motion.h1
                    variants={headerAnimate(0)}
                    className='text-5xl font-bold uppercase max-[400px]:text-3xl max-xs:text-xl'
                >
                    Want to Be a High-value Dentist !?
                </motion.h1>
                <motion.h2 
                    className='text-4xl font-semibold uppercase max-[400px]:text-2xl max-xs:text-lg'
                    variants={headerAnimate(1)}
                >
                    Then commit to lifelong learning..
                </motion.h2>
            </motion.div>
            <div className='flex flex-col pt-10 gap-5'>
                <motion.div className='font-bold text-5xl max-[450px]:text-2xl'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{amount:"all"}}
                    transition={{ type: "spring", stiffness: 100, damping: 10,}}
                >
                    •Exclusive for Dental students•
                </motion.div>
                <motion.div className='flex flex-row max-[360px]:flex-col-reverse justify-center gap-10 max-[360px]:gap-5 items-center mb-10'>
                    <motion.div 
                        className='flex flex-row items-end gap-1'  
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <motion.div   
                            variants={imageAnimate('right')} 
                            className='flex flex-row'
                        >
                            <motion.span
                                className='text-2xl text-word-purple cursor-pointer underline'
                                onClick={onInfoOpen}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            >
                                Read More
                            </motion.span>
                            <motion.span 
                                className='text-word-purple text-3xl'
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            >
                                ..
                            </motion.span>
                        </motion.div>
                    </motion.div>
                    <Modal isOpen={isInfoOpen} onOpenChange={onInfoOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                                    <ModalBody>
                                        <Image
                                            src={imageSrc}
                                            width={400}
                                            height={600}
                                            alt='invitation for dental students'
                                            quality={90}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="shadow" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button variant='shadow' className="bg-light-purple text-white" onPress={handleImageChange}>
                                            Show {languageButton} Version
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                    <motion.div
                        variants={imageAnimate('right')}
                        initial={"offscreen"} 
                        whileInView={"onscreen"} 
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <button className='btn capitalize' onClick={onVideoOpen}> play now
                        </button>
                    </motion.div>
                    <Modal isOpen={isVideoOpen} onOpenChange={onVideoOpenChange} size="2xl">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 text-white">Modal Title</ModalHeader>
                                    <ModalBody className='px-0 py-0'>
                                        <iframe 
                                            width="100%" 
                                            height="315" 
                                            src="https://www.youtube.com/embed/ZK3uwiKV6rU?si=sVNvxoWn__JeHroF"
                                            title="YouTube video player" 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                            referrerPolicy="strict-origin-when-cross-origin" 
                                            allowFullScreen
                                        ></iframe>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="shadow" onPress={onClose}>Close</Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </motion.div>
                <motion.div 
                    className='flex flex-col justify-between gap-5 items-center'
                    initial="offscreen" 
                    whileInView="onscreen" 
                    transition={{ staggerChildren: 1 }} 
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <motion.div 
                        variants={imageAnimate('left')}
                        initial={"offscreen"} 
                        whileInView={"onscreen"} 
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <Button  
                            className='rounded-2xl bg-black text-white px-6 py-7 text-3xl max-[450px]:text-xl w-fit' 
                            onClick={() => window.open('https://t.me/lbstoma1', '_blank')}>
                            Join ЛБ-Dental Family! 
                        </Button>
                    </motion.div>
                    <motion.h2 
                        className='text-4xl max-[410px]:text-2xl max-xs:text-xl font-semibold uppercase max-[350px]:text-2xl'
                        variants={imageAnimate('right')}
                    >
                        IF you’re interested in <span className='text-word-purple'> UNLOCKING THE SECRETS </span>
                        Behind The World’s dental universities…
                    </motion.h2>
                </motion.div>
            </div>
        </div>
        </>
    );
}
