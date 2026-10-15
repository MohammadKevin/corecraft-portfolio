"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUp, Clock } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/data/profile";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  WhatsApp: WhatsappIcon,
};

export default function Footer() {
  const pathname = usePathname();
  const [time, setTime] = useState<string>("");

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

  // Avoid duplicate footer on the home page which integrates its own themed Section /08 footer
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="border-t border-black/[0.08] bg-bg py-10">
      <div className="page-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-corecraft.png"
            alt="Corecraft"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-ink">
              Corecraft
            </span>
            <span className="text-xs font-mono text-muted">
              © {new Date().getFullYear()} {profile.fullName}. Built with Next.js 16 & React 19.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-black/[0.08] bg-surface px-4 py-1.5 font-mono text-xs text-ink shadow-2xs">
          <Clock className="h-3.5 w-3.5 text-neutral-500" />
          <span className="text-muted">Malang, ID (WIB):</span>
          <span className="font-semibold text-ink">{time || "Loading..."}</span>
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
            className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-surface px-3 py-1.5 font-mono text-xs font-medium text-ink transition-all duration-200 hover:border-black hover:bg-black hover:text-white cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
