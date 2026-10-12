"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query.
 *
 * `useSyncExternalStore` is used rather than a `useEffect` + `setState` pair so
 * there is no cascading render on mount, and the server snapshot is always
 * `false` (never true during SSR).
 */
function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True only on devices with a precise pointer (mouse / trackpad). */
export function useFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

/** True on touch-first devices. */
export function useTouchDevice(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}

/** True when the visitor asked the OS to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True once the viewport is at least `minWidth` px wide. */
export function useMinWidth(minWidth: number): boolean {
  return useMediaQuery(`(min-width: ${minWidth}px)`);
}

/**
 * Tracks which of the given section ids is currently the most prominent one.
 * Used by the navbar scroll-spy.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const sections = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(visible[0].target.id);
          return;
        }

        // Nothing is intersecting: fall back to the last section above the fold.
        const passed = sections.filter(
          (section) => section.getBoundingClientRect().top <= 120,
        );
        setActive(passed.at(-1)?.id ?? null);
      },
      { rootMargin: "-120px 0px -45% 0px", threshold: [0.1, 0.4, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
