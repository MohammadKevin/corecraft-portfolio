"use client";

import { useState } from "react";
import {
  FolderGit2,
  ExternalLink,
  Search,
  CheckCircle2,
  ArrowUpRight,
  Filter,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { Project } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Fullstack", "Backend", "Frontend"];

  const filteredProjects = projects.filter((p) => {
    if (!p.title) return false;
    const matchesCat =
      activeCategory === "All" || p.type.toLowerCase() === activeCategory.toLowerCase();

    const q = searchQuery.toLowerCase();
    const descStr = typeof p.desc === "string" ? p.desc : p.desc?.[lang] || "";
    const probStr = typeof p.problem === "string" ? p.problem : p.problem?.[lang] || "";
    const techArr = Array.isArray(p.tech) ? p.tech : [];

    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      descStr.toLowerCase().includes(q) ||
      probStr.toLowerCase().includes(q) ||
      techArr.some((t) => t.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  return (
    <section id="projects" className="py-16 sm:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-sky-800 text-xs font-extrabold shadow-2xs mb-3.5">
              <FolderGit2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="tracking-wide font-bold">{lang === "id" ? "Portofolio Proyek" : "Production Deliverables"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
              {lang === "id" ? "Sistem & Aplikasi Nyata" : "Featured Applications & Systems"}
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm md:text-base mt-2 max-w-xl">
              {lang === "id"
                ? "Daftar proyek fungsional yang dibangun untuk menyelesaikan masalah nyata dalam operasional dan bisnis."
                : "A collection of production-tested web applications, POS architectures, and digital archiving platforms."}
            </p>
          </div>

          {/* Search + Category Filter Container */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "id" ? "Cari teknologi / proyek..." : "Search tech / project..."}
                className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-sky-500 shadow-2xs"
              />
            </div>

            {/* Category Selector */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 border border-zinc-200 rounded-xl overflow-x-auto shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? "bg-white text-sky-800 shadow-2xs font-bold border border-zinc-200"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-zinc-50 rounded-[14px] border border-zinc-200 p-8">
            <p className="text-zinc-500 text-sm">
              {lang === "id"
                ? "Tidak ada proyek yang sesuai dengan kriteria pencarian Anda."
                : "No projects matching your search criteria."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredProjects.map((p) => {
              const descText = typeof p.desc === "string" ? p.desc : p.desc?.[lang] || "";
              const probText = typeof p.problem === "string" ? p.problem : p.problem?.[lang] || "";
              const impText = typeof p.impact === "string" ? p.impact : p.impact?.[lang] || "";

              return (
                <div
                  key={p.id}
                  className="bg-zinc-50/70 hover:bg-white rounded-[14px] border border-zinc-200 p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-sky-400 hover:shadow-sm transition-all duration-150 group"
                >
                  <div>
                    {/* Top Row: Category Tag & Type */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-700 text-[10px] sm:text-[11px] font-mono font-semibold">
                        {p.type}
                      </span>
                      {p.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight mb-2 group-hover:text-sky-600 transition-colors leading-snug">
                      {p.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                      {descText}
                    </p>

                    {/* Problem & Impact Snapshot */}
                    {impText && (
                      <div className="p-3 rounded-xl bg-white border border-zinc-200 mb-4 text-xs text-zinc-700 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-mono block">
                          {lang === "id" ? "Dampak / Hasil:" : "Impact / Result:"}
                        </span>
                        <p className="leading-snug text-zinc-700 font-medium">{impText}</p>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-white text-zinc-700 font-mono text-[10px] sm:text-[11px] border border-zinc-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-2">
                    {p.repoUrl ? (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-zinc-400 font-mono">Private Repo</span>
                    )}

                    {p.demoUrl ? (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-600 active:scale-98 text-white shadow-2xs transition-all cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3 h-3 text-white" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-zinc-400 font-mono">Deployed / Internal</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
