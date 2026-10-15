"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/hooks";
import { spring } from "@/lib/motion";

type MagneticButtonProps = {

  href: string;
  children: React.ReactNode;

  variant?: "solid" | "outline" | "ghost";
  className?: string;
  ariaLabel?: string;

  newTab?: boolean;

  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const variantClasses: Record<
  NonNullable<MagneticButtonProps["variant"]>,
  string
> = {
  solid:
    "bg-ink text-white border border-ink hover:bg-[#1E293B] focus-visible:outline-ink",
  outline:
    "bg-transparent text-ink border border-black/[0.08] hover:border-ink hover:bg-neutral-100/80 focus-visible:outline-ink",
  ghost:
    "bg-transparent text-white border border-white/[0.08] hover:border-white focus-visible:outline-white",
};

function isInternalHref(href: string): boolean {
  return href.startsWith("#") || href.startsWith("/");
}

export default function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
  ariaLabel,
  newTab = false,
  onClick,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const magneticEnabled = isFinePointer && prefersReducedMotion !== true;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 350, damping: 28, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 350, damping: 28, mass: 0.8 });

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (!magneticEnabled) return;
    const node = wrapperRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const pullX = (event.clientX - centerX) * 0.25;
    const pullY = (event.clientY - centerY) * 0.25;

    rawX.set(pullX);
    rawY.set(pullY);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }

  const classes = [
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3",
    "text-sm font-medium tracking-tight transition-colors duration-200 ease-out select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-4 cursor-pointer",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {hovered && magneticEnabled ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-neutral-400/50"
        />
      ) : null}
      <motion.span
        style={magneticEnabled ? { x, y } : undefined}
        className="relative z-10 inline-flex items-center gap-2 will-change-transform"
      >
        {children}
      </motion.span>
    </>
  );

  const interactionHandlers = {
    onPointerMove: handlePointerMove,
    onPointerEnter: () => setHovered(true),
    onPointerLeave: handlePointerLeave,
  };

  if (isInternalHref(href)) {
    return (
      <motion.div
        whileTap={magneticEnabled ? { scale: 0.96 } : undefined}
        transition={spring}
        className="inline-block"
      >
        <Link
          ref={wrapperRef}
          href={href}
          aria-label={ariaLabel}
          onClick={onClick}
          className={classes}
          {...interactionHandlers}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileTap={magneticEnabled ? { scale: 0.96 } : undefined}
      transition={spring}
      className="inline-block"
    >
      <a
        ref={wrapperRef}
        href={href}
        aria-label={ariaLabel}
        onClick={onClick}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={classes}
        {...interactionHandlers}
      >
        {content}
      </a>
    </motion.div>
  );
}
