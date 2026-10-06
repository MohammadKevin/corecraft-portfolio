"use client";

import React, { useState } from "react";
import { FolderGit2, X } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-ink/50 backdrop-blur-md overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto brutal-card p-5 sm:p-8 shadow-[8px_8px_0_var(--border)] flex flex-col gap-6 text-left my-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[3px] border-foreground pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderGit2 className="w-4 h-4 text-accent-violet" />
              <span className="font-mono text-xs uppercase text-accent-violet font-bold tracking-wider">
                {lang === "id" ? "SEMUA STUDI KASUS & PROYEK" : "ALL CASE STUDIES & DELIVERABLES"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
              {lang === "id" ? "Arsip Proyek Produksi Terkurasi" : "Curated Production Projects Archive"}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-1 p-1 bg-surface rounded-full border-2 border-foreground shadow-[3px_3px_0_var(--border)] text-xs font-mono">
              <LayoutGroup>
                {["All", "Fullstack", "Backend", "Frontend"].map((f) => (
                  <motion.button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`relative px-3 py-1 rounded-full font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      filter === f ? "text-surface" : "text-muted hover:text-ink"
                    }`}
                  >
                    {filter === f && (
                      <motion.div
                        layoutId="modalProjTabBg"
                        className="absolute inset-0 bg-ink rounded-full border-2 border-foreground shadow-[3px_3px_0_var(--accent-pink)]"
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{f}</span>
                  </motion.button>
                ))}
              </LayoutGroup>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="p-2 rounded-full border-2 border-foreground shadow-[2px_2px_0_var(--border)] hover:shadow-[4px_4px_0_var(--accent-pink)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer bg-surface text-ink shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, idx) => {
            const desc = typeof p.desc === "string" ? p.desc : p.desc[lang];
            const impact = typeof p.impact === "string" ? p.impact : p.impact?.[lang];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="brutal-card p-6 shadow-[4px_4px_0_var(--border)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-extrabold bg-accent-cyan/20 text-ink px-2.5 py-0.5 rounded-full border-2 border-foreground">{p.type}</span>
                    <span className="text-[11px] font-mono text-muted font-bold">2025</span>
                  </div>
                  <h4 className="text-base font-extrabold text-ink mb-2 leading-snug">{p.title}</h4>
                  <p className="text-xs leading-relaxed text-muted mb-4">{desc}</p>
                  {impact && (
                    <div className="bg-accent-lime/20 rounded-xl p-2.5 text-[11px] font-mono font-bold leading-relaxed mb-4 border-2 border-foreground shadow-[2px_2px_0_var(--border)]">
                      &#10003; Impact: {impact}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[10px] bg-surface text-muted px-2 py-0.5 rounded border-2 border-foreground font-mono font-bold">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t-2 border-foreground">
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 rounded-full bg-ink text-surface text-xs font-extrabold border-2 border-foreground shadow-[3px_3px_0_var(--accent-pink)] hover:shadow-[5px_5px_0_var(--accent-pink)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">Demo</a>
                  )}
                  {p.repoUrl ? (
                    <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-surface text-ink text-xs font-extrabold border-2 border-foreground shadow-[3px_3px_0_var(--border)] hover:shadow-[5px_5px_0_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">GitHub</a>
                  ) : (
                    <span className="px-3 py-2 text-muted text-[11px] font-mono font-bold">Private</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}