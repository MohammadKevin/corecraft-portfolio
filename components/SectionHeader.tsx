"use client";

import React from "react";

interface SectionHeaderProps {
  number: string;
  title: string;
  meta?: React.ReactNode;
  className?: string;
  borderColor?: string;
}

export default function SectionHeader({
  number,
  title,
  meta,
  className = "",
  borderColor = "border-current/10",
}: SectionHeaderProps) {
  return (
    <div
      className={`relative z-10 flex items-center justify-between border-b ${borderColor} pb-4 mb-6 sm:mb-8 font-mono text-xs uppercase tracking-wider select-none ${className}`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="font-bold text-[var(--accent)] tracking-[0.2em]">
          {number}
        </span>
        <span className="font-semibold tracking-[0.2em] text-[var(--fg)] opacity-90">
          {title}
        </span>
      </div>

      {meta ? (
        <div className="text-[var(--muted)] text-[11px] sm:text-xs tracking-normal">
          {meta}
        </div>
      ) : null}
    </div>
  );
}
