"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Cpu, Database, Award } from "lucide-react";
import { profile } from "@/data/profile";
import { fadeUp, fadeUpDelayed, inView } from "@/lib/motion";

const metricIcons = [Cpu, Database, Award, ShieldCheck];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-pad border-b border-black/[0.08] bg-bg relative overflow-hidden"
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
            /02 ABOUT & STATEMENT
          </span>
          <span className="font-mono text-xs text-muted">
            ENGINEERING PHILOSOPHY & METRICS
          </span>
        </motion.div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Kiri: Large Display Editorial Statement */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <h2
              id="about-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-ink text-balance"
            >
              Architecting high-concurrency backend backbones, resilient API
              contracts, and query-optimized data systems — paired with modern,
              human-centered interfaces.
            </h2>

            <div className="space-y-4 text-base md:text-lg leading-relaxed text-muted mt-2">
              <p>
                Modern software breaks not at the happy path, but at the edges:
                unindexed relational tables under surge traffic, race conditions in
                inventory transactions, or unhandled webhook retries.
              </p>
              <p>
                My engineering approach starts at the schema and protocol layer —
                designing strict TypeScript contracts, transactional isolation,
                and predictable caching strategies before surfacing clean,
                intuitive frontend experiences with Next.js and React 19.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-surface px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                BASED IN MALANG, ID (WIB)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-surface px-3 py-1">
                SYSTEMS · APIS · DATABASES
              </span>
            </div>
          </motion.div>

          {/* Kanan: 4 Key Metric Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.stats.map((stat, index) => {
              const Icon = metricIcons[index % metricIcons.length];
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUpDelayed(index * 0.08)}
                  initial="hidden"
                  whileInView="show"
                  viewport={inView}
                  className="group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-surface p-6 shadow-sm transition-all duration-300 hover:border-black/25 hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-muted">
                    <span className="font-mono text-xs text-muted-3">
                      {`0${index + 1}`}
                    </span>
                    <Icon className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-ink" />
                  </div>

                  <div className="my-6">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink block">
                      {stat.value}
                    </span>
                    <h3 className="mt-2 text-sm font-semibold tracking-tight text-ink">
                      {stat.label}
                    </h3>
                  </div>

                  <p className="text-xs leading-relaxed text-muted border-t border-black/[0.06] pt-3">
                    {stat.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
