"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe, Lock } from "lucide-react";
import { projectCategories, projects, type ProjectFilter } from "@/data/projects";
import { fadeUp, inView, spring } from "@/lib/motion";

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
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
            /05 SELECTED WORK
          </span>
          <span className="font-mono text-xs text-muted">
            07 PRODUCTION PLATFORMS
          </span>
        </motion.div>

        {/* Section Heading + Filter Tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-14"
        >
          <div className="max-w-2xl">
            <h2
              id="work-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink"
            >
              Engineered for resilience, clarity, and uptime.
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
              Explore in-depth technical case studies documenting architecture decisions,
              data models, and measurable business outcomes.
            </p>
          </div>

          {/* Category Filter Tabs with animated pill layoutId="activeFilter" */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-1 rounded-full border border-black/[0.08] bg-surface p-1 shadow-2xs"
          >
            {projectCategories.map((category) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  id={`filter-tab-${category}`}
                  aria-selected={isActive}
                  aria-controls="projects-panel"
                  onClick={() => setFilter(category)}
                  className={`relative rounded-full px-4 py-2 text-xs font-medium tracking-tight transition-colors duration-200 ${
                    isActive ? "text-white" : "text-muted hover:text-ink"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="activeFilterSlider"
                      transition={spring}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  ) : null}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 2-Column Responsive Grid */}
        <div
          id="projects-panel"
          role="tabpanel"
          aria-labelledby={`filter-tab-${filter}`}
          className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ ...spring, delay: Math.min(index, 3) * 0.05 }}
                className="group flex flex-col"
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 rounded-3xl"
                  aria-label={`${project.title} case study`}
                >
                  {/* Frame preview mockup 16:10 with minimalist browser header bar */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-black/[0.08] bg-surface shadow-xs transition-all duration-500 group-hover:border-black/25 group-hover:shadow-xl">
                    {/* Minimalist Browser Header Bar */}
                    <div className="flex h-9 w-full items-center justify-between border-b border-black/[0.06] bg-neutral-100/80 px-4 backdrop-blur-xs">
                      {/* 3 Window Dots */}
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                      </div>

                      {/* Mock URL Bar */}
                      <div className="flex items-center gap-1.5 rounded-md bg-white/80 px-3 py-0.5 text-[11px] font-mono text-muted shadow-2xs">
                        <Lock className="h-2.5 w-2.5 text-muted/70" />
                        <span className="truncate max-w-[140px] sm:max-w-[200px]">
                          corecraft.my.id/work/{project.slug}
                        </span>
                      </div>

                      {/* Category / Status Badge */}
                      <div className="flex items-center">
                        <span className="rounded-full bg-black/5 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-ink uppercase">
                          {project.badge || project.category}
                        </span>
                      </div>
                    </div>

                    {/* Preview Image with Smooth Zoom (scale-105 duration-700) */}
                    <div className="relative h-[calc(100%-2.25rem)] w-full overflow-hidden bg-bg-alt">
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Project Details Below Frame */}
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs font-semibold text-muted uppercase">
                          {project.category} · {project.year}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-black/20" />
                        <span className="font-mono text-xs text-emerald-700 font-medium">
                          {project.badge || "Verified"}
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink uppercase transition-colors group-hover:text-black">
                        {project.shortTitle || project.title}
                      </h3>

                      <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">
                        {project.summary}
                      </p>

                      {/* Stack Badges Chips */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-black/[0.08] bg-surface px-2.5 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-black/20 group-hover:text-ink"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow Button */}
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-surface text-ink transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white group-hover:scale-105"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
