"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
  const idsKey = ids.join("|");

  useEffect(() => {
    let rafId: number | null = null;

    const updateActive = () => {
      rafId = null;

      const currentIds = idsKey.split("|").filter(Boolean);
      if (currentIds.length === 0) return;

      if (window.scrollY < 10) {
        const firstId = currentIds[0];
        setActiveId((prev) => (prev !== firstId ? firstId : prev));
        return;
      }

      const referenceLine = window.innerHeight * 0.4;
      let matchedId = currentIds[0];

      for (const id of currentIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const targetEl = el.closest("[data-spy-wrapper]") ?? el;
        const rect = targetEl.getBoundingClientRect();

        if (rect.top <= referenceLine) {
          matchedId = id;
        }
      }

      setActiveId((prev) => (prev !== matchedId ? matchedId : prev));
    };

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateActive);
      }
    };

    updateActive();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [idsKey]);

  return activeId;
}

export default useActiveSection;
