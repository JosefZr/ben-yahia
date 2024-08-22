"use client";
import React, { useEffect, useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { Image } from "@nextui-org/react";
import { CiUser } from "react-icons/ci";
import styled from "styled-components";

import { useActiveSectionContext } from "../../context/activeSection.jsx";
import Link from "next/link";
import CustomButton from "./Button.jsx";
import NewSwitcher from "./NewSwitcher.jsx";
import { useNavbarLinks } from '../lib/data'; // Adjust the path as necessary
import {slideIn, prespective} from "../lib/Animation";
import LocaleSwitcher from "./LocaleSwitcher.jsx";
import { ThemeSwitcher } from "./ThemeSwitcher.jsx";
import { useTranslations } from "next-intl";
import CustomModal from "./CustomModal.jsx";
import useReveal from "@/hooks/useReveal.jsx";

const NavItem = styled.div`
  perspective: 120px;
  perspective-origin: bottom;
`;
function MyNavbar() {
  const action = useTranslations("callAction");
  const links = useNavbarLinks();
  const [applyTransform, setApplyTransform] = useState(false);
  const [applyButton, setApplyButton] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  useReveal('vertival')

  useEffect(() => {
    const handleResize = () => {
      const shouldApply = window.innerWidth < 500;
      const shouldApplyButton = window.innerWidth < 640;
      setApplyTransform(shouldApply);
      setApplyButton(shouldApplyButton);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className=" top-vertical fixed h-18">
      <NavbarContent justify="start">
        <AnimatePresence>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden w-fit"
          />
        </AnimatePresence>
      </NavbarContent>
      <NavbarContent justify={`${applyTransform ? "center" : "start"}`}>
        <NavbarBrand className="flex flex-row justify-center items-center font-extrabold text-md">
          <Image
            src="/logo/Remove background project.webp"
            alt="Logo"
            width={80}
            height={80}
            className="min-w-10 pointer-events-none"
          />
          <h1 className="md:max-[920px]:hidden max-[500px]:hidden">
            Light STOMATOLOGY
          </h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-2 items-center basis-full" justify="center">
        {links.map((link, i) => (
          <div
            key={link.hash}
            className="text-nowrap text-lg font-semibold"
            initial="initial"
            animate="enter"
            exit="exit"
            // variants={prespective(i)}
          >
            <NavbarItem>
              <Link
                href={link.hash}
                passHref
                className={`${link.name === activeSection ? "text-light-green border-b-3 border-light-green pb-5" : "text-foreground"} ${link.name === "ЛБ" && "font-extrabold"}`}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name}
              </Link>
            </NavbarItem>
          </div>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="max-sm:hidden">
        <ThemeSwitcher/>
        <LocaleSwitcher/>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <CustomButton
            passHref
            // as={Link}
            variant="shadow"
            // href="/login"
            onClick={onOpen}
            icon={applyButton && <CiUser size={24} />}
            className="font-semibold bg-light-green text-gray-100 min-w-0"
          >
            {applyButton ? "" : `${action("text")}`}
          </CustomButton>
          <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="flex flex-col gap-5 justify-start overflow-hidden pt-10 pl-10 ">
        {links.map((link, i) => (
          <NavItem key={i}>
            <motion.div variants={prespective(i)} animate='enter' initial="initial" exit="exit">
              <NavbarMenuItem>
                <Link className="text-[46px] font-semibold hover:text-light-green" href={link.hash} passHref>
                  {link.name}
                </Link>
              </NavbarMenuItem>
            </motion.div> 
          </NavItem>
        ))}
        <div className="relative flex flex-row items-center justify-start gap-5 mt-10">
          <NavItem key="new-switcher">
            <motion.div
              variants={slideIn(links.length)}
              animate="enter"
              initial="initial"
              exit="exit"
            >
              <NavbarMenuItem>
                <NewSwitcher />
              </NavbarMenuItem>
            </motion.div>
          </NavItem>
          <NavItem key="locale-switcher">
            <motion.div
              variants={slideIn(links.length + 1)}
              animate="enter"
              initial="initial"
              exit="exit"
            >
              <NavbarMenuItem>
                <LocaleSwitcher/>
              </NavbarMenuItem>
            </motion.div>
          </NavItem>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}

export default MyNavbar;
