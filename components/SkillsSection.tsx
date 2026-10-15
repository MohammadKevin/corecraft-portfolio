"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Layout,
  Terminal,
  CheckCircle,
  Sparkles,
  Layers,
  Database,
  Cpu,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import { fadeUp, fadeUpDelayed, inView } from "@/lib/motion";

const columnIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  backend: Database,
  frontend: Layout,
  tooling: Terminal,
};

export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-pad border-b border-black/[0.08] bg-bg relative"
    >
      <div className="page-container">
        {/* Monospace Sub-label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mb-8 flex items-center justify-between"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
            /04 TECHNICAL ARCHITECTURE
          </span>
          <span className="font-mono text-xs text-muted">
            3-COLUMN STACK MATRIX
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="max-w-3xl mb-14"
        >
          <h2
            id="skills-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink"
          >
            A battle-tested stack built for reliability and scale.
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
            From relational schemas and concurrency control to typed interfaces and
            CI/CD release pipelines.
          </p>
        </motion.div>

        {/* 3-Column Matrix */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {skillCategories.map((column, colIndex) => {
            const Icon = columnIcons[column.id] ?? Server;

            return (
              <motion.div
                key={column.id}
                variants={fadeUpDelayed(colIndex * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                className="flex flex-col rounded-3xl border border-black/[0.08] bg-surface p-7 shadow-xs transition-all duration-300 hover:border-black/20 hover:shadow-md"
              >
                {/* Column Header */}
                <div className="border-b border-black/[0.06] pb-6 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-muted uppercase tracking-widest">
                      {`0${colIndex + 1} / COLUMN`}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.08] bg-bg text-ink">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
                    {column.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {column.blurb}
                  </p>
                </div>

                {/* Tactile Badge Chips */}
                <div className="flex flex-col gap-3">
                  {column.skills.map((skill) => {
                    const isSelected = activeSkill === skill.name;

                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setActiveSkill(skill.name)}
                        onMouseLeave={() => setActiveSkill(null)}
                        className={`group relative rounded-2xl border p-4 transition-all duration-300 ${
                          isSelected
                            ? "border-black bg-bg shadow-sm scale-[1.01]"
                            : "border-black/[0.07] bg-white hover:border-black/30 hover:bg-neutral-50/80"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500/80 group-hover:scale-125 transition-transform" />
                            <span className="font-medium text-sm text-ink tracking-tight">
                              {skill.name}
                            </span>
                          </div>
                          <span
                            className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold transition-colors ${
                              skill.levelTag === "Advanced"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : skill.levelTag === "Intermediate"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-neutral-100 text-neutral-600 border border-neutral-200"
                            }`}
                          >
                            {skill.levelTag}
                          </span>
                        </div>

                        {/* Skill Highlights */}
                        <div className="mt-2.5 border-t border-black/[0.04] pt-2">
                          <p className="text-xs text-muted leading-relaxed">
                            {skill.highlights[0]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
