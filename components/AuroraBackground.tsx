"use client";

import React from "react";

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[#FAF8F1]"
    >
      <div className="absolute -top-[8%] -left-[5%] w-[520px] h-[520px] sm:w-[650px] sm:h-[650px] rounded-full bg-[radial-gradient(circle,rgba(168,216,255,0.75)_0%,rgba(168,216,255,0)_70%)] blur-[80px] sm:blur-[120px] opacity-60 animate-aurora-1 will-change-transform" />

      <div className="absolute top-[2%] -right-[8%] w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,217,179,0.7)_0%,rgba(255,217,179,0)_70%)] blur-[80px] sm:blur-[120px] opacity-55 animate-aurora-2 will-change-transform" />

      <div className="absolute top-[42%] -left-[10%] w-[500px] h-[500px] sm:w-[620px] sm:h-[620px] rounded-full bg-[radial-gradient(circle,rgba(217,200,255,0.7)_0%,rgba(217,200,255,0)_70%)] blur-[90px] sm:blur-[130px] opacity-55 animate-aurora-3 will-change-transform" />

      <div className="absolute -bottom-[8%] right-[5%] w-[550px] h-[550px] sm:w-[680px] sm:h-[680px] rounded-full bg-[radial-gradient(circle,rgba(179,240,217,0.65)_0%,rgba(179,240,217,0)_70%)] blur-[90px] sm:blur-[130px] opacity-50 animate-aurora-4 will-change-transform" />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
