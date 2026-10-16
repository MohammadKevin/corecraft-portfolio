"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  ArrowUp,
  Award,
  Eye,
  X,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import {
  profile,
  projects,
  services,
  experiences,
  certificates,
  stackRow1,
  stackRow2,
  site,
  ui,
} from "@/data";
import { useScrollToSection } from "@/lib/scroll";
import { getIcon } from "@/lib/icons";
import CountUp from "@/components/CountUp";
import StackSection from "@/components/StackSection";
import { SECTION_SPRING } from "@/lib/motion";
import { useMinWidth } from "@/lib/hooks";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  WhatsApp: WhatsappIcon,
};

const EXISTING_WORK_IMAGES: Record<string, string> = {
  "clinic-portal": "/images/work/clinic-portal.png",
  corecraft: "/images/work/corecraft.png",
  outerco: "/images/work/outerco.png",
};

const SECTION_THEMES = {
  hero: {
    "--bg": "#F3F1EC",
    "--fg": "#111111",
    "--muted": "#6E6B63",
    "--accent": "#E4572E",
    "--line": "rgba(17, 17, 17, 0.12)",
  } as React.CSSProperties,
  about: {
    "--bg": "#111111",
    "--fg": "#F3F1EC",
    "--muted": "#9A968C",
    "--accent": "#E4572E",
    "--line": "rgba(243, 241, 236, 0.1)",
  } as React.CSSProperties,
  services: {
    "--bg": "#E8E2D3",
    "--fg": "#111111",
    "--muted": "#5E5A50",
    "--accent": "#E4572E",
    "--line": "rgba(17, 17, 17, 0.14)",
  } as React.CSSProperties,
  stack: {
    "--bg": "#0F1714",
    "--fg": "#F3F1EC",
    "--muted": "#8A9A92",
    "--accent": "#E4572E",
    "--line": "rgba(243, 241, 236, 0.1)",
  } as React.CSSProperties,
  work: {
    "--bg": "#111111",
    "--fg": "#F3F1EC",
    "--muted": "#8F8B82",
    "--accent": "#E4572E",
    "--line": "rgba(243, 241, 236, 0.1)",
  } as React.CSSProperties,
  credentials: {
    "--bg": "#D9D2C1",
    "--fg": "#111111",
    "--muted": "#5E5A50",
    "--accent": "#111111",
    "--line": "rgba(17, 17, 17, 0.14)",
  } as React.CSSProperties,
  experience: {
    "--bg": "#111111",
    "--fg": "#F3F1EC",
    "--muted": "#9A968C",
    "--accent": "#E4572E",
    "--line": "rgba(243, 241, 236, 0.1)",
  } as React.CSSProperties,
  contact: {
    "--bg": "#E4572E",
    "--fg": "#111111",
    "--muted": "#3A1A10",
    "--accent": "#111111",
    "--line": "rgba(17, 17, 17, 0.16)",
  } as React.CSSProperties,
};

