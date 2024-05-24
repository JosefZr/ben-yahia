import Image from 'next/image'
import React from 'react'

export default function AboutCards({titre, content, image}) {
    return (
        <div className='flex flex-col border-2 border-primary-200 dark:bg-slate-800 bg-slate-50 rounded-2xl p-10 justify-around gap-4'>
            <Image 
                src={image}
                alt='service image'
                width={150}
                height={150}
            />
            <h1 className=' font-bold text-4xl text-primary-300 '>{titre}</h1>
            <p className='text-2xl text-gray-600 dark:text-white' >{content}</p>
        </div>
    )
}
