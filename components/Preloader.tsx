"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"compact" | "expanding" | "morphing" | "done">("compact");

  useEffect(() => {
    const emergenceTimer = setTimeout(() => setPhase("expanding"), 100);

    const startTime = Date.now();
    const duration = 2000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);

        setTimeout(() => {
          setPhase("morphing");

          setTimeout(() => {
            setPhase("done");
            setLoading(false);
          }, 650);
        }, 120);
      }
    }, 20);

    return () => {
      clearTimeout(emergenceTimer);
      clearInterval(timer);
    };
  }, []);

  if (!loading || phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-700 pointer-events-none select-none ${
        phase === "morphing"
          ? "bg-[#FAF8F1]/0 backdrop-blur-none"
          : "bg-[#FAF8F1] backdrop-blur-2xl"
      }`}
    >
      {/* Dynamic Island Capsule */}
      <div
        className={`relative flex items-center justify-between rounded-full bg-[#1C1B1D] text-white border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.4)] transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase === "compact"
            ? "w-[150px] h-11 px-3.5 scale-90 translate-y-0 opacity-0 duration-200"
            : phase === "expanding"
            ? "w-[88vw] max-w-[290px] sm:max-w-[330px] h-12 sm:h-13 px-3.5 sm:px-5 scale-100 translate-y-0 opacity-100 duration-500"
            : "w-[92%] sm:w-[94%] max-w-5xl lg:max-w-6xl h-12 sm:h-14 px-3.5 sm:px-5 scale-100 -translate-y-[calc(50vh-1.5rem)] sm:-translate-y-[calc(50vh-1.75rem)] opacity-0 bg-white/80 duration-700"
        }`}
      >
        {/* Brand Left */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center p-1 border border-white/20 shadow-xs">
            <Image
              src="/images/corecraft-logo-dark.svg"
              alt="CoreCraft"
              width={24}
              height={24}
              className="w-full h-full object-contain invert"
              priority
            />
          </div>
          <span className="text-xs sm:text-[13px] md:text-[14px] font-bold tracking-tight text-white/95">
            Kevin
          </span>
        </div>

        {/* Dynamic Soundwave Bars */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2">
          <span className="w-0.5 sm:w-1 h-3.5 sm:h-4 bg-gradient-to-t from-sky-500 to-sky-300 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
          <span className="w-0.5 sm:w-1 h-5 sm:h-5.5 bg-gradient-to-t from-sky-400 to-cyan-200 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.15s]" />
          <span className="w-0.5 sm:w-1 h-2.5 sm:h-3 bg-gradient-to-t from-sky-500 to-sky-300 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.3s]" />
          <span className="w-0.5 sm:w-1 h-4 sm:h-4.5 bg-gradient-to-t from-sky-400 to-cyan-200 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.45s]" />
        </div>

        {/* Progress Percentage */}
        <div className="flex items-center gap-1 shrink-0 font-mono">
          <span className="text-[11px] sm:text-xs md:text-[13px] font-bold tabular-nums bg-gradient-to-r from-sky-400 to-cyan-200 bg-clip-text text-transparent">
            {progress}%
          </span>
        </div>

        {/* Responsive Progress Track & Glowing Gradient Line */}
        <div className="absolute inset-x-3.5 sm:inset-x-5 bottom-1 sm:bottom-1.5 h-[2px] sm:h-[2.5px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="relative h-full bg-gradient-to-r from-sky-500 via-sky-400 via-cyan-300 to-white rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(56,189,248,0.9),0_0_4px_rgba(255,255,255,0.8)]"
            style={{ width: `${progress}%` }}
          >
            {/* Glowing tip at leading edge */}
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-r from-transparent to-white shadow-[0_0_8px_#ffffff] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}