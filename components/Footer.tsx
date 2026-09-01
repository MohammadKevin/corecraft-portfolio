"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Mail,
  MapPin,
  ArrowUpRight,
  Shield,
  FileText,
  Terminal,
  Layers,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/icons/SocialIcons";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  if (pathname && pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-zinc-50 text-zinc-600 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Brand & Bio Column (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-200 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                <Image
                  src="/images/icon.png"
                  alt="Mohammad Kevin"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-zinc-950 text-base">Mohammad Kevin</p>
                <p className="text-xs text-sky-600 font-mono font-medium">
                  Fullstack & Backend Software Engineer
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm">
              {lang === "id"
                ? "Membangun sistem web berskala tinggi, API performa tinggi, dan aplikasi kasir POS dengan stack Next.js, NestJS, Prisma, dan PostgreSQL."
                : "Architecting high-throughput APIs, scalable web applications, and resilient POS transactional systems with Next.js, NestJS, Prisma, and PostgreSQL."}
            </p>

            {/* Live Status Badge */}
            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-zinc-700 font-semibold">
                {lang === "id" ? "Sistem Online & Siap Kolaborasi" : "Systems Operational · Ready for Hire"}
              </span>
            </div>
          </div>

          {/* Quick Links Column (Span 4) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
              {lang === "id" ? "Navigasi Cepat" : "Navigation"}
            </p>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/#hero" className="hover:text-sky-600 transition-colors">
                  {lang === "id" ? "Beranda" : "Overview"}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-sky-600 transition-colors">
                  {lang === "id" ? "Tentang Saya" : "Personal Profile"}
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-sky-600 transition-colors">
                  {lang === "id" ? "Arsitektur Sistem" : "System Capabilities"}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-sky-600 transition-colors">
                  {lang === "id" ? "Layanan Rekayasa" : "Services & Deliverables"}
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-sky-600 transition-colors">
                  {lang === "id" ? "Portofolio Proyek" : "Production Projects"}
                </Link>
              </li>
              <li>
                <Link href="/cv" className="text-sky-600 hover:text-sky-700 font-bold inline-flex items-center gap-1 transition-colors">
                  <span>Curriculum Vitae (PDF)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Connect Column (Span 3) */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                {lang === "id" ? "Kontak Langsung" : "Direct Connect"}
              </p>
              <p className="text-xs text-zinc-500 mt-1">Malang, East Java, Indonesia (UTC+7)</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/MohammadKevin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-xl bg-white border border-zinc-300 text-zinc-700 flex items-center justify-center hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 shadow-2xs transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/mohammadkevin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-xl bg-white border border-zinc-300 text-zinc-700 flex items-center justify-center hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 shadow-2xs transition-all cursor-pointer"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/mhmmd.kvnn_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 rounded-xl bg-white border border-zinc-300 text-zinc-700 flex items-center justify-center hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 shadow-2xs transition-all cursor-pointer"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:kvn4.200581@gmail.com"
                aria-label="Send Email"
                className="w-9 h-9 rounded-xl bg-white border border-zinc-300 text-zinc-700 flex items-center justify-center hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 shadow-2xs transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] font-mono text-zinc-400">
              <span>&gt;_ Next.js 16 · Tailwind CSS 4</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Mohammad Kevin. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-zinc-400">Editorial SaaS Interface</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-600 font-mono font-medium">corecraft.my.id</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
