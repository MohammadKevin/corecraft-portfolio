"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  MapPin,
  GraduationCap,
  Download,
  Mail,
  Code2,
  CheckCircle2,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Clock,
  Check,
  Copy,
} from "lucide-react";
import { whoamiData } from "@/data/whoami";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export default function AboutSection() {
  const { lang } = useLanguage();
  const [copiedCode, setCopiedCode] = useState(false);
  const ab = translations.about;

  const codeSnippet = `export const engineer = {
  name: "Mohammad Kevin Arif Rudianto",
  institution: "SMK Telkom Malang",
  specialization: ["Backend Architecture", "Fullstack SaaS", "POS Systems"],
  coreStack: ["Next.js 16", "NestJS", "Prisma ORM", "PostgreSQL", "Tailwind CSS 4"],
  status: "ONLINE | Ready for Collaboration",
  location: "Malang, East Java, Indonesia (UTC+7)"
};`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-zinc-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-sky-800 text-xs font-extrabold shadow-2xs mb-3.5">
            <User className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="tracking-wide font-bold">{lang === "id" ? "Tentang Saya" : "Personal Profile"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            {lang === "id" ? (
              <>
                Mengenal Lebih Dekat{" "}
                <span className="text-sky-500">
                  Mohammad Kevin
                </span>
              </>
            ) : (
              <>
                Engineering Philosophy &{" "}
                <span className="text-sky-500">
                  Profile
                </span>
              </>
            )}
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm md:text-base mt-2">
            {lang === "id"
              ? "Developer yang berdedikasi membangun solusi digital fungsional, performan, dan berorientasi pada hasil nyata."
              : "A dedicated software engineer committed to high-performance architectures and real-world impact."}
          </p>
        </div>

        {/* Profile Grid: Left Photo Card + Right Bio & Code Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Portrait Photo & Profile Card (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-50/70 p-5 rounded-[14px] border border-zinc-200 shadow-2xs">
            <div className="space-y-4">
              
              {/* Photo Container */}
              <div className="relative w-full aspect-[4/5] rounded-[12px] overflow-hidden bg-zinc-900 border border-zinc-200 shadow-inner group">
                <Image
                  src="/images/logo.png"
                  alt="Mohammad Kevin Arif Rudianto"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-300"
                  priority
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />

                {/* Overlaid Bottom Identity */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/90 text-white backdrop-blur-md mb-2 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {lang === "id" ? "Siap untuk Proyek & Magang" : "Available for Hire & Projects"}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Mohammad Kevin
                  </h3>
                  <p className="text-xs text-sky-300 font-mono">
                    Fullstack & Backend Engineer
                  </p>
                </div>
              </div>

              {/* Quick Credentials Strip */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono block">
                    {lang === "id" ? "Domisili" : "Location"}
                  </span>
                  <span className="text-xs font-bold text-zinc-900 mt-0.5 block truncate">
                    Malang, Indonesia
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono block">
                    {lang === "id" ? "Institusi" : "Institution"}
                  </span>
                  <span className="text-xs font-bold text-zinc-900 mt-0.5 block truncate">
                    SMK Telkom Malang
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Action Buttons Integrated inside card */}
            <div className="flex flex-col sm:flex-row gap-2 pt-4 mt-4 border-t border-zinc-200">
              <a
                href="/CV%20Mohammad%20Kevin.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="CV Mohammad Kevin.pdf"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 active:scale-98 text-white shadow-xs flex-1 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download Resume</span>
              </a>
              <Link
                href="/cv"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 shadow-2xs flex-1 transition-all cursor-pointer"
              >
                <span>Lihat CV Digital</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </Link>
            </div>
          </div>

          {/* Right Column: Detailed Bio, Values & System Profile (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 sm:gap-6">
            
            {/* Story Card */}
            <div className="bg-zinc-50/70 p-6 sm:p-7 rounded-[14px] border border-zinc-200 shadow-2xs space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight leading-snug">
                {lang === "id"
                  ? "Menghubungkan Kebutuhan Bisnis dengan Arsitektur Kode yang Kokoh."
                  : "Bridging Business Requirements with Resilient Code Architecture."}
              </h3>

              <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  {lang === "id" ? (
                    <>
                      Halo! Saya <strong className="text-zinc-900 font-semibold">Mohammad Kevin Arif Rudianto</strong> — software engineer dari Malang dengan fokus mendalam pada pengembangan backend modern, database relational, dan aplikasi fullstack.
                    </>
                  ) : (
                    <>
                      Hello! I&apos;m <strong className="text-zinc-900 font-semibold">Mohammad Kevin</strong> — a software engineer from Malang, Indonesia, specializing in modern backend architectures, relational databases, and fullstack Next.js applications.
                    </>
                  )}
                </p>

                <p>
                  {lang === "id" ? (
                    <>
                      Saya meyakini bahwa kode yang hebat bukan sekadar yang terlihat rapi, tetapi yang mampu <strong className="text-zinc-900 font-semibold">menyelesaikan masalah nyata</strong>: memproses ribuan transaksi kasir tanpa selisih stok, mengamankan ribuan arsip digital dengan hak akses ketat, serta merespon query dalam hitungan milidetik.
                    </>
                  ) : (
                    <>
                      I believe exceptional software is defined by its ability to <strong className="text-zinc-900 font-semibold">solve real operational problems</strong>: processing transactions without stock variance, securing digital archives with granular permissions, and executing SQL queries in sub-milliseconds.
                    </>
                  )}
                </p>
              </div>

              {/* Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-zinc-200">
                {[
                  lang === "id" ? "Spesialis Next.js & NestJS" : "Next.js & NestJS Specialist",
                  lang === "id" ? "Query Optimization PostgreSQL" : "PostgreSQL Query Optimization",
                  lang === "id" ? "Pemodelan Prisma ORM Type-Safe" : "Prisma Type-Safe ORM Modeling",
                  lang === "id" ? "Pengalaman Sistem Kasir POS" : "POS Transactional Experience",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-zinc-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Sleek Engineering Config & Telemetry Box */}
            <div className="bg-[#090d16] text-zinc-100 p-5 rounded-[14px] border border-zinc-800 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="h-3.5 w-px bg-zinc-800 mx-1" />
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-mono text-zinc-300 font-semibold text-[11px]">kevin-config.ts</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    active
                  </span>
                  <button
                    onClick={copyCode}
                    aria-label="Copy config snippet"
                    className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Code Tokens with Clean Syntax Highlighting */}
              <div className="font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-300 space-y-1 overflow-x-auto">
                <p>
                  <span className="text-sky-400">export const</span>{" "}
                  <span className="text-amber-300">engineer</span> = &#123;
                </p>
                <p className="pl-4">
                  <span className="text-zinc-400">name:</span>{" "}
                  <span className="text-emerald-300">&quot;Mohammad Kevin Arif Rudianto&quot;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-zinc-400">institution:</span>{" "}
                  <span className="text-emerald-300">&quot;SMK Telkom Malang&quot;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-zinc-400">specialization:</span>{" "}
                  <span className="text-sky-300">[&quot;Backend Architecture&quot;, &quot;Fullstack SaaS&quot;, &quot;POS Systems&quot;]</span>,
                </p>
                <p className="pl-4">
                  <span className="text-zinc-400">coreStack:</span>{" "}
                  <span className="text-purple-300">[&quot;Next.js 16&quot;, &quot;NestJS&quot;, &quot;Prisma ORM&quot;, &quot;PostgreSQL&quot;]</span>,
                </p>
                <p className="pl-4">
                  <span className="text-zinc-400">status:</span>{" "}
                  <span className="text-emerald-400">&quot;ONLINE | Ready for Systems Collaboration&quot;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-zinc-400">location:</span>{" "}
                  <span className="text-amber-200">&quot;Malang, East Java, ID (UTC+7)&quot;</span>
                </p>
                <p>&#125;;</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
