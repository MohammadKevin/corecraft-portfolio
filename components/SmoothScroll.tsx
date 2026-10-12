"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import { useFinePointer } from "@/lib/hooks";
import { useReducedMotion } from "framer-motion";

/**
 * Lenis smooth scrolling wrapper.
 *
 * Spec: duration 1.2, smoothWheel true, and disabled entirely on touch
 * devices or when the visitor prefers reduced motion. When disabled the
 * children are rendered as-is, so the page falls back to native scrolling.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();

  // useReducedMotion returns null on the first render, so treat only an
  // explicit true as "reduce" to avoid a flash of un-smoothed scrolling.
  const enabled = isFinePointer && prefersReducedMotion !== true;

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
        // Touch scrolling is left to the browser.
        syncTouch: false,
        touchMultiplier: 0,
      }}
    >
      {children}
    </ReactLenis>
  );
}
