"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/data/profile";
import { useScrollToSection } from "@/lib/scroll";
import { fadeUp, inView, PARALLAX_RANGE, spring } from "@/lib/motion";

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

const NAME_MIN_PX = 38;
const NAME_MAX_PX = 240;
const NAME_FALLBACK = "clamp(2.5rem, 13vw, 14rem)";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const outlineRef = useRef<HTMLSpanElement>(null);
  const solidRef = useRef<HTMLSpanElement>(null);

  const [fontSize, setFontSize] = useState<string>(NAME_FALLBACK);
  const scrollTo = useScrollToSection();
  const prefersReducedMotion = useReducedMotion();
  const parallaxEnabled = prefersReducedMotion !== true;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const avatarScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -72]);

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

  return (
    <section
      ref={sectionRef}
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
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-surface px-3.5 py-1 text-xs font-medium tracking-tight text-muted shadow-sm">
            <span className="status-dot" aria-hidden="true" />
            Available for New Project
          </span>
        </motion.div>

        {/* Massive Viewport Typography: "MOHAMMAD KEVIN" */}
        <div className="relative my-2 sm:my-4">
          <motion.h1
            id="hero-name"
            ref={nameRef}
            style={parallaxEnabled ? { y: nameY, fontSize } : { fontSize }}
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

          {/* Cutout Avatar: rendered in the middle overlapping the title with smooth parallax damping */}
          <motion.div
            style={
              parallaxEnabled
                ? { y: avatarY, scale: avatarScale, opacity: avatarOpacity }
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

        {/* Flank Bawah: 2-Column Responsive Editorial Footer */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 sm:mt-16 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end pt-8 border-t border-black/[0.08]"
        >
          {/* Kiri: Role + 2-Sentence Manifesto + Magnetic CTA Button */}
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

          {/* Kanan: Tumpukan link sosial vertikal dengan efek slide saat hover */}
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
  );
}
