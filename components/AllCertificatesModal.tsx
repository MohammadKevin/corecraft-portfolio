"use client";

import React, { useState } from "react";
import { Award, ExternalLink, X, CheckCircle2 } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";
import { certificatesData } from "@/data/certificates";
import { Lang } from "@/data/translations";

interface AllCertificatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

export default function AllCertificatesModal({ isOpen, onClose, lang }: AllCertificatesModalProps) {
  const [filter, setFilter] = useState("All");

  if (!isOpen) return null;

  const categories = ["All", "HackerRank", "Dicoding", "Competition"];

  const filtered = certificatesData.filter((c) => {
    if (filter === "All") return true;
    if (filter === "HackerRank") return (typeof c.issuer === "string" ? c.issuer : c.issuer.en).includes("HackerRank");
    if (filter === "Dicoding") return (typeof c.issuer === "string" ? c.issuer : c.issuer.en).includes("Dicoding");
    if (filter === "Competition") return c.category.toLowerCase().includes("hackathon") || c.category.toLowerCase().includes("competition");
    return true;
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
              <Award className="w-4 h-4 text-accent-violet" />
              <span className="font-mono text-xs uppercase text-accent-violet font-bold tracking-wider">
                {lang === "id" ? "SEMUA SERTIFIKASI & KREDENSIAL" : "ALL CREDENTIALS & CERTIFICATIONS"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
              {lang === "id" ? "Kredensial Kompetensi Industri Terverifikasi" : "Verified Industry Skill Credentials"}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-1 p-1 bg-surface rounded-full border-2 border-foreground shadow-[3px_3px_0_var(--border)] text-xs font-mono">
              <LayoutGroup>
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    className={`relative px-3 py-1 rounded-full font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      filter === cat ? "text-surface" : "text-muted hover:text-ink"
                    }`}
                  >
                    {filter === cat && (
                      <motion.div
                        layoutId="modalCertTabBg"
                        className="absolute inset-0 bg-ink rounded-full border-2 border-foreground shadow-[3px_3px_0_var(--accent-lime)]"
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {filtered.map((cert, idx) => {
            const titleText = typeof cert.title === "string" ? cert.title : cert.title[lang];
            const issuerText = typeof cert.issuer === "string" ? cert.issuer : cert.issuer[lang];
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="brutal-card p-5 shadow-[4px_4px_0_var(--border)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-extrabold bg-accent-lime/20 text-ink px-2.5 py-0.5 rounded-full border-2 border-foreground">{cert.category}</span>
                    <span className="text-[11px] font-mono text-muted font-bold">{cert.date}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-ink mb-1.5 leading-snug">{titleText}</h4>
                  <p className="text-xs font-mono text-accent-violet font-extrabold mb-3">{issuerText}</p>
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cert.skills.map((s) => (
                        <span key={s} className="text-[10px] bg-surface text-muted px-2 py-0.5 rounded border-2 border-foreground font-mono font-bold">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
                {cert.url ? (
                  <div className="pt-2.5 border-t-2 border-foreground flex items-center justify-between">
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-ink hover:text-accent-violet transition-colors">
                      <span>{lang === "id" ? "Verifikasi Kredensial" : "Verify Credential"}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted" />
                    </a>
                    <span className="text-[10px] font-mono bg-accent-lime/20 text-ink font-extrabold px-2 py-0.5 rounded-md border-2 border-foreground">
                      &#10003; Verified
                    </span>
                  </div>
                ) : (
                  <div className="pt-2.5 border-t-2 border-foreground flex items-center justify-between text-[11px] font-mono text-muted font-bold">
                    <span>Kompetisi Terdaftar</span>
                    <CheckCircle2 className="w-4 h-4 text-accent-lime" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}