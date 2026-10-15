"use client";

import React, {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Database,
  Award,
  ShieldCheck,
  Server,
  Layout,
  Terminal,
  Lock,
  MapPin,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/data/profile";
import { services } from "@/data/services";
import { skillCategories } from "@/data/skills";
import { certificates, certificateCount } from "@/data/certificates";
import { experiences } from "@/data/experience";
import {
  projectCategories,
  projects,
  type ProjectFilter,
} from "@/data/projects";
import { useFinePointer, useMinWidth } from "@/lib/hooks";
import { useScrollToSection } from "@/lib/scroll";
import { fadeUp, fadeUpDelayed, inView, spring } from "@/lib/motion";

/* =========================================================================
   CONSTANTS & HELPERS
   ========================================================================= */
const socialLinks = [
  {
    label: "GitHub",
    handle: "MohammadKevin",
    url: "https://github.com/MohammadKevin",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    handle: "mohammad-kevin",
    url: "https://www.linkedin.com/in/mohammad-kevin-arif-rudianto-945733347/",
    icon: LinkedinIcon,
  },
  {
    label: "WhatsApp",
    handle: "+62 821-3158-8846",
    url: "https://wa.me/6282131588846",
    icon: WhatsappIcon,
  },
];

const metricIcons = [Cpu, Database, Award, ShieldCheck];

const columnIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  backend: Database,
  frontend: Layout,
  tooling: Terminal,
};

const NAME_MIN_PX = 38;
const NAME_MAX_PX = 240;
const NAME_FALLBACK = "clamp(2.5rem, 13vw, 14rem)";
const PREVIEW_WIDTH = 340;
const PREVIEW_HEIGHT = 220;

