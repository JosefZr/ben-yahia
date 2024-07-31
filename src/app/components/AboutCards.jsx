import React from 'react';
import { Card, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { imageAnimate, iconAnimate, textAnimate } from "../lib/Animation";

export default function AboutCards({ titre, content, image, icon, direction, index }) {
    // Function to insert <br> after each period
    const formatContent = (text) => {
        return text.split('.').map((sentence, index, array) => {
            if (index < array.length - 1) {
                return <React.Fragment key={index}>{sentence.trim()}.<br /></React.Fragment>;
            }
            return sentence.trim();
        });
    };

    return (
        <motion.div>
            <Card className='flex flex-col items-center rounded-xl justify-around gap-2 pb-4 border-b-4 border-light-green' isPressable={true}>
                <CardHeader className="relative p-5">
                    <motion.div
                        variants={imageAnimate(direction)}
                        initial={"offscreen"}
                        whileInView={"onscreen"}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <Image
                            src={image}
                            alt='service image'
                            width="100%"
                            className='w-full object-cover'
                        />
                    </motion.div>
                    <div className='absolute z-20 w-fit bottom-[-4%] left-[43%]'>
                        <div className="bg-default-50 dark:bg-default-700 p-4 rounded-full border-5 border-default-100 dark:border-default-900 text-start">
                            <motion.div className="w-10 h-10 fill-none text-start"
                                initial={"offscreen"}
                                whileInView={"onscreen"}
                                transition={{ staggerChildren: 0.5 }}
                                viewport={{ once: false, amount: 0.5 }}
                                variants={iconAnimate}
                            >
                                <Image
                                    className='w-12 h-12'
                                    src={icon}
                                    width={128}
                                    height={128}
                                    alt='external-orthodontic-dental-victoruler'
                                />
                            </motion.div>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className='flex flex-col gap-3 text-center items-center h-[210px] overflow-y-auto'>
                    <motion.div
                        initial={"offscreen"}
                        whileInView={"onscreen"}
                        transition={{ staggerChildren: 0.5 }}
                        viewport={{ once: false, amount: 0.5 }}
                    >
                        <motion.h1 variants={textAnimate(direction)} className='font-semibold text-3xl text-light-green capitalize'>{titre}</motion.h1>
                        <motion.p variants={textAnimate(direction)} className='text-lg text-default-600'>
                            {formatContent(content)}
                        </motion.p>
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
