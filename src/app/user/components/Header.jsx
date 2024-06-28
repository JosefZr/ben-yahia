import { ThemeSwitcher } from '@/app/components/ThemeSwitcher'
import React from 'react'
import ProfileHeader from '../components/ProfileHeader'
import Logout from '../components/Logout'
export default function Header() {
    return (
        <div className='flex flex-row items-center justify-between bg-gray-50 dark:bg-black '>
            <ProfileHeader/>
            <div className=' flex flex-row '>
                <ThemeSwitcher/>
                <Logout/>
            </div>
        </div>  
    )
}
