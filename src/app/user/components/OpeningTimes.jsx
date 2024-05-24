import React from 'react'

export default function OpeningTimes() {
    return (
        <div className='flex flex-col gap-5 px-16 py-10 bg-gray-100 dark:bg-[#18181B] rounded-3xl w-full'>
        <h1 className='text-primary text-3xl font-bold text-center capitalize'>heurs d&rsquo;ouvertur</h1>
        <ul className='flex flex-col gap-9'>
            <li className='flex flex-row justify-between'>
                <h1 className='text-2xl font-semibold'>Sam</h1>
                <p className='text-2xl font-medium'>09:00AM-6:00</p>
            </li>
            <li className='flex flex-row justify-between'>
                <h1 className='text-2xl font-semibold'>Dim</h1>
                <p className='text-2xl font-medium'>09:00AM-6:00</p>
            </li>
            <li className='flex flex-row justify-between'>
                <h1 className='text-2xl font-semibold'>Lun</h1>
                <p className='text-2xl font-medium'>09:00AM-6:00</p>
            </li>
            <li className='flex flex-row justify-between'>
                <h1 className='text-2xl font-semibold'>Mar</h1>
                <p className='text-2xl font-medium'>09:00AM-6:00</p>
            </li>
            <li className='flex flex-row justify-between'>
                <h1 className='text-2xl font-semibold'>Mer</h1>
                <p className='text-2xl font-medium'>09:00AM-6:00</p>
            </li>
            <li className='flex flex-row justify-between'>
                <h1 className='text-2xl font-semibold'>Jeu</h1>
                <p className='text-2xl font-medium'>09:00AM-6:00</p>
            </li>
            <li className='flex flex-row justify-between'>
                <h1 className='text-2xl font-semibold'>Ven</h1>
                <p className='text-2xl font-medium text-primary'>Closed</p>
            </li>
        </ul>
    </div>
    )
}
