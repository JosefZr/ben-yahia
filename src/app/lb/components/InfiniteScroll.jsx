import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import "./hor.css"
import useReveal from '@/hooks/useReveal';

export default function InfiniteScroll() {
    const {isOpen: isInfoOpen, onOpen: onInfoOpen, onOpenChange: onInfoOpenChange} = useDisclosure();
    const {isOpen: isVideoOpen, onOpen: onVideoOpen, onOpenChange: onVideoOpenChange} = useDisclosure();

    const [imageSrc, setImageSrc] = useState('/lb/invitation.webp');
    const [languageButton, setLanguageButton] = useState('french');

    const handleImageChange = () => {
        setImageSrc(prevSrc => prevSrc === '/lb/invitation.webp' ? '/lb/invitationFr.webp' : '/lb/invitation.webp');
        setLanguageButton(prevLng => prevLng ==="french"? "english":"french")
    };
    useReveal("horizontal")
    useReveal("vertical")
    return (
        <>
        <div className='relative mx-auto flex gap-4 flex-col text-center place-content-center xl:max-w-[1200px] max-[500px]:px-2 pb-20'>
            <div className=' flex flex-col gap-5'>
                <h1 className='reveal-vertical text-5xl font-bold uppercase max-[400px]:text-3xl max-xs:text-xl'>Want to Be a High-value Dentist !?</h1>
                <h2 className='reveal-vertical text-4xl font-semibold uppercase max-[400px]:text-2xl max-xs:text-lg'>Then commit to lifelong learning..</h2>
            </div>
            <div className='flex flex-col pt-10 gap-5'>
                <div className='reveal-vertical font-bold text-5xl max-[450px]:text-2xl'>•Exclusive for Dental students•</div>
                <div className='flex flex-row max-[360px]:flex-col-reverse justify-center gap-10 max-[360px]:gap-5 items-center mb-10'>
                    <div className='flex flex-row items-end gap-1'>
                        <div className='reveal-horizontal-left flex flex-row'>
                            <span
                                className='text-2xl text-word-purple cursor-pointer underline'
                                onClick={onInfoOpen}
                            >
                                Read More
                            </span>
                            <span className='text-word-purple text-3xl'>..</span>
                        </div>
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
                    <div className=' reveal-horizontal-right'>
                        <button className='btn capitalize' onClick={onVideoOpen}> play now
                        </button>
                    </div>
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
                </div>
                <div className='flex flex-col justify-between gap-5 items-center'>
                    <Button  
                        className='reveal-horizontal-left rounded-2xl bg-black text-white px-6 py-7 text-3xl max-[450px]:text-xl w-fit' 
                        onClick={() => window.open('https://t.me/lbstoma1', '_blank')}>
                        Join ЛБ-Dental Family! 
                    </Button>
                    <h2 className='reveal-horizontal-right text-4xl max-[410px]:text-2xl max-xs:text-xl font-semibold uppercase max-[350px]:text-2xl'>
                        IF you’re interested in <span className='text-word-purple'> UNLOCKING THE SECRETS </span>
                        Behind The World’s dental universities…
                    </h2>
                </div>
            </div>
        </div>
        </>
    );
}
