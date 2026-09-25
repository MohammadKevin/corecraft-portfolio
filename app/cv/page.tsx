"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  Download,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Code,
  Sparkles,
  CheckCircle2,
  Loader2,
  Layers,
  Cpu
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function CVPage() {
  const { lang } = useLanguage();
  const cvRef = useRef<HTMLDivElement>(null);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDirectDownloadPDF = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      if (document.fonts) {
        await document.fonts.ready;
      }

      const targetElement = pdfTemplateRef.current || cvRef.current;
      if (!targetElement) return;

      const dataUrl = await toPng(targetElement, {
        quality: 1.0,
        pixelRatio: 2.5,
        backgroundColor: "#ffffff",
        cacheBust: true,
        width: 820,
        height: 1160,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297, undefined, "FAST");
      pdf.save(`CV_Mohammad_Kevin_${lang === "id" ? "ID" : "EN"}.pdf`);
    } catch (error) {
      console.error("Direct PDF generation error, using print fallback:", error);
      const originalTitle = document.title;
      document.title = `CV_Mohammad_Kevin_${lang === "id" ? "ID" : "EN"}`;
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    } finally {
      setIsDownloading(false);
    }
  };

  const certifications = [
    {
      issuer: "HackerRank",
      title: "Rest API (Intermediate) Certificate",
      year: "2026",
    },
    {
      issuer: "HackerRank",
      title: "Node.js (Intermediate) Certificate",
      year: "2026",
    },
    {
      issuer: "Dicoding Indonesia",
      title: lang === "id" ? "Belajar Dasar Pemrograman JavaScript" : "Basic JavaScript Programming",
      year: "2025",
    },
    {
      issuer: "Dicoding Indonesia",
      title: lang === "id" ? "Belajar Dasar Pemrograman Web" : "Basic Web Programming",
      year: "2026",
    },
    {
      issuer: lang === "id" ? "Kompetisi" : "Competition",
      title: lang === "id" ? "Future Founders League 2026 (BMC) — Peserta" : "Future Founders League 2026 (BMC) — Participant",
      year: "2026",
    },
    {
      issuer: lang === "id" ? "Kompetisi" : "Competition",
      title: lang === "id" ? "Ultimate Showdown 2026 — Peserta" : "Ultimate Showdown 2026 — Participant",
      year: "2026",
    },
  ];

  const skillGroups = [
    {
      title: "Frontend Development",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Bootstrap"],
    },
    {
      title: "Backend & RESTful API",
      skills: ["Node.js", "Express.js", "NestJS", "PHP", "RESTful API", "JWT Auth", "DTO Validation"],
    },
    {
      title: "Database & ORM",
      skills: ["MySQL", "PostgreSQL", "Prisma ORM", "Database Indexing", "SQL Query Tuning"],
    },
    {
      title: "Tools & DevOps Workflow",
      skills: ["Git", "GitHub", "Postman", "Linux/Bash", "VS Code", "npm/yarn"],
    },
  ];

  const competencies = [
    lang === "id" ? "Pengembangan Aplikasi Web Fullstack Modern" : "Modern Fullstack Web Application Engineering",
    lang === "id" ? "Arsitektur API RESTful Modular & Skalabilitas" : "Modular RESTful API Architecture & Scalability",
    lang === "id" ? "Optimasi Kueri & Skema Basis Data Relasional" : "Relational Database Schema & Query Optimization",
    lang === "id" ? "Pengujian API & Integrasi End-to-End (Postman)" : "End-to-End API Testing & Integration (Postman)",
    lang === "id" ? "Pemecahan Masalah, Debugging & Refactoring Kode" : "Problem Solving, Debugging & Code Refactoring",
    lang === "id" ? "Kolaborasi Tim Tangkas & Komunikasi Terstruktur" : "Agile Team Collaboration & Structured Communication",
  ];

  return (
    <main className="min-h-screen bg-zinc-200/70 text-zinc-900 font-sans print:bg-white print:text-black pt-20 sm:pt-24 pb-16 print:p-0 px-3 sm:px-6">
      {/* Top action toolbar */}
      <div className="max-w-[860px] mx-auto mb-4 flex items-center justify-between gap-2.5 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold rounded-xl text-xs py-2 px-3 sm:px-4 shadow-xs transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <span>{lang === "id" ? "Kembali ke Beranda" : "Back to Overview"}</span>
        </Link>

        {/* Direct Automatic Download PDF Button */}
        <button
          onClick={handleDirectDownloadPDF}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs py-2 px-4 sm:px-5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{lang === "id" ? "Memproses PDF..." : "Generating PDF..."}</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-white shrink-0" />
              <span>{lang === "id" ? "Unduh PDF" : "Download PDF"}</span>
            </>
          )}
        </button>
      </div>

      {/* On-Screen Responsive CV View */}
      <div 
        ref={cvRef}
        className="cv-a4-sheet max-w-[860px] mx-auto bg-white border border-zinc-200 shadow-xl rounded-2xl p-6 sm:p-8 md:p-9 flex flex-col justify-between"
      >
        <div>
          {/* Header Section */}
          <header className="pb-4 border-b border-zinc-200">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              
              {/* Rounded Photo Frame */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-md ring-4 ring-sky-500/15 bg-zinc-100 shrink-0">
                <Image 
                  src="/images/logo.png" 
                  alt="Mohammad Kevin" 
                  fill 
                  sizes="112px" 
                  className="object-cover object-top" 
                  priority 
                  unoptimized
                />
              </div>

              {/* Profile Details */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1D] tracking-tight leading-none">
                    Mohammad <span className="text-sky-600">Kevin</span> Arif Rudianto
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[10.5px] font-bold font-mono uppercase tracking-wider">
                    SMK Telkom Malang
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-zinc-700 font-mono mb-2.5">
                  {lang === "id" ? "Backend & Fullstack Software Engineer" : "Backend & Fullstack Software Engineer"}
                </p>

                {/* Contact Links Row */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-zinc-600 font-medium pt-2 border-t border-zinc-100">
                  <a
                    href="mailto:kvn4.200581@gmail.com"
                    className="flex items-center gap-1.5 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>kvn4.200581@gmail.com</span>
                  </a>
                  <a
                    href="https://wa.me/6282131588846"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>+62 821-3158-8846</span>
                  </a>
                  <span className="flex items-center gap-1.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{lang === "id" ? "Malang, Jawa Timur, Indonesia" : "Malang, East Java, Indonesia"}</span>
                  </span>
                  <a
                    href="https://github.com/MohammadKevin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
                    <span>github.com/MohammadKevin</span>
                  </a>
                  <a
                    href="https://www.corecraft.my.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <Globe className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>corecraft.my.id</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span className="font-bold text-zinc-900">2+ {lang === "id" ? "Tahun Pengalaman Praktis" : "Years Practical Experience"}</span>
              </span>
              <span className="hidden sm:inline text-zinc-300">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span className="font-bold text-zinc-900">10+ {lang === "id" ? "Proyek Teruji & Terdistribusi" : "Production Tested Projects"}</span>
              </span>
              <span className="hidden sm:inline text-zinc-300">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span className="font-bold text-sky-700">Next.js • NestJS • Prisma • PostgreSQL/MySQL</span>
              </span>
            </div>
          </header>

          {/* Main Two-Column Grid */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-6 sm:gap-7">
            
            {/* Left Column (7 cols) */}
            <div className="md:col-span-7 print:col-span-7 space-y-4">
              
              {/* Professional Summary */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Ringkasan Profesional" : "Professional Summary"}
                  </h2>
                </div>
                <p className="text-xs leading-relaxed text-zinc-700 bg-zinc-50/80 p-3 rounded-xl border border-zinc-200/70 print:bg-transparent print:p-0 print:border-none">
                  {lang === "id"
                    ? "Siswa SMK Telkom Malang jurusan Rekayasa Perangkat Lunak dengan dedikasi tinggi pada arsitektur backend andal dan ekosistem fullstack modern (Next.js, NestJS, Prisma ORM, MySQL/PostgreSQL). Berpengalaman membangun sistem Point of Sale (POS) multi-cabang offline-first, platform manajemen arsip digital berbasis cloud, serta integrasi API berkinerja tinggi. Memiliki fondasi analitikal kuat, pemahaman optimasi query database, disiplin clean code, serta siap berkontribusi penuh dalam program Praktik Kerja Lapangan (PKL) maupun proyek industri berskala besar."
                    : "Software Engineering student at SMK Telkom Malang dedicated to high-performance backend architecture and modern fullstack systems (Next.js, NestJS, Prisma ORM, MySQL/PostgreSQL). Experienced in engineering offline-first multi-branch POS cashier systems, institutional digital archive platforms, and modular RESTful APIs. Possesses strong analytical problem-solving skills, database indexing competency, clean code discipline, and readiness to deliver high-impact value in professional internship programs and software industry projects."}
                </p>
              </section>

              {/* Experience & Production Projects */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2.5">
                  <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Pengalaman Kerja & Proyek Nyata" : "Experience & Production Projects"}
                  </h2>
                </div>
                
                <div className="space-y-3">
                  {/* Item 1: POS Cashier */}
                  <div className="relative pl-4 border-l-2 border-sky-500/50 space-y-1">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white" />
                    
                    <div className="flex items-baseline justify-between gap-1 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-zinc-950">
                          {lang === "id" ? "Aplikasi Kasir (Point of Sale Offline-First)" : "Point of Sale (POS) Offline-First System"}
                        </h3>
                        <span className="text-[10px] font-bold text-sky-700 font-mono">• Fullstack Dev</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                        {lang === "id" ? "2024 – Sekarang" : "2024 – Present"}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 leading-snug">
                      {lang === "id"
                        ? "Merancang dan membangun sistem kasir ritel offline-first dengan sinkronisasi data transaksi otomatis ketika online, manajemen barcode scanner kilat, mutasi stok realtime, serta laporan analitik laba-rugi terperinci."
                        : "Architected and built an offline-first retail POS system featuring automated data synchronization upon reconnection, rapid barcode scanning, real-time stock mutation, and comprehensive revenue audit reporting."}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {["Next.js", "Node.js", "Express.js", "MySQL", "Tailwind CSS"].map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[10px] font-mono border border-zinc-200/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Item 2: Raknesia */}
                  <div className="relative pl-4 border-l-2 border-sky-500/50 space-y-1">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white" />
                    
                    <div className="flex items-baseline justify-between gap-1 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-zinc-950">Raknesia (SuratApp - Digital Archive System)</h3>
                        <span className="text-[10px] font-bold text-sky-700 font-mono">• Backend Dev</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                        {lang === "id" ? "2024 – Sekarang" : "2024 – Present"}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 leading-snug">
                      {lang === "id"
                        ? "Mengembangkan platform manajemen arsip surat dan repositori berkas digital berbasis web tingkat instansi (fungsionalitas mirip Google Drive) dengan kontrol akses peran bertingkat (RBAC), enkripsi berkas, dan pencarian metadata cepat."
                        : "Engineered an institutional-grade digital document archiving platform (Google Drive-like functionality) with multi-tier role-based access control (RBAC), encrypted file storage, and high-speed metadata search."}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {["NestJS", "TypeScript", "Prisma ORM", "MySQL", "RESTful API"].map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[10px] font-mono border border-zinc-200/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Item 3: QA & Testing */}
                  <div className="relative pl-4 border-l-2 border-sky-500/50 space-y-1">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white" />
                    
                    <div className="flex items-baseline justify-between gap-1 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-zinc-950">Quality Assurance & API Testing</h3>
                        <span className="text-[10px] font-bold text-sky-700 font-mono">• SIDIGS</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">2025 – 2026</span>
                    </div>

                    <p className="text-xs text-zinc-600 leading-snug">
                      {lang === "id"
                        ? "Melakukan pengujian fungsional modul web end-to-end, validasi integrasi endpoint REST API menggunakan Postman, verifikasi integritas database SQL, serta pelaporan log bug terstruktur untuk meningkatkan reliabilitas aplikasi."
                        : "Conducted end-to-end functional web application testing, REST API integration validation using Postman, SQL database integrity checks, and structured defect tracking to maximize software reliability."}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {["Manual Testing", "Postman", "API Validation", "SQL Debugging"].map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[10px] font-mono border border-zinc-200/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Formal Education */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Pendidikan Formal" : "Formal Education"}
                  </h2>
                </div>
                
                <div className="space-y-2">
                  <div className="relative pl-4 border-l-2 border-sky-500/50 space-y-0.5">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white" />
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="text-xs font-bold text-zinc-950">SMK Telkom Malang</h3>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                        {lang === "id" ? "2024 – Sekarang" : "2024 – Present"}
                      </span>
                    </div>
                    <p className="text-[11px] text-sky-700 font-semibold">
                      {lang === "id" ? "Rekayasa Perangkat Lunak (Software Engineering Major)" : "Software Engineering Major"}
                    </p>
                    <p className="text-xs text-zinc-600 leading-snug">
                      {lang === "id"
                        ? "Mendalami algoritma pemrograman web terstruktur (PHP, JavaScript, TypeScript), arsitektur basis data relasional (MySQL, PostgreSQL), konfigurasi server lokal, serta pengembangan sistem berbasis proyek nyata."
                        : "Specializing in structured web algorithm logic (PHP, JavaScript, TypeScript), relational database architecture (MySQL, PostgreSQL), local server environments, and project-based production software engineering."}
                    </p>
                  </div>

                  <div className="relative pl-4 border-l-2 border-sky-500/50 space-y-0.5">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white" />
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="text-xs font-bold text-zinc-950">SMPN 1 Purwoasri</h3>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">2021 – 2024</span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {lang === "id" ? "Pendidikan Sekolah Menengah Pertama (Lulus dengan predikat memuaskan)" : "Junior High School Education (Graduated with distinction)"}
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Right Column (5 cols) */}
            <div className="md:col-span-5 print:col-span-5 space-y-4">
              
              {/* Technical Skills */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <Code className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Keahlian Teknis" : "Technical Stack"}
                  </h2>
                </div>
                
                <div className="space-y-2 text-xs">
                  {skillGroups.map((group) => (
                    <div key={group.title}>
                      <span className="text-[10.5px] font-bold text-zinc-500 uppercase tracking-wider font-mono block mb-1">
                        {group.title}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {group.skills.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[10.5px] font-medium border border-zinc-200/70">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications & Competitions */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <Award className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Sertifikasi & Prestasi" : "Certifications & Awards"}
                  </h2>
                </div>
                
                <div className="space-y-1.5">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-zinc-50 border border-zinc-200/70 text-xs">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-sky-700 font-mono text-[10px] uppercase">{cert.issuer}</span>
                        <span className="text-zinc-400 font-mono text-[10px]">{cert.year}</span>
                      </div>
                      <p className="font-semibold text-zinc-800 text-[11px] leading-tight">{cert.title}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Core Engineering Competencies */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Kompetensi Utama" : "Core Competencies"}
                  </h2>
                </div>
                
                <ul className="space-y-1 text-xs text-zinc-600">
                  {competencies.map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                      <span className="leading-snug">{comp}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Languages */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Kemampuan Bahasa" : "Languages"}
                  </h2>
                </div>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-zinc-700">Bahasa Indonesia</span>
                    <span className="text-sky-700 font-mono font-semibold text-[10px] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {lang === "id" ? "Penutur Asli (Native)" : "Native Proficiency"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-zinc-700">English</span>
                    <span className="text-sky-700 font-mono font-semibold text-[10px] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {lang === "id" ? "Kerja Profesional" : "Professional Working"}
                    </span>
                  </div>
                </div>
              </section>

            </div>

          </div>
        </div>
      </div>

      {/* Hidden Pristine Fixed A4 Export Container (Strictly 820px x 1160px = Exact A4 ratio for download) */}
      <div 
        aria-hidden="true" 
        style={{ 
          position: "fixed", 
          left: "-9999px", 
          top: 0, 
          width: "820px", 
          height: "1160px", 
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: -9999
        }}
      >
        <div 
          ref={pdfTemplateRef}
          style={{ width: "820px", height: "1160px" }}
          className="bg-white text-zinc-900 p-8 flex flex-col justify-between font-sans"
        >
          <div>
            {/* Header */}
            <header className="pb-3.5 border-b border-zinc-200 flex items-start gap-4">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-zinc-200 shadow-xs ring-4 ring-sky-50 bg-zinc-100 shrink-0">
                <Image 
                  src="/images/logo.png" 
                  alt="Mohammad Kevin" 
                  width={96}
                  height={96}
                  className="w-full h-full object-cover object-top" 
                  priority 
                  unoptimized
                />
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-2xl font-extrabold text-[#1C1B1D] tracking-tight leading-none">
                    Mohammad <span className="text-sky-600">Kevin</span> Arif Rudianto
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold font-mono uppercase tracking-wider">
                    SMK Telkom Malang
                  </span>
                </div>

                <p className="text-xs font-semibold text-zinc-600 font-mono mb-2">
                  Backend & Fullstack Software Engineer
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-600 font-medium pt-1.5 border-t border-zinc-100">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>kvn4.200581@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>+62 821-3158-8846</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>{lang === "id" ? "Malang, Jawa Timur, ID" : "Malang, East Java, ID"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GithubIcon className="w-3 h-3 text-zinc-800 shrink-0" />
                    <span>github.com/MohammadKevin</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>corecraft.my.id</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Quick Metrics Bar */}
            <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-600">
              <span className="font-bold text-zinc-900">2+ {lang === "id" ? "Tahun Pengalaman Praktis" : "Years Experience"}</span>
              <span className="text-zinc-300">•</span>
              <span className="font-bold text-zinc-900">10+ {lang === "id" ? "Proyek Web & API" : "Web & API Projects"}</span>
              <span className="text-zinc-300">•</span>
              <span className="font-bold text-sky-700">Next.js • NestJS • Prisma • PostgreSQL/MySQL</span>
            </div>

            {/* Two Columns Grid */}
            <div className="pt-3 grid grid-cols-12 gap-5">
              
              {/* Left Column (7 cols) */}
              <div className="col-span-7 space-y-3">
                {/* Summary */}
                <section>
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-0.5 mb-1">
                    <Sparkles className="w-3 h-3 text-sky-600" />
                    <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                      {lang === "id" ? "Ringkasan Profesional" : "Professional Summary"}
                    </h2>
                  </div>
                  <p className="text-[10px] leading-relaxed text-zinc-700 bg-zinc-50/70 p-2 rounded-lg border border-zinc-200/60">
                    {lang === "id"
                      ? "Siswa SMK Telkom Malang jurusan Rekayasa Perangkat Lunak dengan dedikasi tinggi pada arsitektur backend andal dan ekosistem fullstack modern (Next.js, NestJS, Prisma ORM, MySQL/PostgreSQL). Berpengalaman membangun sistem Point of Sale (POS) offline-first, platform manajemen arsip digital berbasis cloud, serta integrasi API berkinerja tinggi. Disiplin clean code dan siap berkontribusi profesional dalam program PKL maupun proyek industri."
                      : "Software Engineering student at SMK Telkom Malang dedicated to high-performance backend architecture and modern fullstack systems (Next.js, NestJS, Prisma ORM, MySQL/PostgreSQL). Experienced in engineering offline-first POS cashier systems, institutional digital archive platforms, and modular RESTful APIs. Ready to deliver high-impact value in professional internship programs."}
                  </p>
                </section>

                {/* Experience */}
                <section>
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-0.5 mb-1.5">
                    <Briefcase className="w-3 h-3 text-sky-600" />
                    <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                      {lang === "id" ? "Pengalaman & Proyek Nyata" : "Experience & Production Projects"}
                    </h2>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative pl-3 border-l-2 border-sky-500/40 space-y-0.5">
                      <div className="absolute -left-[4px] top-1 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                      <div className="flex items-baseline justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <h3 className="text-[11px] font-bold text-zinc-950">
                            {lang === "id" ? "Aplikasi Kasir (Point of Sale Offline-First)" : "Point of Sale (POS) Offline-First System"}
                          </h3>
                          <span className="text-[9.5px] font-semibold text-sky-700 font-mono">• Fullstack</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500">{lang === "id" ? "2024 – Sekarang" : "2024 – Present"}</span>
                      </div>
                      <p className="text-[10px] text-zinc-600 leading-tight">
                        {lang === "id"
                          ? "Sistem kasir offline-first dengan sinkronisasi otomatis, barcode scanning kilat, mutasi stok realtime, dan laporan audit penjualan."
                          : "Offline-first POS cashier system with automated synchronization, rapid barcode scanning, real-time stock mutation, and revenue audit reporting."}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {["Next.js", "Node.js", "Express.js", "MySQL"].map((t) => (
                          <span key={t} className="px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700 text-[8.5px] font-mono border border-zinc-200/50">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative pl-3 border-l-2 border-sky-500/40 space-y-0.5">
                      <div className="absolute -left-[4px] top-1 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                      <div className="flex items-baseline justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <h3 className="text-[11px] font-bold text-zinc-950">Raknesia (SuratApp - Digital Archive System)</h3>
                          <span className="text-[9.5px] font-semibold text-sky-700 font-mono">• Backend</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500">{lang === "id" ? "2024 – Sekarang" : "2024 – Present"}</span>
                      </div>
                      <p className="text-[10px] text-zinc-600 leading-tight">
                        {lang === "id"
                          ? "Platform manajemen arsip berkas digital instansi (fitur Google Drive) dengan kontrol akses peran (RBAC) dan enkripsi berkas."
                          : "Institutional digital document archiving platform (Google Drive-like) with role-based access control (RBAC) and encrypted storage."}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {["NestJS", "TypeScript", "Prisma ORM", "MySQL"].map((t) => (
                          <span key={t} className="px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700 text-[8.5px] font-mono border border-zinc-200/50">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative pl-3 border-l-2 border-sky-500/40 space-y-0.5">
                      <div className="absolute -left-[4px] top-1 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                      <div className="flex items-baseline justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <h3 className="text-[11px] font-bold text-zinc-950">Quality Assurance & API Testing</h3>
                          <span className="text-[9.5px] font-semibold text-sky-700 font-mono">• SIDIGS</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500">2025 – 2026</span>
                      </div>
                      <p className="text-[10px] text-zinc-600 leading-tight">
                        {lang === "id"
                          ? "Pengujian fungsional web end-to-end, validasi integrasi endpoint API via Postman, dan pelaporan bug terstruktur."
                          : "End-to-end functional testing, REST API validation via Postman, database integrity checks, and structured bug tracking."}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section>
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-0.5 mb-1">
                    <GraduationCap className="w-3 h-3 text-sky-600" />
                    <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                      {lang === "id" ? "Pendidikan Formal" : "Education"}
                    </h2>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="relative pl-3 border-l-2 border-sky-500/40 space-y-0.5">
                      <div className="absolute -left-[4px] top-1 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                      <div className="flex items-baseline justify-between gap-1">
                        <h3 className="text-[11px] font-bold text-zinc-950">SMK Telkom Malang</h3>
                        <span className="text-[9px] font-mono text-zinc-500">{lang === "id" ? "2024 – Sekarang" : "2024 – Present"}</span>
                      </div>
                      <p className="text-[9.5px] text-sky-600 font-semibold">
                        {lang === "id" ? "Rekayasa Perangkat Lunak" : "Software Engineering Major"}
                      </p>
                      <p className="text-[9.5px] text-zinc-600 leading-tight">
                        {lang === "id"
                          ? "Mempelajari rekayasa perangkat lunak dasar, struktur algoritma pemrograman web terstruktur (PHP & JavaScript), serta konfigurasi server database lokal (MySQL)."
                          : "Studying software engineering fundamentals, structured web algorithm logic (PHP & JavaScript), and local database server configuration (MySQL)."}
                      </p>
                    </div>

                    <div className="relative pl-3 border-l-2 border-sky-500/40 space-y-0.5">
                      <div className="absolute -left-[4px] top-1 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                      <div className="flex items-baseline justify-between gap-1">
                        <h3 className="text-[11px] font-bold text-zinc-950">SMPN 1 Purwoasri</h3>
                        <span className="text-[9px] font-mono text-zinc-500">2021 – 2024</span>
                      </div>
                      <p className="text-[9.5px] text-zinc-500">
                        {lang === "id" ? "Pendidikan Sekolah Menengah Pertama" : "Junior High School Education"}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column (5 cols) */}
              <div className="col-span-5 space-y-3">
                {/* Skills */}
                <section>
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-0.5 mb-1.5">
                    <Code className="w-3 h-3 text-sky-600" />
                    <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                      {lang === "id" ? "Keahlian Teknis" : "Technical Skills"}
                    </h2>
                  </div>
                  
                  <div className="space-y-1.5 text-[9.5px]">
                    {skillGroups.map((group) => (
                      <div key={group.title}>
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider font-mono block mb-0.5">{group.title}</span>
                        <div className="flex flex-wrap gap-1">
                          {group.skills.map((s) => (
                            <span key={s} className="px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-800 text-[9px] font-medium border border-zinc-200/60">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Certifications */}
                <section>
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-0.5 mb-1">
                    <Award className="w-3 h-3 text-sky-600" />
                    <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                      {lang === "id" ? "Sertifikasi & Prestasi" : "Certifications & Awards"}
                    </h2>
                  </div>
                  
                  <div className="space-y-1">
                    {certifications.map((cert, idx) => (
                      <div key={idx} className="p-1 rounded bg-zinc-50 border border-zinc-200/60 text-[9.5px]">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sky-700 font-mono text-[8.5px] uppercase">{cert.issuer}</span>
                          <span className="text-zinc-400 font-mono text-[8.5px]">{cert.year}</span>
                        </div>
                        <p className="font-semibold text-zinc-800 leading-tight">{cert.title}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Competencies */}
                <section>
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-0.5 mb-1">
                    <CheckCircle2 className="w-3 h-3 text-sky-600" />
                    <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                      {lang === "id" ? "Kompetensi Utama" : "Core Competencies"}
                    </h2>
                  </div>
                  
                  <ul className="space-y-0.5 text-[9px] text-zinc-600">
                    {competencies.map((comp, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-sky-500 shrink-0" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Languages */}
                <section>
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-0.5 mb-1">
                    <Globe className="w-3 h-3 text-sky-600" />
                    <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                      {lang === "id" ? "Kemampuan Bahasa" : "Languages"}
                    </h2>
                  </div>
                  
                  <div className="space-y-0.5 text-[9.5px]">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-zinc-700">Bahasa Indonesia</span>
                      <span className="text-sky-700 font-mono font-semibold text-[8.5px] bg-sky-50 px-1 py-0.2 rounded border border-sky-100">Native</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-zinc-700">English</span>
                      <span className="text-sky-700 font-mono font-semibold text-[8.5px] bg-sky-50 px-1 py-0.2 rounded border border-sky-100">
                        {lang === "id" ? "Kerja Profesional" : "Professional Working"}
                      </span>
                    </div>
                  </div>
                </section>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}