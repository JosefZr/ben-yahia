"use client"
import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";
import Link from "next/link"
import CustomButton from "./Button.jsx";
import { motion } from "framer-motion";
import { useActiveSectionContext } from "../../context/activeSection.jsx";
import { ThemeSwitcher } from "./ThemeSwitcher.jsx";
import { Image } from "@nextui-org/react";
import LocalSwitcher from './LocaleSwitcher';
import { useTranslations } from "next-intl";


function MyNavbar() {
    const t = useTranslations('Navbar');
    
    const links = [
            {
            name: t("home.name"),
            hash: t("home.hash")
            },
            {
            name: t("services.name"),
            hash: t("services.hash")
            },
            {
            name: t("us.name"),
            hash: t("us.hash")
            },
            {
            name: t("contact.name"),
            hash: t("contact.hash")
            },
            {
            name: t("ЛБ.name"),
            hash: t("ЛБ.hash")
            }
        ];
    const action = useTranslations("callAction")
    const[isMenuOpen, setIsMenuOpen] = useState()
    const {activeSection, setActiveSection, setTimeOfLastClick} = useActiveSectionContext();
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="fixed h-18 transition-all ">
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="md:hidden"
                />
                <NavbarBrand className=" flex flex-row justify-center items-center font-extrabold text-md">
                    <Image
                        src="/logo/Remove background project.png"
                        alt="Logo" 
                        width={80}
                        className=" min-w-10"
                    /> 
                    <h1 className="md:max-[920px]:hidden max-[500px]:hidden ">Light STOMATOLOGY</h1>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex gap-2 items-center basis-full" justify="center">
                {links.map((link)=>(
                    <motion.NavbarItem key={link.hash} className="text-nowrap text-lg font-semibold">
                        <Link 
                            href={link.hash}
                            passHref
                            className={`${link.name===activeSection?"text-light-green border-b-3 border-light-green pb-5":"text-foreground" }
                            ${link.name === "ЛБ"&& " font-extrabold"}`} 
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

            <NavbarContent justify='end'>
                <LocalSwitcher/>
            </NavbarContent>
            <NavbarContent justify="end">
            <ThemeSwitcher/>
            <localSwitcher/>
                <NavbarItem className=" sm:flex">
                    <CustomButton 
                        passHref
                        as={Link} 
                        variant='shadow' 
                        href="/login" 
                        className="font-semibold bg-light-green text-gray-100"
                        // icon={<FaRegUser />} 
                    >
                        {action("text")}
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