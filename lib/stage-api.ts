"use client";

export interface StageApi {
  /** Scroll to a progress value between 0 and 1. */
  goto: (progress: number, smooth?: boolean) => void;
  /** Scroll to a scene id (e.g. "about"). */
  gotoId: (id: string, smooth?: boolean) => void;
  labels: Record<string, number>;
  duration: number;
}

let api: StageApi | null = null;

export function registerStageApi(next: StageApi | null) {
  api = next;
}

export function getStageApi() {
  return api;
}

export function goTo(id: string) {
  const current = api;
  if (current && current.labels[id] !== undefined) {
    current.gotoId(id);
    return;
  }
  // Flow mode (or before the stage is ready): native anchor scrolling.
  const target = document.getElementById(id);
  if (!target) return;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (typeof history.replaceState === "function") {
    history.replaceState(null, "", `#${id}`);
  }
}

/** Move the stage timeline by a progress delta (used by the book controls). */
export function goToProgress(progress: number) {
  const current = api;
  if (!current) return false;
  current.goto(Math.min(1, Math.max(0, progress)));
  return true;
}
