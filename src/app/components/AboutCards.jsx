import React from 'react';
import { Card,CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";

export default function AboutCards({ titre, content, image, icon }) {
    // Function to insert <br> after each period
    const formatContent = (text) => {
        return text.split('.').map((sentence, index, array) => {
            if (index < array.length - 1) {
                return <>{sentence.trim()}.<br key={index} /></>;
            }
            return sentence.trim();
        });
    };

    return (
        <Card className='flex flex-col items-center rounded-xl justify-around gap-2 pb-4 border-b-3 border-default-900'>
            <CardHeader className="relative p-5 ">
                <Image 
                    src={image}
                    alt='service image'
                    width="100%"
                    className='w-full object-cover'
                />
                <div className='absolute z-20 w-fit bottom-[-4%] left-[43%]'>
                <div className="bg-default-50 dark:bg-default-700 p-4 rounded-full border-5 border-default-100 dark:border-default-900 text-start">
                    <div className="w-10 h-10 fill-none text-start">
                        <Image 
                            className='w-12 h-12'
                            src={icon}
                            width={128}
                            height={128}
                            alt='external-orthodontic-dental-victoruler'
                        />
                    </div>
                </div>
            </div>
            </CardHeader>
            
            <CardFooter className='flex flex-col gap-3 text-center items-center h-[240px] overflow-y-auto'>
                <h1 className='font-semibold text-3xl text-light-green capitalize'>{titre}</h1>
                <p className='text-lg text-default-600'>
                    {formatContent(content)}
                </p>
            </CardFooter>
        </Card>
    );
}
