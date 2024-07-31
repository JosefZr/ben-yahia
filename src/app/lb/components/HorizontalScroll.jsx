import React from 'react';
import './hor.css';
import Link from 'next/link';

export default function HorizontalScroll() {
  return (
    <div className="logos">
      <div className="logos-slide">
        <h1>•Assistance available in <span className='text-word-purple'>English</span> and <span className='text-word-purple'>French</span>• Limited time offer - Get your Free access!</h1>
        <h1>Get in touch with us Now! - Don’t miss out your opportunity - <span className='underline'><Link href="mailto:lbstomatologia1@gmail.com" size="sm" isExternal > lbstomatologia1@gmail.com </Link></span>
        </h1>
        <h1>
        <span className='underline'><Link href="mailto:dristomatologia@gmail.com" size="sm" isExternal > dristomatologia@gmail.com </Link></span> - <span className='underline'><Link href="mailto:drrstomatologia@gmail.com" size="sm" isExternal > drrstomatologia@gmail.com </Link></span>
          <span className=' text-word-purple'> • EN Service : </span>
          <span 
            className='cursor-pointer' 
            onClick={() => window.open('https://t.me/LBSTOMA01', '_blank')}
          > @LBSTOMA01
          </span> -
          <span 
            className='cursor-pointer' 
            onClick={() => window.open('https://t.me/Abstoma', '_blank')}
          > @Abstoma
          </span><span className=' text-word-purple'> • FR Service : </span>
          <span 
            className='cursor-pointer' 
            onClick={() => window.open('https://t.me/DrSenBI', '_blank')}
          > @DrSenBI</span> -
          <span 
            className='cursor-pointer' 
            onClick={() => window.open('https://t.me/Drrstoma', '_blank')}
          > @Drrstoma
          </span>
        </h1>
      </div>
      <div className="logos-slide">
      <h1>•Assistance available in <span className='text-word-purple'>English</span> and <span className='text-word-purple'>French</span>• Limited time offer - Get your Free access!</h1>
        <h1>Get in touch with us Now! - Don’t miss out your opportunity - <span className='underline'><Link href="mailto:lbstomatologia1@gmail.com" size="sm" isExternal > lbstomatologia1@gmail.com </Link></span>
        </h1>
        
        <h1>
        <span className='underline'><Link href="mailto:dristomatologia@gmail.com" size="sm" isExternal > dristomatologia@gmail.com </Link></span> - <span className='underline'><Link href="mailto:drrstomatologia@gmail.com" size="sm" isExternal > drrstomatologia@gmail.com </Link></span>
          <span className=' text-word-purple'> • EN Service : </span>
          <span 
            className='cursor-pointer' 
            onClick={() => window.open('https://t.me/LBSTOMA01')}
          > @LBSTOMA01
          </span> -
          <span 
            className='cursor-pointer' 
            onClick={() => window.open('https://t.me/Abstoma', '_blank')}
          > @Abstoma
          </span> <span className=' text-word-purple'> • FR Service : </span>
          <span 
            className='cursor-pointer' 
            onClick={() => window.open('https://t.me/DrSenBI', '_blank')}
          > @DrSenBI</span> -
          <span 
            className='cursor-pointer' 
            onClick={() => window.open('https://t.me/Drrstoma', '_blank')}
          > @Drrstoma
          </span>
        </h1>
      </div>
    </div>
  );
}
