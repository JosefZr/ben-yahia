"use client"
import styled from 'styled-components'
import CustomButton from '../components/Button'
import Modal from '../components/Modal';
import CalendarComponent from './components/CalendarComponent';
import OpeningTimes from './components/OpeningTimes';
import Explanation from './components/Explanation';
import Footer from './components/Footer';
import { formatISO } from 'date-fns';
import "./style/calendar.css";


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

const closeDays = [
    formatISO(new Date(2024, 6, 1)), // Example closed day
    // Add other closed days here
];

export default function User() {
    const days = [
        { dayOfWeek: 0, openTime: '08:00', closeTime: '18:00' }, // Sunday
        { dayOfWeek: 1, openTime: '08:00', closeTime: '18:00' }, // Monday
        { dayOfWeek: 2, openTime: '08:00', closeTime: '18:00' }, // Tuesday
        { dayOfWeek: 3, openTime: '08:00', closeTime: '18:00' }, // Wednesday
        { dayOfWeek: 4, openTime: '08:00', closeTime: '18:00' }, // Thursday
        { dayOfWeek: 5, openTime: '08:00', closeTime: '18:00' }, // Friday
        { dayOfWeek: 6, openTime: '08:00', closeTime: '18:00' }, // Saturday
    ];
    return (
        <div className='flex flex-auto flex-row'>
            <main className='flex flex-col items-center w-full gap-7 '>
                <ImageComp className='flex flex-col text-black font-extrabold lg:text-4xl text-xl text-center lg:gap-20 gap-10 justify-center items-center'>
                    <h1 className=''>Reduire le tamps de consultation avec un seule click</h1>
                    <Modal>
                        <Modal.Open opens="calendar">
                            <CustomButton radius="full" color="primary" className="lg:text-2xl font-bold linear lg:p-9 p-5">
                                prendre un rendez-vous
                            </CustomButton>
                        </Modal.Open>
                        <Modal.Window name="calendar">
                            <CalendarComponent days={days} closeDays={closeDays} />
                        </Modal.Window>
                    </Modal>
                </ImageComp>
                <div className='flex xl:flex-row flex-col-reverse gap-7 justify-between max-w-[1300px]'>
                    <Explanation />
                    <OpeningTimes />
                </div>
                <Footer />
            </main>
        </div>
    );
}
