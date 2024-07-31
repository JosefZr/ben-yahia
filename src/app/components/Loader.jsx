import React from "react";
import { motion } from "framer-motion";
import '../scss/_loader.scss';
import Image from 'next/image';
import image from "../../../public/logo/lb-big.jpg";
import { cubicBezier } from "framer-motion"
import { easeOut } from "framer-motion"
// Define animation variants
const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease:'easeInOut',
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0, y: -200, transition: { ease: "easeInOut", duration: 0.8 }
  }
};

const itemMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1, y: 100, transition: { ease:easeOut, duration: 1.6 }
  },

};

const Loader = ({ setLoading }) => {
  return (
    <div
    >
      <motion.div
        className="loader-inner"
        variants={container}
        onAnimationComplete={() => setLoading(false)}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <motion.div variants={itemMain} className="transition-image" >
          <motion.div layoutId="main-image-1" className="w-fit mx-auto flex items-center justify-center">
            <Image src="/logo/White Black Simple Illustration Dental Clinic Logo.png" alt="Loading Image" layoutId='main-image-1' width={400} height={400} className=" rounded-full"/>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ImageBlock = ({ posX, posY, variants, id }) => {
  return (
    <motion.div
      variants={variants}
      className={`image-block ${id}`}
      style={{ top: `${posY}vh`, left: `${posX}vw` }}
    >
      <Image src={image} alt={id} />
    </motion.div>
  );
};

export default Loader;
