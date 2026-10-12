"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, inView } from "@/lib/motion";

/**
 * Client-side entrance wrapper.
 *
 * Lets server components opt into the shared `whileInView` reveal without
 * becoming client components themselves. `viewport` and the variant both come
 * from `lib/motion.ts`, so every section animates with identical timing.
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
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
