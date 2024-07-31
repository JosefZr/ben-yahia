import { ThemeSwitcher } from '@/app/components/ThemeSwitcher'
import React from 'react'

import Header from './Header'
import HeaderMobile from './header-mobile'

export default function TopBar() {
    return (
        <div className='flex justify-between p-2 items-center'>
            {/* <div className='flex rounded-lg'>
                <Input label="Search"radius='md' startContent={<IoSearch />}/>
            </div> */}
            <div className='flex justify-between gap-2 w-full items-center'>
                <ThemeSwitcher/>
                <Header/>
                <HeaderMobile/>
            </div>
        </div>
    )
}
