"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function CountUp({
  to,
  duration = 1.2,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;

    const start = 0;
    const end = to;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let animationFrameId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * (end - start) + start);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, to, duration, prefersReducedMotion]);

  const displayCount = prefersReducedMotion ? to : count;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayCount}
      {suffix}
    </span>
  );
}
