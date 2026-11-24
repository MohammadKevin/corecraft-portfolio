import type { gsap } from "gsap";

export interface BookRefs {
  root: HTMLElement;
  book: HTMLElement;
  cover: HTMLElement;
  leaves: HTMLElement[];
  shadow: HTMLElement | null;
}

export interface TransitionCtx {
  from: HTMLElement;
  to: HTMLElement;
  fx: HTMLElement;
  /** Destination card, e.g. { number: "02", label: "About" }. */
  label: { number: string; label: string };
  /** Index of the transition (0 = T1). */
  n: number;
  /** Absolute timeline position where this transition starts. */
  at: number;
  /** Duration in timeline units (1 unit = 0.9 * viewport height of scroll). */
  dur: number;
  book: BookRefs | null;
}

export type Transition = (tl: gsap.core.Timeline, ctx: TransitionCtx) => void;
