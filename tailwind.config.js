/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
export const important = true;
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      "light-green": "var(--light-green)",
      "bold-green": "var(--bold-green)",
      "light-purple": "var(--light-purple)",
      "bold-purple": "var(--bold-purple)",
      "word-purple": "var(--word-purple)",
      "success": "var(--success)",
      'gray-700': '#303136',
      'gray-200': '#f4f4f5',
    },
    boxShadow: {
      'moon': 'inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb',
    },
    backgroundImage: {
      appointments: "url('/appointment/appointments-bg.png')",
      pending: "url('/appointment/pending-bg.png')",
      cancelled: "url('/appointment/cancelled-bg.png')",
    },
    screens: {
      'xs': '320px',
      
    },
  },
};
export const darkMode = "class";
export const plugins = [nextui()];
