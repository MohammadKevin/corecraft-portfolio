"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/data/profile";
import { useScrollToSection } from "@/lib/scroll";
import { fadeUp, inView, PARALLAX_RANGE } from "@/lib/motion";

const socialIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  WhatsApp: WhatsappIcon,
};

/**
 * Hero: the name is the page's single <h1>.
 *
 * "MOHAMMAD" is drawn as an outline and "KEVIN" solid, but the accessible name
 * is the plain full name so screen readers announce it normally.
 *
 * Parallax is capped at PARALLAX_RANGE (60px) and disabled for reduced-motion.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTo = useScrollToSection();
  const prefersReducedMotion = useReducedMotion();
  const parallaxEnabled = prefersReducedMotion !== true;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], [0, PARALLAX_RANGE]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -PARALLAX_RANGE * 0.6]);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-name"
      className="section-pad relative overflow-hidden pt-32 md:pt-40"
    >
      <div className="page-container">
        {/* Availability badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mb-6 flex justify-center md:mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium tracking-tight text-muted">
            <span className="status-dot" aria-hidden="true" />
            Available for New Project
          </span>
        </motion.div>

        {/* Giant name — one h1, split across two lines. */}
        <motion.h1
          id="hero-name"
          style={parallaxEnabled ? { y: nameY } : undefined}
          className="select-none text-center font-display font-extrabold leading-[0.85] tracking-[-0.04em]"
        >
          <span className="sr-only">
            {profile.firstName} {profile.lastName}
          </span>
          <span
            aria-hidden="true"
            className="block text-[22vw] leading-[0.85] md:text-[18vw]"
          >
            <span className="name-outline block">{profile.firstName}</span>
            <span className="name-solid block">{profile.lastName}</span>
          </span>
        </motion.h1>

        {/* Avatar, overlapping the baseline of the name. */}
        <motion.div
          style={parallaxEnabled ? { y: avatarY } : undefined}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="relative z-10 -mt-[6vw] flex justify-center md:-mt-[5vw]"
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-bg bg-bg-alt shadow-[0_8px_30px_rgba(15,23,42,0.10)] sm:h-36 sm:w-36 md:h-44 md:w-44">
            <Image
              src={profile.avatar}
              alt={`Portrait of ${profile.firstName} ${profile.lastName}`}
              fill
              priority
              sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-6 text-center"
        >
          <p className="text-balance text-base leading-relaxed text-muted md:text-lg">
            {profile.subtitle}
          </p>

          <MagneticButton
            href="#contact"
            variant="solid"
            onClick={(event) => {
              event.preventDefault();
              scrollTo("contact");
            }}
          >
            Let&apos;s collaborate
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>

          <ul className="flex items-center gap-2">
            {profile.socials.map((social) => {
              const Icon = socialIcon[social.label];
              if (!Icon) return null;
              return (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${profile.firstName} ${profile.lastName} on ${social.label} (opens in a new tab)`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
