"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { whoamiData } from "@/data/whoami";
import { timelineLogs } from "@/data/timeline";
import { skillCategories } from "@/data/skills";
import { certificatesData } from "@/data/certificates";
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
  Layers,
  ExternalLink
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

export default function CVPage() {
  const { lang } = useLanguage();

  const experiences = timelineLogs.filter(
    (t) => t.type === "project" || t.type === "achievement" || t.type === "magang"
  );
  const academics = timelineLogs.filter((t) => t.type === "academic");
  const topCerts = certificatesData.slice(0, 3);

  const handleDownloadPDF = () => {
    const originalTitle = document.title;
    document.title = lang === "id" ? "CV Mohammad Kevin Arif Rudianto" : "Resume Mohammad Kevin Arif Rudianto";
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-zinc-200/70 text-zinc-900 font-sans print:bg-white print:text-black pt-20 sm:pt-24 pb-16 print:p-0 px-3 sm:px-6">
      {/* Top action toolbar */}
      <div className="max-w-[850px] mx-auto mb-5 flex items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold rounded-xl text-xs py-2 px-4 shadow-xs transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <span>{lang === "id" ? "Kembali ke Beranda" : "Back to Overview"}</span>
        </Link>
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-bold rounded-xl text-xs py-2 px-5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5 text-white shrink-0" />
          <span>{lang === "id" ? "Unduh PDF" : "Download PDF"}</span>
        </button>
      </div>

      {/* Full A4 Resume Document Sheet */}
      <div className="cv-a4-sheet max-w-[850px] mx-auto bg-white border border-zinc-200 shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between">
        <div>
          {/* Header Section with Photo & Profile */}
          <header className="pb-4 border-b border-zinc-200">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              
              {/* Rounded Photo Frame */}
              <div className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm ring-4 ring-sky-50 bg-zinc-100 shrink-0">
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
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1D] tracking-tight leading-none">
                    Mohammad <span className="text-sky-600">Kevin</span> Arif Rudianto
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold font-mono uppercase tracking-wider">
                    SMK Telkom Malang
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-zinc-600 font-mono mb-2.5">
                  {whoamiData.role[lang]}
                </p>

                {/* Contact Links */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-zinc-600 font-medium pt-2 border-t border-zinc-100">
                  <a
                    href={`mailto:${whoamiData.contactLinks.email}`}
                    className="flex items-center gap-1.5 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{whoamiData.contactLinks.email}</span>
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
                    <span>{whoamiData.location}</span>
                  </span>
                  <a
                    href={whoamiData.contactLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
                    <span>github.com/MohammadKevin</span>
                  </a>
                  <a
                    href={whoamiData.contactLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-sky-600 transition-colors shrink-0"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Two-Column Grid */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-6 sm:gap-7">
            
            {/* Left Main Column (7 cols) */}
            <div className="md:col-span-7 print:col-span-7 space-y-4">
              
              {/* Professional Summary */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Ringkasan Profesional" : "Professional Summary"}
                  </h2>
                </div>
                <p className="text-xs leading-relaxed text-zinc-700 bg-zinc-50/70 p-3 rounded-xl border border-zinc-200/60 print:bg-transparent print:p-0 print:border-none">
                  {whoamiData.bio[lang]}
                </p>
              </section>

              {/* Experience */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2.5">
                  <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Pengalaman Kerja & Proyek" : "Experience & Production Work"}
                  </h2>
                </div>
                
                <div className="space-y-3">
                  {experiences.map((exp) => {
                    const roleTitle = typeof exp.role === "string" ? exp.role : exp.role[lang];
                    const summary = typeof exp.summary === "string" ? exp.summary : exp.summary[lang];

                    return (
                      <div key={exp.id} className="relative pl-4 border-l-2 border-sky-500/40 space-y-1">
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white" />
                        
                        <div className="flex items-baseline justify-between gap-1 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-xs font-bold text-zinc-950">{roleTitle}</h3>
                            <span className="text-[11px] font-semibold text-sky-700 font-mono">• {exp.org}</span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                            {typeof exp.year === 'string' ? exp.year : (exp.year?.[lang] || exp.year?.id || "")}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-600 leading-snug">
                          {summary}
                        </p>

                        {exp.achievements && exp.achievements.length > 0 && (
                          <ul className="space-y-0.5 pt-0.5">
                            {exp.achievements.map((ach, idx) => {
                              const achText = typeof ach === "string" ? ach : ach[lang];
                              return (
                                <li key={idx} className="flex items-start gap-1.5 text-xs text-zinc-700 leading-snug">
                                  <span className="text-sky-600 font-bold shrink-0 leading-none mt-0.5">•</span>
                                  <span>{achText}</span>
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {exp.tech && exp.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {exp.tech.map((t, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[10px] font-mono border border-zinc-200/50">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Education */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Pendidikan Formal" : "Education"}
                  </h2>
                </div>
                
                {academics.map((acad) => {
                  const roleTitle = typeof acad.role === "string" ? acad.role : acad.role[lang];
                  const summary = typeof acad.summary === "string" ? acad.summary : acad.summary[lang];

                  return (
                    <div key={acad.id} className="relative pl-4 border-l-2 border-sky-500/40 space-y-1">
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white" />
                      <div className="flex items-baseline justify-between gap-1">
                        <h3 className="text-xs font-bold text-zinc-950">{acad.org}</h3>
                        <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                          {typeof acad.year === 'string' ? acad.year : (acad.year?.[lang] || acad.year?.id || "")}
                        </span>
                      </div>
                      <p className="text-xs text-sky-600 font-semibold">{roleTitle}</p>
                      <p className="text-xs text-zinc-600 leading-snug">{summary}</p>
                    </div>
                  );
                })}
              </section>

            </div>

            {/* Right Sidebar Column (5 cols) */}
            <div className="md:col-span-5 print:col-span-5 space-y-4">
              
              {/* Technical Skills */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2.5">
                  <Code className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Keahlian Teknis" : "Technical Skills"}
                  </h2>
                </div>
                
                <div className="space-y-2.5">
                  {skillCategories.map((cat) => (
                    <div key={cat.id} className="space-y-1">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono block">
                        {cat.title}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[11px] font-medium border border-zinc-200/60"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Key Certifications */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <Award className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Sertifikasi Unggulan" : "Key Certifications"}
                  </h2>
                </div>
                
                <div className="space-y-1.5">
                  {topCerts.map((cert) => {
                    const title = typeof cert.title === "string" ? cert.title : cert.title[lang];
                    const issuer = typeof cert.issuer === "string" ? cert.issuer : cert.issuer[lang];

                    return (
                      <div key={cert.id} className="p-2 rounded-lg bg-zinc-50 border border-zinc-200/60 text-xs">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-sky-700 font-mono text-[10px] uppercase">{issuer}</span>
                          <span className="text-zinc-400 font-mono text-[10px]">{cert.date}</span>
                        </div>
                        <p className="font-semibold text-zinc-800 text-[11px] leading-tight">{title}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Languages */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Bahasa" : "Languages"}
                  </h2>
                </div>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-zinc-700">Bahasa Indonesia</span>
                    <span className="text-sky-700 font-mono font-semibold text-[10px] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">Native</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-zinc-700">English</span>
                    <span className="text-sky-700 font-mono font-semibold text-[10px] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">Professional</span>
                  </div>
                </div>
              </section>

              {/* Engineering Focus */}
              <section>
                <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                    {lang === "id" ? "Fokus Rekayasa" : "Engineering Focus"}
                  </h2>
                </div>
                
                <ul className="space-y-1 text-xs text-zinc-600">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span>High-Performance RESTful API</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span>Relational DB Tuning & Prisma ORM</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span>POS & Digital Archive Architecture</span>
                  </li>
                </ul>
              </section>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}