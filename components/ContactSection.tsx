"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/data/profile";
import { useScrollToSection } from "@/lib/scroll";
import { fadeUp, inView } from "@/lib/motion";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  WhatsApp: WhatsappIcon,
};

export default function ContactSection() {
  const [time, setTime] = useState<string>("");
  const scrollTo = useScrollToSection();

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(`${formatted} WIB`);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad border-t border-black/[0.08] bg-bg relative z-10 overflow-hidden shadow-[0_-25px_60px_rgba(0,0,0,0.06)] md:-mt-24"
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
            /08 CONTACT & INQUIRY
          </span>
          <span className="font-mono text-xs text-muted">
            AVAILABLE WORLDWIDE
          </span>
        </motion.div>

        {/* Banner CTA (Curtain Reveal Pattern) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex flex-col items-start gap-8 py-8"
        >
          {/* Status Beacon — pure monochrome/silver pulse */}
          <span className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-surface px-4 py-2 text-xs font-mono font-medium tracking-tight text-ink shadow-2xs">
            <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neutral-400/50 ring-1 ring-neutral-400/50 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-900 dark:bg-white" />
            </span>
            Available for New Project
          </span>

          {/* Headline Raksasa */}
          <h2
            id="contact-heading"
            className="font-display text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink uppercase"
          >
            HAVE A PROJECT IN MIND?
          </h2>

          {/* Subteks Manifesto */}
          <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-muted font-normal">
            Let&apos;s engineer something clear, resilient, and impactful together.
            Whether it&apos;s a high-concurrency API, an inventory engine, or a modern fullstack system.
          </p>

          {/* Tombol Aksi: Direct Email, WhatsApp, and Download CV */}
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
              <Phone className="h-4 w-4 text-emerald-600" aria-hidden="true" />
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

        {/* Colophon & Footer Bar */}
        <div className="mt-20 border-t border-black/[0.08] pt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Kiri: Copyright */}
          <div className="text-xs sm:text-sm font-mono text-muted">
            © 2026 {profile.fullName}. All rights reserved.
          </div>

          {/* Tengah: Jam digital lokal real-time (Malang, ID (WIB)) */}
          <div className="flex items-center gap-2 rounded-full border border-black/[0.08] bg-surface px-3.5 py-1.5 font-mono text-xs text-ink shadow-2xs">
            <Clock className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
            <span>Malang, ID (WIB):</span>
            <span className="font-semibold text-emerald-700">{time || "Loading..."}</span>
          </div>

          {/* Kanan: Social links + Back to top link */}
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
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-surface text-muted transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-surface px-3 py-1.5 font-mono text-xs font-medium text-ink transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
