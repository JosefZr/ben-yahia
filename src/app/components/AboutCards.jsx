
import React from 'react'
import {Card, CardHeader, CardBody,Image, CardFooter} from "@nextui-org/react";
export default function AboutCards({titre, content, image}) {
    return (
        <Card className='flex flex-col  rounded-2xl justify-around gap-2 pb-4'>
            <CardBody className="overflow-visible p-0">
            <Image 
                src={image}
                alt='service image'
                width="100%"
                className=' w-full object-cover '
            />
            </CardBody>
            <CardFooter  className=' flex flex-col gap-3 text-left items-start'>
                <h1 className=' font-semibold text-3xl text-primary-500 capitalize'>{titre}</h1>
                <p className='text-lg text-default-600' >{content}</p>
            </CardFooter>
        </Card>
    )
}
