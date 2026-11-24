"use client";

import { useEffect, useState } from "react";
import { setStageMode } from "@/lib/stage-store";

export type Mode = "stage" | "flow";

interface StageModeState {
  mode: Mode;
  /** False until we know the real environment (avoids hydrating a wrong mode). */
  ready: boolean;
}

function readMotionOff() {
  return document.documentElement.dataset.motion === "off";
}

function computeMode(): Mode {
  if (typeof window === "undefined") return "flow";
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  const tall = window.matchMedia("(min-height: 700px)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motionOff = readMotionOff();
  return wide && tall && !reduce && !motionOff ? "stage" : "flow";
}

/** Single source of truth for STAGE vs FLOW mode. */
export function useStageMode(): StageModeState {
  const [state, setState] = useState<StageModeState>({
    mode: "flow",
    ready: false,
  });

  useEffect(() => {
    const queries = [
      window.matchMedia("(min-width: 1024px)"),
      window.matchMedia("(min-height: 700px)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];

    const update = () => {
      const mode = computeMode();
      document.documentElement.dataset.mode = mode;
      setStageMode(mode);
      setState({ mode, ready: true });
    };

    update();
    queries.forEach((query) => query.addEventListener("change", update));
    window.addEventListener("motionchange", update);
    return () => {
      queries.forEach((query) => query.removeEventListener("change", update));
      window.removeEventListener("motionchange", update);
    };
  }, []);

  return state;
}
