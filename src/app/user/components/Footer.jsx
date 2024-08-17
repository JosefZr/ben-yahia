import React from 'react'
import { footer } from '@/app/lib/data'
export default function Footer() {
  return (
    <div className='bg-default-100 p-10 w-full max-w-[1300px] flex flex-col gap-7 rounded-3xl'>
        <h1 className='text-3xl font-bold text-center text-primary'>Contacter nous</h1>
        <div className='flex flex-row items-center justify-center flex-wrap gap-5'>
            {footer.map((data) => (
                <div key={data.name} className='flex flex-row-reverse items-center flex-wrap justify-between gap-5 text-xl font-medium'>
                    <h1 className=' text-wrap'>{data.content}</h1>
                    {data.icon}
                </div>
            ))}
        </div>
    </div>
  )
}
