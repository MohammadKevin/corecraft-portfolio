"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  number?: string;
}

export default function SectionHeading({ label, title, number }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-3">
        {number && (
          <span className="font-mono text-sm font-bold text-accent-yellow bg-ink px-3 py-1 rounded-full brutal-border">
            {number}
          </span>
        )}
        <span className="font-mono text-xs uppercase text-muted font-bold tracking-wider">
          {label}
        </span>
      </div>
      <h2 className="font-display text-[28px] sm:text-[42px] leading-tight font-extrabold text-ink max-w-3xl tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
}