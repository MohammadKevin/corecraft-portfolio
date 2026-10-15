"use client";

import React, {
  useCallback,
  useEffect,
  useId,
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
  ChevronDown,
  Clock,
  Database,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  Layout,
  Lock,
  Mail,
  MapPin,
  Phone,
  Server,
  ShieldCheck,
  Terminal,
  ArrowUp,
} from "lucide-react";
import { profile, bio } from "@/data/profile";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { experiences } from "@/data/experience";
import { certificates, certificateCount } from "@/data/certificates";
import { stackRow1, stackRow2 } from "@/data/skills";
import { useScrollToSection } from "@/lib/scroll";
import { useFinePointer } from "@/lib/hooks";
import { spring } from "@/lib/motion";

const PROJECT_ORDER = [
  "worknest",
  "outerco",
  "invdocs",
  "corepos",
  "inventory-api",
  "clinic-portal",
  "corecraft",
];

export default function HomePage() {
  const scrollTo = useScrollToSection();
  const prefersReducedMotion = useReducedMotion();
  const isFine = useFinePointer();

  // /03 Services Accordion State
  const [openServiceId, setOpenServiceId] = useState<string>(services[0]?.id ?? "");

  // /05 Work Horizontal Scroll
  const workTrackRef = useRef<HTMLDivElement>(null);
  const workContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: workScroll } = useScroll({
    target: workContainerRef,
    offset: ["start start", "end end"],
  });

  const [maxScrollX, setMaxScrollX] = useState<number>(0);
  useEffect(() => {
    const updateScrollBounds = () => {
      if (!workTrackRef.current) return;
      const scrollW = workTrackRef.current.scrollWidth;
      const clientW = workTrackRef.current.clientWidth;
      setMaxScrollX(Math.max(0, scrollW - clientW + 64));
    };

    updateScrollBounds();
    window.addEventListener("resize", updateScrollBounds);
    return () => window.removeEventListener("resize", updateScrollBounds);
  }, []);

  const workX = useTransform(workScroll, [0, 1], [0, -maxScrollX]);

  // Ordered projects per specification
  const orderedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const idxA = PROJECT_ORDER.indexOf(a.slug);
      const idxB = PROJECT_ORDER.indexOf(b.slug);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
  }, []);

  // /07 Experience Cursor Follower
  const [hoveredExpIndex, setHoveredExpIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 350, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 350, damping: 28 });

  const handleExpMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  }, [mouseX, mouseY]);

  // /08 Live Clock (Malang / Asia/Jakarta)
  const [malangTime, setMalangTime] = useState<string>("");
  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setMalangTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="sticky top-0 z-0 w-full min-h-[100svh] md:h-[100svh] flex flex-col justify-between py-10 px-6 md:px-14 overflow-hidden bg-[#F6F7F9] dark:bg-[#F6F7F9] text-[#0B0C0E] relative"
      >
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.55] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 flex items-center justify-between shrink-0 pt-2 sm:pt-4">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
            /01 HERO
          </span>
          <span className="font-mono text-xs font-medium tracking-wider text-neutral-600 uppercase">
            {profile.role.toUpperCase()} — {profile.location.toUpperCase()}
          </span>
        </div>

        <div className="relative z-10 my-auto py-4 sm:py-8 flex flex-col items-center justify-center shrink-0 select-none">
          <h1
            id="hero-title"
            className="font-display text-[14vw] md:text-[11.5vw] font-black uppercase tracking-tighter leading-[0.82] text-center"
          >
            <span className="block text-transparent [-webkit-text-stroke:2px_#0B0C0E] md:[-webkit-text-stroke:3.5px_#0B0C0E] font-black uppercase tracking-tighter leading-[0.82] cursor-default">
              {profile.firstName}
            </span>
            <span className="block text-[#0B0C0E] opacity-100 font-black uppercase tracking-tighter leading-[0.82] select-none mt-1 sm:mt-2">
              {profile.lastName}
            </span>
          </h1>
        </div>

        {/* Bottom Flank */}
        <div className="relative z-10 pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0 pb-2">
          {/* Bottom Left: Manifesto & CTA Pills */}
          <div className="flex flex-col gap-4 max-w-xl">
            <p className="text-base sm:text-lg md:text-xl font-medium tracking-tight text-neutral-900 leading-snug">
              {profile.manifesto[0]}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0B0C0E] text-white hover:bg-neutral-800 px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 active:scale-95 shadow-sm"
              >
                <span>Let&apos;s collaborate</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("work");
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-black/5 text-[#0B0C0E] border border-black/10 hover:bg-black/10 px-5 py-2.5 text-xs sm:text-sm font-medium tracking-tight transition-all duration-200 active:scale-95 shadow-sm"
              >
                <span>View Selected Work</span>
              </a>
            </div>
          </div>

          {/* Bottom Right: Vertical Social Links */}
          <div className="flex items-center md:items-end gap-6 md:gap-8 font-mono text-xs text-neutral-800">
            {profile.socials.map((social, idx) => (
              <React.Fragment key={social.label}>
                {idx > 0 ? <span className="hidden md:inline text-neutral-400">/</span> : null}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors flex items-center gap-1"
                >
                  <span>{social.label}</span>
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Wrapper for Sections 02 through 08 */}
      <div className="relative z-10 bg-[#0E0F12]">
        {/* ============================================================ */}
        {/* /02 ABOUT & STATEMENT */}
        {/* ============================================================ */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative z-10 min-h-[100svh] w-full bg-[#0E0F12] text-white border-t border-white/10 shadow-[0_-24px_60px_rgba(0,0,0,0.35)] px-6 md:px-16 pt-24 md:pt-28 pb-16 md:pb-20 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              /02 ABOUT &amp; STATEMENT
            </span>
            <span className="font-mono text-xs text-neutral-400 uppercase">
              ENGINEERING PHILOSOPHY &amp; METRICS
            </span>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start my-auto">
            {/* Left Column: Philosophy Text */}
            <div className="flex flex-col">
              <h2
                id="about-heading"
                className="font-display text-white font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
              >
                {profile.aboutHeadline || profile.subtitle}
              </h2>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed mt-6">
                {profile.aboutText || bio}
              </p>
            </div>

            {/* Right Column: Avatar Card & Bento Metrics */}
            <div className="flex flex-col">
              {/* Avatar Frame */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] min-h-[280px] md:min-h-[340px] mb-6 flex items-end justify-center">
                <Image
                  src={profile.avatar}
                  alt={profile.fullName}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-bottom grayscale contrast-110 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
                />
              </div>

              {/* 2x2 Bento Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {profile.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <span className="font-display text-3xl sm:text-4xl font-black text-white block">
                      {stat.value}
                    </span>
                    <span className="mt-1 font-mono text-xs text-neutral-300 block">
                      {stat.label}
                    </span>
                  </div>
                ))}

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col justify-center">
                  <span className="font-display text-lg sm:text-xl font-bold text-white block leading-snug">
                    Uptime-Focused
                  </span>
                  <span className="mt-1 font-mono text-xs text-neutral-300 block">
                    Architecture Focus
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Colophon */}
          <div className="pt-8 border-t border-white/10 flex items-center justify-between font-mono text-xs text-neutral-400 mt-8">
            <span>{profile.specialization || "Specialized in Node.js, Express, NestJS, Prisma & Next.js"}</span>
            <span className="hidden sm:inline">{profile.architectureNote || "TypeScript Strict Architecture"}</span>
          </div>
        </section>

        {/* ============================================================ */}
        {/* /03 SERVICES & CAPABILITIES */}
        {/* ============================================================ */}
        <section
          id="services"
          aria-labelledby="services-heading"
          className="w-full min-h-[100svh] md:h-[100svh] bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-white px-6 md:px-16 pt-24 md:pt-28 pb-10 flex flex-col justify-between border-t border-black/5 dark:border-white/5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase">
              /03 SERVICES &amp; CAPABILITIES
            </span>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase">
              {String(services.length).padStart(2, "0")} CORE DELIVERABLES
            </span>
          </div>

          <div className="mb-6">
            <h2
              id="services-heading"
              className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white"
            >
              Production capabilities delivered end-to-end.
            </h2>
          </div>

          {/* Accordion Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-start">
            {/* Accordion List (Left Column) */}
            <div className="lg:col-span-7 flex flex-col divide-y divide-black/10 dark:divide-white/10">
              {services.map((service, index) => {
                const isOpen = openServiceId === service.id;
                return (
                  <div key={service.id} className="py-3">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`service-panel-${service.id}`}
                      id={`service-button-${service.id}`}
                      onClick={() => setOpenServiceId(service.id)}
                      className="w-full flex items-center justify-between text-left py-2 font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white transition-opacity hover:opacity-80 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-neutral-400">
                          /{String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{service.title}</span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-neutral-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-neutral-900 dark:text-white" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`service-panel-${service.id}`}
                          role="region"
                          aria-labelledby={`service-button-${service.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={spring}
                          className="overflow-hidden pt-2 pb-3"
                        >
                          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl mb-3">
                            {service.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            {service.deliverables.map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Preview Card (Desktop) */}
            <div className="hidden lg:block lg:col-span-5 h-full">
              {(() => {
                const current = services.find((s) => s.id === openServiceId) ?? services[0];
                return (
                  <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-[#F6F7F9] dark:bg-white/[0.03] p-6 shadow-sm flex flex-col justify-between h-[360px]">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4">
                        <span>ARCHITECTURE SPEC</span>
                        <span>{current.id}</span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white mb-3">
                        {current.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {current.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.05] px-3 py-1 font-mono text-xs text-neutral-700 dark:text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Simple Monochrome Schema Diagram */}
                    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121316] p-4 flex flex-col gap-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 pb-2 border-b border-black/5 dark:border-white/5">
                        <span className="flex items-center gap-1.5">
                          <Layers className="h-3 w-3" />
                          <span>CONTRACT DEFINITION</span>
                        </span>
                        <span className="text-neutral-400">Strict Schema</span>
                      </div>
                      <div className="text-[11px] text-neutral-700 dark:text-neutral-300 font-mono space-y-1">
                        <div>&gt; Client Interface (Next.js App Router)</div>
                        <div>&gt; Data Ingress &amp; DTO Validation (Zod / Class-Validator)</div>
                        <div>&gt; Isolated Persistence Layer (Prisma ORM over SQL)</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-mono text-xs text-neutral-500">
            <span>Modular Services</span>
            <span>Available for Full-cycle Engagement</span>
          </div>
        </section>

        {/* ============================================================ */}
        {/* /04 TECHNICAL ARCHITECTURE (CONTINUOUS CROSSING MARQUEE) */}
        {/* ============================================================ */}
        <section
          id="stack"
          aria-labelledby="stack-heading"
          className="w-full min-h-[100svh] md:h-[100svh] bg-[#F6F7F9] dark:bg-[#0E0F12] flex flex-col justify-center items-center text-center px-4 overflow-hidden border-t border-black/5 dark:border-white/5"
        >
          <div className="max-w-3xl mb-12">
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase">
                /04 TECHNICAL ARCHITECTURE
              </span>
              <span className="font-mono text-xs text-neutral-400">·</span>
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase">
                CONTINUOUS CROSSING MARQUEE
              </span>
            </div>

            <h2
              id="stack-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
            >
              A battle-tested stack built for reliability and scale.
            </h2>
          </div>

          {/* Marquee Rows Container with Gradient Edge Fade */}
          <div className="w-full flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* Row 1: Moving RIGHT */}
            <div className="group overflow-hidden w-full flex">
              <div className="flex shrink-0 gap-4 group-hover:[animation-play-state:paused] animate-marquee-right">
                {[...stackRow1, ...stackRow1].map((item, idx) => (
                  <div
                    key={`row1-${item.name}-${idx}`}
                    className="px-6 py-3.5 rounded-2xl bg-white dark:bg-white/[0.04] border border-black/10 dark:border-white/10 shadow-sm flex items-center gap-3.5 hover:scale-105 hover:border-black/30 dark:hover:border-white/30 transition-all select-none"
                  >
                    <Terminal className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
                    <span className="font-display text-sm font-bold text-neutral-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Moving LEFT */}
            <div className="group overflow-hidden w-full flex">
              <div className="flex shrink-0 gap-4 group-hover:[animation-play-state:paused] animate-marquee-left">
                {[...stackRow2, ...stackRow2].map((item, idx) => (
                  <div
                    key={`row2-${item.name}-${idx}`}
                    className="px-6 py-3.5 rounded-2xl bg-white dark:bg-white/[0.04] border border-black/10 dark:border-white/10 shadow-sm flex items-center gap-3.5 hover:scale-105 hover:border-black/30 dark:hover:border-white/30 transition-all select-none"
                  >
                    <Server className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
                    <span className="font-display text-sm font-bold text-neutral-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* /05 SELECTED WORK (HORIZONTAL SCROLL PINNING) */}
        {/* ============================================================ */}
        <section
          id="work"
          aria-labelledby="work-heading"
          ref={workContainerRef}
          className="relative bg-white dark:bg-[#0A0A0C] border-t border-black/5 dark:border-white/5 md:h-[450vh]"
        >
          {/* Desktop Pinned Showcase (md: and above) */}
          <div className="hidden md:flex sticky top-0 h-[100svh] w-full overflow-hidden flex-col justify-between pt-24 md:pt-28 pb-10 px-6 md:px-16">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase block">
                  /05 SELECTED WORK
                </span>
                <h2
                  id="work-heading"
                  className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1"
                >
                  Production systems in live deployment.
                </h2>
              </div>
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                SCROLL TO NAVIGATE HORIZONTALLY
              </span>
            </div>

            {/* Sliding Track */}
            <div className="relative my-auto overflow-hidden py-4">
              <motion.div
                ref={workTrackRef}
                style={{ x: prefersReducedMotion ? 0 : workX }}
                className="flex gap-8 lg:gap-12 items-stretch"
              >
                {orderedProjects.map((project, index) => (
                  <article
                    key={project.slug}
                    className="w-[80vw] max-w-[680px] shrink-0 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121316] p-6 lg:p-8 shadow-lg hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Browser Mockup Frame */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-neutral-900 shadow-sm mb-6">
                        <div className="flex h-8 w-full items-center justify-between border-b border-black/10 dark:border-white/10 bg-neutral-100/90 dark:bg-neutral-800/90 px-3 backdrop-blur-xs relative z-10">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-neutral-400" />
                            <span className="h-2 w-2 rounded-full bg-neutral-300" />
                            <span className="h-2 w-2 rounded-full bg-neutral-200" />
                          </div>
                          <div className="flex items-center gap-1 rounded bg-white/90 dark:bg-black/40 px-2.5 py-0.5 text-[10px] font-mono text-neutral-600 dark:text-neutral-300 shadow-2xs">
                            <Lock className="h-2.5 w-2.5 opacity-70" />
                            <span className="truncate max-w-[180px]">
                              corecraft.my.id/work/{project.slug}
                            </span>
                          </div>
                          <span className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
                            {project.badge || project.category}
                          </span>
                        </div>

                        <div className="relative h-[calc(100%-2rem)] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                          <Image
                            alt={project.title}
                            src={`/images/work/${project.slug}.png`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index < 2}
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2 font-mono text-xs font-medium text-neutral-500 uppercase">
                        <span>{project.category}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                      </div>

                      <h3 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white uppercase group-hover:opacity-85 transition-opacity">
                        {project.shortTitle || project.title}
                      </h3>

                      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">
                        {project.summary}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-neutral-700 dark:text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-neutral-900 dark:text-white hover:opacity-75 transition-opacity"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>

                      <div className="flex items-center gap-3 text-xs font-mono">
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"
                          >
                            <span>Live</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : null}
                        {project.sourceUrl ? (
                          <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"
                          >
                            <span>Code</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </div>

            {/* Bottom Meta */}
            <div className="flex items-center justify-between font-mono text-xs text-neutral-500 pt-4 border-t border-black/10 dark:border-white/10">
              <span>07 Production Systems Delivered</span>
              <span>100% Architecture Integrity</span>
            </div>
          </div>

          {/* Mobile Vertical List Fallback (< 768px or Reduced Motion) */}
          <div className="md:hidden px-6 py-16 flex flex-col gap-10">
            <div>
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase block">
                /05 SELECTED WORK
              </span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-2">
                Production systems in live deployment.
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {orderedProjects.map((project) => (
                <article
                  key={`mobile-${project.slug}`}
                  className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121316] p-5 shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-neutral-900 mb-4">
                    <Image
                      alt={project.title}
                      src={`/images/work/${project.slug}.png`}
                      fill
                      sizes="100vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-1 font-mono text-[11px] text-neutral-500 uppercase">
                    <span>{project.category}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase">
                    {project.shortTitle || project.title}
                  </h3>

                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-neutral-900 dark:text-white"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 font-mono text-xs hover:text-neutral-900 dark:hover:text-white"
                      >
                        Live Demo ↗
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* /06 VERIFIED CREDENTIALS */}
        {/* ============================================================ */}
        <section
          id="credentials"
          aria-labelledby="credentials-heading"
          className="w-full min-h-[100svh] md:h-[100svh] bg-[#F6F7F9] dark:bg-[#0E0F12] flex flex-col justify-center items-center px-4 overflow-hidden border-t border-black/5 dark:border-white/5"
        >
          <div className="max-w-2xl text-center mb-12">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase">
                /06 VERIFIED CREDENTIALS
              </span>
              <span className="font-mono text-xs text-neutral-400">·</span>
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase">
                {certificateCount || certificates.length} INDUSTRY ACCREDITATIONS
              </span>
            </div>

            <h2
              id="credentials-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
            >
              Audited problem-solving and software credentials.
            </h2>
          </div>

          {/* Continuous Infinite Ticker */}
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex shrink-0 gap-5 hover:[animation-play-state:paused] animate-marquee-slow py-4">
              {[...certificates, ...certificates].map((cert, idx) => (
                <div
                  key={`${cert.id}-${idx}`}
                  className="w-[320px] shrink-0 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-5 shadow-sm flex flex-col justify-between select-none hover:border-black/30 dark:hover:border-white/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2">
                      <span className="inline-flex items-center gap-1 font-semibold text-neutral-800 dark:text-neutral-200">
                        <CheckCircle2 className="h-3 w-3" />
                        {cert.category}
                      </span>
                      <span>{cert.date}</span>
                    </div>

                    <h3 className="font-display text-sm font-bold text-neutral-900 dark:text-white leading-snug line-clamp-2">
                      {cert.title}
                    </h3>

                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      Issued by {cert.issuer}
                    </p>

                    {cert.credentialId ? (
                      <span className="mt-2 inline-block rounded bg-black/5 dark:bg-white/5 px-2 py-0.5 font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
                        ID: {cert.credentialId}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-neutral-900 dark:text-white hover:underline cursor-pointer"
                      >
                        <span>Verify Credential</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-neutral-400">
                        National Award
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* /07 EXPERIENCE */}
        {/* ============================================================ */}
        <section
          id="experience"
          aria-labelledby="experience-heading"
          onMouseMove={isFine ? handleExpMouseMove : undefined}
          onMouseLeave={() => setHoveredExpIndex(null)}
          className="min-h-[100svh] w-full flex items-center justify-center px-4 md:px-14 py-16 bg-[#F6F7F9] dark:bg-[#0A0A0C]"
        >
          <div className="w-full max-w-6xl rounded-[2.5rem] bg-[#0A0A0C] border border-white/10 p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/[0.03] blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/[0.02] blur-[120px]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-10">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                /07 EXPERIENCE
              </span>
              <span className="font-mono text-xs text-neutral-400 uppercase">
                {(profile.stats[0]?.value || "3+").toUpperCase()} YEARS BUILDING RESILIENT SYSTEMS
              </span>
            </div>

            <div className="max-w-2xl mb-10">
              <h2
                id="experience-heading"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
              >
                Industry track record in engineering &amp; quality assurance.
              </h2>
            </div>

            {/* 3 Experience Rows */}
            <div className="divide-y divide-white/10 border-t border-white/10">
              {experiences.map((exp, index) => {
                const isHovered = hoveredExpIndex === index;
                return (
                  <div
                    key={`${exp.company}-${exp.period}`}
                    onMouseEnter={() => setHoveredExpIndex(index)}
                    className={`py-8 transition-colors duration-200 ${
                      isHovered ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                      <div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                            {exp.company}
                          </h3>
                          <span className="font-mono text-sm text-neutral-300">
                            {exp.role}
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-neutral-400 max-w-2xl leading-relaxed">
                          {exp.summary}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {exp.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-neutral-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-3 text-xs sm:text-sm font-mono text-neutral-400 mt-2 md:mt-0">
                        <span className="text-white font-medium">{exp.period}</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cursor Follower Thumbnail */}
            {isFine && hoveredExpIndex !== null ? (
              <motion.div
                style={{ left: smoothX, top: smoothY }}
                className="pointer-events-none fixed z-50 overflow-hidden rounded-2xl border border-white/20 bg-neutral-900 shadow-2xl p-4 hidden md:block w-64"
              >
                <div className="font-display text-sm font-bold text-white">
                  {experiences[hoveredExpIndex]?.company}
                </div>
                <div className="font-mono text-xs text-neutral-400 mt-1">
                  {experiences[hoveredExpIndex]?.role}
                </div>
                <div className="font-mono text-[10px] text-neutral-500 mt-2">
                  {experiences[hoveredExpIndex]?.location}
                </div>
              </motion.div>
            ) : null}
          </div>
        </section>

        {/* ============================================================ */}
        {/* /08 CONTACT & FOOTER */}
        {/* ============================================================ */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="min-h-[100svh] w-full bg-[#0A0A0C] text-white flex flex-col justify-between px-6 md:px-16 pt-24 md:pt-28 pb-10 border-t border-white/10"
        >
          {/* Top Meta */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              /08 CONTACT &amp; FOOTER
            </span>
            {profile.availableForProjects ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-mono text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
                <span>Available for New Project</span>
              </span>
            ) : null}
          </div>

          {/* Center Call to Action */}
          <div className="my-auto py-12 flex flex-col items-start max-w-5xl">
            <h2
              id="contact-heading"
              className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none my-8 uppercase"
            >
              HAVE A PROJECT IN MIND?
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-3xl leading-relaxed mb-8">
              Let&apos;s engineer something clear, resilient, and impactful together.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-neutral-900 px-7 py-3.5 text-sm font-semibold tracking-tight hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{profile.email}</span>
              </a>

              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] text-white px-7 py-3.5 text-sm font-medium tracking-tight hover:border-white/50 active:scale-95 transition-all shadow-md"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={encodeURI(profile.cvUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] text-white px-7 py-3.5 text-sm font-medium tracking-tight hover:border-white/50 active:scale-95 transition-all shadow-md"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Resume (PDF)</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Colophon & Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-xs text-neutral-400">
            {/* Left */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-corecraft.png"
                alt="Corecraft"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              <span>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</span>
            </div>

            {/* Center: Live Malang Clock */}
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-neutral-500" />
              <span>MALANG, ID: {malangTime || "--:--:--"} WIB</span>
            </div>

            {/* Right: Socials & Back to Top */}
            <div className="flex items-center gap-6">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {social.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("hero")}
                className="inline-flex items-center gap-1 text-white hover:opacity-75 transition-opacity cursor-pointer font-semibold ml-2"
              >
                <span>Back to top</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
