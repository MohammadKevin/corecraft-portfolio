"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/hooks";
import { MAGNETIC_STRENGTH } from "@/lib/motion";

type MagneticButtonProps = {
  /** Destination. Internal paths (`/`, `#`) use next/link, the rest a plain anchor. */
  href: string;
  children: React.ReactNode;
  /** Visual weight. `ghost` is the variant intended for dark surfaces. */
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  ariaLabel?: string;
  /** Opens in a new tab with `rel="noopener noreferrer"`. */
  newTab?: boolean;
  /** Called before navigation, e.g. to smooth-scroll instead of jumping. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const variantClasses: Record<
  NonNullable<MagneticButtonProps["variant"]>,
  string
> = {
  solid:
    "bg-ink text-bg border border-ink hover:bg-[#1E293B] focus-visible:outline-ink",
  outline:
    "bg-transparent text-ink border border-line hover:border-ink hover:bg-bg-alt focus-visible:outline-ink",
  ghost:
    "bg-transparent text-ink-dark border border-line-dark hover:border-ink-dark focus-visible:outline-ink-dark",
};

/** `#anchor` and `/route` stay client-side; mailto:, tel: and http(s) do not. */
function isInternalHref(href: string): boolean {
  return href.startsWith("#") || href.startsWith("/");
}

/**
 * Pill button that leans toward the pointer.
 *
 * Spec: maximum 8px of travel, spring-driven, and only on `(pointer: fine)`
 * without reduced-motion. The offset is applied to an inner span so the hit
 * area and the focus ring never move — clicking and tabbing stay stable.
 */
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
    "text-sm font-medium tracking-tight transition-colors duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-4",
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
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-emerald/40"
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
    );
  }

  return (
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
  );
}
