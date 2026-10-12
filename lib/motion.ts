import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion constants.
 * Every entrance animation must use these so timing stays consistent.
 */
export const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 24,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: spring },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: spring },
};

/** Standard viewport config for whileInView entrances. */
export const inView = { once: true, amount: 0.3 } as const;

/** Maximum magnetic pull, in px. */
export const MAGNETIC_STRENGTH = 8;

/** Maximum hero parallax travel, in px. */
export const PARALLAX_RANGE = 60;
