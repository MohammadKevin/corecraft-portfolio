"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  if (pathname && pathname.startsWith("/admin")) return null;

  return (
    <footer className="w-full bg-white/70 backdrop-blur-md border-t border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/images/corecraft-logo-dark.svg"
            alt="CoreCraft"
            width={40}
            height={40}
            className="w-10 h-10 object-contain rounded-xl shadow-xs"
          />
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-zinc-950 leading-tight">Mohammad Kevin</span>
            <span className="font-mono text-[11px] text-zinc-400">
              corecraft.my.id • {lang === "id" ? "Backend & Fullstack Engineer" : "Backend & Fullstack Engineer"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/MohammadKevin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-800 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/mohammadkevin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-800 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com/mhmmd.kvnn_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2.5 rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-800 transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:kvn4.200581@gmail.com"
            aria-label="Email"
            className="p-2.5 rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-800 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="font-mono text-[11px] text-zinc-400">
          © {new Date().getFullYear()} Mohammad Kevin
        </div>
      </div>
    </footer>
  );
}
