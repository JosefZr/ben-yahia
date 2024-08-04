import React from "react";
import { LazyMotion } from "framer-motion";
import '../scss/_loader.scss';
import Image from 'next/image';
import { m } from "framer-motion"
const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

// const item = {
//   hidden: { opacity: 0, y: 200 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       ease:'easeInOut',
//       duration: 1.6,
//     },
//   },
//   exit: {
//     opacity: 0, y: -200, transition: { ease: "easeInOut", duration: 0.8 }
//   }
// };

const itemMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1, y: 100, transition: { ease:"easeInOut", duration: 1.6 }
  },

};
const loadFeatures = () =>
  import("../../utils/features").then(res => res.default)
const Loader = ({ setLoading }) => {
  return (
    <div
    >
      <LazyMotion features={loadFeatures}>
      <m.div
        className="loader-inner"
        variants={container}
        onAnimationComplete={() => setLoading(false)}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <m.div variants={itemMain} className="transition-image" >
          <m.div layoutId="main-image-1" className="w-fit mx-auto flex items-center justify-center">
            <Image 
              src="/logo/White Black Simple Illustration Dental Clinic Logo.webp"
              alt="Loading Image" 
              layoutId='main-image-1' 
              width={400} height={400} 
              priority // Indique que cette image doit être chargée en priorité
              quality={80} // Ajuste la qualité de l'image pour un meilleur compromis entre qualité et taille
              className=" rounded-full"/>
          </m.div>
        </m.div>
      </m.div>
      </LazyMotion>
    </div>
  );
};

// export const ImageBlock = ({ posX, posY, variants, id }) => {
//   return (
//     <motion.div
//       variants={variants}
//       className={`image-block ${id}`}
//       style={{ top: `${posY}vh`, left: `${posX}vw` }}
//     >
//       <Image src={image} alt={id} />
//     </motion.div>
//   );
// };

export default Loader;
