import type { StageApi } from "@/lib/stage-api";

declare global {
  interface Window {
    __stage?: StageApi & {
      scrollTrigger: {
        progress: number;
        start: number;
        end: number;
        animation: { time: () => number };
      };
    };
    __loaderDone?: boolean;
  }
}

export {};
