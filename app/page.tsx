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
  useVelocity,
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
  Award,
  Eye,
  X,
  BadgeCheck,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import { profile, bio } from "@/data/profile";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { experiences } from "@/data/experience";
import { certificates, certificateCount } from "@/data/certificates";
import { stackRow1, stackRow2 } from "@/data/skills";
import { useScrollToSection } from "@/lib/scroll";
import { useFinePointer } from "@/lib/hooks";
import { spring } from "@/lib/motion";
import RevealWords from "@/components/RevealWords";
import SectionHeader from "@/components/SectionHeader";
import CountUp from "@/components/CountUp";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  WhatsApp: WhatsappIcon,
};

const SECTION_THEMES = {
  services: {
    "--bg": "#0A1020",
    "--fg": "#EAF0FF",
    "--muted": "#8FA0C4",
    "--accent": "#5B8CFF",
  } as React.CSSProperties,
  stack: {
    "--bg": "#F2EEE6",
    "--fg": "#1B1A17",
    "--muted": "#7A7467",
    "--accent": "#E8571F",
  } as React.CSSProperties,
  work: {
    "--bg": "#08110D",
    "--fg": "#EDF5EF",
    "--muted": "#8AA394",
    "--accent": "#C6FF3D",
  } as React.CSSProperties,
  credentials: {
    "--bg": "#E8EAF6",
    "--fg": "#14162B",
    "--muted": "#6A6E93",
    "--accent": "#5A4BFF",
  } as React.CSSProperties,
  experience: {
    "--bg": "#170F0C",
    "--fg": "#F7EDE6",
    "--muted": "#B09A8E",
    "--accent": "#FFB347",
  } as React.CSSProperties,
  contact: {
    "--bg": "#D9FF3F",
    "--fg": "#0B0C0E",
    "--muted": "#3C4012",
    "--accent": "#0B0C0E",
  } as React.CSSProperties,
};

const PROJECT_ORDER = [
  "worknest",
  "outerco",
  "invdocs",
  "corepos",
  "inventory-api",
  "clinic-portal",
  "corecraft",
];

