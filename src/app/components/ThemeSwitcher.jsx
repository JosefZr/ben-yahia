"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PiSunDimFill } from "react-icons/pi";
import { MdDarkMode } from "react-icons/md";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [dark, setDark] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        // If a theme preference is found in local storage, use it
        if (savedTheme) {
            setTheme(savedTheme);
            setDark(savedTheme === "dark");
        } else {
            // Otherwise, use the default theme
            setTheme(dark ? "dark" : "light");
        }

        setMounted(true);
    }, [dark, setTheme]);

    // Handle theme mode toggle
    const toggleTheme = () => {
        const newTheme = dark ? "light" : "dark";
        setTheme(newTheme);
        setDark(!dark);

        // Save theme preference to local storage
        localStorage.setItem("theme", newTheme);
    };

    if (!mounted) return null;

    return (
        <div className="flex items-center transition-opacity hover:opacity-80 cursor-pointe max-sm:hidden" >
            <button onClick={toggleTheme} className=" text-3xl">
                {dark ? <MdDarkMode /> : <PiSunDimFill />}
            </button>
        </div>
    );
}
