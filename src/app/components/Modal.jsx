"use client"
import { useOutsideClick } from '@/hooks/useOutsideClick';
import React, { cloneElement, createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext()

export default function MyModal({children}){
    const [openName, setopenName] = useState('')
    const close = ()=>setopenName("");
    const open = setopenName;
    return(
        <ModalContext.Provider value={{openName, close, open}}>
            {children}
        </ModalContext.Provider>
    )
}
export function Open({children, opens:opensWindowName}){
    const {open } =useContext(ModalContext);

    return cloneElement(children,{onClick:()=> open(opensWindowName)})
}

function Window({ children,name }) {
    const {openName, close } = useContext(ModalContext);
    const ref = useOutsideClick(close)

    if(name!== openName ) return null;

    return createPortal(
        
        <div className=' fixed top-0 left-0 w-full h-full backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out'style={{opacity: openName === name ? 1 : 0}} >
            <div ref={ref} style={{ width: '80%', maxWidth: '600px' , minHeight:'200px' }} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-default-50 rounded-lg shadow-lg transition-transform duration-300 ease-in-out">
                <div className="bg-default-50 rounded-lg p-6">
                    <button className="absolute top-2 right-2" onClick={close}>
                        <HiXMark className=' text-xl'/>
                    </button>
                    {cloneElement(children,{onCloseModal:close})}
                </div>
            </div>
        </div>,
        document.body
    );
}

MyModal.Open = Open;
MyModal.Window = Window;
