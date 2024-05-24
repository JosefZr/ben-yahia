"use client" 

import {sessionProvider} from "next-auth/react"
import React,{ReactNode} from "react"

export default function Providers(props){
    return (
        <sessionProvider>
        {props.children}
        </sessionProvider>
    )

};
