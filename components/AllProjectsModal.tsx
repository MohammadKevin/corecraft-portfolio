"use client";

import React, { useState } from "react";
import { FolderGit2, X } from "lucide-react";
import { projectsData } from "@/data/projects";
import { Lang } from "@/data/translations";

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

export default function AllProjectsModal({ isOpen, onClose, lang }: AllProjectsModalProps) {
  const [filter, setFilter] = useState("All");

  if (!isOpen) return null;

  const filtered = projectsData.filter((p) => {
    if (filter === "All") return true;
    return p.type.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-8 shadow-2xl border border-zinc-200/80 relative flex flex-col gap-6 text-left my-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderGit2 className="w-4 h-4 text-sky-600" />
              <span className="font-mono text-xs uppercase text-sky-700 font-semibold tracking-wider">
                {lang === "id" ? "SEMUA STUDI KASUS & PROYEK" : "ALL CASE STUDIES & DELIVERABLES"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1C1B1D]">
              {lang === "id" ? "Arsip Proyek Produksi Terkurasi" : "Curated Production Projects Archive"}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-1 p-1 bg-zinc-100 rounded-full text-xs font-mono">
              {["All", "Fullstack", "Backend", "Frontend"].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    filter === f ? "bg-[#1C1B1D] text-white font-semibold shadow-xs" : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => {
            const desc = typeof p.desc === "string" ? p.desc : p.desc[lang];
            const impact = typeof p.impact === "string" ? p.impact : p.impact?.[lang];

            return (
              <div
                key={p.id}
                className="p-6 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 hover:bg-sky-500/[0.03] hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold bg-sky-500/10 text-sky-700 px-2.5 py-0.5 rounded-full border border-sky-400/20">
                      {p.type}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 font-medium">2025</span>
                  </div>

                  <h4 className="text-base font-bold text-[#1C1B1D] mb-2 leading-snug">{p.title}</h4>
                  <p className="text-xs leading-relaxed text-[#71717A] mb-4">{desc}</p>

                  {impact && (
                    <div className="bg-emerald-500/10 text-emerald-950 rounded-xl p-2.5 text-[11px] font-mono leading-relaxed mb-4 border border-emerald-400/20">
                      ✓ Impact: {impact}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[10px] bg-white text-zinc-600 px-2 py-0.5 rounded border border-zinc-200 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-zinc-200/50">
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 rounded-full bg-[#1C1B1D] hover:bg-black text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      Demo
                    </a>
                  )}
                  {p.repoUrl ? (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-semibold border border-zinc-200 transition-colors"
                    >
                      GitHub
                    </a>
                  ) : (
                    <span className="px-3 py-2 text-zinc-400 text-[11px] font-mono">Private</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
