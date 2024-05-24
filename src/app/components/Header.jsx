import React from 'react'

export default function Header({title, subtitle}) {
    return (
        <div className='mb-8'>
            <h1 className="text-center text-3xl font-bold mb-1.5">{title}</h1>
            <p className="mt-2 mx-auto max-w-4xl text-center text-lg leading-6 font-medium text-gray-500"> {subtitle}</p>
        </div>
    )
}
