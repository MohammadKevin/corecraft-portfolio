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
  Loader2
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CVPage() {
  const { lang } = useLanguage();
  const cvRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDirectDownloadPDF = async () => {
    if (!cvRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      const original = cvRef.current;
      const clone = original.cloneNode(true) as HTMLElement;

      // Position clone off-screen with fixed standard A4 proportions
      clone.style.position = "fixed";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.width = "820px";
      clone.style.minHeight = "1140px";
      clone.style.padding = "32px 36px";
      clone.style.borderRadius = "0";
      clone.style.boxShadow = "none";
      clone.style.border = "none";
      clone.style.background = "#ffffff";
      clone.style.zIndex = "-9999";

      // Ensure 2-column layout in export regardless of user screen size
      const grid = clone.querySelector(".cv-grid") as HTMLElement;
      if (grid) {
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(12, minmax(0, 1fr))";
        grid.style.gap = "24px";
      }
      const colLeft = clone.querySelector(".cv-col-left") as HTMLElement;
      if (colLeft) {
        colLeft.style.gridColumn = "span 7 / span 7";
      }
      const colRight = clone.querySelector(".cv-col-right") as HTMLElement;
      if (colRight) {
        colRight.style.gridColumn = "span 5 / span 5";
      }

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: 820,
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
      pdf.save(`CV_Mohammad_Kevin_${lang === "id" ? "ID" : "EN"}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const certifications = [
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
    {
      issuer: "Dicoding Indonesia",
      title: "Introduction to Financial Literacy",
      year: "2026",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-200/70 text-zinc-900 font-sans print:bg-white print:text-black pt-20 sm:pt-24 pb-16 print:p-0 px-3 sm:px-6">
      {/* Top action toolbar */}
      <div className="max-w-[850px] mx-auto mb-4 flex items-center justify-between gap-2.5 print:hidden">
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

      {/* Full A4 Resume Document Sheet */}
      <div 
        ref={cvRef}
        className="cv-a4-sheet max-w-[850px] mx-auto bg-white border border-zinc-200 shadow-xl rounded-2xl p-5 sm:p-7 md:p-9 flex flex-col justify-between"
      >
        <div>
          {/* Header Section */}
          <header className="pb-4 border-b border-zinc-200">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
              
              {/* Rounded Photo Frame */}
              <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm ring-4 ring-sky-50 bg-zinc-100 shrink-0">
                <Image 
                  src="/images/logo.png" 
                  alt="Mohammad Kevin" 
                  fill 
                  sizes="104px" 
                  className="object-cover object-top" 
                  priority 
                />
              </div>

              {/* Profile Details */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1C1B1D] tracking-tight leading-none">
                    Mohammad <span className="text-sky-600">Kevin</span> Arif Rudianto
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold font-mono uppercase tracking-wider">
                    SMK Telkom Malang
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-zinc-600 font-mono mb-2">
                  Fullstack & Backend Software Engineer
                </p>

                {/* Contact Links */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3.5 sm:gap-x-4 gap-y-1.5 text-[11px] text-zinc-600 font-medium pt-1.5 border-t border-zinc-100">
                  <a
                    href="mailto:kvn4.200581@gmail.com"
                    className="flex items-center gap-1 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <Mail className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>kvn4.200581@gmail.com</span>
                  </a>
                  <a
                    href="https://wa.me/6282131588846"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <Phone className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>+62 821-3158-8846</span>
                  </a>
                  <span className="flex items-center gap-1 shrink-0">
                    <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>{lang === "id" ? "Malang, Jawa Timur" : "Malang, East Java, ID"}</span>
                  </span>
                  <a
                    href="https://github.com/MohammadKevin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <GithubIcon className="w-3 h-3 text-zinc-800 shrink-0" />
                    <span>github.com/MohammadKevin</span>
                  </a>
                  <a
                    href="https://www.corecraft.my.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <Globe className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>corecraft.my.id</span>
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Main Two-Column Grid */}
          <div className="cv-grid pt-3.5 grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-5 sm:gap-6">
            
            {/* Left Column (7 cols) */}
            <div className="cv-col-left md:col-span-7 print:col-span-7 space-y-3.5">
              
              {/* Professional Summary */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Ringkasan Profesional" : "Professional Summary"}
                  </h2>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-700 bg-zinc-50/70 p-2.5 rounded-xl border border-zinc-200/60 print:bg-transparent print:p-0 print:border-none">
                  {lang === "id"
                    ? "Siswa SMK Telkom Malang jurusan Rekayasa Perangkat Lunak dengan dedikasi tinggi pada pengembangan aplikasi web Fullstack & Backend. Berpengalaman merancang arsitektur API modular, mengelola basis data relasional (MySQL), serta membangun solusi sistem kasir (POS) dan arsip digital tingkat instansi. Memiliki pemikiran analitis, teliti, adaptif, dan siap berkontribusi secara profesional melalui Praktik Kerja Lapangan (PKL) maupun proyek industri."
                    : "Software Engineering student at SMK Telkom Malang dedicated to Fullstack & Backend web development. Experienced in architecting modular APIs, managing relational databases (MySQL), and engineering enterprise-grade POS and digital archive solutions. Highly analytical, detail-oriented, adaptable, and eager to contribute through professional internship programs and engineering projects."}
                </p>
              </section>

              {/* Experience & Key Projects */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Pengalaman & Proyek Nyata" : "Experience & Key Projects"}
                  </h2>
                </div>
                
                <div className="space-y-2.5">
                  {/* Item 1: POS Cashier */}
                  <div className="relative pl-3.5 border-l-2 border-sky-500/40 space-y-0.5">
                    <div className="absolute -left-[4.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                    
                    <div className="flex items-baseline justify-between gap-1 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-zinc-950">
                          {lang === "id" ? "Aplikasi Kasir (Point of Sale)" : "Point of Sale (POS) Application"}
                        </h3>
                        <span className="text-[10px] font-semibold text-sky-700 font-mono">• Fullstack Dev</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                        {lang === "id" ? "2024 – Sekarang" : "2024 – Present"}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-600 leading-snug">
                      {lang === "id"
                        ? "Mengembangkan sistem kasir offline-first dengan sinkronisasi data otomatis untuk manajemen transaksi yang efisien, pencatatan mutasi stok cepat, dan laporan audit penjualan."
                        : "Developed an offline-first POS cashier system with automated data synchronization for seamless transaction workflows, real-time stock mutation, and sales audit reporting."}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {["Node.js", "Express.js", "Next.js", "MySQL"].map((t) => (
                        <span key={t} className="px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700 text-[9.5px] font-mono border border-zinc-200/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Item 2: Raknesia */}
                  <div className="relative pl-3.5 border-l-2 border-sky-500/40 space-y-0.5">
                    <div className="absolute -left-[4.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                    
                    <div className="flex items-baseline justify-between gap-1 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-zinc-950">Raknesia (SuratApp - Digital Archive)</h3>
                        <span className="text-[10px] font-semibold text-sky-700 font-mono">• Backend Dev</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                        {lang === "id" ? "2024 – Sekarang" : "2024 – Present"}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-600 leading-snug">
                      {lang === "id"
                        ? "Membangun aplikasi manajemen arsip dan penyimpanan dokumen digital berbasis web (fungsionalitas mirip Google Drive) dengan kontrol akses peran (RBAC) tingkat instansi."
                        : "Engineered a web-based digital archiving and file storage platform (similar to Google Drive) with role-based access control (RBAC) and structured metadata indexing for institutions."}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {["NestJS", "Prisma ORM", "MySQL", "REST API"].map((t) => (
                        <span key={t} className="px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700 text-[9.5px] font-mono border border-zinc-200/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Item 3: QA & Testing */}
                  <div className="relative pl-3.5 border-l-2 border-sky-500/40 space-y-0.5">
                    <div className="absolute -left-[4.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                    
                    <div className="flex items-baseline justify-between gap-1 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-zinc-950">Quality Assurance & API Testing</h3>
                        <span className="text-[10px] font-semibold text-sky-700 font-mono">• SIDIGS</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">2025 – 2026</span>
                    </div>

                    <p className="text-[11px] text-zinc-600 leading-snug">
                      {lang === "id"
                        ? "Melakukan pengujian aplikasi fungsional, validasi endpoint API menggunakan Postman, debugging query, dan pelaporan bug terstruktur."
                        : "Executed functional testing, REST API endpoint validation via Postman, query debugging, and structured bug tracking to ensure software reliability."}
                    </p>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Pendidikan Formal" : "Education"}
                  </h2>
                </div>
                
                <div className="space-y-2">
                  <div className="relative pl-3.5 border-l-2 border-sky-500/40 space-y-0.5">
                    <div className="absolute -left-[4.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="text-xs font-bold text-zinc-950">SMK Telkom Malang</h3>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                        {lang === "id" ? "2024 – Sekarang" : "2024 – Present"}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-sky-600 font-semibold">
                      {lang === "id" ? "Rekayasa Perangkat Lunak (Software Engineering)" : "Software Engineering Major"}
                    </p>
                    <p className="text-[10.5px] text-zinc-600 leading-tight">
                      {lang === "id"
                        ? "Mempelajari rekayasa perangkat lunak dasar, struktur algoritma pemrograman web terstruktur (PHP & JavaScript), serta konfigurasi server database lokal (MySQL)."
                        : "Studying software engineering fundamentals, structured web algorithm logic (PHP & JavaScript), and local database server configuration (MySQL)."}
                    </p>
                  </div>

                  <div className="relative pl-3.5 border-l-2 border-sky-500/40 space-y-0.5">
                    <div className="absolute -left-[4.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="text-xs font-bold text-zinc-950">SMPN 1 Purwoasri</h3>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">2021 – 2024</span>
                    </div>
                    <p className="text-[10.5px] text-zinc-500">
                      {lang === "id" ? "Pendidikan Sekolah Menengah Pertama" : "Junior High School Education"}
                    </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Right Column (5 cols) */}
            <div className="cv-col-right md:col-span-5 print:col-span-5 space-y-3.5">
              
              {/* Technical Skills */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <Code className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Keahlian Teknis" : "Technical Skills"}
                  </h2>
                </div>
                
                <div className="space-y-2 text-[10.5px]">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono block mb-1">
                      Frontend
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Bootstrap"].map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[10px] font-medium border border-zinc-200/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono block mb-1">
                      Backend & API
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {["Node.js", "Express.js", "NestJS", "PHP", "RESTful API"].map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[10px] font-medium border border-zinc-200/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono block mb-1">
                      Database & ORM
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {["MySQL", "PostgreSQL", "Prisma ORM"].map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[10px] font-medium border border-zinc-200/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono block mb-1">
                      Tools & Workflow
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {["Git", "GitHub", "Postman", "Linux", "VS Code"].map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[10px] font-medium border border-zinc-200/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Certifications & Competitions */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-1.5">
                  <Award className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Sertifikasi & Prestasi" : "Certifications & Awards"}
                  </h2>
                </div>
                
                <div className="space-y-1.5">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="p-1.5 rounded-lg bg-zinc-50 border border-zinc-200/60 text-[10.5px]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sky-700 font-mono text-[9.5px] uppercase">{cert.issuer}</span>
                        <span className="text-zinc-400 font-mono text-[9px]">{cert.year}</span>
                      </div>
                      <p className="font-semibold text-zinc-800 leading-tight">{cert.title}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Core Competencies */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Kompetensi Utama" : "Core Competencies"}
                  </h2>
                </div>
                
                <ul className="space-y-1 text-[10.5px] text-zinc-600">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span>{lang === "id" ? "Pengembangan Aplikasi Web Fullstack" : "Fullstack Web Application Development"}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span>{lang === "id" ? "Pemecahan Masalah & Debugging Cepat" : "Problem Solving & Efficient Debugging"}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span>{lang === "id" ? "Pengujian API & Integrasi (Postman)" : "API Testing & Integration (Postman)"}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span>{lang === "id" ? "Kolaborasi Tim & Komunikasi Terstruktur" : "Teamwork & Structured Communication"}</span>
                  </li>
                </ul>
              </section>

              {/* Languages */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-1.5">
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Bahasa" : "Languages"}
                  </h2>
                </div>
                
                <div className="space-y-1 text-[10.5px]">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-zinc-700">Bahasa Indonesia</span>
                    <span className="text-sky-700 font-mono font-semibold text-[9.5px] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">Native</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-zinc-700">English</span>
                    <span className="text-sky-700 font-mono font-semibold text-[9.5px] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                      {lang === "id" ? "Kerja Profesional" : "Professional Working"}
                    </span>
                  </div>
                </div>
              </section>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}