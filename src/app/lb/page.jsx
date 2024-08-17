"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroLb from "./components/HeroLb";
import LbNavbar from "./components/LbNavbar";
import LbLoader from "./components/LbLoader";
import SectionDivider from "../components/SectionDivider";
import Features from "./components/Features";
import Convincing from "./components/Convincing";
import InfiniteScroll from "./components/InfiniteScroll";
import HorizontalScroll from "./components/HorizontalScroll";
import Visitors from "./components/Visitors";

export default function Lb() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.querySelector('body').classList.add('loading');
    } else {
      document.querySelector('body').classList.remove('loading');
    }
  }, [loading]);
  return (
    <AnimatePresence>
      {loading ? (
        <LbLoader
          setLoading={setLoading}
          exit={{
            opacity: 0,
            transition: { ease: [0.6, 0.01, -0.05, 0.9], duration: 3.8 }
          }}
        />
      ) : (
        <div className="relative min-h-screen overflow-hidden bg-[#F3EEF3]">
          {/* Background elements */}

          <LbNavbar />
          <HeroLb />
          <Visitors/>
          <Features />
          <Convincing />
          <InfiniteScroll />
          <HorizontalScroll />
        </div>
      )}
    </AnimatePresence>
  );
}
