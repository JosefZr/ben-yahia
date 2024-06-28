import { ThemeSwitcher } from '@/app/components/ThemeSwitcher'
import { Input, User } from '@nextui-org/react'
import React from 'react'
import { IoSearch } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

export default function TopBar() {
    return (
        <div className='flex justify-between p-2 items-center'>
            <div className='flex rounded-lg'>
                <Input label="Search"radius='md' startContent={<IoSearch />}/>
            </div>
            <div className='flex gap-2 items-center'>
                <User/>
                <ThemeSwitcher/>
            </div>
        </div>
    )
}
