import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Lock,
  Server,
  Terminal,
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/data/profile";
import type { Project } from "@/lib/types";

export default function ProjectDetail({
  project,
  previous,
  next,
}: {
  project: Project;
  previous: Project;
  next: Project;
}) {
  const [leadImage, ...restImages] = project.gallery;
  const clientOrStudio = project.client ?? project.studio;

  return (
    <article className="pb-24 pt-28 md:pt-36 bg-bg min-h-screen">
      <div className="page-container">
        {/* Sticky "← Back to Overview" button */}
        <div className="sticky top-20 z-40 mb-10 flex">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/90 px-4 py-2 font-mono text-xs font-medium text-ink shadow-sm backdrop-blur-md transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>← Back to Overview</span>
          </Link>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                            */}
        {/* ---------------------------------------------------------------- */}
        <header className="max-w-5xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                /CASE STUDY
              </span>
              <span className="h-1 w-1 rounded-full bg-black/20" />
              <span className="font-mono text-xs font-semibold text-emerald-700 uppercase">
                {project.badge || project.category}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink uppercase leading-[1.05]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted max-w-3xl font-normal">
              {project.summary}
            </p>
          </Reveal>

          {/* Action CTAs: Live Preview + Source Code */}
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.liveUrl ? (
                <MagneticButton
                  href={project.liveUrl}
                  variant="solid"
                  newTab
                  className="px-5 py-3 text-sm font-medium"
                  ariaLabel={`Open live preview of ${project.title}`}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span>Live Preview</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              ) : null}

              {project.sourceUrl ? (
                <MagneticButton
                  href={project.sourceUrl}
                  variant="outline"
                  newTab
                  className="px-5 py-3 text-sm font-medium"
                  ariaLabel={`Open source code of ${project.title}`}
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>Source Code</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              ) : null}

              <MagneticButton
                href="/#contact"
                variant={project.liveUrl || project.sourceUrl ? "outline" : "solid"}
                className="px-5 py-3 text-sm font-medium"
                ariaLabel={`Contact about ${project.title}`}
              >
                <span>Discuss System Architecture</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </Reveal>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* Metadata Matrix: Role, Timeline, Deliverables, Stack              */}
        {/* ---------------------------------------------------------------- */}
        <Reveal delay={0.15}>
          <div className="mt-14 grid grid-cols-1 gap-8 rounded-3xl border border-black/[0.08] bg-surface p-8 sm:p-10 shadow-xs md:grid-cols-4">
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                Role
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm font-medium text-ink">
                {project.role.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                Timeline / Year
              </h2>
              <p className="mt-3 text-sm font-medium text-ink">{project.year}</p>
              {clientOrStudio ? (
                <div className="mt-4">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                    {project.client ? "Client" : "Studio"}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-ink">{clientOrStudio}</p>
                </div>
              ) : null}
            </div>

            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                Deliverables
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm font-medium text-ink">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                Technology Stack
              </h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/[0.08] bg-bg px-2.5 py-1 font-mono text-[11px] text-ink font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/* Mock Frame Showcase: 16:10 Frame with Browser Bar                */}
        {/* ---------------------------------------------------------------- */}
        {leadImage ? (
          <Reveal delay={0.1}>
            <div className="mt-16 overflow-hidden rounded-3xl border border-black/[0.08] bg-surface shadow-lg">
              {/* Browser Header Bar */}
              <div className="flex h-10 w-full items-center justify-between border-b border-black/[0.06] bg-neutral-100/90 px-4 backdrop-blur-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs font-mono text-muted shadow-2xs">
                  <Lock className="h-3 w-3 text-muted/80" />
                  <span>corecraft.my.id/work/{project.slug}</span>
                </div>
                <span className="font-mono text-[11px] text-muted uppercase">
                  {project.category}
                </span>
              </div>

              {/* 16:10 Aspect Ratio Image */}
              <div className="relative aspect-[16/10] w-full bg-bg-alt">
                <Image
                  src={leadImage.src}
                  alt={leadImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  className="object-cover"
                />
              </div>

              {leadImage.caption ? (
                <div className="border-t border-black/[0.06] bg-white p-4 text-xs font-mono text-muted">
                  {leadImage.caption}
                </div>
              ) : null}
            </div>
          </Reveal>
        ) : null}

        {/* ---------------------------------------------------------------- */}
        {/* Problem & Technical Architecture Analysis                        */}
        {/* ---------------------------------------------------------------- */}
        <section className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Problem Statement */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                /01 THE CHALLENGE
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Problem & Friction
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
                {project.problem}
              </p>
            </Reveal>

            {/* Key Metrics */}
            {project.metrics?.length ? (
              <Reveal delay={0.1}>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-black/[0.08] pt-6">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-black/[0.06] bg-surface p-4"
                    >
                      <span className="font-display text-2xl font-bold text-ink block">
                        {metric.value}
                      </span>
                      <span className="font-mono text-xs text-muted block mt-1">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>

          {/* Technical Architecture & Solution */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <Reveal delay={0.08}>
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                /02 TECHNICAL ARCHITECTURE
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                System Design & Components
              </h2>
              <ul className="mt-4 space-y-3">
                {project.architecture.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-surface p-4 text-sm md:text-base text-ink"
                  >
                    <Server className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {project.solution?.length ? (
              <Reveal delay={0.12}>
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                  /03 IMPLEMENTED OUTCOMES
                </span>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                  Resilience & Solution
                </h2>
                <ul className="mt-4 space-y-3">
                  {project.solution.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-surface p-4 text-sm md:text-base text-ink"
                    >
                      <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Additional Screens Gallery                                       */}
        {/* ---------------------------------------------------------------- */}
        {restImages.length ? (
          <section className="mt-24 border-t border-black/[0.08] pt-16">
            <Reveal>
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                /SCREENS & ARCHITECTURE
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
                Deep Dive Showcase
              </h2>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {restImages.map((image, index) => (
                <Reveal key={image.src} delay={index * 0.08}>
                  <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-surface shadow-sm">
                    <div className="relative aspect-[16/10] w-full bg-bg-alt">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {image.caption ? (
                      <div className="p-4 text-xs font-mono text-muted border-t border-black/[0.06]">
                        {image.caption}
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {/* ---------------------------------------------------------------- */}
        {/* Previous / Next Project Navigation                               */}
        {/* ---------------------------------------------------------------- */}
        <nav
          aria-label="More projects"
          className="mt-24 grid grid-cols-1 gap-4 border-t border-black/[0.08] pt-12 md:grid-cols-2"
        >
          <Link
            href={`/work/${previous.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-black/[0.08] bg-surface p-6 transition-all duration-200 hover:border-black hover:shadow-md"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Previous Case Study
            </span>
            <span className="font-display text-xl font-bold text-ink">
              {previous.title}
            </span>
          </Link>

          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col items-end gap-2 rounded-2xl border border-black/[0.08] bg-surface p-6 text-right transition-all duration-200 hover:border-black hover:shadow-md"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
              Next Case Study
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="font-display text-xl font-bold text-ink">
              {next.title}
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
