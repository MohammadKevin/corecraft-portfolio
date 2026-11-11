"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (isHome) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible((prev) => (prev ? prev : true));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, a, input, [role='button']")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isHome, cursorX, cursorY]);

  if (isHome || !isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference bg-white"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovered ? 28 : 8,
        height: isHovered ? 28 : 8,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    />
  );
}
