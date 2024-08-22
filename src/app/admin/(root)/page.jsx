"use client"
import React from 'react';
import Header from '../../components/Header';
import DashboardFilter from '../global/DashboardFilter';
import DashboardLayout from '../global/DashboardLayout';

export default function Home() {

  return (
    <div className='flex flex-col relative h-full w-full'>
        <div className=' flex flex-col m-5'>
        <div className='flex justify-between items-center'>
            <Header title='Dashboard' />
            <DashboardFilter/>
        </div>
        <DashboardLayout/>
        </div> 
    </div>
  );
}
 