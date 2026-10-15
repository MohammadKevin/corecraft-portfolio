import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion constants.
 *
 * Spec: one spring drives every interaction — `{ stiffness: 350, damping: 28 }`.
 * It is exported as `spring` so a future change lands in exactly one place.
 */
export const spring: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 28,
};

/** Entrances travel this far, in px, before settling. */
const ENTER_Y = 24;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: ENTER_Y },
  show: { opacity: 1, y: 0, transition: spring },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: spring },
};

/**
 * `fadeUp` with a stagger delay.
 *
 * The delay has to live inside the `show` variant: a variant's own `transition`
 * always wins over the `transition` prop on the motion component, so passing
 * the delay at the component level silently drops it.
 */
export function fadeUpDelayed(delay: number): Variants {
  if (!delay) return fadeUp;
  return {
    hidden: fadeUp.hidden,
    show: {
      ...fadeUp.show,
      transition: { ...spring, delay },
    },
  };
}

/** Standard viewport config: reveal once, when a third is on screen. */
export const inView = { once: true, amount: 0.3 } as const;

/**
 * Repeatable viewport config for the Work → Services hand-off.
 * Spec: `whileInView={{ once: false, amount: 0.2 }}` so the section
 * re-animates on every pass.
 */
export const inViewRepeat = { once: false, amount: 0.2 } as const;

/** Maximum magnetic pull, in px. */
export const MAGNETIC_STRENGTH = 8;

/** Maximum hero parallax travel, in px. */
export const PARALLAX_RANGE = 60;
