"use client";

import { useState } from "react";
import {
  Server,
  Database,
  Code2,
  Wrench,
  CheckCircle2,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { skillCategories, SkillCategory } from "@/data/skills";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryIcons: Record<string, React.ReactNode> = {
  backend: <Server className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  frontend: <Code2 className="w-4 h-4" />,
  tooling: <Wrench className="w-4 h-4" />,
};

export default function TechStack() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("backend");

  const activeCategory = skillCategories.find((c) => c.id === activeTab) || skillCategories[0];

  return (
    <section id="stack" className="py-16 sm:py-24 bg-zinc-50/70 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-sky-800 text-xs font-extrabold shadow-2xs mb-3.5">
              <Code2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="tracking-wide font-bold">{lang === "id" ? "Teknologi & Stack" : "Engineered Tech Stack"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
              {lang === "id" ? "Keahlian & Bukti Nyata" : "Mastery & Production Provenance"}
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm md:text-base mt-2 max-w-xl">
              {lang === "id"
                ? "Bukan sekadar daftar nama tools — setiap teknologi didukung oleh pengalaman implementasi di sistem nyata."
                : "Not just a passive list of keywords — every framework and database is backed by production deliverables."}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-white rounded-xl border border-zinc-200 shadow-2xs self-start md:self-auto">
            {skillCategories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-sky-50 text-sky-800 shadow-2xs font-bold border border-sky-200"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  <span className={isActive ? "text-sky-600" : "text-zinc-400"}>
                    {categoryIcons[cat.id] || <Layers className="w-3.5 h-3.5" />}
                  </span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {activeCategory.skills.map((skill, index) => {
            const descText = typeof skill.desc === "string" ? skill.desc : skill.desc[lang];

            return (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 rounded-[14px] border border-zinc-200 flex flex-col justify-between shadow-2xs hover:border-sky-400 hover:shadow-sm transition-all duration-150"
              >
                <div>
                  {/* Skill Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-mono font-bold text-xs">
                        {skill.name.slice(0, 2).toUpperCase()}
                      </div>
                      <h3 className="font-bold text-zinc-950 text-base">
                        {skill.name}
                      </h3>
                    </div>

                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 text-[11px] font-mono font-semibold">
                      {skill.levelTag}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                    {descText}
                  </p>
                </div>

                {/* Concrete Achievements List */}
                <div className="pt-4 border-t border-zinc-100 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono block">
                    {lang === "id" ? "Implementasi Nyata:" : "Production Usage:"}
                  </span>
                  {skill.achievements.map((ach, aIdx) => {
                    const achText = typeof ach === "string" ? ach : ach[lang];
                    return (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-zinc-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{achText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
