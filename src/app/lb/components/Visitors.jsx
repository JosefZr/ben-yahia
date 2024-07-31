import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa6";

export default function Visitors() {
  const [showButton, setShowButton] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      setShowButton(scrollPosition > 1800);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showButton) {
      console.log("Button is visible");
    }
  }, [showButton]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const storedData = localStorage.getItem('visitorData');
    let visitorData = storedData ? JSON.parse(storedData) : {};

    if (visitorData.date !== today) {
      const randomCount = Math.floor(Math.random() * 36) + 1; // Generate a random number between 1 and 36
      visitorData = { date: today, count: randomCount };
      localStorage.setItem('visitorData', JSON.stringify(visitorData));
    }

    setVisitorCount(visitorData.count);
  }, []);

  return (
    <div className={`${showButton ? "fixed z-10 right-0 top-3/4 transform -translate-y-3/4" : "hidden"}`}>
      <Button className="bg-purple-400 text-white p-2 rounded" startContent={<FaEye />}>Visitors: {visitorCount}</Button>
    </div>
  );
}
