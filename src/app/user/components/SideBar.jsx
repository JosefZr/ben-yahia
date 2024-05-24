"use client"
import Link from 'next/link'
import React, { useState } from 'react'
const sideData = [
    {
        title: "accueil",
        url: "/user"
    },
    {
        title:"mes rendez-vous",
        url: "/user/rendez-vous"

    },
    {
        title:"profile",
        url: "/user/profile"

    }
];
// MenuItem component
const MenuItem = ({ title, to, icon, selected, setSelected }) => {
    return (
        <Link href={to}>
        <div 
            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-[#242428] dark:text-gray-300 hover:text-gray-700 transition-all"
            // className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            // className={`flex items-center gap-2 capitalize px-2.5 py-1.5 transition-all text-3xl font-semibold dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded-xl  ${selected === title ? ' text-purple-400' : ''}`}
            onClick={() => setSelected(title)}
        >
            {icon}
            {title}
        </div>
            
        </Link>

    )
}


export default function SideBar() {
    const [selected, setSelected] = useState("accueil");

return (
    <div className="flex h-screen flex-col justify-between border-e dark:border-[#18181B] bg-white dark:bg-black">
    <nav className="px-4 py-6 ">
        <ul className="mt-6 space-y-1">
            {sideData.map((nav)=>{
                return(
                    <li key={nav.title}>
                        <MenuItem
                            title={nav.title}
                            to={nav.url}
                            selected={selected}
                            setSelected={setSelected}
                        >
                        </MenuItem>
                    </li>
                )
            })}
        </ul>
    </nav>
    <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-[#18181B]">
        <a href="#" className="flex items-center gap-2 bg-white dark:bg-black p-4 hover:bg-gray-50">
        <img
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="size-10 rounded-full object-cover"
        />

        <div>
            <p className="text-xs">
            <strong className="block font-medium">Eric Frusciante</strong>

            <span> eric@frusciante.com </span>
            </p>
        </div>
        </a>
    </div>
</div>

  )
}
