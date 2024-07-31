import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useNavbarLinks } from '../lib/data';

const contact = [
    { info: 'lightstomatologybylbm@gmail.com', type: 'email' },
    { info: '0552002502', type: 'phone' },
    { info: '035764300', type: 'phone' },
    { info: 'Rue Derradj Moussa, Bordj Bou Arreridj', type: 'address' }
];

export default function Footer() {
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => setViewportHeight(window.innerHeight - 50);
        handleResize(); // Set initial height
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className='relative'
            style={{
                height: viewportHeight,
                clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"
            }}
        >
            <div
                className='fixed bottom-0 w-full'
                style={{ height: viewportHeight }}
            >
                <Content />
            </div>
        </div>
    );
}

const Content = () => {
    return (
        <div className='bg-divider py-8 px-5 max-[460px]:px-4 h-full w-full flex flex-col justify-between'>
            <Section1 />
            <Section2 />
        </div>
    );
}

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    );
}

const Section2 = () => {
    const t = useTranslations("Footer");

    const openWhatsApp = () => {
        const phoneNumber = '+213657335878';
        const message = 'Hello, I would like to know more about your services.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className='flex justify-between items-end mb-5'>
            <h1 className='text-[12vw] leading-[0.8] mt-10 capitalize'>{t("title")}</h1>
            <div className='flex items-center gap-2 max-[400px]:flex-col-reverse'>
                <span className='text-nowrap'>© {t('more')}</span>
                <div data-tooltip={t('contact')} className="button" onClick={openWhatsApp}>
                    <div className="button-wrapper">
                        <div className="text">{t('work')}</div>
                        <span className="icon">
                        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="100"
                                height="100"
                                viewBox="0,0,255.99057,255.99057"
                                style={{ fill: '#222' }}
                            >
                                <g fill="#222" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                                    <path d="M0,255.99057v-255.99057h255.99057v255.99057z" id="bgRectangle"></path>
                                </g>
                                <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                                    <g transform="scale(5.12,5.12)">
                                        <path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z"></path>
                                </g>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Nav = () => {
    const links = useNavbarLinks();

    return (
        <div className='flex shrink-0 flex-row-reverse max-[770px]:flex-col-reverse max-[460px]:gap-5 justify-between'>
            <div className='flex gap-14 max-[460px]:gap-7 max-sm:flex-col'>
                <div className='flex flex-col gap-3'>
                    <h3 className='mb-2 max-[460px]:mb-1 uppercase font-semibold text-bold-green'>Navigation</h3>
                    {links.map((link, index) => (
                        <Link key={index} className="text-[25px] leading-8 max-[450px]:leading-4 font-normal hover:text-light-green max-[450px]:text-[20px]" href={link.hash} passHref>
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className='flex flex-col gap-3'>
                    <h3 className='mb-2 max-[460px]:mb-1 uppercase font-semibold text-bold-green'>Contact</h3>
                    {contact.map((info, index) => {
                        if (info.type === 'email') {
                            return (
                                <span key={index} className='text-[25px] leading-8 max-[450px]:leading-4 font-normal hover:text-light-green max-[450px]:text-[20px] text-wrap'>
                                    <Link href={`mailto:${info.info}`} passHref>
                                        {info.info}
                                    </Link>
                                </span>
                            );
                        } else if (info.type === 'phone') {
                            return (
                                <span key={index} className='text-[25px] leading-8 max-[450px]:leading-4 font-normal hover:text-light-green max-[450px]:text-[20px] text-wrap'>
                                    <Link href={`tel:${info.info}`} passHref>
                                        {info.info}
                                    </Link>
                                </span>
                            );
                        }
                        return (
                            <p key={index} className="text-[25px] leading-8 max-[450px]:leading-4 font-normal hover:text-light-green max-[450px]:text-[20px] text-wrap">
                                {info.info}
                            </p>
                        );
                    })}
                </div>
            </div>
            <div className='text-[25px] font-normal flex flex-col'>
                <h1>Light <span className='uppercase'>stomatology</span></h1>
                <h2 className='text-xl font-medium text-light-green capitalize'>
                    copyright © <span>{new Date().getFullYear()}</span> light stomatology, Inc.
                </h2>
            </div>
        </div>
    );
}
