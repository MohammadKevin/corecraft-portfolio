"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [phase, setPhase] = useState<"drawing" | "filled" | "exiting">("drawing");

  useEffect(() => {
    const hasShown = typeof window !== "undefined" && sessionStorage.getItem("preloader_shown");
    if (hasShown) {
      const skipTimer = setTimeout(() => setComplete(true), 0);
      return () => clearTimeout(skipTimer);
    }

    const fillTimer = setTimeout(() => {
      setPhase("filled");
    }, 900);

    const exitTimer = setTimeout(() => {
      setPhase("exiting");
      setComplete(true);
      sessionStorage.setItem("preloader_shown", "true");
    }, 1900);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!complete ? (
        <motion.div
          key="apple-hello-preloader"
          aria-hidden="true"
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0C] px-6 text-white print:hidden pointer-events-none select-none"
        >
          <div className="relative flex flex-col items-center justify-center">
            <svg
              viewBox="0 0 600 140"
              className="w-[280px] sm:w-[420px] md:w-[520px] h-auto overflow-visible"
            >
              <defs>
                <linearGradient id="corecraft-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#D4D4D8" />
                </linearGradient>
              </defs>

              <motion.text
                x="50%"
                y="65%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-display font-extrabold text-7xl sm:text-8xl tracking-tight"
                stroke="url(#corecraft-grad)"
                strokeWidth="1.8"
                fill="transparent"
                initial={{
                  strokeDasharray: 600,
                  strokeDashoffset: 600,
                  fill: "rgba(255, 255, 255, 0)",
                }}
                animate={{
                  strokeDashoffset: 0,
                  fill:
                    phase === "filled" || phase === "exiting"
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 255, 255, 0)",
                }}
                transition={{
                  strokeDashoffset: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
                  fill: { duration: 0.45, ease: "easeOut" },
                }}
              >
                Corecraft
              </motion.text>
            </svg>

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: phase === "filled" || phase === "exiting" ? 0.6 : 0,
                y: phase === "filled" || phase === "exiting" ? 0 : 8,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-3 font-mono text-[11px] sm:text-xs text-white/60 tracking-[0.28em] uppercase text-center"
            >
              SYSTEMS & SOFTWARE ARCHITECTURE
            </motion.span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
