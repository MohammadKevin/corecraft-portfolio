"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return !sessionStorage.getItem("corecraft-preloader-seen");
      } catch {
        return true;
      }
    }
    return true;
  });
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Core...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!loading) return;

    const startTime = Date.now();
    const duration = 2400; // 2.4s count + 0.6s morph/exit = 3.0s total

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(currentProgress);

      if (currentProgress < 35) {
        setStatusText("Loading Architecture...");
      } else if (currentProgress < 75) {
        setStatusText("Optimizing Engine...");
      } else if (currentProgress < 100) {
        setStatusText("Calibrating Systems...");
      } else {
        setStatusText("Systems Ready");
        clearInterval(interval);

        // Start morph / fade-out transition
        setTimeout(() => {
          setIsFadingOut(true);
          try {
            sessionStorage.setItem("corecraft-preloader-seen", "true");
          } catch {}
          setTimeout(() => {
            setLoading(false);
          }, 600);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F1] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut
          ? "opacity-0 pointer-events-none scale-105 backdrop-blur-none"
          : "opacity-100 backdrop-blur-3xl"
      }`}
    >
      {/* Background ambient liquid glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(118,192,236,0.35)_0%,rgba(118,192,236,0)_70%)] animate-pulse pointer-events-none" />

      {/* Floating Center Dynamic Island Pill */}
      <div
        className={`relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_24px_60px_-10px_rgba(28,27,29,0.12),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFadingOut ? "scale-90 -translate-y-12 opacity-0" : "scale-100 translate-y-0"
        } w-[90%] max-w-[340px] sm:max-w-[380px]`}
      >
        <div className="flex items-center gap-3.5 mb-5 w-full justify-between px-1">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/corecraft-logo-dark.svg"
              alt="CoreCraft Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain rounded-xl shadow-xs animate-bounce duration-1000"
              priority
            />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[15px] font-bold text-[#1C1B1D] tracking-tight">
                CoreCraft
              </span>
              <span className="text-[10px] font-mono text-[#71717A] tracking-wider">
                MOHAMMAD KEVIN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono font-semibold border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{progress}%</span>
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-[#71717A] mb-2 px-1">
          <span className="truncate">{statusText}</span>
          <span className="text-[11px] font-bold text-[#1C1B1D]">{progress}/100</span>
        </div>

        {/* Liquid Progress Bar */}
        <div className="w-full h-1.5 bg-black/[0.06] rounded-full overflow-hidden p-0.5 border border-black/[0.04]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-[#1C1B1D] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
