"use client"
import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";
import {AcmeLogo} from "./AcmeLogo.jsx";
import CustomButton from "./Button.jsx";
import { FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { links } from "../lib/data.js";
import '../globals.css'
import { useActiveSectionContext } from "../../context/activeSection.jsx";
import { ThemeSwitcher } from "./ThemeSwitcher.jsx";
const menuItems = [
    "home",
    "about me",
    "services",
    "Log Out",
];
function MyNavbar() {
    const[isMenuOpen, setIsMenuOpen] = useState()
    const {activeSection, setActiveSection, setTimeOfLastClick} = useActiveSectionContext();
    return (
        // <motion.div initial={{y:-100, opacity:0}} animate={{y:0, opacity:1}}>
            <Navbar  onMenuOpenChange={setIsMenuOpen} >
            <NavbarContent>
                <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
                />
            <NavbarBrand>
                <AcmeLogo/>
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-3 items-center basis-full">
                {links.map((link)=>(
                    <motion.NavbarItem key={link.hash} className="text-nowrap">
                        <Link 
                            color={`${link.name===activeSection?"primary":"foreground"}`} 
                            href={link.hash}
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
            
            <NavbarContent justify="end">
            <ThemeSwitcher/>

                <NavbarItem className=" sm:flex">
                    <CustomButton 
                        as={Link} 
                        color="danger" 
                        variant='shadow' 
                        href="/login" 
                        icon={<FaRegUser />} 
                    >
                        Login
                    </CustomButton>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item,index)=>(
                    <NavbarMenuItem key={`${index}-${index}`}>
                        <Link 
                            color={
                                index ===1 ? "primary" : index ===menuItems.length -1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="/"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
        // </motion.div>
        
    )
}

export default MyNavbar