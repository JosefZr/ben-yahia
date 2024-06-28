"use client"
import {motion} from "framer-motion"
function SectionDivider() {
    return (
        <motion.div 
            className='bg-gray-200 my-14 h-8 w-1 rounded-full '
            initial={{opacity:0, y:100}}
            animate={{opacity:1,y:0}}
            transition={{delay:0.125}}
            >
            
        </motion.div>
    )
}

export default SectionDivider