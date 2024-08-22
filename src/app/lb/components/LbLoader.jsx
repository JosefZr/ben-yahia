import React from "react";
import { motion } from "framer-motion";
import '../../scss/_loader.scss';
import Image from 'next/image';
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
      ease :[0.6, 0.01, -0.05, 0.9],
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0, y: -200, transition: { ease:  [0.6, 0.01, -0.05, 0.9], duration: 0.8 }
  }
};

const easing = [0.6, 0.01, -0.05, 0.9];

const itemMain = {
  hidden: { opacity: 0, y: -200 },
  show: {
    opacity: 1,
    y: 100,
    transition: {
      duration: 1.3,
      ease: [0.6, 0.01, -0.05, 0.9],
      type: "spring",
              bounce: 0.4,
              duration: 1.5,
    },
  },
};


const LbLoader = ({ setLoading }) => {
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
          <motion.div layoutId="main-image-1" className=" mx-auto flex items-center justify-center" >
            <Image 
              src="/logo/lb-big.webp" 
              alt="Loading Image" 
              width={400} 
              height={400} 
              className=" rounded-full pointer-events-none"/>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};



export default LbLoader;
