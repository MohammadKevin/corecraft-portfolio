"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUpDelayed, inView } from "@/lib/motion";

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
