import React from 'react'

export default function Header({title}) {
    return (
        <div className=' w-[60%]'>
            <h1 className="font-semibold text-5xl capitalize text-light-green">{title}</h1>
        </div>
    )
}
