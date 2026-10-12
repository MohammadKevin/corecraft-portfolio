"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectCategories, projects, type ProjectFilter } from "@/data/projects";
import { fadeUp, inView, spring } from "@/lib/motion";

/**
 * SelectedWork: filterable project grid.
 *
 * The tabs are a real `tablist`/`tab` pair so keyboard users can arrow between
 * them, and the active pill is a shared `layoutId` element so it slides
 * between tabs with a spring instead of cutting.
 */
export default function SelectedWork() {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = projectCategories.indexOf(filter);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % projectCategories.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + projectCategories.length) % projectCategories.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = projectCategories.length - 1;
    else return;

    event.preventDefault();
    setFilter(projectCategories[nextIndex]);
    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
    buttons?.[nextIndex]?.focus();
  }

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="section-pad border-t border-line"
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
            <p className="label-eyebrow text-muted">/Selected Work</p>
            <h2
              id="work-heading"
              className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl"
            >
              Things I&apos;ve built
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1"
          >
            {projectCategories.map((category) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  id={`work-tab-${category}`}
                  aria-selected={isActive}
                  aria-controls="work-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setFilter(category)}
                  onKeyDown={handleTabKeyDown}
                  className={`relative rounded-full px-4 py-2 text-xs font-medium tracking-tight transition-colors duration-200 ${
                    isActive ? "text-bg" : "text-muted hover:text-ink"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="work-tab-pill"
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

        <div
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`work-tab-${filter}`}
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ ...spring, delay: Math.min(index, 3) * 0.04 }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4"
                  aria-label={`${project.title} — ${project.category} project case study`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-bg-alt">
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold tracking-tight text-ink md:text-xl">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {project.category}
                        {project.client ? ` · ${project.client}` : ""}
                        {project.studio ? ` · ${project.studio}` : ""}
                      </p>

                      {/* Metadata fades in on hover; always visible for
                          keyboard users via focus-within. */}
                      <p className="mt-2 max-h-0 overflow-hidden text-sm text-muted opacity-0 transition-all duration-300 ease-out-expo group-hover:max-h-16 group-hover:opacity-100 group-focus-visible:max-h-16 group-focus-visible:opacity-100">
                        {project.tags.slice(0, 4).join(" · ")}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 ease-out-expo group-hover:border-ink group-hover:bg-ink group-hover:text-bg"
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
