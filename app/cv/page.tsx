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
  ExternalLink,
  Code,
  Layers,
  Sparkles
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

export default function CVPage() {
  const { lang } = useLanguage();

  const experiences = timelineLogs.filter(
    (t) => t.type === "project" || t.type === "achievement" || t.type === "magang"
  );
  const academics = timelineLogs.filter((t) => t.type === "academic");
  const topCerts = certificatesData.slice(0, 4);

  const handleDownloadPDF = () => {
    const originalTitle = document.title;
    document.title = lang === "id" ? "CV Mohammad Kevin Arif Rudianto" : "Resume Mohammad Kevin Arif Rudianto";
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900 font-sans print:bg-white print:text-black pt-20 sm:pt-24 pb-16 print:py-0 px-3 sm:px-6">
      {/* Top action toolbar */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center justify-center sm:justify-start gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold rounded-xl text-xs py-2.5 px-4 shadow-2xs transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-500 shrink-0" />
          <span>{lang === "id" ? "Kembali ke Beranda" : "Back to Overview"}</span>
        </Link>
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-bold rounded-xl text-xs py-2.5 px-5 shadow-xs transition-all cursor-pointer whitespace-nowrap"
        >
          <Download className="w-4 h-4 text-white shrink-0" />
          <span>{lang === "id" ? "Unduh PDF" : "Download PDF"}</span>
        </button>
      </div>

      {/* Main CV Document Card */}
      <div className="max-w-4xl mx-auto bg-white border border-zinc-200/90 shadow-lg print:shadow-none print:border-none rounded-3xl print:rounded-none overflow-hidden">
        
        {/* Header with Rounded Photo */}
        <div className="p-6 sm:p-8 md:p-10 border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50/80 to-white print:bg-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            
            {/* Rounded Photo Frame */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-3xl overflow-hidden border-2 border-white shadow-lg ring-4 ring-sky-500/15 bg-zinc-100 shrink-0 group">
              <Image 
                src="/images/logo.png" 
                alt="Mohammad Kevin" 
                fill 
                sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px" 
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                priority 
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left flex flex-col justify-center">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200/70 text-[11px] font-bold font-mono uppercase tracking-wider">
                  SMK Telkom Malang
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200/80 text-[11px] font-semibold">
                  {lang === "id" ? "Tersedia Penuh" : "Open for Opportunities"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C1B1D] tracking-tight leading-tight">
                Mohammad <span className="text-sky-600">Kevin</span> Arif Rudianto
              </h1>
              
              <p className="text-sm sm:text-base font-semibold text-zinc-600 font-mono mt-1">
                {whoamiData.role[lang]}
              </p>

              {/* Contact Links */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 mt-4 pt-4 border-t border-zinc-200/60 text-xs text-zinc-600 font-medium">
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
        </div>

        {/* CV Body Grid */}
        <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Main Column (8 cols) */}
          <div className="md:col-span-8 space-y-8">
            
            {/* Professional Summary */}
            <section>
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 mb-3">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Ringkasan Profesional" : "Professional Summary"}
                </h2>
              </div>
              <div className="bg-zinc-50/70 rounded-2xl p-4 sm:p-5 border border-zinc-200/70">
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  {whoamiData.bio[lang]}
                </p>
              </div>
            </section>

            {/* Experience & Production Work */}
            <section>
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 mb-4">
                <Briefcase className="w-4 h-4 text-sky-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Pengalaman Kerja & Proyek Nyata" : "Experience & Production Work"}
                </h2>
              </div>
              
              <div className="space-y-6">
                {experiences.map((exp) => {
                  const roleTitle = typeof exp.role === "string" ? exp.role : exp.role[lang];
                  const summary = typeof exp.summary === "string" ? exp.summary : exp.summary[lang];

                  return (
                    <div key={exp.id} className="relative pl-5 border-l-2 border-sky-500/30 space-y-2 group">
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500 ring-4 ring-white" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="text-sm font-bold text-zinc-950">
                          {roleTitle}
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-500 font-semibold px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200/60 self-start sm:self-auto">
                          {typeof exp.year === 'string' ? exp.year : (exp.year?.[lang] || exp.year?.id || "")}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-sky-600">
                        {exp.org}
                      </p>

                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {summary}
                      </p>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-1.5 pt-1">
                          {exp.achievements.map((ach, idx) => {
                            const achText = typeof ach === "string" ? ach : ach[lang];
                            return (
                              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                                <span className="text-sky-600 font-bold shrink-0 leading-none mt-0.5">•</span>
                                <span className="leading-relaxed">{achText}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {exp.tech && exp.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.tech.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium border border-zinc-200/60">
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

            {/* Formal Education */}
            <section>
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 mb-4">
                <GraduationCap className="w-4 h-4 text-sky-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Pendidikan Formal" : "Education"}
                </h2>
              </div>
              
              {academics.map((acad) => {
                const roleTitle = typeof acad.role === "string" ? acad.role : acad.role[lang];
                const summary = typeof acad.summary === "string" ? acad.summary : acad.summary[lang];

                return (
                  <div key={acad.id} className="relative pl-5 border-l-2 border-sky-500/30 space-y-1.5">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500 ring-4 ring-white" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-zinc-950">{acad.org}</h3>
                      <span className="text-[11px] font-mono text-zinc-500 font-semibold px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200/60 self-start sm:self-auto">
                        {typeof acad.year === 'string' ? acad.year : (acad.year?.[lang] || acad.year?.id || "")}
                      </span>
                    </div>
                    <p className="text-xs text-sky-600 font-semibold">{roleTitle}</p>
                    <p className="text-xs text-zinc-600 leading-relaxed">{summary}</p>
                  </div>
                );
              })}
            </section>

            {/* Featured Certifications */}
            <section className="print:hidden">
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 mb-4">
                <Award className="w-4 h-4 text-sky-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Sertifikasi Unggulan" : "Featured Certifications"}
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {topCerts.map((cert) => {
                  const title = typeof cert.title === "string" ? cert.title : cert.title[lang];
                  const issuer = typeof cert.issuer === "string" ? cert.issuer : cert.issuer[lang];

                  return (
                    <div key={cert.id} className="p-3.5 rounded-2xl bg-zinc-50/70 border border-zinc-200/70 flex flex-col justify-between hover:bg-zinc-50 transition-all">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-mono font-bold text-sky-700 uppercase">{issuer}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">{cert.date}</span>
                        </div>
                        <h4 className="text-xs font-bold text-zinc-900 leading-tight mb-2">{title}</h4>
                      </div>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:text-sky-700 mt-1"
                        >
                          <span>{lang === "id" ? "Verifikasi Kredensial" : "Verify Credential"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="md:col-span-4 space-y-8">
            
            {/* Technical Skills */}
            <section>
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 mb-3">
                <Code className="w-4 h-4 text-sky-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Keahlian Teknis" : "Technical Skills"}
                </h2>
              </div>
              
              <div className="space-y-4">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="space-y-1.5">
                    <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                      {cat.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200/70 text-zinc-800 text-xs font-medium border border-zinc-200/70 transition-colors"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section>
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 mb-3">
                <Globe className="w-4 h-4 text-sky-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Bahasa" : "Languages"}
                </h2>
              </div>
              
              <div className="space-y-3 text-xs text-zinc-700">
                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Bahasa Indonesia</span>
                    <span className="text-sky-600 font-mono font-semibold">Native</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-sky-600 rounded-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>English</span>
                    <span className="text-sky-600 font-mono font-semibold">Professional Working</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-sky-600 rounded-full" />
                  </div>
                </div>
              </div>
            </section>

            {/* Core Engineering Focus */}
            <section>
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 mb-3">
                <Layers className="w-4 h-4 text-sky-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Fokus Rekayasa" : "Engineering Focus"}
                </h2>
              </div>
              
              <ul className="space-y-2 text-xs text-zinc-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                  <span>High-Performance RESTful API</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                  <span>Relational Database Indexing & Prisma</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                  <span>POS & Inventory Realtime Architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                  <span>Role-Based Access Control (RBAC)</span>
                </li>
              </ul>
            </section>

          </div>

        </div>

      </div>
    </main>
  );
}