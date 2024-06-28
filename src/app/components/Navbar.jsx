"use client"
import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";
import Link from "next/link"
import {AcmeLogo} from "./AcmeLogo.jsx";
import CustomButton from "./Button.jsx";
import { FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { links } from "../lib/data.js";
import '../globals.css'
import { useActiveSectionContext } from "../../context/activeSection.jsx";
import { ThemeSwitcher } from "./ThemeSwitcher.jsx";
import { Image } from "@nextui-org/react";
function MyNavbar() {
    const[isMenuOpen, setIsMenuOpen] = useState()
    const {activeSection, setActiveSection, setTimeOfLastClick} = useActiveSectionContext();
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="fixed h-24">
            <NavbarContent >
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="md:hidden"
                />
                <NavbarBrand className=" flex flex-row justify-center items-center font-bold text-md">
                    <Image
                        src="/logo/Remove background project.png"
                        alt="Logo" 
                        width={80}
                        className=" min-w-10"
                    /> 
                    <h1 className="md:max-[920px]:hidden max-[500px]:hidden">Light STOMATOLOGY</h1>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden md:flex gap-2 items-center basis-full">
                {links.map((link)=>(
                    <motion.NavbarItem key={link.hash} className="text-nowrap">
                        <Link 
                            href={link.hash}
                            passHref
                            className={`${link.name===activeSection?"text-primary":"text-foreground"}`} 
                            onClick={()=>{
                                setActiveSection(link.name)
                                setTimeOfLastClick(Date.now())
                            }}
                        >
                            {link.name}
                        </Link>
                    </motion.NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify='center'>
                <ThemeSwitcher/>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className=" sm:flex">
                    <CustomButton 
                        passHref
                        as={Link} 
                        color="success" 
                        variant='shadow' 
                        href="/login" 
                        className="font-semibold"
                        // icon={<FaRegUser />} 
                    >
                        Make Appointment
                    </CustomButton>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {links.map((link)=>(
                    <NavbarMenuItem key={link.hash}>
                        <Link 
                            className="w-full"
                            href={link.hash}
                            size="lg"
                            passHref
                        >
                            {link.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
        
    )
}

export default MyNavbar