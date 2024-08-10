import React from "react";
import { motion } from "framer-motion";
import '../scss/_loader.scss';
import Image from 'next/image';

const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const itemMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1, y: 100, transition: { ease: "easeInOut", duration: 1.6 }
  },
};

const Loader = ({ setLoading }) => {
  return (
    <div>
      <motion.div
        className="loader-inner"
        variants={container}
        onAnimationComplete={() => setLoading(false)}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <motion.div variants={itemMain} className="transition-image">
          <motion.div layoutId="main-image-1" className="w-fit mx-auto flex items-center justify-center">
            <Image 
              src="/logo/White Black Simple Illustration Dental Clinic Logo.webp"
              alt="Loading Image" 
              layoutId='main-image-1' 
              width={400} 
              height={400} 
              quality={80} // Ajuste la qualité de l'image pour un meilleur compromis entre qualité et taille
              decoding="async" // Async decoding
              fetchpriority="high" // Prioritize loading
              className="rounded-full md:w-300 md:h-300" // Tailwind responsive classes
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
