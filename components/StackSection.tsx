"use client";

import React, { useRef } from "react";
import {
  motion,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useMinWidth } from "@/lib/hooks";
import { useSectionProgress } from "@/lib/useSectionProgress";

export type EnterAnimation =
  | "none"
  | "slideFromRight"
  | "fromBottomStack"
  | "fromBottom"
  | "fromBottomContact";

export interface StackSectionProps {
  id: string;
  theme?: React.CSSProperties;
  dataNavTheme?: "dark" | "light";
  enter?: EnterAnimation;
  last?: boolean;
  zIndex?: number;
  z?: number;
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  innerClassName?: string;
  forwardedRef?: React.Ref<HTMLElement>;
}

export default function StackSection({
  id,
  theme,
  dataNavTheme,
  enter = "none",
  last = false,
  zIndex,
  z,
  children,
  className = "",
  wrapperClassName,
  innerClassName = "",
  forwardedRef,
}: StackSectionProps) {
  const localRef = useRef<HTMLElement>(null);
  const wrapRef = (forwardedRef as React.RefObject<HTMLElement>) || localRef;

  const effectiveZ = zIndex ?? z ?? 20;

  const prefersReducedMotion = useReducedMotion();
  const isMd = useMinWidth(768);
  const isActive = isMd && !prefersReducedMotion;

  const isWork = Boolean(wrapperClassName?.includes("450vh"));

  const {
    enterProgress,
    exitProgress,
    exitScale,
    topShadow,
  } = useSectionProgress(wrapRef, { isWork, isLast: last });

  const slideRightX = useTransform(enterProgress, [0, 1], ["100vw", "0vw"]);

  const combinedOpacity = useTransform(
    [enterProgress, exitProgress],
    ([enterVal, exitVal]: number[]) => {
      let enterOp = 1;
      if (enter === "slideFromRight") {
        enterOp = 0.6 + (enterVal * 0.4);
      } else if (
        enter === "fromBottomStack" ||
        enter === "fromBottom" ||
        enter === "fromBottomContact"
      ) {
        enterOp = 0.7 + (enterVal * 0.3);
      }
      const exitOp = 1 - (exitVal * 0.15);
      return last ? enterOp : enterOp * exitOp;
    }
  );

  const combinedY = useTransform(
    [enterProgress, exitProgress],
    ([enterVal, exitVal]: number[]) => {
      if (enterVal < 0.999) {
        if (enter === "fromBottomStack") return `${(1 - enterVal) * 12}vh`;
        if (enter === "fromBottom") return `${(1 - enterVal) * 12}vh`;
        if (enter === "fromBottomContact") return `${(1 - enterVal) * 16}vh`;
        return "0vh";
      }
      return last ? "0vh" : `${exitVal * -4}vh`;
    }
  );

  return (
    <section
      ref={wrapRef as React.RefObject<HTMLDivElement>}
      id={id}
      data-spy-wrapper=""
      data-nav-theme={dataNavTheme}
      style={{
        ...theme,
        zIndex: effectiveZ,
      }}
      className={`relative w-full ${
        wrapperClassName ? wrapperClassName : "md:h-[200svh]"
      } ${className}`}
    >
      <motion.div
        style={
          isActive
            ? {
                scale: last ? 1 : exitScale,
                y: combinedY,
                opacity: combinedOpacity,
                ...(enter === "slideFromRight" ? { x: slideRightX } : {}),
                ...(enter !== "none" ? { boxShadow: topShadow } : {}),
              }
            : undefined
        }
        initial={!isMd && !prefersReducedMotion ? { opacity: 0, y: 24 } : undefined}
        whileInView={!isMd && !prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full md:sticky md:top-0 md:h-[100svh] overflow-visible md:overflow-hidden bg-[var(--bg)] text-[var(--fg)] ${innerClassName}`}
      >
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
