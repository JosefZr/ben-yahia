"use client"
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from "react-icons/hi2";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return createPortal(
        <div className=' fixed top-0 left-0 w-full h-full backdrop-blur-sm z-50 transition-all'>
            <div style={{ width: '80%', maxWidth: '600px' }} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all">
                <div className="bg-white rounded-lg p-6">
                    <button className="absolute top-2 right-2" onClick={onClose}>
                        <HiXMark className=' text-xl'/>
                    </button>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
