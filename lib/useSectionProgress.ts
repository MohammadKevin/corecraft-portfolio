"use client";

import { RefObject } from "react";
import { useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { SECTION_SPRING } from "@/lib/motion";

export interface SectionProgress {
  enterProgress: MotionValue<number>;
  exitProgress: MotionValue<number>;
  exitScale: MotionValue<number>;
  exitY: MotionValue<string>;
  exitOpacity: MotionValue<number>;
  topShadow: MotionValue<string>;
}

export function useSectionProgress(
  wrapperRef: RefObject<HTMLElement | null>,
  options?: {
    isWork?: boolean;
    isLast?: boolean;
  }
): SectionProgress {
  const { scrollYProgress: enterRaw } = useScroll({
    target: wrapperRef,
    offset: ["start end", "start start"],
  });

  const exitOffset: NonNullable<Parameters<typeof useScroll>[0]>["offset"] = options?.isWork
    ? ["end end", "end start"]
    : ["start start", "end start"];

  const { scrollYProgress: exitRaw } = useScroll({
    target: wrapperRef,
    offset: exitOffset,
  });

  const enterProgress = useSpring(enterRaw, SECTION_SPRING);
  const exitProgress = useSpring(exitRaw, SECTION_SPRING);

  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.94]);
  const exitY = useTransform(exitProgress, [0, 1], ["0vh", "-4vh"]);
  const exitOpacity = useTransform(exitProgress, [0, 1], [1, 0.85]);

  const topShadow = useTransform(
    enterProgress,
    [0, 1],
    ["0 -20px 40px rgba(0,0,0,0.18)", "0 -20px 40px rgba(0,0,0,0)"]
  );

  return {
    enterProgress,
    exitProgress,
    exitScale,
    exitY,
    exitOpacity,
    topShadow,
  };
}

export default useSectionProgress;
