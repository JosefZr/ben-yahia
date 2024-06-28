// components/Logout.js

import { TbLogout2 } from "react-icons/tb";
import React from 'react';
import { Button } from "@nextui-org/react";
import { handleLogout } from "@/app/login/action";
import { redirect } from "next/navigation"; // Import redirect function

export default function Logout() {
  async function handleClick() {
    const { success } = await handleLogout();
    if (success) {
      // Clear local storage or any client-side state
      localStorage.removeItem('id');
      window.location.href = '/login';
      // Redirect to the login page or home page
    }
  }

  return (
    <Button onClick={handleClick} isIconOnly className="text-center flex items-center justify-center bg-transparent">
      <TbLogout2 className="text-3xl" />
    </Button>
  );
}
