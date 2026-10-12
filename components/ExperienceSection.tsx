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
import { fadeUp, inView, spring } from "@/lib/motion";

/** Thumbnail preview size, in px. Kept here so the clamp math stays in sync. */
const PREVIEW_WIDTH = 320;
const PREVIEW_HEIGHT = 220;

/**
 * ExperienceSection: dark band listing roles.
 *
 * On hover (fine pointers, >= 1024px, no reduced-motion) a thumbnail floats
 * beside the pointer. The pointer position lives in `useMotionValue` and is
 * smoothed with `useSpring`, so moving the mouse never triggers a React
 * re-render — only the two motion values change.
 */
export default function ExperienceSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const isWide = useMinWidth(1024);

  const listRef = useRef<HTMLUListElement>(null);

  const previewEnabled =
    isFinePointer && prefersReducedMotion !== true && isWide;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 220, damping: 28, mass: 0.6 });
  const y = useSpring(pointerY, { stiffness: 220, damping: 28, mass: 0.6 });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLLIElement>) => {
      if (!previewEnabled) return;

      const list = listRef.current;
      if (!list) return;

      // Measured against the list so the preview stays inside the section.
      const rect = list.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;

      pointerX.set(
        Math.min(
          Math.max(localX + 24, 0),
          Math.max(rect.width - PREVIEW_WIDTH, 0),
        ),
      );
      pointerY.set(
        Math.min(
          Math.max(localY - PREVIEW_HEIGHT / 2, 0),
          Math.max(rect.height - PREVIEW_HEIGHT, 0),
        ),
      );
    },
    [previewEnabled, pointerX, pointerY],
  );

  const active = hovered === null ? null : experiences[hovered];

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-pad on-dark bg-deep text-ink-dark"
    >
      <div className="page-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="label-eyebrow text-muted-dark">/Experience</p>
            <h2
              id="experience-heading"
              className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-dark md:text-6xl"
            >
              Where I&apos;ve worked
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-dark">
            Two years of shipping real systems while finishing school — quality
            assurance, freelance delivery and coursework.
          </p>
        </motion.div>

        {/* The floating preview is a sibling of the list, not a child, so the
            markup stays valid (a <ul> may only contain <li>). */}
        <div className="relative mt-14">
          <ul ref={listRef} className="border-t border-line-dark">
            {experiences.map((experience, index) => (
              <motion.li
                key={`${experience.company}-${experience.period}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                transition={{ ...spring, delay: Math.min(index, 4) * 0.04 }}
                onPointerEnter={() => setHovered(index)}
                onPointerMove={handlePointerMove}
                className="border-b border-line-dark"
              >
                <div className="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-10">
                  <div className="flex min-w-0 items-baseline gap-4 md:gap-8">
                    <h3 className="text-xl font-semibold tracking-tight text-ink-dark md:text-2xl">
                      {experience.company}
                    </h3>
                    <span className="text-sm text-muted-dark">
                      {experience.role}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-4 text-sm text-muted-dark">
                    <span>{experience.period}</span>
                    <span
                      aria-hidden="true"
                      className="hidden h-1 w-1 rounded-full bg-muted-dark md:inline-block"
                    />
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {experience.location}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <AnimatePresence>
            {previewEnabled && active ? (
              <motion.div
                key={active.thumbnail}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{ x, y, width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
                className="pointer-events-none absolute left-0 top-0 z-20 overflow-hidden rounded-xl border border-line-dark bg-card shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
              >
                <Image
                  src={active.thumbnail}
                  alt=""
                  width={PREVIEW_WIDTH}
                  height={PREVIEW_HEIGHT}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs font-medium text-ink-dark">
                  {active.company} · {active.role}
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
