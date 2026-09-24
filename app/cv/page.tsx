"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { whoamiData } from "@/data/whoami";
import { timelineLogs } from "@/data/timeline";
import { skillCategories } from "@/data/skills";
import {
  Mail,
  Phone,
  MapPin,
  Printer,
  ArrowLeft,
  Download,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";

export default function CVPage() {
  const { lang } = useLanguage();

  const experiences = timelineLogs.filter(
    (t) => t.type === "project" || t.type === "achievement" || t.type === "magang"
  );
  const academics = timelineLogs.filter((t) => t.type === "academic");

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900 font-sans print:bg-white print:text-black pt-24 pb-12 print:py-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center justify-center sm:justify-start gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold rounded-xl text-xs py-2 px-3.5 shadow-2xs transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-500" />
          <span>{lang === "id" ? "Kembali ke Beranda" : "Back to Overview"}</span>
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="/CV%20Mohammad%20Kevin.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="CV Mohammad Kevin.pdf"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold rounded-xl text-xs py-2 px-3.5 shadow-2xs transition-all"
          >
            <Download className="w-4 h-4 text-zinc-500" />
            <span>Download PDF</span>
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-98 text-white font-bold rounded-xl text-xs py-2 px-3.5 shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>{lang === "id" ? "Cetak CV" : "Print Resume"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-zinc-200/80 shadow-sm print:shadow-none print:border-none rounded-2xl print:rounded-none overflow-hidden">
        <div className="px-5 sm:px-10 py-6 sm:py-10 border-b border-zinc-200/80 bg-zinc-50/50 print:bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
                Mohammad <span className="text-sky-600">Kevin</span> Arif Rudianto
              </h1>
              <p className="text-sm sm:text-lg font-semibold text-zinc-700 font-mono mt-1">
                {whoamiData.role[lang]}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200/60 text-xs font-semibold">
                SMK Telkom Malang
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-xs text-zinc-600 font-medium">
            <a
              href={`mailto:${whoamiData.contactLinks.email}`}
              className="flex items-center gap-1.5 hover:text-sky-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              <span>{whoamiData.contactLinks.email}</span>
            </a>
            <a
              href="https://wa.me/6282131588846"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-sky-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>+62 821-3158-8846</span>
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>{whoamiData.location}</span>
            </span>
            <a
              href={whoamiData.contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-sky-600 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-zinc-800" />
              <span>github.com/MohammadKevin</span>
            </a>
          </div>
        </div>

        <div className="px-5 sm:px-10 py-6 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          <div className="md:col-span-8 space-y-8">
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-2 mb-3 font-mono">
                {lang === "id" ? "Ringkasan Profesional" : "Professional Summary"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {whoamiData.bio[lang]}
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-2 mb-4 font-mono">
                {lang === "id" ? "Pengalaman & Proyek Nyata" : "Experience & Production Work"}
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => {
                  const roleTitle = typeof exp.role === "string" ? exp.role : exp.role[lang];
                  const summary = typeof exp.summary === "string" ? exp.summary : exp.summary[lang];

                  return (
                    <div key={exp.id} className="space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-zinc-950">
                          {roleTitle}
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-500 font-semibold">
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
                        <ul className="space-y-1 pt-1">
                          {exp.achievements.map((ach, idx) => {
                            const achText = typeof ach === "string" ? ach : ach[lang];
                            return (
                              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                                <span className="text-sky-600 font-bold">•</span>
                                <span>{achText}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-2 mb-4 font-mono">
                {lang === "id" ? "Pendidikan Formal" : "Education"}
              </h2>
              {academics.map((acad) => {
                const roleTitle = typeof acad.role === "string" ? acad.role : acad.role[lang];
                const summary = typeof acad.summary === "string" ? acad.summary : acad.summary[lang];

                return (
                  <div key={acad.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-zinc-950">{acad.org}</h3>
                      <span className="text-[11px] font-mono text-zinc-500 font-semibold">
                        {typeof acad.year === 'string' ? acad.year : (acad.year?.[lang] || acad.year?.id || "")}
                      </span>
                    </div>
                    <p className="text-xs text-sky-600 font-medium">{roleTitle}</p>
                    <p className="text-xs text-zinc-600">{summary}</p>
                  </div>
                );
              })}
            </section>

          </div>

          <div className="md:col-span-4 space-y-8">
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-2 mb-3 font-mono">
                {lang === "id" ? "Keahlian Teknis" : "Technical Skills"}
              </h2>
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
                          className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200/70"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-2 mb-3 font-mono">
                Languages
              </h2>
              <div className="space-y-2 text-xs text-zinc-700">
                <div className="flex justify-between">
                  <span className="font-medium">Bahasa Indonesia</span>
                  <span className="text-zinc-500 font-mono">Native</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">English</span>
                  <span className="text-zinc-500 font-mono">Professional Working</span>
                </div>
              </div>
            </section>

          </div>

        </div>

      </div>
    </main>
  );
}
