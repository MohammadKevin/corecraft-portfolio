"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

/** Height of the floating navbar plus its top offset, in px. */
const SCROLL_OFFSET = -96;

/**
 * Returns a handler that scrolls to an in-page anchor.
 *
 * Uses Lenis when it is mounted and falls back to `window.scrollTo`, so touch
 * and reduced-motion visitors reach the same destination. The fallback jumps
 * instead of animating when reduced-motion is on.
 */
export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (target: string | HTMLElement) => {
      const element =
        typeof target === "string"
          ? document.getElementById(target.replace(/^#/, ""))
          : target;

      if (!element) return;

      if (lenis) {
        lenis.scrollTo(element, { offset: SCROLL_OFFSET, duration: 1.2 });
        return;
      }

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top =
        element.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;

      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    },
    [lenis],
  );
}
