"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export default function AnimatedText({
  text,
  className = "",
  as: Tag = "p",
  delay = 0,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + i * 0.06,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}