function CredentialCard({
  cert,
  isFine,
  prefersReducedMotion,
  onOpenPreview,
}: {
  cert: (typeof certificates)[0];
  isFine: boolean;
  prefersReducedMotion: boolean | null;
  onOpenPreview: (cert: (typeof certificates)[0]) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [radialPos, setRadialPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFine || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;

    setRotateX(rX);
    setRotateY(rY);
    setRadialPos({ x, y });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
            }
      }
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="relative w-[340px] sm:w-[360px] shrink-0 rounded-2xl border border-[#14162B]/10 bg-white p-4 shadow-xs flex flex-col justify-between select-none hover:border-[var(--accent)] hover:shadow-xl transition-all duration-300 will-change-transform overflow-hidden group"
    >
      {/* Radial highlight sheen following cursor */}
      {isHovered && isFine && !prefersReducedMotion ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${radialPos.x}px ${radialPos.y}px, rgba(90, 75, 255, 0.12), transparent 80%)`,
          }}
        />
      ) : null}

      <div className="relative z-10 flex flex-col gap-3">
        {/* Card Header: Category & Date */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent)]">
            <BadgeCheck className="h-3.5 w-3.5 shrink-0" />
            <span>{cert.category}</span>
          </span>
          <span>{cert.date}</span>
        </div>

        {/* Certificate Miniature Canvas Preview */}
        <div
          onClick={() => onOpenPreview(cert)}
          className="relative w-full aspect-[16/10] rounded-xl border border-[#5A4BFF]/20 bg-gradient-to-br from-[#FAF9FE] via-white to-[#F0EDFF] p-3.5 flex flex-col justify-between overflow-hidden cursor-pointer shadow-[inset_0_1px_4px_rgba(0,0,0,0.03)] group/preview"
        >
          {/* Inner hairline frame */}
          <div className="absolute inset-1.5 rounded-lg border border-[#5A4BFF]/20 pointer-events-none" />

          {/* Guilloche Corner Accents */}
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#5A4BFF]/60 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#5A4BFF]/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#5A4BFF]/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#5A4BFF]/60 pointer-events-none" />

          {/* Watermark Seal */}
          <Award className="h-24 w-24 text-[#5A4BFF]/[0.08] absolute -right-3 -bottom-3 pointer-events-none" />

          {/* Canvas Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
                CERTIFIED CREDENTIAL
              </span>
              <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-[#5A4BFF]/10 text-[#5A4BFF] font-semibold">
                {cert.issuer}
              </span>
            </div>
            <span className="font-mono text-[9px] text-[var(--muted)] uppercase tracking-wider block">
              Awarded to: {profile.fullName}
            </span>
          </div>

          <div className="relative z-10 py-1">
            <h4 className="font-display text-[13px] font-bold text-[#14162B] line-clamp-2 leading-tight">
              {cert.title}
            </h4>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-[var(--muted)] pt-1 border-t border-[#5A4BFF]/15">
            <span className="font-medium text-[#14162B]/75">Verified Credential</span>
            {cert.credentialId ? (
              <span className="font-bold text-[var(--accent)]">
                ID: {cert.credentialId}
              </span>
            ) : (
              <span className="font-bold text-[#14162B]/60">Official</span>
            )}
          </div>

          {/* Hover Overlay Button */}
          <div className="absolute inset-0 bg-[#14162B]/50 backdrop-blur-[1px] opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#14162B] text-xs font-semibold shadow-md transform translate-y-2 group-hover/preview:translate-y-0 transition-transform duration-200">
              <Eye className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>Lihat Preview</span>
            </span>
          </div>
        </div>

        {/* Skills Pills */}
        {cert.skills && cert.skills.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1 pt-1">
            {cert.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-[#14162B]/5 font-mono text-[10px] text-[#14162B]/80 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Card Action Row */}
      <div className="relative z-10 mt-3 pt-3 border-t border-[#14162B]/10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenPreview(cert)}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#14162B] hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>Preview</span>
        </button>

        {cert.url ? (
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            <span>Verify</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        ) : (
          <span className="font-mono text-xs text-[var(--muted)]">
            National Award
          </span>
        )}
      </div>
    </motion.div>
  );
}

function SecondaryButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-black/30 px-7 py-3.5 text-sm font-semibold tracking-tight overflow-hidden transition-colors duration-300 select-none shadow-xs"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[#0B0C0E] scale-y-0 origin-bottom transition-transform duration-300 ease-out group-hover:scale-y-100 will-change-transform"
      />
      <span className="relative z-10 flex items-center gap-2 text-[#0B0C0E] group-hover:text-white transition-colors duration-300">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}

function MagneticEmailButton({
  email,
  isFine,
  prefersReducedMotion,
}: {
  email: string;
  isFine: boolean;
  prefersReducedMotion: boolean | null;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 350, damping: 25, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 350, damping: 25, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isFine || prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    if (dist < 80) {
      rawX.set((e.clientX - centerX) * 0.35);
      rawY.set((e.clientY - centerY) * 0.35);
    }
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={prefersReducedMotion ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      href={`mailto:${email}`}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B0C0E] text-[#D9FF3F] px-8 py-4 text-sm font-bold tracking-tight hover:brightness-125 active:scale-95 transition-all shadow-lg select-none will-change-transform"
    >
      <Mail className="h-4 w-4" aria-hidden="true" />
      <span>{email}</span>
    </motion.a>
  );
}

export default function HomePage() {
  const scrollTo = useScrollToSection();
  const prefersReducedMotion = useReducedMotion();
  const isFine = useFinePointer();

  // /03 Services Accordion State
  const [openServiceId, setOpenServiceId] = useState<string>(services[0]?.id ?? "");

  // /06 Certificate Preview Modal State
  const [previewCert, setPreviewCert] = useState<(typeof certificates)[0] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewCert(null);
    };
    if (previewCert) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [previewCert]);

  // /04 Stack Velocity Skew & Parallax Decor
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stackScroll } = useScroll({
    target: stackContainerRef,
    offset: ["start end", "end start"],
  });
  const stackVelocity = useVelocity(stackScroll);
  const smoothStackVelocity = useSpring(stackVelocity, { damping: 40, stiffness: 300 });
  const stackSkew = useTransform(smoothStackVelocity, [-0.5, 0.5], [-5, 5]);
  const stackDecorY = useTransform(stackScroll, [0, 1], [-40, 40]);

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

  // /05 Work Active Project Counter (Calculated from workScroll)
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

  // /07 Experience Cursor Follower & Vertical Timeline
  const expContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: expTimelineScroll } = useScroll({
    target: expContainerRef,
    offset: ["start 70%", "end 80%"],
  });
  const expLineScale = useSpring(expTimelineScroll, { stiffness: 350, damping: 30 });

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
      <div className="relative z-10">
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
        {/* /03 SERVICES & CAPABILITIES — Midnight Blueprint */}
        {/* ============================================================ */}
        <section
          id="services"
          data-nav-theme="dark"
          aria-labelledby="services-heading"
          style={SECTION_THEMES.services}
          className="relative z-10 w-full min-h-[100svh] bg-[var(--bg)] text-[var(--fg)] px-6 md:px-16 pt-24 md:pt-28 pb-12 flex flex-col justify-between rounded-t-[2.5rem] -mt-10 shadow-[0_-24px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Blueprint grid with entrance fade + scale 1.08 -> 1 */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0.25 } : { opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 0.35, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-0 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] will-change-transform"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(91, 140, 255, 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(91, 140, 255, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: "44px 44px",
            }}
          />

          {/* 4 Corner Crosshairs */}
          <div className="absolute top-6 left-6 font-mono text-xs text-[var(--accent)]/40 pointer-events-none select-none">+</div>
          <div className="absolute top-6 right-6 font-mono text-xs text-[var(--accent)]/40 pointer-events-none select-none">+</div>
          <div className="absolute bottom-6 left-6 font-mono text-xs text-[var(--accent)]/40 pointer-events-none select-none">+</div>
          <div className="absolute bottom-6 right-6 font-mono text-xs text-[var(--accent)]/40 pointer-events-none select-none">+</div>

          {/* Header */}
          <SectionHeader
            number="/03"
            title="SERVICES & CAPABILITIES"
            meta={`${String(services.length).padStart(2, "0")} CORE DELIVERABLES · INTERACTIVE FOLIO`}
          />

          <div className="relative z-10 mb-6">
            <RevealWords
              id="services-heading"
              text="Production capabilities delivered end-to-end."
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--fg)] max-w-4xl"
            />
          </div>

          {/* Desktop Interactive Folio Columns ("Kotak Panjang Buku Kliping") */}
          <div className="relative z-10 hidden lg:flex gap-3.5 h-[500px] xl:h-[530px] my-auto items-stretch w-full [perspective:1200px]">
            {services.map((service, index) => {
              const isOpen = (openServiceId || services[0]?.id) === service.id;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 60, rotateX: 12 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 30,
                    delay: index * 0.08,
                  }}
                  onMouseEnter={() => setOpenServiceId(service.id)}
                  onClick={() => setOpenServiceId(service.id)}
                  className={`relative rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between p-6 select-none will-change-transform ${
                    isOpen
                      ? "flex-[3.5] bg-[#0E172E] border-[var(--accent)]/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-[var(--accent)]/20"
                      : "flex-1 bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06] opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Active Top Accent Line */}
                  {isOpen ? (
                    <motion.div
                      initial={prefersReducedMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left"
                    />
                  ) : null}

                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between pb-3 shrink-0 border-b border-white/10">
                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isOpen ? "text-[var(--accent)]" : "text-[var(--muted)]"
                      }`}
                    >
                      /{String(index + 1).padStart(2, "0")}
                    </span>
                    {isOpen ? (
                      <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider">
                        SPEC · {service.id}
                      </span>
                    ) : null}
                  </div>

                  {/* Body: Collapsed vs Expanded */}
                  {isOpen ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="my-auto flex flex-col justify-between py-2 overflow-hidden"
                    >
                      <div>
                        <h3 className="font-display text-2xl xl:text-3xl font-extrabold text-[var(--fg)] tracking-tight leading-snug mb-3">
                          {service.title}
                        </h3>

                        <p className="text-xs xl:text-sm text-[var(--muted)] leading-relaxed max-w-xl mb-5">
                          {service.description}
                        </p>

                        {/* Deliverables Checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                          {service.deliverables.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 text-xs font-mono text-[var(--fg)]"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Chips with stagger */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {service.stack.map((tech, techIdx) => (
                          <motion.span
                            key={tech}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + techIdx * 0.03, duration: 0.3 }}
                            className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs text-[var(--fg)]"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    /* Collapsed Vertical Title */
                    <div className="my-auto flex flex-col items-center justify-center py-6 h-full">
                      <span
                        style={{ writingMode: "vertical-rl" }}
                        className="font-display text-base xl:text-lg font-bold text-[var(--muted)] hover:text-[var(--fg)] tracking-tight transform rotate-180 uppercase transition-colors"
                      >
                        {service.title}
                      </span>
                    </div>
                  )}

                  {/* Bottom Bar inside Card */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[var(--muted)] shrink-0">
                    <span>{service.deliverables.length} Deliverables</span>
                    {isOpen ? (
                      <span className="text-[var(--accent)] flex items-center gap-1 font-semibold">
                        <span>Active Spec</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="opacity-60 text-lg leading-none">+</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile / Tablet Accordion Cards */}
          <div className="relative z-10 flex lg:hidden flex-col gap-3 my-4">
            {services.map((service, index) => {
              const isOpen = (openServiceId || services[0]?.id) === service.id;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-2xl border p-4 flex flex-col gap-2 transition-all duration-300 ${
                    isOpen
                      ? "bg-[#0E172E] border-[var(--accent)]/40 shadow-lg"
                      : "bg-white/[0.03] border-white/10"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenServiceId(service.id)}
                    className="w-full flex items-center justify-between text-left font-display text-lg font-bold text-[var(--fg)] cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs ${isOpen ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}>
                        /{String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{service.title}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown
                        className={`h-4 w-4 ${isOpen ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-2"
                      >
                        <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">
                          {service.description}
                        </p>
                        <div className="grid grid-cols-1 gap-1.5 mb-3">
                          {service.deliverables.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 text-xs font-mono text-[var(--fg)]"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {service.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-0.5 font-mono text-[10px] text-[var(--fg)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[var(--muted)]">
            <span>Modular Services</span>
            <span>Available for Full-cycle Engagement</span>
          </div>
        </section>

        {/* ============================================================ */}
        {/* /04 TECHNICAL ARCHITECTURE — Warm Paper */}
        {/* ============================================================ */}
        <section
          id="stack"
          ref={stackContainerRef}
          data-nav-theme="light"
          aria-labelledby="stack-heading"
          style={SECTION_THEMES.stack}
          className="relative z-20 w-full min-h-[100svh] md:h-[100svh] bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-center items-center text-center px-4 overflow-hidden rounded-t-[2.5rem] -mt-10 shadow-[0_-24px_50px_rgba(0,0,0,0.12)]"
        >
          {/* Parallax Giant Outline "STACK" */}
          <motion.div
            style={{ y: prefersReducedMotion ? 0 : stackDecorY }}
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 font-display text-[20vw] font-black uppercase text-transparent select-none opacity-[0.05] tracking-tighter leading-none"
            aria-hidden="true"
          >
            <span style={{ WebkitTextStroke: "2px #1B1A17" }}>STACK</span>
          </motion.div>

          <div className="max-w-3xl mb-12 relative z-10">
            <SectionHeader
              number="/04"
              title="TECHNICAL ARCHITECTURE"
              meta="CONTINUOUS CROSSING MARQUEE"
              className="justify-center border-b-0 mb-4 pb-0"
            />

            {/* Clip-path reveal (kiri -> kanan) */}
            <motion.h2
              id="stack-heading"
              initial={prefersReducedMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight will-change-[clip-path]"
            >
              A battle-tested stack built for reliability and scale.
            </motion.h2>
          </div>

          {/* Marquee Rows Container with Velocity Skew */}
          <div className="w-full flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative z-10">
            {/* Row 1: Moving RIGHT */}
            <div className="group overflow-hidden w-full flex">
              <div className="flex shrink-0 gap-4 group-hover:[animation-play-state:paused] animate-marquee-right">
                {[...stackRow1, ...stackRow1].map((item, idx) => (
                  <motion.div
                    key={`row1-${item.name}-${idx}`}
                    style={{ skewX: prefersReducedMotion ? 0 : stackSkew }}
                    className="px-6 py-3.5 rounded-2xl bg-white border border-[#1B1A17]/10 shadow-xs flex items-center gap-3.5 group hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 select-none cursor-default will-change-transform"
                  >
                    <Terminal className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                    <span className="font-display text-sm font-bold text-[var(--fg)]">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--muted)] bg-[#1B1A17]/5 px-2 py-0.5 rounded-full group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-200 font-medium">
                      {item.tag}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Row 2: Moving LEFT */}
            <div className="group overflow-hidden w-full flex">
              <div className="flex shrink-0 gap-4 group-hover:[animation-play-state:paused] animate-marquee-left">
                {[...stackRow2, ...stackRow2].map((item, idx) => (
                  <motion.div
                    key={`row2-${item.name}-${idx}`}
                    style={{ skewX: prefersReducedMotion ? 0 : stackSkew }}
                    className="px-6 py-3.5 rounded-2xl bg-white border border-[#1B1A17]/10 shadow-xs flex items-center gap-3.5 group hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 select-none cursor-default will-change-transform"
                  >
                    <Server className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                    <span className="font-display text-sm font-bold text-[var(--fg)]">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--muted)] bg-[#1B1A17]/5 px-2 py-0.5 rounded-full group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-200 font-medium">
                      {item.tag}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* /05 SELECTED WORK — Forest Noir */}
        {/* ============================================================ */}
        <section
          id="work"
          data-nav-theme="dark"
          aria-labelledby="work-heading"
          ref={workContainerRef}
          style={SECTION_THEMES.work}
          className="relative z-30 bg-[var(--bg)] text-[var(--fg)] md:h-[450vh] rounded-t-[2.5rem] -mt-10 shadow-[0_-24px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Desktop Pinned Showcase (md: and above) */}
          <div className="hidden md:flex sticky top-0 h-[100svh] w-full overflow-hidden flex-col justify-between pt-24 md:pt-28 pb-10 px-6 md:px-16">
            {/* Header with Counter & Progress Bar */}
            <div className="relative border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
                      /05
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--fg)] uppercase">
                      SELECTED WORK
                    </span>
                  </div>
                  <h2
                    id="work-heading"
                    className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-[var(--fg)] mt-1"
                  >
                    Production systems in live deployment.
                  </h2>
                </div>

                {/* Animated Project Counter (e.g. 01 / 07) */}
                <div className="flex items-center gap-3 font-mono text-sm text-[var(--muted)]">
                  <div className="h-6 overflow-hidden relative w-6 text-right font-bold text-[var(--accent)]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeWorkIndex}
                        initial={prefersReducedMotion ? false : { y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={prefersReducedMotion ? undefined : { y: -16, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                      >
                        {String(activeWorkIndex).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-[var(--muted)]">/</span>
                  <span>{String(orderedProjects.length).padStart(2, "0")}</span>
                </div>
              </div>

              {/* Progress Bar (scaleX from workScroll) */}
              <motion.div
                style={{ scaleX: prefersReducedMotion ? 1 : workScroll }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left z-20"
              />
            </div>

            {/* Sliding Track */}
            <div className="relative my-auto overflow-hidden py-4">
              <motion.div
                ref={workTrackRef}
                style={{ x: prefersReducedMotion ? 0 : workX }}
                className="flex gap-8 lg:gap-12 items-stretch will-change-transform"
              >
                {orderedProjects.map((project, index) => {
                  const isCurrent = activeWorkIndex === index + 1;

                  return (
                    <motion.article
                      key={project.slug}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : {
                              scale: isCurrent ? 1 : 0.94,
                              opacity: isCurrent ? 1 : 0.55,
                            }
                      }
                      transition={{ duration: 0.35 }}
                      className="w-[80vw] max-w-[680px] shrink-0 rounded-3xl border border-white/10 bg-[#0E1A14] p-6 lg:p-8 shadow-2xl hover:border-[var(--accent)]/40 transition-all duration-300 flex flex-col justify-between group will-change-transform"
                    >
                      <div>
                        {/* Browser Mockup Frame with Parallax Image */}
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-sm mb-6">
                          <div className="flex h-8 w-full items-center justify-between border-b border-white/10 bg-[#08110D]/90 px-3 backdrop-blur-xs relative z-10">
                            <div className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-white/30" />
                              <span className="h-2 w-2 rounded-full bg-white/20" />
                              <span className="h-2 w-2 rounded-full bg-white/10" />
                            </div>
                            <div className="flex items-center gap-1 rounded bg-black/50 px-2.5 py-0.5 text-[10px] font-mono text-[var(--muted)] shadow-2xs">
                              <Lock className="h-2.5 w-2.5 opacity-70" />
                              <span className="truncate max-w-[180px]">
                                corecraft.my.id/work/{project.slug}
                              </span>
                            </div>
                            <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 font-mono text-[9px] font-bold text-black uppercase tracking-wider">
                              {project.badge || project.category}
                            </span>
                          </div>

                          {/* Image reveal with clip-path + parallax */}
                          <motion.div
                            initial={prefersReducedMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
                            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                            className="relative h-[calc(100%-2rem)] w-full overflow-hidden bg-black/40"
                          >
                            <Image
                              alt={project.title}
                              src={`/images/work/${project.slug}.png`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              priority={index < 2}
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </motion.div>
                        </div>

                        <div className="flex items-center gap-2 mb-2 font-mono text-xs font-medium text-[var(--muted)] uppercase">
                          <span>{project.category}</span>
                          <span>·</span>
                          <span>{project.year}</span>
                        </div>

                        <h3 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-[var(--fg)] uppercase group-hover:text-[var(--accent)] transition-colors">
                          {project.shortTitle || project.title}
                        </h3>

                        <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
                          {project.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-[var(--muted)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold bg-[var(--accent)] text-black px-4 py-1.5 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-sm"
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
                              className="text-[var(--muted)] hover:text-[var(--accent)] flex items-center gap-1 transition-colors"
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
                              className="text-[var(--muted)] hover:text-[var(--accent)] flex items-center gap-1 transition-colors"
                            >
                              <span>Code</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </div>

            {/* Bottom Meta */}
            <div className="flex items-center justify-between font-mono text-xs text-[var(--muted)] pt-4 border-t border-white/10">
              <span>07 Production Systems Delivered</span>
              <span>100% Architecture Integrity</span>
            </div>
          </div>

          {/* Mobile Vertical List Fallback (< 768px or Reduced Motion) */}
          <div className="md:hidden px-6 py-16 flex flex-col gap-10">
            <div className="border-b border-white/10 pb-4">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--accent)] uppercase block">
                /05 SELECTED WORK
              </span>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-[var(--fg)] mt-1">
                Production systems in live deployment.
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {orderedProjects.map((project, index) => (
                <motion.article
                  key={`mobile-${project.slug}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-[#0E1A14] p-5 shadow-lg flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black/40 mb-4">
                    <Image
                      alt={project.title}
                      src={`/images/work/${project.slug}.png`}
                      fill
                      sizes="100vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <span className="font-mono text-xs text-[var(--accent)] uppercase">
                    {project.category} · {project.year}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[var(--fg)] mt-1">
                    {project.shortTitle || project.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold bg-[var(--accent)] text-black px-3.5 py-1.5 rounded-full"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--muted)] font-mono text-xs hover:text-[var(--accent)]"
                      >
                        Live Demo ↗
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* /06 VERIFIED CREDENTIALS — Cool Lavender */}
        {/* ============================================================ */}
        <section
          id="credentials"
          data-nav-theme="light"
          aria-labelledby="credentials-heading"
          style={SECTION_THEMES.credentials}
          className="relative z-40 w-full min-h-[100svh] md:h-[100svh] bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-center items-center px-4 overflow-hidden rounded-t-[2.5rem] -mt-10 shadow-[0_-24px_50px_rgba(0,0,0,0.12)]"
        >
          <div className="max-w-2xl text-center mb-12 relative z-10">
            <div className="mb-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
                /06
              </span>
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--fg)] uppercase">
                VERIFIED CREDENTIALS
              </span>
              <span className="font-mono text-xs text-[var(--muted)]">·</span>
              <span className="font-mono text-xs text-[var(--muted)] uppercase flex items-center gap-1">
                <CountUp
                  to={certificateCount || certificates.length}
                  duration={1.2}
                  className="font-bold text-[var(--accent)]"
                />
                <span>INDUSTRY ACCREDITATIONS</span>
              </span>
            </div>

            <RevealWords
              id="credentials-heading"
              text="Audited problem-solving and software credentials."
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--fg)] justify-center"
            />
          </div>

          {/* Continuous Infinite Ticker with 3D Tilt Cards & Hover Slowdown */}
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative z-10">
            <div className="flex shrink-0 gap-5 animate-marquee-slow hover:[animation-duration:65s] py-4">
              {[...certificates, ...certificates].map((cert, idx) => (
                <CredentialCard
                  key={`${cert.id}-${idx}`}
                  cert={cert}
                  isFine={isFine}
                  prefersReducedMotion={prefersReducedMotion}
                  onOpenPreview={setPreviewCert}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* /07 EXPERIENCE — Ember Dark */}
        {/* ============================================================ */}
        <section
          id="experience"
          data-nav-theme="dark"
          aria-labelledby="experience-heading"
          ref={expContainerRef}
          style={SECTION_THEMES.experience}
          onMouseMove={isFine ? handleExpMouseMove : undefined}
          onMouseLeave={() => setHoveredExpIndex(null)}
          className="relative z-50 min-h-[100svh] w-full flex items-center justify-center px-4 md:px-16 py-20 bg-[var(--bg)] text-[var(--fg)] rounded-t-[2.5rem] -mt-10 shadow-[0_-24px_50px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Subtle warm glow orbs */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[var(--accent)]/[0.04] blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[var(--accent)]/[0.03] blur-[140px]" />

          <div className="w-full max-w-6xl relative z-10">
            {/* Header */}
            <SectionHeader
              number="/07"
              title="EXPERIENCE"
              meta={`${(profile.stats[0]?.value || "3+").toUpperCase()} YEARS BUILDING RESILIENT SYSTEMS`}
            />

            <div className="max-w-2xl mb-12">
              <RevealWords
                id="experience-heading"
                text="Industry track record in engineering & quality assurance."
                className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--fg)]"
              />
            </div>

            {/* Vertical Timeline + Experience Rows */}
            <div className="relative pl-6 md:pl-10">
              {/* Background Timeline Rail */}
              <div className="absolute left-1 md:left-2 top-2 bottom-6 w-[2px] bg-white/10" />

              {/* Animated Progress Timeline Line */}
              <motion.div
                style={{ scaleY: prefersReducedMotion ? 1 : expLineScale }}
                className="absolute left-1 md:left-2 top-2 bottom-6 w-[2px] bg-[var(--accent)] origin-top will-change-transform"
              />

              <div className="divide-y divide-white/10">
                {experiences.map((exp, index) => {
                  const isHovered = hoveredExpIndex === index;
                  const isAnotherHovered = hoveredExpIndex !== null && !isHovered;

                  return (
                    <motion.div
                      key={`${exp.company}-${exp.period}`}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      onMouseEnter={() => setHoveredExpIndex(index)}
                      className={`relative py-8 transition-opacity duration-300 ${
                        isAnotherHovered ? "opacity-35" : "opacity-100"
                      }`}
                    >
                      {/* Timeline Dot Indicator */}
                      <span
                        className={`absolute -left-[23px] md:-left-[35px] top-11 h-3.5 w-3.5 rounded-full border-2 border-[var(--bg)] transition-all duration-300 ${
                          isHovered
                            ? "bg-[var(--accent)] shadow-[0_0_14px_var(--accent)] scale-125"
                            : "bg-white/40"
                        }`}
                      />

                      <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                        <div>
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--fg)]">
                              {exp.company}
                            </h3>
                            <span className="font-mono text-sm text-[var(--accent)] font-medium">
                              {exp.role}
                            </span>
                          </div>

                          <p className="mt-2 text-sm text-[var(--muted)] max-w-2xl leading-relaxed">
                            {exp.summary}
                          </p>

                          {/* Tech chips with stagger */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {exp.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-[var(--muted)]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-3 text-xs sm:text-sm font-mono text-[var(--muted)] mt-2 md:mt-0">
                          <span className="text-[var(--fg)] font-medium">{exp.period}</span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Cursor Follower Thumbnail with Accent Border */}
            {isFine && hoveredExpIndex !== null ? (
              <motion.div
                style={{ left: smoothX, top: smoothY }}
                className="pointer-events-none fixed z-50 overflow-hidden rounded-2xl border-2 border-[var(--accent)] bg-[#170F0C]/95 backdrop-blur-md shadow-[0_12px_32px_rgba(255,179,71,0.25)] p-4 hidden md:block w-64"
              >
                <div className="font-display text-sm font-bold text-[var(--fg)]">
                  {experiences[hoveredExpIndex]?.company}
                </div>
                <div className="font-mono text-xs text-[var(--accent)] mt-1 font-medium">
                  {experiences[hoveredExpIndex]?.role}
                </div>
                <div className="font-mono text-[10px] text-[var(--muted)] mt-2">
                  {experiences[hoveredExpIndex]?.location}
                </div>
              </motion.div>
            ) : null}
          </div>
        </section>

        {/* ============================================================ */}
        {/* /08 CONTACT & FOOTER — Acid Finale */}
        {/* ============================================================ */}
        <section
          id="contact"
          data-nav-theme="light"
          aria-labelledby="contact-heading"
          style={SECTION_THEMES.contact}
          className="relative z-50 min-h-[100svh] w-full bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between px-6 md:px-16 pt-24 md:pt-28 pb-10 rounded-t-[2.5rem] -mt-10 shadow-[0_-30px_60px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          {/* Top Meta */}
          <div className="flex items-center justify-between border-b border-black/20 pb-6 relative z-10">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#0B0C0E] uppercase">
              /08 CONTACT &amp; FOOTER
            </span>
            {profile.availableForProjects ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-black/[0.06] px-3.5 py-1 text-xs font-mono text-[#0B0C0E] font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B0C0E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0B0C0E]" />
                </span>
                <span>Available for New Project</span>
              </span>
            ) : null}
          </div>

          {/* Center Call to Action with Split Words Mask & Rotate */}
          <div className="my-auto py-10 flex flex-col items-start max-w-5xl relative z-10">
            <RevealWords
              id="contact-heading"
              text="HAVE A PROJECT IN MIND?"
              rotate={4}
              className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none my-6 uppercase text-[#0B0C0E]"
            />

            <p className="text-lg sm:text-xl md:text-2xl text-[#3C4012] max-w-3xl leading-relaxed mb-8 font-medium">
              Let&apos;s engineer something clear, resilient, and impactful together.
            </p>

            {/* Buttons: Primary Magnetic + Secondary Bottom Slide-Up Fill */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <MagneticEmailButton
                email={profile.email}
                isFine={isFine}
                prefersReducedMotion={prefersReducedMotion}
              />

              <SecondaryButton
                href={profile.whatsappUrl}
                icon={Phone}
                label="WhatsApp"
              />

              <SecondaryButton
                href={encodeURI(profile.cvUrl)}
                icon={FileText}
                label="Resume (PDF)"
              />
            </div>
          </div>

          {/* Decorative Sub-Marquee above Colophon */}
          <div className="w-full overflow-hidden py-3 border-y border-black/15 my-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative z-10">
            <div className="flex shrink-0 gap-8 animate-marquee-slow font-mono text-xs md:text-sm font-bold tracking-widest uppercase text-black/30 select-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={`ticker-${i}`} className="inline-flex items-center gap-8">
                  <span>AVAILABLE FOR NEW PROJECTS</span>
                  <span>✦</span>
                  <span>SCALE &amp; UPTIME SPECIALIST</span>
                  <span>✦</span>
                </span>
              ))}
            </div>
          </div>

          {/* Colophon & Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-xs text-[#0B0C0E] relative z-10 border-t border-[#0B0C0E]/15">
            {/* Left: Brand & Colophon */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-corecraft.png"
                alt="Corecraft"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight text-[#0B0C0E]">
                  Corecraft
                </span>
                <span className="text-xs font-mono text-[#0B0C0E]/70">
                  © {new Date().getFullYear()} {profile.fullName}. Built with Next.js 16 & React 19.
                </span>
              </div>
            </div>

            {/* Center: Live Malang Clock with Pulsing Dot */}
            <div className="flex items-center gap-2 rounded-full border border-[#0B0C0E]/15 bg-[#0B0C0E]/5 px-4 py-1.5 font-mono text-xs text-[#0B0C0E] shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B0C0E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0B0C0E]" />
              </span>
              <Clock className="h-3.5 w-3.5 text-[#3C4012]" />
              <span>Malang, ID (WIB): {malangTime || "--:--:--"}</span>
            </div>

            {/* Right: Socials & Back to Top with Upward Translating Arrow */}
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
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0B0C0E]/15 bg-[#0B0C0E]/5 text-[#0B0C0E] transition-all duration-200 hover:border-[#0B0C0E] hover:bg-[#0B0C0E] hover:text-[#D4FF00]"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={() => scrollTo("hero")}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#0B0C0E]/15 bg-[#0B0C0E]/5 px-3.5 py-1.5 font-mono text-xs font-medium text-[#0B0C0E] transition-all duration-200 hover:border-[#0B0C0E] hover:bg-[#0B0C0E] hover:text-[#D4FF00] cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="h-3 w-3" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Preview Certificate ${previewCert.title}`}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewCert(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Window */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#14162B]/10 bg-[#FAF9FE]">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#5A4BFF] animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14162B]">
                    Certificate Document Preview
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="rounded-full p-1.5 text-[#6A6E93] hover:text-[#14162B] hover:bg-[#14162B]/5 transition-colors cursor-pointer"
                  aria-label="Close certificate preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Certificate Body (High fidelity document mockup) */}
              <div className="p-4 sm:p-6 overflow-y-auto">
                <div className="relative rounded-2xl border-4 border-double border-[#5A4BFF]/30 bg-gradient-to-br from-[#FAF9FE] via-white to-[#F0EEFF] p-6 sm:p-10 shadow-inner overflow-hidden text-center">
                  {/* Background Watermark */}
                  <Award className="h-60 w-60 text-[#5A4BFF]/[0.05] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />

                  {/* Guilloche Corner Accents */}
                  <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#5A4BFF]/50 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#5A4BFF]/50 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#5A4BFF]/50 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#5A4BFF]/50 pointer-events-none" />

                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    <span>Verified Industry Credential</span>
                  </div>

                  <p className="font-mono text-xs text-[#6A6E93] uppercase tracking-widest mb-1">
                    This is proudly presented to
                  </p>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#14162B] tracking-tight mb-2">
                    {profile.fullName}
                  </h3>

                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#5A4BFF] to-transparent mx-auto mb-4" />

                  <p className="font-mono text-xs text-[#6A6E93] max-w-md mx-auto mb-3">
                    for successfully completing the rigorous assessment and demonstrating proficiency in
                  </p>

                  <h4 className="font-display text-lg sm:text-xl font-bold text-[#5A4BFF] mb-6 px-4">
                    {previewCert.title}
                  </h4>

                  {/* Skills breakdown */}
                  {previewCert.skills && previewCert.skills.length > 0 && (
                    <div className="mb-6">
                      <span className="font-mono text-[10px] font-semibold text-[#6A6E93] uppercase tracking-wider block mb-2">
                        Assessed Competencies
                      </span>
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        {previewCert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-md bg-white border border-[#14162B]/10 font-mono text-xs font-medium text-[#14162B]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meta Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#14162B]/10 text-left">
                    <div>
                      <span className="font-mono text-[10px] text-[#6A6E93] uppercase block">
                        Issuing Authority
                      </span>
                      <span className="font-mono text-xs font-bold text-[#14162B]">
                        {previewCert.issuer}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#6A6E93] uppercase block">
                        Issue Date
                      </span>
                      <span className="font-mono text-xs font-bold text-[#14162B]">
                        {previewCert.date}
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="font-mono text-[10px] text-[#6A6E93] uppercase block">
                        Credential ID
                      </span>
                      <span className="font-mono text-xs font-bold text-[#5A4BFF] break-all">
                        {previewCert.credentialId || "Verified Authority"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-[#FAF9FE] border-t border-[#14162B]/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-[#6A6E93] hover:text-[#14162B] transition-colors cursor-pointer"
                >
                  Tutup
                </button>

                {previewCert.url ? (
                  <a
                    href={previewCert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A4BFF] hover:bg-[#4839E6] text-white font-mono text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>Verifikasi di {previewCert.issuer}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="font-mono text-xs text-[#6A6E93]">
                    Official National Archive
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
