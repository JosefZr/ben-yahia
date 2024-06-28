"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import image from "../../../../public/_0990d51c-9f15-4894-bfc9-da15152c1185-removebg.png"
import Image from 'next/image';
import { IoMenu } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaUserInjuredSolid } from "react-icons/lia";
import { FaUserInjured } from "react-icons/fa";

const navList= [{
    title:"accueil",
    url: "/admin" ,
    icon:<IoHomeOutline />,
},
{
    title:"patient",
    url:"/admin/patient",
    icon:<FaUserInjured />,
},
{
    title:"rendez-vous",
    url:"/admin/rendez-vous",
    icon:<SlCalender />,
},  {
    title:"docteur",
    url:"/admin/docteur",
    icon:<FaUserDoctor />,
},{
    title: "paramétre",
    icon: <IoSettingsOutline />,
    subItems: [
        { title: "Settings", url: "/admin/settings" },
        { title: "Opening Hours", url: "/admin/opening" },
        { title: "Menu", url: "/admin/menu" },
    ],
},
];
// MenuItem component
const MenuItem = ({ title, to, icon, selected, setSelected,subItems  }) => {
    const [show, setShow] = useState(false);

    const toggleDropdown = () => setShow(!show);

    if (subItems) {
        return (
            <div className='relative'>
                <div 
                    className={`flex items-center gap-2 capitalize px-2.5 py-1.5 transition-all text-3xl font-semibold dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded-xl  ${selected === title ? ' text-purple-400' : ''}`}
                    onClick={toggleDropdown}
                >
                    {icon}
                    {title}
                </div>
                {show && (
                    <ul className='flex flex-col gap-1.5 pl-6'>
                    {subItems.map((subItem, index) => (
                        <li key={index} className='text-lg'>
                            <Link href={subItem.url}
                                    className={`block px-4 py-2 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl ${selected === subItem.title ? ' text-purple-400' : ''}`}
                                    onClick={() => setSelected(subItem.title)}>
                                    {subItem.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                )}
            </div>
        );
    }

    return (
        <Link href={to}>
        <div 
            className={`flex items-center gap-2 capitalize px-2.5 py-1.5 transition-all text-3xl font-semibold dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded-xl  ${selected === title ? ' text-purple-400' : ''}`}
            onClick={() => setSelected(title)}
        >
            {icon}
            {title}
        </div>
            
        </Link>

    )
}

export default function Sidbar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("accueil");
    return (
        <div className={`flex flex-col dark:bg-gray-900 bg-gray-100 ${!isCollapsed ? 'min-w-56' : ''}`}>
            <div className='flex items-center ml-4 text-2xl cursor-pointer'>
                <IoMenu onClick={() => setIsCollapsed(!isCollapsed)} />
            </div>
            {/* user */}
            {!isCollapsed && (
                <>
                    <div className='flex flex-col justify-center items-center my-10'>
                        <Image
                            alt='profile-user'
                            width={130}
                            height={100}
                            src='/_0990d51c-9f15-4894-bfc9-da15152c1185-removebg.png'
                            className='cursor-pointer rounded-[50%]'
                        />
                    </div>
                    {/* menu items */}
                    <nav>
                        <ul className='flex flex-col gap-1.5'>
                            {navList.map((list) => (
                                <li key={list.title}>
                                    <MenuItem
                                        title={list.title}
                                        to={list.url}
                                        icon={list.icon}
                                        selected={selected}
                                        setSelected={setSelected}
                                        subItems={list.subItems}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}
