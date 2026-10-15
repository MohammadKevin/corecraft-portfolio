"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  rotate?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
}

export default function RevealWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.04,
  rotate = 0,
  as: Component = "h2",
  id,
}: RevealWordsProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return (
      <Component id={id} className={className}>
        {text}
      </Component>
    );
  }

  return (
    <Component id={id} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden py-1 pr-[0.28em] align-top"
        >
          <motion.span
            initial={{ y: "115%", rotate: rotate }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.55,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block origin-bottom-left will-change-transform ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
