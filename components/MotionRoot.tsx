"use client";

import { useEffect } from "react";

export default function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("anim");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    const counters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]")
    );

    const runCount = (el: HTMLElement) => {
      if (el.dataset.counted === "true") return;
      el.dataset.counted = "true";

      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      const pad = Number(el.dataset.pad) || 0;

      if (reduced || Number.isNaN(target)) {
        el.textContent = String(target).padStart(pad, "0") + suffix;
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1200);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent =
          String(Math.round(target * eased)).padStart(pad, "0") + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCount(entry.target as HTMLElement);
          countObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => countObserver.observe(el));

    return () => {
      reveal.disconnect();
      countObserver.disconnect();
      root.classList.remove("anim");
    };
  }, []);

  return null;
}