function WorkKraftPlaceholder({
  title,
  category,
}: {
  title: string;
  category?: string;
}) {
  return (
    <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#E8E2D3] text-[#111111] p-6 flex flex-col justify-between border border-[#111111]/15 overflow-hidden select-none">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#5E5A50] font-semibold">
          {category ?? ui.placeholders.kraftWorkLabel}
        </span>
        <span className="h-2 w-2 rounded-full bg-[#E4572E]" />
      </div>
      <div className="space-y-1">
        <span className="font-mono text-xs uppercase tracking-wider text-[#5E5A50] block">
          {ui.placeholders.blueprintSpec}
        </span>
        <h4 className="font-display text-lg sm:text-xl font-black tracking-tight text-[#111111] leading-snug line-clamp-2">
          {title}
        </h4>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[#111111]/15 font-mono text-[10px] text-[#5E5A50]">
        <span>{ui.placeholders.blueprintVerified}</span>
        <span>{category}</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const scrollTo = useScrollToSection();
  const prefersReducedMotion = useReducedMotion();

  const [openServiceId, setOpenServiceId] = useState<string>(services[0]?.id ?? "");
  const [previewCert, setPreviewCert] = useState<(typeof certificates)[0] | null>(null);
  const isLg = useMinWidth(1024);
  const pageSize = isLg ? 12 : 9;
  const totalCredPages = Math.max(1, Math.ceil(certificates.length / pageSize));
  const [rawCredPage, setCredPage] = useState<number>(0);
  const credPage = Math.min(rawCredPage, totalCredPages - 1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewCert(null);
    };
    if (previewCert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewCert]);

  const orderedProjects = useMemo(() => {
    return [...projects].sort((a, b) => a.order - b.order);
  }, []);

  const orderedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroSpring = useSpring(heroScroll, SECTION_SPRING);
  const heroScale = useTransform(heroSpring, [0, 1], [1, 0.94]);
  const heroY = useTransform(heroSpring, [0, 1], ["0vh", "-4vh"]);
  const heroOpacity = useTransform(heroSpring, [0, 1], [1, 0.85]);

  const servicesContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesContainerRef,
    offset: ["start end", "start start"],
  });
  const servicesSpring = useSpring(servicesScroll, SECTION_SPRING);
  const servicesLeftColX = useTransform(servicesSpring, [0, 1], ["40px", "0px"]);

  const stackContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: stackScroll } = useScroll({
    target: stackContainerRef,
    offset: ["start end", "end start"],
  });
  const stackSpring = useSpring(stackScroll, SECTION_SPRING);
  const band1ShiftX = useTransform(stackSpring, [0, 1], ["-12vw", "12vw"]);
  const band2ShiftX = useTransform(stackSpring, [0, 1], ["12vw", "-12vw"]);

  const workContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: workScroll } = useScroll({
    target: workContainerRef,
    offset: ["start start", "end end"],
  });

  const [maxScrollX, setMaxScrollX] = useState<number>(0);
  useEffect(() => {
    const calcMaxScroll = () => {
      const cardWidth = 560;
      const gap = 32;
      const totalWidth = orderedProjects.length * (cardWidth + gap);
      const viewportW = window.innerWidth;
      setMaxScrollX(Math.max(0, totalWidth - viewportW + 160));
    };

    calcMaxScroll();
    window.addEventListener("resize", calcMaxScroll);
    return () => window.removeEventListener("resize", calcMaxScroll);
  }, [orderedProjects.length]);

  const workX = useTransform(workScroll, [0, 1], [0, -maxScrollX]);

  const [activeWorkIndex, setActiveWorkIndex] = useState<number>(1);
  useEffect(() => {
    const unsubscribe = workScroll.on("change", (latest) => {
      const idx = Math.min(
        orderedProjects.length,
        Math.floor(latest * orderedProjects.length) + 1,
      );
      setActiveWorkIndex(idx);
    });
    return () => unsubscribe();
  }, [workScroll, orderedProjects.length]);

  const credContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: credScroll } = useScroll({
    target: credContainerRef,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    const unsubscribe = credScroll.on("change", (latest) => {
      const pageIdx = Math.min(
        totalCredPages - 1,
        Math.floor(latest * totalCredPages),
      );
      setCredPage(pageIdx);
    });
    return () => unsubscribe();
  }, [credScroll, totalCredPages]);

  const handlePrevCredPage = () => {
    setCredPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextCredPage = () => {
    setCredPage((prev) => Math.min(totalCredPages - 1, prev + 1));
  };

  const currentCertificates = useMemo(() => {
    return certificates.slice(credPage * pageSize, (credPage + 1) * pageSize);
  }, [credPage, pageSize]);

  const expContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: expScroll } = useScroll({
    target: expContainerRef,
    offset: ["start end", "end end"],
  });
  const expSpring = useSpring(expScroll, SECTION_SPRING);
  const expTimelineScale = useTransform(expSpring, [0.1, 0.9], [0, 1]);

  const [malangTime, setMalangTime] = useState<string>("");
  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: ui.clock.timeZone,
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
      <motion.section
        ref={heroRef}
        id="hero"
        data-spy-wrapper=""
        aria-labelledby="hero-title"
        style={
          !prefersReducedMotion
            ? {
                scale: heroScale,
                y: heroY,
                opacity: heroOpacity,
                ...SECTION_THEMES.hero,
              }
            : SECTION_THEMES.hero
        }
        className="sticky top-0 z-0 w-full min-h-[100svh] md:h-[100svh] flex flex-col justify-between py-10 px-6 md:px-14 overflow-hidden bg-[var(--bg)] text-[var(--fg)] relative"
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(17, 17, 17, 1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(17, 17, 17, 1) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 flex items-center justify-between shrink-0 pt-2 sm:pt-4">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">
            {site.sections.hero.number} {site.sections.hero.label}
          </span>
          <div className="flex items-center gap-2">
            <span className="status-dot" />
            <span className="font-mono text-xs text-[var(--muted)]">
              {profile.availableForProjects
                ? site.sections.contact.availability
                : profile.location}
            </span>
          </div>
        </div>

        <div className="relative z-10 my-auto py-6 sm:py-8">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-black/[0.04] px-3.5 py-1 text-xs font-mono text-[var(--fg)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>{profile.role}</span>
          </div>

          <h1
            id="hero-title"
            className="font-display font-black tracking-tighter text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-[var(--fg)] max-w-5xl"
          >
            {profile.fullName.toUpperCase()}
          </h1>

          <p className="mt-6 font-mono text-sm sm:text-base md:text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
            {profile.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-white px-6 py-3 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 hover:opacity-90 active:scale-95 shadow-sm"
            >
              <span>{ui.buttons.collaborate}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("work");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-black/[0.05] text-[var(--fg)] border border-[var(--line)] hover:bg-black/[0.08] px-6 py-3 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
            >
              <span>{ui.buttons.viewWork}</span>
            </a>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between shrink-0 pt-4 border-t border-[var(--line)] font-mono text-xs text-[var(--muted)]">
          <span>{profile.location}</span>
          <div className="flex items-center gap-6">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--fg)] transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="relative z-10 overflow-x-clip">
        <StackSection
          id="about"
          dataNavTheme="dark"
          theme={SECTION_THEMES.about}
          zIndex={20}
          enter="none"
        >
          <div
            aria-labelledby="about-heading"
            className="w-full h-full min-h-[100svh] text-[var(--fg)] px-6 md:px-14 pt-16 md:pt-20 pb-8 md:pb-12 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 md:mb-8">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">
                {site.sections.about.number} {site.sections.about.label}
              </span>
              <span className="font-mono text-xs text-[var(--muted)] uppercase">
                {site.sections.about.meta}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start my-auto">
              <div className="flex flex-col">
                <h2
                  id="about-heading"
                  className="font-display text-white font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
                >
                  {profile.aboutHeadline}
                </h2>
                <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed mt-4 md:mt-6">
                  {profile.aboutText}
                </p>
              </div>

              <div className="flex flex-col">
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

                <div className="grid grid-cols-2 gap-4">
                  {profile.stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <span className="font-display text-3xl sm:text-4xl font-black text-white block">
                        {stat.value}
                      </span>
                      <span className="mt-1 font-mono text-xs text-[var(--muted)] block">
                        {stat.label}
                      </span>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col justify-center">
                    <span className="font-display text-lg sm:text-xl font-bold text-white block leading-snug">
                      {site.sections.about.focusTitle}
                    </span>
                    <span className="mt-1 font-mono text-xs text-[var(--muted)] block">
                      {site.sections.about.focusSubtitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[var(--muted)]">
              <span>{profile.fullName}</span>
              <span>{profile.architectureNote}</span>
            </div>
          </div>
        </StackSection>

        <StackSection
          id="services"
          dataNavTheme="light"
          theme={SECTION_THEMES.services}
          zIndex={30}
          enter="slideFromRight"
          forwardedRef={servicesContainerRef}
        >
          <div
            aria-labelledby="services-heading"
            className="w-full h-full min-h-[100svh] md:h-[100svh] text-[var(--fg)] px-6 md:px-14 pt-16 md:pt-20 pb-8 flex flex-col justify-between overflow-hidden relative"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(17, 17, 17, 1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(17, 17, 17, 1) 1px, transparent 1px)
                `,
                backgroundSize: "44px 44px",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 my-auto pt-1 pb-2">
              <motion.div
                style={{ x: prefersReducedMotion ? 0 : servicesLeftColX }}
                className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start"
              >
                <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider select-none">
                  <span className="font-bold text-[var(--accent)] tracking-[0.2em]">
                    {site.sections.services.number}
                  </span>
                  <span className="font-semibold tracking-[0.2em] text-[var(--fg)] opacity-90">
                    {site.sections.services.label}
                  </span>
                </div>

                <h2
                  id="services-heading"
                  className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-[1.08] mb-3"
                >
                  {site.sections.services.heading}
                </h2>

                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-md mb-4 sm:mb-6">
                  {site.sections.services.description}
                </p>

                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--line)] bg-white/50 text-[var(--fg)] font-mono text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{services.length} {ui.labels.disciplinesAvailable}</span>
                </div>
              </motion.div>

              <div className="lg:col-span-7 flex flex-col divide-y divide-[var(--line)]">
                {services.map((service, index) => {
                  const isOpen = openServiceId === service.id;

                  return (
                    <div
                      key={service.id}
                      onClick={() => setOpenServiceId(service.id)}
                      className="border-b border-[var(--line)] py-2.5 sm:py-3 group cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <span
                            className={`font-mono text-xs sm:text-sm font-bold shrink-0 transition-colors duration-300 ${
                              isOpen ? "text-[var(--accent)]" : "text-[var(--muted)] group-hover:text-[var(--fg)]"
                            }`}
                          >
                            /{ui.formatNumber(index + 1)}
                          </span>

                          <h3
                            className={`font-display text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight transition-all duration-300 ease-out truncate ${
                              isOpen
                                ? "translate-x-2 text-[var(--fg)]"
                                : "text-[var(--fg)]/80 group-hover:translate-x-2 group-hover:text-[var(--fg)]"
                            }`}
                          >
                            {service.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 font-mono text-xs text-[var(--muted)]">
                          <span className="hidden sm:inline">
                            {service.deliverables.length} {ui.labels.deliverables}
                          </span>
                          <span
                            className={`inline-block font-mono text-base sm:text-lg leading-none select-none transition-transform duration-200 ${
                              isOpen ? "rotate-45 text-[var(--accent)]" : "text-[var(--muted)] group-hover:text-[var(--fg)]"
                            }`}
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="panel"
                            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pb-4 pl-4 sm:pl-6 pr-4 sm:pr-6 my-1.5 rounded-xl bg-white/70 border border-[var(--line)] shadow-xs">
                              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-3 max-w-2xl">
                                {service.description}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                                {service.deliverables.map((item) => (
                                  <div
                                    key={item}
                                    className="flex items-center gap-1.5 text-xs font-mono text-[var(--fg)]"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="flex flex-wrap gap-1 pt-1.5 border-t border-[var(--line)]">
                                {service.stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/[0.08] px-2 py-0.5 font-mono text-[10px] text-[var(--fg)] font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-[var(--line)] flex items-center justify-between font-mono text-xs text-[var(--muted)]">
              <span>{site.sections.services.footerLeft}</span>
              <span>{site.sections.services.footerRight}</span>
            </div>
          </div>
        </StackSection>

        <StackSection
          id="stack"
          dataNavTheme="dark"
          theme={SECTION_THEMES.stack}
          zIndex={40}
          enter="fromBottomStack"
          forwardedRef={stackContainerRef}
        >
          <div
            aria-labelledby="stack-heading"
            className="w-full h-full min-h-[100svh] text-[var(--fg)] flex flex-col justify-between py-16 md:py-20 px-6 md:px-14 overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-2 font-mono text-xs uppercase tracking-wider select-none">
                <span className="font-bold text-[var(--accent)] tracking-[0.2em]">
                  {site.sections.stack.number}
                </span>
                <span className="font-semibold tracking-[0.2em] text-[var(--fg)]">
                  {site.sections.stack.title}
                </span>
                <span className="text-[var(--muted)]">·</span>
                <span className="text-[var(--muted)]">
                  {site.sections.stack.meta}
                </span>
              </div>

              <h2
                id="stack-heading"
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight"
              >
                {site.sections.stack.heading}
              </h2>
            </div>

            <div className="hidden md:flex flex-col justify-center items-center my-auto w-full relative z-10 py-12">
              <motion.div
                style={{
                  rotate: prefersReducedMotion ? 0 : -10,
                  x: prefersReducedMotion ? 0 : band1ShiftX,
                }}
                className="w-[140vw] -mx-[20vw] py-3 will-change-transform"
              >
                <div className="overflow-hidden w-full flex select-none">
                  <div className="flex shrink-0 gap-4 animate-marquee-right">
                    {[...stackRow1, ...stackRow1, ...stackRow1].map((item, idx) => {
                      const IconComponent = getIcon(item.icon);
                      return (
                        <div
                          key={`band1-${item.name}-${idx}`}
                          className="px-6 py-3.5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-3.5 group hover:-translate-y-1 hover:border-[var(--accent)] transition-all duration-200 select-none cursor-default"
                        >
                          <IconComponent className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                          <span className="font-display text-sm font-bold text-[var(--fg)]">
                            {item.name}
                          </span>
                          <span className="font-mono text-[10px] text-[var(--muted)] bg-white/10 px-2 py-0.5 rounded-full group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-200 font-medium">
                            {item.tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{
                  rotate: prefersReducedMotion ? 0 : 10,
                  x: prefersReducedMotion ? 0 : band2ShiftX,
                }}
                className="w-[140vw] -mx-[20vw] py-3 -mt-6 will-change-transform"
              >
                <div className="overflow-hidden w-full flex select-none">
                  <div className="flex shrink-0 gap-4 animate-marquee-left">
                    {[...stackRow2, ...stackRow2, ...stackRow2].map((item, idx) => {
                      const IconComponent = getIcon(item.icon);
                      return (
                        <div
                          key={`band2-${item.name}-${idx}`}
                          className="px-6 py-3.5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-3.5 group hover:-translate-y-1 hover:border-[var(--accent)] transition-all duration-200 select-none cursor-default"
                        >
                          <IconComponent className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                          <span className="font-display text-sm font-bold text-[var(--fg)]">
                            {item.name}
                          </span>
                          <span className="font-mono text-[10px] text-[var(--muted)] bg-white/10 px-2 py-0.5 rounded-full group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-200 font-medium">
                            {item.tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex md:hidden flex-col gap-4 w-full relative z-10 my-auto">
              <div className="overflow-hidden w-full flex">
                <div className="flex shrink-0 gap-3 animate-marquee-right">
                  {[...stackRow1, ...stackRow1].map((item, idx) => {
                    const IconComponent = getIcon(item.icon);
                    return (
                      <div
                        key={`m-row1-${item.name}-${idx}`}
                        className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2.5 select-none"
                      >
                        <IconComponent className="h-3.5 w-3.5 text-[var(--accent)]" />
                        <span className="font-display text-xs font-bold text-[var(--fg)]">
                          {item.name}
                        </span>
                        <span className="font-mono text-[9px] text-[var(--muted)] bg-white/10 px-1.5 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="overflow-hidden w-full flex">
                <div className="flex shrink-0 gap-3 animate-marquee-left">
                  {[...stackRow2, ...stackRow2].map((item, idx) => {
                    const IconComponent = getIcon(item.icon);
                    return (
                      <div
                        key={`m-row2-${item.name}-${idx}`}
                        className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2.5 select-none"
                      >
                        <IconComponent className="h-3.5 w-3.5 text-[var(--accent)]" />
                        <span className="font-display text-xs font-bold text-[var(--fg)]">
                          {item.name}
                        </span>
                        <span className="font-mono text-[9px] text-[var(--muted)] bg-white/10 px-1.5 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[var(--muted)]">
              <span>{stackRow1.length + stackRow2.length} Production Technologies</span>
              <span>Verified Reliability</span>
            </div>
          </div>
        </StackSection>

        <StackSection
          id="work"
          dataNavTheme="dark"
          theme={SECTION_THEMES.work}
          zIndex={50}
          enter="none"
          wrapperClassName="h-auto md:h-[450vh]"
          forwardedRef={workContainerRef}
        >
          <div className="hidden md:flex h-full w-full overflow-hidden flex-col justify-between pt-16 md:pt-20 pb-8 px-6 md:px-14">
            <div className="relative border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
                      {site.sections.work.number}
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--fg)] uppercase">
                      {site.sections.work.label}
                    </span>
                  </div>
                  <h2
                    id="work-heading"
                    className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-[var(--fg)] mt-1"
                  >
                    {site.sections.work.heading}
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-[var(--muted)] border border-white/10 bg-white/5 px-3 py-1.5 rounded-full">
                    <span className="text-[var(--accent)] font-bold">
                      {ui.formatNumber(activeWorkIndex)}
                    </span>
                    <span>/</span>
                    <span>{ui.formatNumber(orderedProjects.length)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative my-auto py-6 overflow-hidden">
              <motion.div
                style={{ x: prefersReducedMotion ? 0 : workX }}
                className="flex items-stretch gap-8 will-change-transform"
              >
                {orderedProjects.map((project, index) => {
                  const hasImage = Boolean(EXISTING_WORK_IMAGES[project.slug]);

                  return (
                    <article
                      key={project.slug}
                      className="group relative flex-none w-[560px] rounded-3xl border border-white/10 bg-[#161616] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-white/20"
                    >
                      <div className="p-8 pb-4">
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                            /{ui.formatNumber(index + 1)} · {project.category}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                            {project.year}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--fg)] mb-3 leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 line-clamp-2">
                          {project.summary}
                        </p>

                        <div className="relative w-full rounded-2xl overflow-hidden mb-6 border border-white/10">
                          {hasImage ? (
                            <div className="relative aspect-[16/10] w-full bg-[#111111]">
                              <Image
                                src={EXISTING_WORK_IMAGES[project.slug]}
                                alt={project.title}
                                fill
                                sizes="560px"
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          ) : (
                            <WorkKraftPlaceholder
                              title={project.title}
                              category={project.category}
                            />
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-[var(--muted)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 pt-4 border-t border-white/10 flex items-center justify-between">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                        >
                          <span>{ui.buttons.caseStudy}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
                          >
                            <span>{ui.buttons.liveDemo}</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            </div>

            <div className="relative z-10 px-16 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[var(--muted)]">
              <span>
                {ui.formatNumber(orderedProjects.length)} {ui.labels.productionSystemsDelivered}
              </span>
              <span>{ui.labels.architectureIntegrity}</span>
            </div>
          </div>

          <div className="flex md:hidden flex-col gap-6 p-6 pt-16">
            <div className="border-b border-white/10 pb-4">
              <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider block">
                {site.sections.work.number} {site.sections.work.label}
              </span>
              <h2 className="font-display text-2xl font-bold text-[var(--fg)] mt-1">
                {site.sections.work.heading}
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {orderedProjects.map((project) => {
                const hasImage = Boolean(EXISTING_WORK_IMAGES[project.slug]);

                return (
                  <article
                    key={`m-${project.slug}`}
                    className="rounded-2xl border border-white/10 bg-[#161616] p-5 flex flex-col"
                  >
                    <div className="relative w-full rounded-xl overflow-hidden mb-4 border border-white/10">
                      {hasImage ? (
                        <div className="relative aspect-[16/10] w-full bg-[#111111]">
                          <Image
                            src={EXISTING_WORK_IMAGES[project.slug]}
                            alt={project.title}
                            fill
                            sizes="100vw"
                            className="object-cover object-top"
                          />
                        </div>
                      ) : (
                        <WorkKraftPlaceholder
                          title={project.title}
                          category={project.category}
                        />
                      )}
                    </div>

                    <h3 className="font-display text-lg font-bold text-[var(--fg)] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--muted)] mb-4 line-clamp-2">
                      {project.summary}
                    </p>

                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)]"
                    >
                      <span>{ui.buttons.caseStudy}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </StackSection>

        <StackSection
          id="credentials"
          dataNavTheme="light"
          theme={SECTION_THEMES.credentials}
          zIndex={60}
          enter="fromBottom"
          forwardedRef={credContainerRef}
        >
          <div
            aria-labelledby="credentials-heading"
            className="w-full h-full min-h-[100svh] text-[var(--fg)] flex flex-col justify-between items-center px-4 md:px-8 lg:px-14 py-6 sm:py-8 lg:py-10 overflow-hidden relative"
          >
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between pb-2 border-b border-[var(--line)] shrink-0 z-10">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
                  {site.sections.credentials.number}
                </span>
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--fg)] uppercase">
                  {site.sections.credentials.label}
                </span>
                <span className="font-mono text-xs text-[var(--muted)]">·</span>
                <span className="font-mono text-xs text-[var(--muted)] uppercase hidden sm:inline">
                  {site.sections.credentials.heading}
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs text-[var(--muted)] uppercase">
                <CountUp
                  to={certificates.length}
                  duration={1.2}
                  className="font-bold text-[var(--accent)]"
                />
                <span>{ui.labels.industryAccreditations}</span>
              </div>
            </div>

            <div className="hidden md:flex flex-1 min-h-0 w-full max-w-7xl mx-auto py-2 overflow-hidden flex-col justify-center z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={credPage}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="grid grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-2 sm:gap-2.5 lg:gap-3 h-full max-h-[74svh]"
                >
                  {currentCertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="rounded-xl border border-[var(--line)] bg-white p-2.5 sm:p-3 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow select-none overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-1.5 text-[9px] font-mono leading-none mb-1">
                        <span className="rounded bg-black/[0.06] px-1.5 py-0.5 font-bold uppercase tracking-wider text-[var(--fg)] truncate">
                          {cert.category}
                        </span>
                        <span className="text-[var(--muted)] shrink-0">
                          {cert.date}
                        </span>
                      </div>

                      <div className="relative aspect-[4/3] w-full max-h-[13svh] rounded-lg overflow-hidden bg-[#E8E2D3]/40 border border-[var(--line)] flex items-center justify-center my-auto">
                        {cert.image ? (
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            sizes="280px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-1 p-2 text-center">
                            <Award className="h-6 w-6 text-[var(--muted)] opacity-60" />
                            <span className="font-mono text-[9px] text-[var(--muted)]">
                              {ui.placeholders.certificatePhoto}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-1">
                        <h3 className="font-display text-xs sm:text-[13px] font-bold tracking-tight text-[var(--fg)] leading-tight line-clamp-2">
                          {cert.title}
                        </h3>
                        <p className="font-mono text-[10px] text-[var(--muted)] truncate mt-0.5">
                          {cert.issuer}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-[var(--line)] text-[10px] font-mono">
                        <button
                          type="button"
                          onClick={() => setPreviewCert(cert)}
                          className="inline-flex items-center gap-1 text-[var(--fg)] hover:text-[var(--accent)] font-semibold transition-colors cursor-pointer"
                        >
                          <Eye className="h-3 w-3" />
                          <span>{ui.buttons.preview}</span>
                        </button>

                        {cert.url ? (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded bg-[var(--accent)] px-2 py-0.5 font-bold text-white shadow-2xs hover:opacity-90 transition-opacity"
                          >
                            <span>{ui.buttons.verify}</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        ) : (
                          <span className="text-[var(--muted)]">{ui.placeholders.official}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex md:hidden flex-col gap-3 w-full py-4 overflow-y-auto z-10">
              {certificates.map((cert) => (
                <div
                  key={`m-${cert.id}`}
                  className="rounded-xl border border-[var(--line)] bg-white p-3 flex flex-col justify-between shadow-xs select-none"
                >
                  <div className="flex items-center justify-between gap-1.5 text-[9px] font-mono leading-none mb-1.5">
                    <span className="rounded bg-black/[0.06] px-1.5 py-0.5 font-bold uppercase tracking-wider text-[var(--fg)]">
                      {cert.category}
                    </span>
                    <span className="text-[var(--muted)]">{cert.date}</span>
                  </div>

                  <h3 className="font-display text-xs font-bold tracking-tight text-[var(--fg)] leading-tight mb-1">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-[10px] text-[var(--muted)] truncate mb-2">
                    {cert.issuer}
                  </p>

                  <div className="flex items-center justify-between pt-1.5 border-t border-[var(--line)] text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setPreviewCert(cert)}
                      className="inline-flex items-center gap-1 text-[var(--fg)] font-semibold cursor-pointer"
                    >
                      <Eye className="h-3 w-3" />
                      <span>{ui.buttons.preview}</span>
                    </button>

                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-[var(--accent)] px-2 py-0.5 font-bold text-white"
                      >
                        <span>{ui.buttons.verify}</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    ) : (
                      <span className="text-[var(--muted)]">{ui.placeholders.official}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full max-w-7xl mx-auto hidden md:flex items-center justify-between pt-2 border-t border-[var(--line)] shrink-0 z-10">
              <button
                type="button"
                onClick={handlePrevCredPage}
                disabled={credPage === 0}
                aria-label={ui.buttons.prev}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-white text-[var(--fg)] text-xs font-mono font-medium hover:bg-black/5 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{ui.buttons.prev}</span>
              </button>

              <div className="font-mono text-xs font-bold tracking-widest text-[var(--fg)]">
                {ui.formatCounter(credPage + 1, totalCredPages)}
              </div>

              <button
                type="button"
                onClick={handleNextCredPage}
                disabled={credPage === totalCredPages - 1}
                aria-label={ui.buttons.next}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-white text-[var(--fg)] text-xs font-mono font-medium hover:bg-black/5 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
              >
                <span>{ui.buttons.next}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </StackSection>

        <StackSection
          id="experience"
          dataNavTheme="dark"
          theme={SECTION_THEMES.experience}
          zIndex={70}
          enter="fromBottom"
          forwardedRef={expContainerRef}
        >
          <div
            aria-labelledby="experience-heading"
            className="w-full h-full min-h-[100svh] text-[var(--fg)] flex flex-col justify-between py-16 md:py-20 px-6 md:px-14 overflow-hidden relative"
          >
            <div className="relative z-10 max-w-3xl mb-8">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider select-none">
                <span className="font-bold text-[var(--accent)] tracking-[0.2em]">
                  {site.sections.experience.number}
                </span>
                <span className="font-semibold tracking-[0.2em] text-[var(--fg)]">
                  {site.sections.experience.label}
                </span>
                <span className="text-[var(--muted)]">·</span>
                <span className="text-[var(--muted)]">
                  {site.sections.experience.meta}
                </span>
              </div>

              <h2
                id="experience-heading"
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight"
              >
                {site.sections.experience.heading}
              </h2>
            </div>

            <div className="relative w-full max-w-5xl mx-auto my-auto py-6 z-10">
              <div className="absolute top-0 bottom-0 left-4 lg:left-1/2 w-[1px] bg-white/10 -translate-x-1/2">
                <motion.div
                  style={{ scaleY: prefersReducedMotion ? 1 : expTimelineScale }}
                  className="w-full h-full bg-[var(--accent)] origin-top will-change-transform"
                />
              </div>

              <div className="flex flex-col gap-10 sm:gap-12 relative">
                {orderedExperiences.map((exp, idx) => {
                  const isEven = idx % 2 === 0;

                  return (
                    <motion.div
                      key={exp.company}
                      initial={prefersReducedMotion ? false : { opacity: 0.3, y: 24 }}
                      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="relative flex flex-col lg:flex-row items-start gap-4 lg:gap-8"
                    >
                      <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-1.5 h-3.5 w-3.5 rounded-full bg-[var(--accent)] ring-4 ring-[#111111] z-20" />

                      <div
                        className={`w-full lg:w-1/2 pl-10 lg:pl-0 ${
                          isEven ? "lg:pr-12 lg:text-right" : "lg:order-2 lg:pl-12 lg:text-left"
                        }`}
                      >
                        <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-wider uppercase block">
                          {exp.period}
                        </span>
                        <span className="font-mono text-xs text-[var(--muted)] block mt-0.5">
                          {exp.location}
                        </span>
                      </div>

                      <div
                        className={`w-full lg:w-1/2 pl-10 lg:pl-0 ${
                          isEven ? "lg:order-2 lg:pl-12" : "lg:pr-12"
                        }`}
                      >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 shadow-sm">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--fg)]">
                              {exp.company}
                            </h3>
                            <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                              #{exp.order}
                            </span>
                          </div>

                          <div className="font-mono text-xs text-[var(--fg)] opacity-90 mb-3 font-medium">
                            {exp.role}
                          </div>

                          <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-4">
                            {exp.summary}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                            {exp.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-[var(--muted)]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[var(--muted)]">
              <span>{site.experienceLabel}</span>
              <span>{profile.fullName}</span>
            </div>
          </div>
        </StackSection>

        <StackSection
          id="contact"
          dataNavTheme="light"
          theme={SECTION_THEMES.contact}
          zIndex={80}
          enter="fromBottomContact"
          last={true}
        >
          <div
            aria-labelledby="contact-heading"
            className="w-full h-full min-h-[100svh] text-[var(--fg)] flex flex-col justify-between py-12 md:py-16 px-6 md:px-14 overflow-hidden relative"
          >
            <div className="relative z-10 flex items-center justify-between border-b border-[var(--line)] pb-4">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--fg)] uppercase">
                {site.sections.contact.number} {site.sections.contact.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span className="font-mono text-xs text-[var(--muted)]">
                  {site.sections.contact.availability}
                </span>
              </div>
            </div>

            <div className="relative z-10 max-w-4xl my-auto py-6">
              <motion.h2
                id="contact-heading"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-[var(--fg)] mb-4"
              >
                {site.sections.contact.heading}
              </motion.h2>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="font-mono text-sm sm:text-base md:text-lg text-[var(--muted)] max-w-2xl leading-relaxed mb-8"
              >
                {site.sections.contact.subheading}
              </motion.p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#111111] text-white px-6 py-3 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 hover:bg-neutral-800 active:scale-95 shadow-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/40 hover:bg-white/60 text-[var(--fg)] px-5 py-3 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 active:scale-95 shadow-xs"
                >
                  <WhatsappIcon className="h-4 w-4" />
                  <span>{ui.buttons.whatsapp}</span>
                </a>

                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/40 hover:bg-white/60 text-[var(--fg)] px-5 py-3 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 active:scale-95 shadow-xs"
                >
                  <FileText className="h-4 w-4" />
                  <span>{ui.buttons.resume}</span>
                </a>
              </div>
            </div>

            <div className="relative z-10 w-full select-none pointer-events-none overflow-hidden my-auto py-2">
              <div className="font-display text-[15vw] font-black uppercase text-center leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(17,17,17,0.3)]">
                {site.footer.wordmark}
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-[var(--line)] flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--muted)]">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {site.navigation.map((nav) => (
                    <a
                      key={nav.id}
                      href={`#${nav.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(nav.id);
                      }}
                      className="text-[var(--fg)] hover:underline cursor-pointer"
                    >
                      {nav.label}
                    </a>
                  ))}
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/40 px-3.5 py-1.5 font-mono text-xs text-[var(--fg)]">
                  <Clock className="h-3.5 w-3.5 text-[var(--muted)]" />
                  <span>{ui.clock.label}</span>
                  <span className="font-semibold">{malangTime || ui.clock.loading}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[var(--muted)]">
                <div className="flex items-center gap-3">
                  <Image
                    src={site.logo}
                    alt={site.footer.brandName}
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                  <span>
                    © {site.footer.copyrightYear} {profile.fullName}. {site.footer.builtWith}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <ul className="flex items-center gap-2">
                    {profile.socials.map((social) => {
                      const Icon = socialIcons[social.label];
                      if (!Icon) return null;
                      return (
                        <li key={social.label}>
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${social.label} profile`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-white/40 text-[var(--fg)] transition-all duration-200 hover:bg-[#111111] hover:text-white"
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <button
                    type="button"
                    onClick={() => scrollTo("hero")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white/40 px-3.5 py-1.5 font-mono text-xs font-medium text-[var(--fg)] transition-all duration-200 hover:bg-[#111111] hover:text-white cursor-pointer"
                  >
                    <span>{ui.buttons.backToTop}</span>
                    <ArrowUp className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </StackSection>
      </div>

      <AnimatePresence>
        {previewCert && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${ui.buttons.preview} ${previewCert.title}`}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewCert(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[92vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#111111]/10 bg-[#F3F1EC]">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#E4572E]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                    {ui.placeholders.certificateDocumentPreview}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="rounded-full p-1.5 text-neutral-500 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                  aria-label={ui.buttons.closePreviewAria}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto">
                <div className="relative rounded-2xl border-4 border-double border-[#111111]/20 bg-[#FAF9F5] p-6 sm:p-10 text-center overflow-hidden">
                  <Award className="h-60 w-60 text-[#111111]/[0.04] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[#111111] font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                    <BadgeCheck className="h-3.5 w-3.5 text-[#E4572E]" />
                    <span>{ui.placeholders.verifiedIndustryCredential}</span>
                  </div>

                  <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-1">
                    {ui.placeholders.presentedTo}
                  </p>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight mb-2">
                    {profile.fullName}
                  </h3>

                  <div className="w-24 h-0.5 bg-neutral-300 mx-auto mb-4" />

                  <p className="font-mono text-xs text-neutral-500 max-w-md mx-auto mb-3">
                    {ui.placeholders.proficiencyIntro}
                  </p>

                  <h4 className="font-display text-lg sm:text-xl font-bold text-[#111111] mb-6 px-4">
                    {previewCert.title}
                  </h4>

                  {previewCert.skills && previewCert.skills.length > 0 && (
                    <div className="mb-6">
                      <span className="font-mono text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
                        {ui.placeholders.assessedCompetencies}
                      </span>
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        {previewCert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-md bg-white border border-[#111111]/10 font-mono text-xs font-medium text-[#111111]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#111111]/10 text-left">
                    <div>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase block">
                        {ui.placeholders.issuingAuthority}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#111111]">
                        {previewCert.issuer}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase block">
                        {ui.placeholders.issueDate}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#111111]">
                        {previewCert.date}
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase block">
                        {ui.placeholders.credentialId}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#111111] break-all">
                        {previewCert.credentialId || ui.placeholders.verifiedAuthority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-[#F3F1EC] border-t border-[#111111]/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-neutral-600 hover:text-black transition-colors cursor-pointer"
                >
                  {ui.buttons.close}
                </button>

                {previewCert.url ? (
                  <a
                    href={previewCert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-neutral-800 text-white font-mono text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>{ui.buttons.verifyAt} {previewCert.issuer}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="font-mono text-xs text-neutral-500">
                    {ui.placeholders.officialNationalArchive}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
