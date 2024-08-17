"use client"
import styled from 'styled-components'
import CustomButton from '../components/Button'

import OpeningTimes from './components/OpeningTimes';
import Explanation from './components/Explanation';
import Footer from './components/Footer';
import { formatISO } from 'date-fns';
import "./style/calendar.css";
import "../[locale]/globals.css"
import CalendarComponent2 from './components/CalendarComponent-v2';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import CalendarComponent from './components/CalendarComponent';
import { useDays } from '../lib/data';


const ImageComp = styled.div`
    background-image: url("/pexels-goumbik-1419923.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    width: 100%;
    max-width: 1300px;
    min-height: 45vh;
    position: relative;
    border-radius: 20px;
`;


export default function User() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const days = useDays();

    const userId = localStorage.getItem("id");
        if (!userId) {
            console.error('User ID is missing');
            return;
        }

    return (
        <div className='flex flex-auto flex-row'>
            <main className='flex flex-col items-center w-full gap-7 '>
                <ImageComp className='flex flex-col text-black font-extrabold lg:text-4xl text-xl text-center lg:gap-20 gap-10 justify-center items-center'>
                    <h1 className=''>Reduire le tamps de consultation avec un seule click</h1>
                    <CustomButton onPress={onOpen} radius="full" color="primary" className="lg:text-2xl font-bold linear lg:p-9 p-5">
                        prendre un rendez-vous
                    </CustomButton>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='xl'>
                        <ModalContent>
                        {(onClose) => (
                            <>
                            <ModalHeader className="flex flex-col gap-1 ">Modal Title</ModalHeader>
                            <ModalBody className="flex flex-col gap-1">
                                {/* <CalendarComponent days={days} closeDays={closeDays} /> */}
                                <CalendarComponent2 days={days}  onCloseModal={onClose} userId={userId}/>
                            </ModalBody>
                            
                            </>
                        )}
                        </ModalContent>
                    </Modal>
                </ImageComp>
                <div className='flex xl:flex-row  flex-col-reverse gap-7 justify-between max-w-[1300px]'>
                    <Explanation />
                    <OpeningTimes />
                </div>
                <Footer />
            </main>
        </div>
    );
}
