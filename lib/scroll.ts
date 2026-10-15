"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

const SCROLL_OFFSET = -96;

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
