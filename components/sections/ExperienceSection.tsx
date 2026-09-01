"use client";

import {
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  Calendar,
  Building,
} from "lucide-react";
import { timelineLogs } from "@/data/timeline";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ExperienceSection() {
  const { lang } = useLanguage();

  return (
    <section id="experience" className="py-16 sm:py-24 bg-zinc-50/70 border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-sky-800 text-xs font-extrabold shadow-2xs mb-3.5">
            <Briefcase className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="tracking-wide font-bold">{lang === "id" ? "Pengalaman & Riwayat" : "Career & Milestone Track"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
            {lang === "id" ? "Perjalanan Profesional" : "Experience & Milestones"}
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm md:text-base mt-2">
            {lang === "id"
              ? "Rekam jejak praktis mulai dari kontribusi magang industri, proyek independen, hingga pendidikan formal."
              : "A transparent timeline of industrial internship, freelance deliverables, and academic foundation."}
          </p>
        </div>

        {/* Vertical Editorial Timeline */}
        <div className="relative border-l-2 border-zinc-300 ml-4 sm:ml-32 space-y-8 sm:space-y-10">
          {timelineLogs.map((log) => {
            const roleText = typeof log.role === "string" ? log.role : log.role[lang];
            const summaryText = typeof log.summary === "string" ? log.summary : log.summary[lang];

            return (
              <div key={log.id} className="relative pl-6 sm:pl-8 group">
                
                {/* Timeline Dot Marker */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-sky-500 shadow-2xs group-hover:scale-110 group-hover:border-sky-600 transition-transform" />

                {/* Left Year Label for Desktop Viewports */}
                <div className="hidden sm:block absolute -left-36 top-1 w-28 text-right">
                  <span className="text-xs font-mono font-bold text-zinc-900 bg-white px-2.5 py-1 rounded-md border border-zinc-300 shadow-2xs">
                    {log.year}
                  </span>
                </div>

                {/* Card Body */}
                <div className="bg-white p-5 sm:p-6 rounded-[14px] border border-zinc-300 shadow-2xs hover:border-sky-500 hover:shadow-xs transition-all duration-150">
                  
                  {/* Mobile Year Badge */}
                  <div className="sm:hidden mb-2">
                    <span className="text-[11px] font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                      {log.year}
                    </span>
                  </div>

                  {/* Role and Organization */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-950">
                        {roleText}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-sky-600 flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5" />
                        <span>{log.org}</span>
                      </p>
                    </div>

                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 text-[11px] capitalize font-semibold">
                      {log.type}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                    {summaryText}
                  </p>

                  {/* Achievements Checkpoints */}
                  {log.achievements && log.achievements.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-zinc-100 mb-4">
                      {log.achievements.map((ach, aIdx) => {
                        const achText = typeof ach === "string" ? ach : ach[lang];
                        return (
                          <div key={aIdx} className="flex items-start gap-2 text-xs text-zinc-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                            <span className="font-medium">{achText}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Tech stack */}
                  {log.tech && log.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {log.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-zinc-50 text-zinc-700 font-mono text-[11px] border border-zinc-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
