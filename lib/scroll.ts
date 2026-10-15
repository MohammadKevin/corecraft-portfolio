"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

const SCROLL_OFFSET = 0;

export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (target: string | HTMLElement) => {
      const id = typeof target === "string" ? target.replace(/^#/, "") : "";
      if (id === "hero") {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2 });
          return;
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const element =
        typeof target === "string"
          ? document.getElementById(id)
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
