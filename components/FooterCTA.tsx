"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/data/profile";
import { fadeUp, inView } from "@/lib/motion";

const socialIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  WhatsApp: WhatsappIcon,
};

/**
 * FooterCTA: the closing call to action, rendered on every page.
 *
 * The heading uses `clamp()` so "HAVE A PROJECT IN MIND?" scales down without
 * clipping at 375px. Both primary actions are MagneticButtons pointing at the
 * real email address and WhatsApp number.
 */
export default function FooterCTA() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad border-t border-line"
    >
      <div className="page-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex flex-col items-start gap-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium tracking-tight text-muted">
            <span className="status-dot" aria-hidden="true" />
            Available for New Project
          </span>

          <h2
            id="contact-heading"
            className="max-w-[16ch] font-display text-[clamp(2.5rem,9vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink"
          >
            HAVE A PROJECT IN MIND?
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              href={`mailto:${profile.email}`}
              variant="solid"
              ariaLabel={`Email ${profile.firstName} ${profile.lastName}`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </MagneticButton>

            <MagneticButton
              href={profile.whatsappUrl}
              variant="outline"
              newTab
              ariaLabel={`Message ${profile.firstName} ${profile.lastName} on WhatsApp (opens in a new tab)`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              WhatsApp
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted">
            © {year} {profile.firstName} {profile.lastName}. Built with Next.js
            and Tailwind CSS.
          </p>

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
        </div>
      </div>
    </footer>
  );
}
