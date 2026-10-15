"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import { useFinePointer } from "@/lib/hooks";
import { useReducedMotion } from "framer-motion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();

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

        syncTouch: false,
        touchMultiplier: 0,
      }}
    >
      {children}
    </ReactLenis>
  );
}
