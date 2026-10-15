"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { experiences } from "@/data/experience";
import { useFinePointer, useMinWidth } from "@/lib/hooks";
import { fadeUp, fadeUpDelayed, inView, spring } from "@/lib/motion";

const PREVIEW_WIDTH = 340;
const PREVIEW_HEIGHT = 220;

export default function TimelineSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const isWide = useMinWidth(1024);

  const previewEnabled = isFinePointer && prefersReducedMotion !== true && isWide;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 300, damping: 25 });
  const mouseY = useSpring(rawY, { stiffness: 300, damping: 25 });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!previewEnabled) return;

      rawX.set(event.clientX + 24);
      rawY.set(event.clientY - PREVIEW_HEIGHT / 2);
    },
    [previewEnabled, rawX, rawY],
  );

  const activeExp = hoveredIndex !== null ? experiences[hoveredIndex] : null;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-12 md:py-20 relative bg-bg"
    >
      <div className="page-container">
        {/* Visual Container: Floating high-contrast Obsidian Dark Card with Tarq Studio scale-up reveal */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0.9 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={spring}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoveredIndex(null)}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#0B0C0E] text-white p-8 sm:p-12 md:p-16 shadow-2xl border border-white/[0.08]"
        >
          {/* Subtle Ambient Background Glow */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

          {/* Monospace Sub-label Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-12"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
              /07 EXPERIENCE
            </span>
            <span className="font-mono text-xs text-white/60">
              3+ YEARS BUILDING SYSTEMS
            </span>
          </motion.div>

          {/* Section Main Title */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="max-w-2xl mb-12"
          >
            <h2
              id="experience-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
            >
              Industry track record in engineering & quality assurance.
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/60 leading-relaxed">
              Shipping reliable software across professional QA testing, freelance fullstack delivery,
              and formal vocational software engineering.
            </p>
          </motion.div>

          {/* Experience Rows */}
          <div className="border-t border-white/[0.08]">
            {experiences.map((exp, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  variants={fadeUpDelayed(index * 0.08)}
                  initial="hidden"
                  whileInView="show"
                  viewport={inView}
                  onPointerEnter={() => setHoveredIndex(index)}
                  className={`group relative border-b border-white/[0.08] py-8 md:py-10 transition-colors duration-300 ${
                    isHovered ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                    {/* Left: Company + Role */}
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3 sm:gap-5 flex-wrap">
                        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white transition-colors duration-200 group-hover:text-emerald-400">
                          {exp.company}
                        </h3>
                        <span className="font-mono text-sm sm:text-base text-white/70 font-medium">
                          {exp.role}
                        </span>
                      </div>

                      <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed max-w-2xl">
                        {exp.summary}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-white/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Period + Location */}
                    <div className="flex shrink-0 items-center gap-4 text-xs sm:text-sm font-mono text-white/60">
                      <span className="text-white font-medium">{exp.period}</span>
                      <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/30" />
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Micro-interaction: Cursor-following floating preview card with fixed pointer-events-none z-50 */}
          <AnimatePresence>
            {previewEnabled && activeExp ? (
              <motion.div
                key={activeExp.thumbnail}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={spring}
                style={{
                  x: mouseX,
                  y: mouseY,
                  width: PREVIEW_WIDTH,
                  height: PREVIEW_HEIGHT,
                }}
                className="pointer-events-none fixed left-0 top-0 z-50 overflow-hidden rounded-2xl border border-white/[0.2] bg-[#121316] shadow-[0_24px_70px_rgba(0,0,0,0.85)]"
              >
                <Image
                  src={activeExp.thumbnail}
                  alt=""
                  width={PREVIEW_WIDTH}
                  height={PREVIEW_HEIGHT}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                  <span className="font-display text-sm font-bold text-white block">
                    {activeExp.company}
                  </span>
                  <span className="font-mono text-xs text-emerald-400 block mt-0.5">
                    {activeExp.role} · {activeExp.period}
                  </span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
