"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import { useFinePointer } from "@/lib/hooks";
import { useReducedMotion } from "framer-motion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();

  const enabled = isFinePointer && prefersReducedMotion !== true && pathname !== "/";

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
