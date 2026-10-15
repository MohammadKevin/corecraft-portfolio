import type { Transition, Variants } from "framer-motion";

export const spring: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 28,
  mass: 0.8,
};

const ENTER_Y = 24;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: ENTER_Y },
  show: { opacity: 1, y: 0, transition: spring },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: spring },
};

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

export const inView = { once: true, amount: 0.3 } as const;

export const inViewRepeat = { once: false, amount: 0.2 } as const;

export const MAGNETIC_STRENGTH = 8;

export const PARALLAX_RANGE = 60;
