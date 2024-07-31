import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from "react-icons/fa";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import "./hor.css"
export default function InfiniteScroll() {
    const {isOpen: isInfoOpen, onOpen: onInfoOpen, onOpenChange: onInfoOpenChange} = useDisclosure();
    const {isOpen: isVideoOpen, onOpen: onVideoOpen, onOpenChange: onVideoOpenChange} = useDisclosure();

    const [imageSrc, setImageSrc] = useState('/lb/invitation.jpg');
    const [languageButton, setLanguageButton] = useState('french');


    const handleImageChange = () => {
        setImageSrc(prevSrc => prevSrc === '/lb/invitation.jpg' ? '/lb/invitationFr.jpg' : '/lb/invitation.jpg');
        setLanguageButton(prevLng => prevLng ==="french"? "english":"french")
    };

    return (
        <>
        <div className='relative mx-auto flex gap-4 flex-col text-center place-content-center xl:max-w-[1200px] max-[500px]:px-4 pb-20'>
            <motion.h1
                className='text-5xl font-semibold uppercase max-[350px]:text-3xl'
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{margin:"-100px"}}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: .2 }}
            >
                Want to Be a High-value Dentist !?
            </motion.h1>
            <motion.h2 className='text-4xl font-semibold uppercase max-[350px]:text-3xl'
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{margin:"-100px"}}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: .3 }}
            >
                Then commit to lifelong learning..
            </motion.h2>
            <div className='flex flex-col pt-10 gap-5'>
                <motion.div className='font-bold text-5xl max-[350px]:text-3xl'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{amount:"all"}}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: .3 }}
                >
                    •Exclusive for Dental students•
                </motion.div>
                <motion.div className='flex flex-row justify-center gap-10 items-center'>
                    <div className=' flex flex-row items-end gap-1'>
                    <motion.h3 className='text-2xl text-word-purple cursor-pointer underline' onClick={onInfoOpen}
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{amount:"all"}}
                        transition={{ type: "linear", delay: .1 }}
                    >
                        Read More
                    </motion.h3>
                    <motion.h3 className=' text-word-purple text-3xl'>
                    ..
                    </motion.h3>
                    </div>
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
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button className="bg-light-purple hover:text-black text-white
                                        `" variant="light" onPress={handleImageChange}>
                                            Show {languageButton} Version
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{amount:"some"}}
                        transition={{ type: "spring", delay: .1 }}
                    >
                        {/* <Button 
                            onPress={onVideoOpen}
                            isIconOnly 
                            size='lg' 
                            className='rounded-full bg-light-purple text-gray-100'
                        >
                            <FaPlay />
                        </Button> */}
                        <button className=' btn capitalize' onClick={onVideoOpen}> play now
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
                                        <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </motion.div>
                <div className=' flex flex-col justify-between gap-10 items-center'>
                    <Button className='rounded-2xl bg-black text-white px-6 py-7 text-3xl w-fit' onClick={() => window.open('https://t.me/lbstoma1', '_blank')}>
                        Join ЛБ-Dental Family!
                    </Button>
                    <motion.h2 className='text-4xl font-semibold uppercase max-[350px]:text-2xl'
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{amount:"all"}}
                        transition={{ type: "spring", stiffness: 100, damping: 10,}}
                    >
                        IF you’re interested in <span className=' text-word-purple'> UNLOCKING THE SECRETS </span>
                        Behind The World’s dental universities…
                    </motion.h2>
                </div>
            </div>
            
        </div>
        </>
    );
}
