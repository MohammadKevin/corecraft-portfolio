"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useFinePointer } from "@/lib/hooks";

export default function Atmosphere() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const enabled = !isHome && isFinePointer && prefersReducedMotion !== true;

  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);
  const torchX = useSpring(rawX, { stiffness: 120, damping: 25, mass: 0.8 });
  const torchY = useSpring(rawY, { stiffness: 120, damping: 25, mass: 0.8 });

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled, rawX, rawY]);

  if (isHome) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.025] mix-blend-multiply print:hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {enabled ? (
        <motion.div
          aria-hidden="true"
          style={{ x: torchX, y: torchY }}
          className="pointer-events-none fixed left-0 top-0 z-30 print:hidden -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-[500px] w-[500px] rounded-full bg-radial from-[#2440ff]/[0.05] via-transparent to-transparent blur-3xl pointer-events-none" />
        </motion.div>
      ) : null}
    </>
  );
}
