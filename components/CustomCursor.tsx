"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/hooks";

/**
 * Custom cursor: a small dot that follows the pointer exactly, plus a larger
 * ring that lags behind it with a spring.
 *
 * Spec: only on `(pointer: fine)`, disabled for reduced-motion, and hidden
 * from assistive tech with `aria-hidden`. The native cursor is hidden by the
 * `body[data-custom-cursor="true"]` rule, which is only set while this
 * component is mounted, so the cursor can never be lost.
 *
 * The ring grows over interactive elements and the dot shrinks while pressed.
 */
export default function CustomCursor() {
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const enabled = isFinePointer && prefersReducedMotion !== true;

  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [overInteractive, setOverInteractive] = useState(false);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const dotX = useSpring(pointerX, { stiffness: 900, damping: 50, mass: 0.3 });
  const dotY = useSpring(pointerY, { stiffness: 900, damping: 50, mass: 0.3 });

  const ringX = useSpring(pointerX, { stiffness: 180, damping: 24, mass: 0.6 });
  const ringY = useSpring(pointerY, { stiffness: 180, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    document.body.dataset.customCursor = "true";

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      setOverInteractive(
        Boolean(
          target?.closest(
            "a, button, [role='tab'], input, textarea, select, summary, [data-cursor-hover]",
          ),
        ),
      );
    };

    const onPointerDown = () => setPressed(true);
    const onPointerUp = () => setPressed(false);
    const onPointerLeave = () => setVisible(false);
    const onPointerEnter = () => setVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerenter", onPointerEnter);

    return () => {
      delete document.body.dataset.customCursor;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerenter", onPointerEnter);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  const dotSize = pressed ? 5 : 7;
  const ringSize = overInteractive ? 48 : 30;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] print:hidden"
    >
      {/* Outer wrapper carries the motion transform; the inner element is
          centred with plain CSS so the two never fight over `transform`. */}
      <motion.div style={{ x: dotX, y: dotY }} className="fixed left-0 top-0">
        <motion.div
          style={{ width: dotSize, height: dotSize }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        />
      </motion.div>

      <motion.div style={{ x: ringX, y: ringY }} className="fixed left-0 top-0">
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: visible ? 0.5 : 0,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-ink"
        />
      </motion.div>
    </div>
  );
}
