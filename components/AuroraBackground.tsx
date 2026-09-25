"use client";

import React from "react";

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[#FAF8F1] print:hidden"
    >
      <div className="absolute -top-[15%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,216,255,0.45)_0%,rgba(168,216,255,0)_70%)] pointer-events-none" />
      <div className="absolute top-[20%] -right-[15%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(255,228,200,0.4)_0%,rgba(255,228,200,0)_70%)] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(217,200,255,0.35)_0%,rgba(217,200,255,0)_70%)] pointer-events-none" />
    </div>
  );
}
