"use client";
import React, { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review from './Review';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSectionInView } from '@/hooks/useSectionInView';
import RatingStats from './RatingStats';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} max-md:hidden bg-default-400 rounded-full cursor-pointer`}
      style={{ ...style, padding:"2px 0 3px"}}
      onClick={onClick}
    >
      <SlArrowRight />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  bg-default-400 rounded-large cursor-pointer`}
      style={{ ...style, padding:"2px 0 3px"}}
      onClick={onClick}
    >
      <SlArrowLeft />
    </div>
  );
}

export default function Temoingage() {
  var settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const { ref: refView } = useSectionInView("Témoignages", 0.2);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0 0.2"]
  });
  const scalProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div ref={ref} style={{ scale: scalProgress, opacity: opacityProgress }} id="Témoignages">
      <div className="max-w-5xl mx-auto" ref={refView}>
        <header className='text-center flex flex-col gap-5'>
          <h2 className='text-primary text-5xl font-semibold'>Témoignages de Nos Patients</h2>
          <p className='w-[70%] mx-auto text-default-900 text-md leading-6'>
            Laissez Nos Patients Vous Raconter Leur Expérience Avec Notre Cabinet Leurs Témoignages Sincères Témoignent De Notre Engagement Envers L&apos;excellence Et Le Soutien.
          </p>
        </header>
        <Slider {...settings} >
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </Slider>
        <div className='flex flex-col items-center mt-10 mx-5'>
          <RatingStats className="text-center" />
        </div>
      </div>
    </motion.div>
  );
}
