"use client"
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { redirect } from 'next/navigation';
import { useQuery } from 'react-query';
import { getUserCredantials } from '@/app/user/api/profileApi';

export default function Home() {

  return (
    <div className='flex flex-col relative h-full w-full'>
         <div className=' flex flex-col m-5'>
        <div className='flex justify-between items-center'>
            <Header title='fsdkj' subtitle='dfazjlcndjlsqncqlsk'/>
        </div>
        </div> 
    </div>
  );
}