export default function HomePage() {
  /* -----------------------------------------------------------------------
     1. HERO PARALLAX & SIZING REFS
     ----------------------------------------------------------------------- */
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const outlineRef = useRef<HTMLSpanElement>(null);
  const solidRef = useRef<HTMLSpanElement>(null);

  const [fontSize, setFontSize] = useState<string>(NAME_FALLBACK);
  const scrollTo = useScrollToSection();
  const prefersReducedMotion = useReducedMotion();
  const parallaxEnabled = prefersReducedMotion !== true;

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroNameY = useTransform(heroScroll, [0, 1], [0, -120]);
  const heroAvatarScale = useTransform(heroScroll, [0, 0.5], [1, 0.9]);
  const heroAvatarOpacity = useTransform(heroScroll, [0, 0.5], [1, 0.4]);
  const heroAvatarY = useTransform(heroScroll, [0, 1], [0, -72]);

  const fitName = useCallback(() => {
    const name = nameRef.current;
    const lines = [outlineRef.current, solidRef.current].filter(
      (line): line is HTMLSpanElement => line !== null,
    );
    if (!name || lines.length === 0) return;

    const available = name.clientWidth;
    if (available === 0) return;

    const current = Number.parseFloat(getComputedStyle(name).fontSize);
    if (!Number.isFinite(current) || current === 0) return;

    const widestRatio = Math.max(
      ...lines.map((line) => line.getBoundingClientRect().width / current),
    );
    if (widestRatio === 0) return;

    const fitted = Math.min(
      NAME_MAX_PX,
      Math.max(NAME_MIN_PX, available / widestRatio),
    );

    setFontSize(`${fitted.toFixed(2)}px`);
  }, []);

  useLayoutEffect(() => {
    fitName();
    const name = nameRef.current;
    if (!name) return;

    const observer = new ResizeObserver(fitName);
    observer.observe(name);

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) fitName();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [fitName]);

  /* -----------------------------------------------------------------------
     2. SERVICES ACCORDION STATE
     ----------------------------------------------------------------------- */
  const [openServiceId, setOpenServiceId] = useState<string>(services[0]?.id ?? "");
  const isFinePointer = useFinePointer();
  const baseServiceId = useId();

  /* -----------------------------------------------------------------------
     3. SELECTED WORK FILTER
     ----------------------------------------------------------------------- */
  const [workFilter, setWorkFilter] = useState<ProjectFilter>("All");
  const filteredProjects = useMemo(
    () =>
      workFilter === "All"
        ? projects
        : projects.filter((project) => project.category === workFilter),
    [workFilter],
  );

  /* -----------------------------------------------------------------------
     4. CERTIFICATES FILTER
     ----------------------------------------------------------------------- */
  const [certFilter, setCertFilter] = useState<string>("All");
  const certIssuers = ["All", "HackerRank", "Dicoding Indonesia", "National Competition"];
  const filteredCertificates = certificates.filter((cert) => {
    if (certFilter === "All") return true;
    if (certFilter === "HackerRank") return cert.issuer.includes("HackerRank");
    if (certFilter === "Dicoding Indonesia") return cert.issuer.includes("Dicoding");
    if (certFilter === "National Competition")
      return !cert.issuer.includes("HackerRank") && !cert.issuer.includes("Dicoding");
    return true;
  });

  /* -----------------------------------------------------------------------
     5. EXPERIENCE CURSOR FOLLOWER
     ----------------------------------------------------------------------- */
  const [hoveredExpIndex, setHoveredExpIndex] = useState<number | null>(null);
  const isWide = useMinWidth(1024);
  const expPreviewEnabled = isFinePointer && prefersReducedMotion !== true && isWide;

  const expRawX = useMotionValue(0);
  const expRawY = useMotionValue(0);
  const expMouseX = useSpring(expRawX, { stiffness: 300, damping: 25 });
  const expMouseY = useSpring(expRawY, { stiffness: 300, damping: 25 });

  const handleExpPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!expPreviewEnabled) return;
      expRawX.set(event.clientX + 24);
      expRawY.set(event.clientY - PREVIEW_HEIGHT / 2);
    },
    [expPreviewEnabled, expRawX, expRawY],
  );

  const activeExp = hoveredExpIndex !== null ? experiences[hoveredExpIndex] : null;

  return (
    <>
      {/* ===================================================================
          SECTION 1: /01 HERO
          =================================================================== */}
      <section
        ref={heroRef}
        id="hero"
        aria-labelledby="hero-name"
        className="relative min-h-[92vh] overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-black/[0.08]"
      >
        <div className="page-container">
          {/* Monospace Sub-label / Index */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-4 flex items-center justify-between"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              /01 HERO
            </span>
            <span className="hidden sm:inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-surface px-3.5 py-1 text-xs font-mono font-medium tracking-tight text-ink shadow-sm">
              <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neutral-400/50 ring-1 ring-neutral-400/50 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-900 dark:bg-white" />
              </span>
              Available for New Project
            </span>
          </motion.div>

          {/* Massive Viewport Typography: "MOHAMMAD KEVIN" */}
          <div className="relative my-2 sm:my-4">
            <motion.h1
              id="hero-name"
              ref={nameRef}
              style={parallaxEnabled ? { y: heroNameY, fontSize } : { fontSize }}
              className="select-none text-center font-display font-extrabold leading-[0.84] tracking-[-0.04em] uppercase"
            >
              <span className="sr-only">
                {profile.firstName} {profile.lastName}
              </span>
              <span aria-hidden="true" className="block">
                <span
                  ref={outlineRef}
                  className="inline-block transition-colors duration-500 [-webkit-text-stroke:2px_#0B0F19] text-transparent hover:text-[#0B0F19]"
                >
                  {profile.firstName}
                </span>
              </span>
              <span aria-hidden="true" className="block">
                <span ref={solidRef} className="inline-block text-[#0B0F19]">
                  {profile.lastName}
                </span>
              </span>
            </motion.h1>

            {/* Cutout Avatar with Parallax Damping */}
            <motion.div
              style={
                parallaxEnabled
                  ? { y: heroAvatarY, scale: heroAvatarScale, opacity: heroAvatarOpacity }
                  : undefined
              }
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...spring, delay: 0.15 }}
              className="relative z-20 -mt-10 sm:-mt-16 md:-mt-20 flex justify-center pointer-events-none"
            >
              <div className="relative h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-48 lg:w-48 overflow-hidden rounded-full border-4 border-bg bg-surface shadow-[0_20px_50px_rgba(11,15,25,0.18)] pointer-events-auto transition-transform duration-500 hover:scale-105">
                <Image
                  src={profile.avatar}
                  alt={`${profile.firstName} ${profile.lastName} Portrait`}
                  fill
                  priority
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 192px"
                  className="object-cover object-top"
                />
              </div>
            </motion.div>
          </div>

          {/* Flank Bawah: Role & Manifesto + Social Sliders */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-12 sm:mt-16 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end pt-8 border-t border-black/[0.08]"
          >
            {/* Left Column */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col items-start gap-4">
              <span className="inline-block rounded-full border border-black/[0.08] bg-surface px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-ink uppercase">
                {profile.role}
              </span>
              <p className="max-w-xl text-base md:text-lg leading-relaxed text-muted font-normal text-balance">
                {profile.manifesto[0]} {profile.manifesto[1]}
              </p>
              <div className="pt-2">
                <MagneticButton
                  href="#contact"
                  variant="solid"
                  className="px-6 py-3 text-sm font-medium shadow-sm"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo("contact");
                  }}
                >
                  Let&apos;s collaborate
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </div>
            </div>

            {/* Right Column: Social Channels */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col md:items-end">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted mb-3">
                Direct Channels
              </span>
              <ul className="flex flex-col gap-2 w-full md:w-auto">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between md:justify-end gap-3 rounded-xl border border-black/[0.08] bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                        aria-label={`${social.label}: ${social.handle}`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-white" />
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            {social.label}
                          </span>
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors group-hover:text-white/80">
                          <span>{social.handle}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: /02 ABOUT & STATEMENT
          =================================================================== */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="section-pad border-b border-black/[0.08] bg-bg relative overflow-hidden"
      >
        <div className="page-container">
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

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            {/* Left: Statement */}
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
                <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-surface px-3 py-1 text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                  BASED IN MALANG, ID (WIB)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-surface px-3 py-1">
                  SYSTEMS · APIS · DATABASES
                </span>
              </div>
            </motion.div>

            {/* Right: 4 Bento Metric Cards */}
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
                    className="group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-surface p-6 shadow-2xs transition-all duration-300 hover:border-black/25 hover:shadow-md"
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

      {/* ===================================================================
          SECTION 3: /03 SERVICES & CAPABILITIES
          =================================================================== */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="section-pad border-b border-black/[0.08] bg-bg relative"
      >
        <div className="page-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mb-8 flex items-center justify-between"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              /03 SERVICES & CAPABILITIES
            </span>
            <span className="font-mono text-xs text-muted">
              06 PRODUCTION OFFERINGS
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="max-w-3xl mb-14"
          >
            <h2
              id="services-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink"
            >
              Capabilities designed to scale from prototype to high load.
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
              Specialized engineering engagements covering robust backend backbones,
              transactional inventory engines, and responsive modern client interfaces.
            </p>
          </motion.div>

          {/* Accordion Rows */}
          <div className="border-t border-black/[0.08]">
            {services.map((service, index) => {
              const isOpen = openServiceId === service.id;
              const panelId = `${baseServiceId}-panel-${service.id}`;
              const buttonId = `${baseServiceId}-button-${service.id}`;
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <motion.div
                  key={service.id}
                  variants={fadeUpDelayed(Math.min(index, 4) * 0.04)}
                  initial="hidden"
                  whileInView="show"
                  viewport={inView}
                  className="border-b border-black/[0.08] transition-colors duration-200"
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenServiceId((curr) => (curr === service.id ? "" : service.id))
                      }
                      onMouseEnter={() => {
                        if (isFinePointer) setOpenServiceId(service.id);
                      }}
                      className="group flex w-full items-center justify-between gap-6 py-6 md:py-8 text-left focus-visible:outline-2 focus-visible:outline-offset-4 cursor-pointer"
                    >
                      <span className="flex min-w-0 items-baseline gap-4 md:gap-8">
                        <span
                          aria-hidden="true"
                          className="font-mono text-sm font-semibold tracking-wider text-muted shrink-0"
                        >
                          {formattedIndex}
                        </span>
                        <span
                          className={`text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-200 ${
                            isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
                          }`}
                        >
                          {service.title}
                        </span>
                      </span>

                      {/* Rotating Arrow ↗ -> ✕ */}
                      <span
                        aria-hidden="true"
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out ${
                          isOpen
                            ? "rotate-45 border-ink bg-ink text-white"
                            : "border-black/[0.08] bg-surface text-muted group-hover:border-ink group-hover:text-ink"
                        }`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={spring}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-8 pb-10 pt-2 lg:grid-cols-12 lg:gap-12">
                          {/* Left: Description & Deliverables */}
                          <div className="lg:col-span-7 flex flex-col justify-between pl-0 sm:pl-10 md:pl-14">
                            <div>
                              <p className="text-base md:text-lg leading-relaxed text-muted">
                                {service.description}
                              </p>

                              <div className="mt-6">
                                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-3">
                                  Key Deliverables
                                </h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {service.deliverables.map((item) => (
                                    <li
                                      key={item}
                                      className="flex items-center gap-2 text-sm text-ink font-medium"
                                    >
                                      <CheckCircle2 className="h-4 w-4 text-neutral-800 shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-black/[0.06]">
                              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                                Technology Ecosystem
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {service.stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-full border border-black/[0.08] bg-surface px-3 py-1 font-mono text-xs font-medium text-ink shadow-2xs"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right: Floating Visual Schema Preview */}
                          <div className="lg:col-span-5">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/[0.08] bg-surface shadow-md">
                              <Image
                                src={service.preview}
                                alt={`${service.title} schematic architecture`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                                <span>ARCHITECTURE SCHEMA</span>
                                <span>INDEX {formattedIndex}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 4: /04 TECHNICAL ARCHITECTURE
          =================================================================== */}
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="section-pad border-b border-black/[0.08] bg-bg relative"
      >
        <div className="page-container">
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
              automated testing pipelines.
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
                  className="flex flex-col rounded-3xl border border-black/[0.08] bg-surface p-7 shadow-2xs transition-all duration-300 hover:border-black/20 hover:shadow-md"
                >
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

                  <div className="flex flex-col gap-3">
                    {column.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group relative rounded-2xl border border-black/[0.07] bg-white p-4 transition-all duration-300 hover:border-black/30 hover:bg-neutral-50/80"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 group-hover:scale-125 transition-transform" />
                            <span className="font-medium text-sm text-ink tracking-tight">
                              {skill.name}
                            </span>
                          </div>
                          <span className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
                            {skill.levelTag}
                          </span>
                        </div>

                        <div className="mt-2.5 border-t border-black/[0.04] pt-2">
                          <p className="text-xs text-muted leading-relaxed">
                            {skill.highlights[0]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 5: /05 SELECTED WORK (STICKY CARD STACKING)
          =================================================================== */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="section-pad border-b border-black/[0.08] bg-bg relative"
      >
        <div className="page-container">
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

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-16"
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

            {/* Filter Tabs with layoutId="activeFilterSlider" */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap gap-1 rounded-full border border-black/[0.08] bg-surface p-1 shadow-2xs"
            >
              {projectCategories.map((category) => {
                const isActive = workFilter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    id={`filter-tab-${category}`}
                    aria-selected={isActive}
                    aria-controls="projects-panel"
                    onClick={() => setWorkFilter(category)}
                    className={`relative rounded-full px-4 py-2 text-xs font-medium tracking-tight transition-colors duration-200 cursor-pointer ${
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

          {/* Sticky Stacking Cards Container */}
          <div id="projects-panel" className="flex flex-col gap-12 sm:gap-16">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ ...spring, delay: Math.min(index, 3) * 0.05 }}
                  className="sticky top-28 group"
                >
                  <Link
                    href={`/work/${project.slug}`}
                    data-cursor="view"
                    aria-label={`${project.title} case study`}
                    className="block rounded-3xl border border-black/[0.08] bg-surface p-6 sm:p-8 md:p-10 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-black/30 hover:shadow-2xl cursor-pointer"
                  >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                      {/* Left: 16:10 Frame Preview with Browser Bar */}
                      <div className="lg:col-span-7">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/[0.08] bg-bg-alt shadow-xs">
                          {/* Minimalist Browser Header Bar */}
                          <div className="flex h-9 w-full items-center justify-between border-b border-black/[0.06] bg-neutral-100/90 px-4 backdrop-blur-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
                              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
                            </div>
                            <div className="flex items-center gap-1.5 rounded-md bg-white/90 px-3 py-0.5 text-[11px] font-mono text-muted shadow-2xs">
                              <Lock className="h-2.5 w-2.5 text-muted/70" />
                              <span className="truncate max-w-[140px] sm:max-w-[200px]">
                                corecraft.my.id/work/{project.slug}
                              </span>
                            </div>
                            <span className="rounded-full bg-black/5 px-2 py-0.5 font-mono text-[10px] font-semibold text-ink uppercase tracking-wider">
                              {project.badge || project.category}
                            </span>
                          </div>

                          {/* Image with smooth zoom on hover */}
                          <div className="relative h-[calc(100%-2.25rem)] w-full overflow-hidden">
                            <Image
                              src={project.thumbnail}
                              alt={`${project.title} preview`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 55vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Editorial Meta & Description */}
                      <div className="lg:col-span-5 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-medium text-muted uppercase">
                            <span>{project.category}</span>
                            <span>·</span>
                            <span>{project.year}</span>
                            <span>·</span>
                            <span className="text-ink font-semibold">{project.badge}</span>
                          </div>

                          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-ink uppercase">
                            {project.shortTitle || project.title}
                          </h3>

                          <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
                            {project.summary}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-black/[0.08] bg-bg px-2.5 py-1 font-mono text-[11px] text-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center justify-between">
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink group-hover:underline">
                            Read Case Study ↗
                          </span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-surface text-ink transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:scale-110">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 6: /06 VERIFIED CREDENTIALS
          =================================================================== */}
      <section
        id="credentials"
        aria-labelledby="credentials-heading"
        className="section-pad border-b border-black/[0.08] bg-bg relative"
      >
        <div className="page-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mb-8 flex items-center justify-between"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              /06 VERIFIED CREDENTIALS
            </span>
            <span className="font-mono text-xs text-muted">
              {certificateCount} INDUSTRY ACCREDITATIONS
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14"
          >
            <div className="max-w-2xl">
              <h2
                id="credentials-heading"
                className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink"
              >
                Audited problem-solving and software credentials.
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
                Technical assessments verified by HackerRank, Dicoding Indonesia (AWS partner),
                and national software engineering competitions.
              </p>
            </div>

            {/* Issuer Filters */}
            <div className="flex flex-wrap gap-1.5 rounded-full border border-black/[0.08] bg-surface p-1 shadow-2xs">
              {certIssuers.map((issuer) => {
                const isActive = certFilter === issuer;
                return (
                  <button
                    key={issuer}
                    type="button"
                    onClick={() => setCertFilter(issuer)}
                    className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-ink text-white shadow-2xs"
                        : "text-muted hover:text-ink hover:bg-neutral-100/60"
                    }`}
                  >
                    {issuer}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={fadeUpDelayed(Math.min(index, 6) * 0.04)}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                className="group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-surface p-6 shadow-2xs transition-all duration-300 hover:border-black/25 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
                    <span className="inline-flex items-center gap-1.5 text-ink font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-neutral-800" />
                      {cert.category}
                    </span>
                    <span>{cert.date}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold tracking-tight text-ink group-hover:text-black">
                    {cert.title}
                  </h3>

                  <p className="mt-1 text-xs text-muted font-medium">
                    Issued by {cert.issuer}
                  </p>

                  {cert.credentialId ? (
                    <div className="mt-3 inline-block rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-muted-3">
                      ID: {cert.credentialId}
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-black/[0.06] bg-bg px-2.5 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-black/[0.06] pt-4">
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink transition-colors hover:text-black cursor-pointer"
                      aria-label={`Verify ${cert.title} on ${cert.issuer}`}
                    >
                      <span>Verify Credential</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-muted-3">
                      National Finalist & Top Award
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 7: /07 EXPERIENCE (OBSIDIAN DARK CARD & CURSOR FOLLOWER)
          =================================================================== */}
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="py-12 md:py-20 relative bg-bg"
      >
        <div className="page-container">
          <motion.div
            initial={{ scale: 0.94, opacity: 0.9 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={spring}
            onPointerMove={handleExpPointerMove}
            onPointerLeave={() => setHoveredExpIndex(null)}
            className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0C] text-white p-8 sm:p-12 md:p-16 shadow-2xl border border-white/[0.08]"
          >
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/[0.03] blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/[0.02] blur-[120px]" />

            {/* Header Monospace */}
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
                const isHovered = hoveredExpIndex === index;

                return (
                  <motion.div
                    key={`${exp.company}-${exp.period}`}
                    variants={fadeUpDelayed(index * 0.08)}
                    initial="hidden"
                    whileInView="show"
                    viewport={inView}
                    onPointerEnter={() => setHoveredExpIndex(index)}
                    className={`group relative border-b border-white/[0.08] py-8 md:py-10 transition-colors duration-300 ${
                      isHovered ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3 sm:gap-5 flex-wrap">
                          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white transition-colors duration-200 group-hover:text-white/80">
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

                      <div className="flex shrink-0 items-center gap-4 text-xs sm:text-sm font-mono text-white/60">
                        <span className="text-white font-medium">{exp.period}</span>
                        <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/30" />
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-white/80" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Micro-interaction: Cursor-following floating preview card */}
            <AnimatePresence>
              {expPreviewEnabled && activeExp ? (
                <motion.div
                  key={activeExp.thumbnail}
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={spring}
                  style={{
                    x: expMouseX,
                    y: expMouseY,
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
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4">
                    <span className="font-display text-sm font-bold text-white block">
                      {activeExp.company}
                    </span>
                    <span className="font-mono text-xs text-white/80 block mt-0.5">
                      {activeExp.role} · {activeExp.period}
                    </span>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 8: /08 CONTACT & INQUIRY (CURTAIN REVEAL BANNER)
          =================================================================== */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="section-pad border-t border-black/[0.08] bg-bg relative z-10 overflow-hidden shadow-[0_-25px_60px_rgba(0,0,0,0.06)] md:-mt-24"
      >
        <div className="page-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mb-8 flex items-center justify-between"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              /08 CONTACT & INQUIRY
            </span>
            <span className="font-mono text-xs text-muted">
              AVAILABLE WORLDWIDE
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="flex flex-col items-start gap-8 py-8"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-surface px-4 py-2 text-xs font-mono font-medium tracking-tight text-ink shadow-2xs">
              <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neutral-400/50 ring-1 ring-neutral-400/50 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-900 dark:bg-white" />
              </span>
              Available for New Project
            </span>

            <h2
              id="contact-heading"
              className="font-display text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink uppercase"
            >
              HAVE A PROJECT IN MIND?
            </h2>

            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-muted font-normal">
              Let&apos;s engineer something clear, resilient, and impactful together.
              Whether it&apos;s a high-concurrency API, an inventory engine, or a modern fullstack system.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MagneticButton
                href={`mailto:${profile.email}`}
                variant="solid"
                className="px-6 py-3.5 text-sm font-medium"
                ariaLabel={`Email ${profile.fullName}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{profile.email}</span>
              </MagneticButton>

              <MagneticButton
                href={profile.whatsappUrl}
                variant="outline"
                newTab
                className="px-6 py-3.5 text-sm font-medium"
                ariaLabel={`Chat with ${profile.fullName} on WhatsApp`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp Chat</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>

              <MagneticButton
                href="/CV%20Mohammad%20Kevin.pdf"
                variant="outline"
                newTab
                className="px-6 py-3.5 text-sm font-medium"
                ariaLabel="Download CV as PDF file"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Download CV (PDF)</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
