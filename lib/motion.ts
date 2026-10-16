import type { Transition, Variants } from "framer-motion";

export const SECTION_SPRING = {
  stiffness: 120,
  damping: 28,
  mass: 0.4,
} as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 28,
  mass: 0.4,
};

const ENTER_Y = 24;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: ENTER_Y },
  show: { opacity: 1, y: 0, transition: spring },
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
