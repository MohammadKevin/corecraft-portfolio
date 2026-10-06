"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="w-full border-t-[3px] border-foreground bg-surface print:hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/images/corecraft-logo-dark.svg"
            alt="CoreCraft"
            width={40}
            height={40}
            className="w-10 h-10 object-contain rounded-xl border-2 border-foreground shadow-[3px_3px_0_var(--border)]"
          />
          <div className="flex flex-col">
            <span className="text-[15px] font-extrabold text-ink leading-tight font-display">Mohammad Kevin</span>
            <span className="font-mono text-[11px] text-muted">
              corecraft.my.id &bull; {lang === "id" ? "Backend & Fullstack Engineer" : "Backend & Fullstack Engineer"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {[
            { href: "https://github.com/MohammadKevin", label: "GitHub", icon: GithubIcon },
            { href: "https://www.linkedin.com/in/mohammad-kevin-arif-rudianto-945733347/", label: "LinkedIn", icon: LinkedinIcon },
            { href: "https://www.instagram.com/mhmdkevin_1/?hl=en", label: "Instagram", icon: InstagramIcon },
          ].map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-full border-2 border-foreground shadow-[3px_3px_0_var(--border)] hover:shadow-[5px_5px_0_var(--accent-yellow)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all bg-surface text-ink"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
          <a
            href="mailto:kvn4.200581@gmail.com"
            aria-label="Email"
            className="p-2.5 rounded-full border-2 border-foreground shadow-[3px_3px_0_var(--border)] hover:shadow-[5px_5px_0_var(--accent-pink)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all bg-surface text-ink"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="font-mono text-[11px] text-muted font-bold">
          &copy; {new Date().getFullYear()} Mohammad Kevin
        </div>
      </div>
    </footer>
  );
}