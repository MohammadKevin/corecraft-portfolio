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
    <main className="min-h-screen bg-zinc-100 text-zinc-900 font-sans print:bg-white print:text-black pt-20 sm:pt-22 pb-12 print:py-0 px-3 sm:px-6">
      {/* Top action toolbar */}
      <div className="max-w-4xl mx-auto mb-4 flex items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold rounded-xl text-xs py-2 px-3.5 shadow-2xs transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <span>{lang === "id" ? "Kembali" : "Back"}</span>
        </Link>
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-bold rounded-xl text-xs py-2 px-4 shadow-xs transition-all cursor-pointer whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5 text-white shrink-0" />
          <span>{lang === "id" ? "Unduh PDF" : "Download PDF"}</span>
        </button>
      </div>

      {/* Main 1-Page CV Document Card */}
      <div className="max-w-4xl mx-auto bg-white border border-zinc-200/90 shadow-sm print:shadow-none print:border-none rounded-2xl print:rounded-none overflow-hidden text-zinc-900">
        
        {/* Header Strip with Rounded Photo */}
        <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 via-white to-zinc-50/50 print:bg-white print:p-0 print:pb-3">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
            
            {/* Rounded Photo */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border border-white shadow-sm ring-2 ring-sky-500/20 bg-zinc-100 shrink-0">
              <Image 
                src="/images/logo.png" 
                alt="Mohammad Kevin" 
                fill 
                sizes="88px" 
                className="object-cover object-top" 
                priority 
              />
            </div>

            {/* Title & Contact Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C1B1D] tracking-tight leading-none">
                  Mohammad <span className="text-sky-600">Kevin</span> Arif Rudianto
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold font-mono">
                  SMK Telkom Malang
                </span>
              </div>

              <p className="text-xs font-semibold text-zinc-600 font-mono mb-2.5">
                {whoamiData.role[lang]}
              </p>

              {/* Contact Links */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-[11px] text-zinc-600 font-medium pt-1.5 border-t border-zinc-100 print:border-zinc-200">
                <a
                  href={`mailto:${whoamiData.contactLinks.email}`}
                  className="flex items-center gap-1 hover:text-sky-600 transition-colors shrink-0"
                >
                  <Mail className="w-3 h-3 text-sky-600 shrink-0" />
                  <span>{whoamiData.contactLinks.email}</span>
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
                  <span>{whoamiData.location}</span>
                </span>
                <a
                  href={whoamiData.contactLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-sky-600 transition-colors shrink-0"
                >
                  <GithubIcon className="w-3 h-3 text-zinc-800 shrink-0" />
                  <span>github.com/MohammadKevin</span>
                </a>
                <a
                  href={whoamiData.contactLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-sky-600 transition-colors shrink-0"
                >
                  <LinkedinIcon className="w-3 h-3 text-[#0A66C2] shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CV Body Grid */}
        <div className="px-5 py-4 sm:px-7 sm:py-5 grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-5 sm:gap-6 print:gap-4 print:p-0 print:pt-3">
          
          {/* Main Column (7 cols) */}
          <div className="md:col-span-7 print:col-span-7 space-y-4 print:space-y-3">
            
            {/* Professional Summary */}
            <section>
              <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Ringkasan Profesional" : "Professional Summary"}
                </h2>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-700 bg-zinc-50/60 p-2.5 rounded-xl border border-zinc-200/60 print:p-0 print:bg-transparent print:border-none">
                {whoamiData.bio[lang]}
              </p>
            </section>

            {/* Experience */}
            <section>
              <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Pengalaman & Proyek" : "Experience & Projects"}
                </h2>
              </div>
              
              <div className="space-y-2.5">
                {experiences.map((exp) => {
                  const roleTitle = typeof exp.role === "string" ? exp.role : exp.role[lang];
                  const summary = typeof exp.summary === "string" ? exp.summary : exp.summary[lang];

                  return (
                    <div key={exp.id} className="relative pl-3.5 border-l-2 border-sky-500/40 space-y-0.5">
                      <div className="absolute -left-[4.5px] top-1 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                      
                      <div className="flex items-baseline justify-between gap-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-xs font-bold text-zinc-950">{roleTitle}</h3>
                          <span className="text-[10px] font-bold text-sky-700 font-mono">• {exp.org}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                          {typeof exp.year === 'string' ? exp.year : (exp.year?.[lang] || exp.year?.id || "")}
                        </span>
                      </div>

                      <p className="text-[11px] text-zinc-600 leading-tight">
                        {summary}
                      </p>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-0.5 pt-0.5">
                          {exp.achievements.map((ach, idx) => {
                            const achText = typeof ach === "string" ? ach : ach[lang];
                            return (
                              <li key={idx} className="flex items-start gap-1.5 text-[10.5px] text-zinc-700 leading-tight">
                                <span className="text-sky-600 font-bold shrink-0 mt-0.5 leading-none">•</span>
                                <span>{achText}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {exp.tech && exp.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {exp.tech.map((t, idx) => (
                            <span key={idx} className="px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600 text-[9.5px] font-mono">
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
              <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Pendidikan Formal" : "Education"}
                </h2>
              </div>
              
              {academics.map((acad) => {
                const roleTitle = typeof acad.role === "string" ? acad.role : acad.role[lang];
                const summary = typeof acad.summary === "string" ? acad.summary : acad.summary[lang];

                return (
                  <div key={acad.id} className="relative pl-3.5 border-l-2 border-sky-500/40 space-y-0.5">
                    <div className="absolute -left-[4.5px] top-1 w-1.5 h-1.5 rounded-full bg-sky-500 ring-2 ring-white" />
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="text-xs font-bold text-zinc-950">{acad.org}</h3>
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                        {typeof acad.year === 'string' ? acad.year : (acad.year?.[lang] || acad.year?.id || "")}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-sky-600 font-semibold">{roleTitle}</p>
                    <p className="text-[10.5px] text-zinc-600 leading-tight">{summary}</p>
                  </div>
                );
              })}
            </section>

          </div>

          {/* Sidebar Column (5 cols) */}
          <div className="md:col-span-5 print:col-span-5 space-y-3.5 print:space-y-3">
            
            {/* Technical Skills */}
            <section>
              <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-2">
                <Code className="w-3.5 h-3.5 text-sky-600" />
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Keahlian Teknis" : "Technical Skills"}
                </h2>
              </div>
              
              <div className="space-y-2">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono block">
                      {cat.title}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[10px] font-medium border border-zinc-200/60"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-1.5">
                <Award className="w-3.5 h-3.5 text-sky-600" />
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Sertifikasi Utama" : "Key Certifications"}
                </h2>
              </div>
              
              <div className="space-y-1.5">
                {topCerts.map((cert) => {
                  const title = typeof cert.title === "string" ? cert.title : cert.title[lang];
                  const issuer = typeof cert.issuer === "string" ? cert.issuer : cert.issuer[lang];

                  return (
                    <div key={cert.id} className="p-1.5 rounded-lg bg-zinc-50 border border-zinc-200/60 text-[10.5px]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sky-700 font-mono text-[9.5px] uppercase">{issuer}</span>
                        <span className="text-zinc-400 font-mono text-[9px]">{cert.date}</span>
                      </div>
                      <p className="font-semibold text-zinc-800 leading-tight">{title}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Languages */}
            <section>
              <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Bahasa" : "Languages"}
                </h2>
              </div>
              
              <div className="space-y-1.5 text-[10.5px]">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-zinc-700">Bahasa Indonesia</span>
                  <span className="text-sky-700 font-mono font-semibold text-[9.5px] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-zinc-700">English</span>
                  <span className="text-sky-700 font-mono font-semibold text-[9.5px] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">Professional</span>
                </div>
              </div>
            </section>

            {/* Engineering Focus */}
            <section>
              <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-1 mb-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono">
                  {lang === "id" ? "Fokus Rekayasa" : "Engineering Focus"}
                </h2>
              </div>
              
              <ul className="space-y-1 text-[10.5px] text-zinc-600">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-sky-500 shrink-0" />
                  <span>High-Performance RESTful API</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-sky-500 shrink-0" />
                  <span>Relational Database & Prisma ORM</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-sky-500 shrink-0" />
                  <span>POS & Digital Archive Architecture</span>
                </li>
              </ul>
            </section>

          </div>

        </div>

      </div>
    </main>
  );
}