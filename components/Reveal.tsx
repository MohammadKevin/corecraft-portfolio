"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUpDelayed, inView } from "@/lib/motion";

/**
 * Client-side entrance wrapper.
 *
 * Lets server components opt into the shared `whileInView` reveal without
 * becoming client components themselves. The delay is baked into the variant
 * (see `fadeUpDelayed`) so it actually applies.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUpDelayed(delay)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={className}
    >
      {children}
    </motion.div>
  );
}
