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
    const duration = 2100;

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
      <div
        className={`relative flex items-center justify-between rounded-full bg-[#1C1B1D] text-white border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase === "compact"
            ? "w-[160px] h-11 px-3.5 scale-90 translate-y-0 opacity-0 duration-200"
            : phase === "expanding"
            ? "w-[270px] sm:w-[310px] h-12 sm:h-13 px-4 sm:px-5 scale-100 translate-y-0 opacity-100 duration-500"
            : "w-[94%] max-w-3xl lg:max-w-4xl h-12 sm:h-13 px-4 sm:px-5 scale-100 -translate-y-[calc(50vh-2rem)] opacity-0 bg-white/80 duration-700"
        }`}
      >
        <div className="flex items-center gap-2.5 shrink-0">
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
          <span className="text-[13px] sm:text-[14px] font-bold tracking-tight text-white/90">
            Kevin
          </span>
        </div>

        <div className="flex items-center gap-1 px-2">
          <span className="w-0.5 h-3.5 bg-sky-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
          <span className="w-0.5 h-5 bg-sky-300 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.15s]" />
          <span className="w-0.5 h-2.5 bg-sky-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.3s]" />
          <span className="w-0.5 h-4 bg-sky-300 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.45s]" />
        </div>

        <div className="flex items-center gap-1.5 shrink-0 font-mono">
          <span className="text-xs sm:text-[13px] font-bold text-sky-400">
            {progress}%
          </span>
        </div>

        <div className="absolute inset-x-4 bottom-0.5 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-sky-300 to-white rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
