import React, { memo } from 'react';
import { Card, CardHeader, Image, CardFooter } from "@nextui-org/react";
import { LazyMotion, m } from 'framer-motion';
import { imageAnimate, iconAnimate, textAnimate } from "../lib/Animation";

// eslint-disable-next-line react/display-name
const AboutCards = memo(({ titre, content, image, icon, direction }) =>{
    const formatContent = (text) => {
        return text.split('.').map((sentence, index, array) => {
            if (index < array.length - 1) {
                return <React.Fragment key={index}>{sentence.trim()}.<br /></React.Fragment>;
            }
            return sentence.trim();
        });
    };
    const loadFeatures = () =>
        import("../../utils/features").then(res => res.default)
    return (
        <LazyMotion features={loadFeatures}>
<m.div className='w-full max-w-lg mx-auto'>
            <Card className='flex flex-col items-center mx-auto rounded-xl justify-around w-full gap-2 pb-4 border-b-4 border-light-green' isPressable={true}>
                <CardHeader className="relative p-5 justify-center flex-col w-full">
                    <m.div
                        variants={imageAnimate(direction)}
                        initial={"offscreen"}
                        whileInView={"onscreen"}
                        viewport={{ once: false, amount: 0.2 }}
                        className='relative w-fit'
                    >
                        <picture>
                            <source srcSet={`${image}.webp`} type="image/webp" />
                            <Image
                                src={image}
                                alt='service image'
                                width={500}
                                height={500}
                                className='object-cover w-full'
                                priority={false}
                                loading="lazy"
                            />
                        </picture>
                    </m.div>
                    <div className='absolute z-20 w-fit bottom-[-4%] left-[50%] transform -translate-x-1/2'>
                        <div className="bg-default-50 dark:bg-default-700 p-4 rounded-full border-5 border-default-100 dark:border-default-900 text-start">
                            <m.div className="w-10 h-10 fill-none text-start"
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
                            </m.div>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className='flex flex-col gap-3 text-center items-center h-[210px] overflow-y-auto p-5'>
                    <m.div
                        initial={"offscreen"}
                        whileInView={"onscreen"}
                        transition={{ staggerChildren: 0.3 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <m.h1 variants={textAnimate(direction)} className='font-semibold text-3xl text-light-green capitalize'>{titre}</m.h1>
                        <m.p variants={textAnimate(direction)} className='text-lg text-wrap text-default-600'>
                            {formatContent(content)}
                        </m.p>
                    </m.div>
                </CardFooter>
            </Card>
        </m.div>
        </LazyMotion>

    );
});
export default AboutCards;
