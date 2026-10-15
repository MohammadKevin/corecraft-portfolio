"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/hooks";

export default function CustomCursor() {
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const enabled = isFinePointer && prefersReducedMotion !== true;

  const [visible, setVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<"default" | "interactive" | "view">("default");

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const dotX = useSpring(pointerX, { stiffness: 900, damping: 50, mass: 0.3 });
  const dotY = useSpring(pointerY, { stiffness: 900, damping: 50, mass: 0.3 });

  const ringX = useSpring(pointerX, { stiffness: 280, damping: 28, mass: 0.6 });
  const ringY = useSpring(pointerY, { stiffness: 280, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    document.body.dataset.customCursor = "true";

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const isView = Boolean(target?.closest("[data-cursor='view']"));
      const isInteractive = Boolean(
        target?.closest(
          "a, button, [role='tab'], input, textarea, select, summary, [data-cursor-hover]",
        ),
      );

      if (isView) {
        setCursorMode("view");
      } else if (isInteractive) {
        setCursorMode("interactive");
      } else {
        setCursorMode("default");
      }
    };

    const onPointerLeave = () => setVisible(false);
    const onPointerEnter = () => setVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerenter", onPointerEnter);

    return () => {
      delete document.body.dataset.customCursor;
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerenter", onPointerEnter);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  const isView = cursorMode === "view";
  const isInteractive = cursorMode === "interactive";

  const ringSize = isView ? 84 : isInteractive ? 48 : 28;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] print:hidden mix-blend-difference"
    >

      {!isView ? (
        <motion.div
          style={{ x: dotX, y: dotY }}
          className="fixed left-0 top-0"
        >
          <motion.div
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className="h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white"
          />
        </motion.div>
      ) : null}

      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed left-0 top-0"
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            marginLeft: -ringSize / 2,
            marginTop: -ringSize / 2,
            opacity: visible ? 1 : 0,
            backgroundColor: isView ? "#FFFFFF" : "rgba(255, 255, 255, 0)",
            borderColor: isView ? "#FFFFFF" : "#FFFFFF",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className={`flex items-center justify-center rounded-full border ${
            isView ? "border-transparent" : "border-white/80"
          }`}
        >
          {isView ? (
            <span className="font-mono text-[11px] font-bold text-black tracking-wider">
              VIEW ↗
            </span>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
