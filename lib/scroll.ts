"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (target: string | HTMLElement) => {
      const id = typeof target === "string" ? target.replace(/^#/, "") : "";
      if (id === "hero" || !id) {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.0 });
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

      const wrapper = element.closest("[data-spy-wrapper]") ?? element;
      const rect = wrapper.getBoundingClientRect();
      const top = Math.round(rect.top + window.scrollY);

      if (lenis) {
        lenis.scrollTo(top, { offset: 0, duration: 1.0 });
        return;
      }

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    },
    [lenis],
  );
}

export default useScrollToSection;
