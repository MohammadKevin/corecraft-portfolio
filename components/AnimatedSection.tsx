"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const sectionVariants: Variants = {
  hidden: { y: 80, opacity: 0, scale: 0.96 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 0.5,
    },
  },
};

export default function AnimatedSection({ id, children, className = "" }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      aria-label={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`w-full scroll-mt-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}