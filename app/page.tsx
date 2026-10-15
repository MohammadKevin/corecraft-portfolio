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
  type Variants,
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
import { spring } from "@/lib/motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

const cardHoverTap = {
  whileHover: { y: -4, transition: { duration: 0.2, ease: "easeOut" as const } },
  whileTap: { scale: 0.98 },
};

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
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const outlineRef = useRef<HTMLSpanElement>(null);
  const solidRef = useRef<HTMLSpanElement>(null);

  const [fontSize, setFontSize] = useState<string>(NAME_FALLBACK);
  const scrollTo = useScrollToSection();
  const prefersReducedMotion = useReducedMotion();
  const parallaxEnabled = prefersReducedMotion !== true;

  const { scrollYProgress } = useScroll();
  const heroStackScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.94]);
  const heroStackOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.3]);

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

  const [openServiceId, setOpenServiceId] = useState<string>(services[0]?.id ?? "");
  const isFinePointer = useFinePointer();
  const baseServiceId = useId();

  const [activeSkillTab, setActiveSkillTab] = useState<string>("backend");

  const [workFilter, setWorkFilter] = useState<ProjectFilter>("All");
  const filteredProjects = useMemo(
    () =>
      workFilter === "All"
        ? projects
        : projects.filter((project) => project.category === workFilter),
    [workFilter],
  );

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

  const [hoveredExpIndex, setHoveredExpIndex] = useState<number | null>(null);
  const isWide = useMinWidth(1024);
  const expPreviewEnabled = isFinePointer && prefersReducedMotion !== true && isWide;

  const expRawX = useMotionValue(0);
  const expRawY = useMotionValue(0);
  const expMouseX = useSpring(expRawX, { stiffness: 450, damping: 30, mass: 0.5 });
  const expMouseY = useSpring(expRawY, { stiffness: 450, damping: 30, mass: 0.5 });

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
      <section
        ref={heroRef}
        id="hero"
        aria-labelledby="hero-name"
        className="min-h-screen h-screen w-full sticky top-0 z-0 flex flex-col justify-between overflow-hidden pt-16 pb-3 sm:pt-20 sm:pb-6 border-b border-black/[0.08]"
      >
        <div className="page-container h-full w-full flex flex-col justify-between">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            style={parallaxEnabled ? { scale: heroStackScale, opacity: heroStackOpacity } : undefined}
            className="h-full w-full flex flex-col justify-between"
          >
            <motion.div
              variants={heroItemVariants}
              className="flex items-center justify-between shrink-0"
            >
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                /01 HERO
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full border border-black/[0.08] bg-surface px-3.5 py-1 text-xs font-mono font-medium tracking-tight text-ink shadow-sm">
                Available for New Project
              </span>
            </motion.div>

            <motion.div variants={heroItemVariants} className="relative my-auto py-1 sm:py-2 flex items-center justify-center shrink-0">
              <motion.h1
                id="hero-name"
                ref={nameRef}
                style={{ fontSize }}
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

              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center"
              >
                <div className="relative z-10 mx-auto -mb-6 sm:-mb-8 md:-mb-10 mt-2 sm:mt-4 h-[220px] w-[170px] sm:h-[300px] sm:w-[230px] md:h-[370px] md:w-[290px] lg:h-[410px] lg:w-[320px] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
                  <Image
                    src="/images/profile-removebg.png"
                    alt="Mohammad Kevin"
                    fill
                    priority
                    sizes="(max-width: 768px) 230px, 320px"
                    className="object-contain object-bottom grayscale contrast-105"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={heroItemVariants}
              className="pt-3 sm:pt-5 border-t border-black/[0.08] grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-end relative z-30 shrink-0"
            >
              <div className="md:col-span-7 flex flex-col gap-2 sm:gap-3">
                <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-muted uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                  <span>{profile.role}</span>
                  <span>·</span>
                  <span>{profile.location}</span>
                </div>

                <p className="text-base sm:text-lg md:text-xl font-medium tracking-tight text-ink leading-snug max-w-xl text-balance">
                  {profile.manifesto[0]}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-3">
                  <MagneticButton
                    href="#contact"
                    variant="solid"
                    className="px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("contact");
                    }}
                  >
                    <span>Let&apos;s collaborate</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </MagneticButton>

                  <MagneticButton
                    href="#work"
                    variant="outline"
                    className="px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("work");
                    }}
                  >
                    <span>View Selected Work</span>
                  </MagneticButton>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col md:items-end justify-between h-full gap-2 sm:gap-3">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-muted">
                  CONNECT & INQUIRE
                </span>
                <ul className="flex flex-col gap-1.5 sm:gap-2 w-full md:w-auto">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <li key={social.label}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between md:justify-end gap-3 rounded-lg sm:rounded-xl border border-black/[0.08] bg-surface px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-ink transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                          aria-label={`${social.label}: ${social.handle}`}
                        >
                          <span className="flex items-center gap-2">
                            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted transition-colors group-hover:text-white" />
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                              {social.label}
                            </span>
                          </span>
                          <span className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-muted transition-colors group-hover:text-white/80">
                            <span>{social.handle}</span>
                            <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE STACKING CARD LAYER (ABOUT & SUBSEQUENT SECTIONS) */}
      <div className="relative z-10 bg-[#F6F7F9] dark:bg-[#0A0A0C]">
        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative z-10 bg-[#F6F7F9] dark:bg-[#0A0A0C] min-h-screen rounded-t-[2.5rem] md:rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.12)] border-t border-black/[0.06] dark:border-white/[0.08] pt-16 md:pt-24 pb-20"
        >
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              variants={itemVariants}
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
              <motion.div
                variants={itemVariants}
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

              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.stats.map((stat, index) => {
                  const Icon = metricIcons[index % metricIcons.length];
                  return (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      {...cardHoverTap}
                      className="group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-surface p-6 shadow-2xs transition-colors duration-200 hover:border-black/25 hover:shadow-md cursor-default"
                    >
                      <div className="flex items-center justify-between text-muted">
                        <span className="font-mono text-xs text-muted-3">
                          {`0${index + 1}`}
                        </span>
                        <Icon className="h-4 w-4 text-muted transition-colors duration-200 group-hover:text-ink" />
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
          </motion.div>
        </div>
      </section>

      <section
        id="services"
        aria-labelledby="services-heading"
        className="section-pad border-b border-black/[0.08] bg-bg relative"
      >
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              variants={itemVariants}
              className="mb-8 flex items-center justify-between"
            >
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                /03 SERVICES & CAPABILITIES
              </span>
              <span className="font-mono text-xs text-muted">
                06 CORE DELIVERABLES
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-3xl mb-12">
              <h2
                id="services-heading"
                className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink"
              >
                Production capabilities delivered end-to-end.
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
                Every solution is architected with strict contracts, high test coverage,
                and performance budgets — preventing technical debt before it starts.
              </p>
            </motion.div>

            <div className="border-t border-black/[0.08]">
              {services.map((service, index) => {
                const isOpen = openServiceId === service.id;
                const buttonId = `${baseServiceId}-btn-${service.id}`;
                const panelId = `${baseServiceId}-pnl-${service.id}`;
                const formattedIndex = `/0${index + 1}`;

                return (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
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

                        <span
                          aria-hidden="true"
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ease-out ${
                            isOpen
                              ? "rotate-45 border-ink bg-ink text-white"
                              : "border-black/[0.08] bg-surface text-muted group-hover:border-ink group-hover:text-ink"
                          }`}
                        >
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-8 pb-10 pt-2 lg:grid-cols-12 lg:gap-12">
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
                                        className="flex items-center gap-2 text-xs sm:text-sm text-ink/80"
                                      >
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-neutral-800" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="mt-8 pt-6 border-t border-black/[0.06] flex flex-wrap gap-2">
                                {service.stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-full border border-black/[0.08] bg-bg px-3 py-1 font-mono text-xs text-muted"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="lg:col-span-5">
                              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/[0.08] bg-surface shadow-md">
                                <Image
                                  src={service.preview}
                                  alt={`${service.title} architectural schema preview`}
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
          </motion.div>
        </div>
      </section>

      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="section-pad border-b border-black/[0.08] bg-bg relative"
      >
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              variants={itemVariants}
              className="mb-8 flex items-center justify-between"
            >
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                /04 TECHNICAL ARCHITECTURE
              </span>
              <span className="font-mono text-xs text-muted">
                TABBED STACK MATRIX
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10"
            >
              <div className="max-w-2xl">
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
              </div>

              <div className="flex flex-wrap gap-1.5 rounded-full border border-black/[0.08] bg-surface p-1 shadow-2xs">
                {skillCategories.map((column) => {
                  const isActive = activeSkillTab === column.id;
                  const Icon = columnIcons[column.id] ?? Server;

                  return (
                    <button
                      key={column.id}
                      type="button"
                      onClick={() => setActiveSkillTab(column.id)}
                      className={`relative flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold tracking-tight transition-colors duration-200 cursor-pointer ${
                        isActive ? "text-white" : "text-muted hover:text-ink"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeSkillTabIndicator"
                          transition={spring}
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-ink"
                        />
                      )}
                      <Icon className="relative z-10 h-3.5 w-3.5" />
                      <span className="relative z-10">{column.title}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {skillCategories.map((column) => {
              if (column.id !== activeSkillTab) return null;

              return (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="rounded-3xl border border-black/[0.08] bg-surface p-6 sm:p-8 md:p-10 shadow-sm mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-black/[0.06] gap-3">
                      <div>
                        <span className="font-mono text-xs font-semibold text-muted uppercase tracking-widest block mb-1">
                          ACTIVE DOMAIN
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
                          {column.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted max-w-md">
                        {column.blurb}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {column.skills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          {...cardHoverTap}
                          className="group relative rounded-2xl border border-black/[0.07] bg-white p-5 shadow-2xs transition-colors duration-200 hover:border-black/30 hover:bg-neutral-50/80 cursor-default"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                              <span className="h-2 w-2 rounded-full bg-neutral-900 group-hover:scale-125 transition-transform" />
                              <span className="font-bold text-base text-ink tracking-tight">
                                {skill.name}
                              </span>
                            </div>
                            <span className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
                              {skill.levelTag}
                            </span>
                          </div>

                          <div className="border-t border-black/[0.04] pt-3">
                            <p className="text-xs text-muted leading-relaxed">
                              {skill.highlights[0]}
                            </p>
                            {skill.highlights[1] && (
                              <p className="text-xs text-muted/80 leading-relaxed mt-1">
                                {skill.highlights[1]}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section
        id="work"
        aria-labelledby="work-heading"
        className="section-pad border-b border-black/[0.08] bg-bg relative"
      >
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              variants={itemVariants}
              className="mb-8 flex items-center justify-between"
            >
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                /05 SELECTED WORK
              </span>
              <span className="font-mono text-xs text-muted">
                STACKING CASE STUDIES
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14"
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
                      {isActive && (
                        <motion.span
                          layoutId="activePillIndicator"
                          transition={spring}
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-ink"
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <div id="projects-panel" className="flex flex-col gap-12 sm:gap-16">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ ...spring, delay: Math.min(index, 3) * 0.04 }}
                    className="sticky top-28 group"
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      data-cursor="view"
                      aria-label={`${project.title} case study`}
                      className="block rounded-3xl border border-black/[0.08] bg-surface p-6 sm:p-8 md:p-10 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-black/30 hover:shadow-2xl cursor-pointer"
                    >
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                        <div className="lg:col-span-7">
                          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/[0.08] bg-bg-alt shadow-xs">
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

                            <div className="relative h-[calc(100%-2.25rem)] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                              <Image
                                src={project.image || project.thumbnail || `/images/work/${project.slug}.png`}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={index < 2}
                                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                            </div>
                          </div>
                        </div>

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
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-surface text-ink transition-all duration-200 group-hover:bg-black group-hover:text-white group-hover:scale-105">
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="credentials"
        aria-labelledby="credentials-heading"
        className="section-pad border-b border-black/[0.08] bg-bg relative"
      >
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              variants={itemVariants}
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
              variants={itemVariants}
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

              <div className="flex flex-wrap gap-1.5 rounded-full border border-black/[0.08] bg-surface p-1 shadow-2xs">
                {certIssuers.map((issuer) => {
                  const isActive = certFilter === issuer;
                  return (
                    <button
                      key={issuer}
                      type="button"
                      onClick={() => setCertFilter(issuer)}
                      className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "text-white"
                          : "text-muted hover:text-ink hover:bg-neutral-100/60"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeCertFilterIndicator"
                          transition={spring}
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-ink"
                        />
                      )}
                      <span className="relative z-10">{issuer}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCertificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  {...cardHoverTap}
                  className="group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-surface p-6 shadow-2xs transition-colors duration-200 hover:border-black/25 hover:shadow-md cursor-default"
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
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
          </motion.div>
        </div>
      </section>

      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="py-12 md:py-20 relative bg-bg"
      >
        <div className="page-container">
          <motion.div
            initial={{ scale: 0.96, opacity: 0.9 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={spring}
            onPointerMove={handleExpPointerMove}
            onPointerLeave={() => setHoveredExpIndex(null)}
            className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0C] text-white p-8 sm:p-12 md:p-16 shadow-2xl border border-white/[0.08]"
          >
            <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/[0.03] blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/[0.02] blur-[120px]" />

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
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
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
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

            <div className="border-t border-white/[0.08]">
              {experiences.map((exp, index) => {
                const isHovered = hoveredExpIndex === index;

                return (
                  <motion.div
                    key={`${exp.company}-${exp.period}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.06 }}
                    onPointerEnter={() => setHoveredExpIndex(index)}
                    className={`group relative border-b border-white/[0.08] py-8 md:py-10 transition-colors duration-200 ${
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

            <AnimatePresence>
              {expPreviewEnabled && activeExp ? (
                <motion.div
                  key={activeExp.thumbnail}
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
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

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="section-pad border-t border-black/[0.08] bg-bg relative z-10 overflow-hidden shadow-[0_-25px_60px_rgba(0,0,0,0.06)] md:-mt-24"
      >
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              variants={itemVariants}
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
              variants={itemVariants}
              className="flex flex-col items-start gap-8 py-8"
            >
              <span className="inline-flex items-center rounded-full border border-black/[0.08] bg-surface px-4 py-2 text-xs font-mono font-medium tracking-tight text-ink shadow-2xs">
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
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
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
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
