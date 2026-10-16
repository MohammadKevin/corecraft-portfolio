"use client";

import { useCallback, useSyncExternalStore } from "react";

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

export function useFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

export function useTouchDevice(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useMinWidth(minWidth: number): boolean {
  return useMediaQuery(`(min-width: ${minWidth}px)`);
}

export { useActiveSection } from "./useActiveSection";
