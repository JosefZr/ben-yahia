"use client"
import { useOutsideClick } from '@/hooks/useOutsideClick';
import React, { cloneElement, createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext()

export default function Modal({children}){
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
        
        <div className=' fixed top-0 left-0 w-full h-full backdrop-blur-sm z-50 transition-all '>
            <div ref={ref} style={{ width: '80%', maxWidth: '600px' }} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all">
                <div className="bg-white rounded-lg p-6">
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

Modal.Open = Open;
Modal.Window = Window;
