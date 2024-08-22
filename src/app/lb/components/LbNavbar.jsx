"use client";
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { Image } from "@nextui-org/react";
import styled from "styled-components";
import Link from "next/link";
import CustomButton from "@/app/components/Button.jsx";
import { useLbNavbarLinks } from "@/app/lib/data"; 
import { slideIn, prespective } from "../../lib/Animation";
import { FaTelegram } from "react-icons/fa";
const NavItem = styled.div`
  perspective: 120px;
  perspective-origin: bottom;
`;

function LbNavbar() {
  const links = useLbNavbarLinks();
  const [applyTransform, setApplyTransform] = useState(false);
  const [applyButton, setApplyButton] = useState(false);

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

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="fixed h-24 max-[400px]:h-20">
      <NavbarContent justify="start">
        <AnimatePresence>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="w-fit"
          />
        </AnimatePresence>
      </NavbarContent>
      <motion.div className="flex justify-center items-center font-extrabold text-md">
        <NavbarBrand className="flex flex-row justify-center items-center font-extrabold text-md">
          <motion.div >
            <motion.div 
                transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1.8 }}
                layoutId='main-image-1'
            >
                <Image
                src="/lb/lb-small.png"
                alt='White and Black Simple Illustration Dental Clinic Logo'
                width={70}
                height={50}
                className=' rounded-full pointer-events-none '
                />
            </motion.div>
            </motion.div>
        </NavbarBrand>
      </motion.div>
      <NavbarContent justify="end">
        <NavbarItem>
          
          <CustomButton
            passHref
            variant="shadow"
            onPress={()=>   window.open( 'https://t.me/lbstoma1'," _blank")}
            icon={applyButton && <FaTelegram  size={24} />}
            className="font-semibold  bg-black text-gray-100 min-w-0"
          >
            {applyButton ? "" : "Join ЛБ-Dental Family!"}
          </CustomButton>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="flex flex-col gap-5 justify-start overflow-hidden pt-10 pl-10">
        {links.map((link, i) => (
          <NavItem key={i}>
            <motion.div variants={prespective(i)} animate="enter" initial="initial" exit="exit">
              <NavbarMenuItem>
                <Link className="text-[46px] font-semibold hover:text-word-purple" href={link.hash} passHref>
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
              </NavbarMenuItem>
            </motion.div>
          </NavItem>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}

export default LbNavbar;
