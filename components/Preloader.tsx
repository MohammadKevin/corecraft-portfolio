"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const hasShown = sessionStorage.getItem("preloader_shown");
    if (hasShown) {
      setComplete(true);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        setCount(100);
        clearInterval(interval);
        setTimeout(() => {
          setComplete(true);
          sessionStorage.setItem("preloader_shown", "true");
        }, 300);
      } else {
        setCount(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!complete ? (
        <motion.div
          key="preloader"
          aria-hidden="true"
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0A0A0C] p-8 sm:p-14 text-white print:hidden pointer-events-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between font-mono text-xs text-white/50 tracking-[0.2em] uppercase">
            <span>CORECRAFT ARCHITECTURE</span>
            <span>SYSTEM INIT</span>
          </div>

          {/* Center Digital Counter */}
          <div className="flex flex-col items-center justify-center">
            <span className="font-display text-7xl sm:text-9xl md:text-[12rem] font-extrabold tracking-tighter text-white tabular-nums">
              {String(count).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs text-white/40 tracking-[0.25em] uppercase mt-2">
              COMPILING PLATFORM STATE
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between font-mono text-xs text-white/40">
            <span>MOHAMMAD KEVIN</span>
            <span>2026 EDITION</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
