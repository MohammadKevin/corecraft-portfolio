"use client";

import React, { useState } from "react";
import { Award, ExternalLink, X, CheckCircle2 } from "lucide-react";
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
              <Award className="w-4 h-4 text-sky-600" />
              <span className="font-mono text-xs uppercase text-sky-700 font-semibold tracking-wider">
                {lang === "id" ? "SEMUA SERTIFIKASI & KREDENSIAL" : "ALL CREDENTIALS & CERTIFICATIONS"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1C1B1D]">
              {lang === "id" ? "Kredensial Kompetensi Industri Terverifikasi" : "Verified Industry Skill Credentials"}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-1 p-1 bg-zinc-100 rounded-full text-xs font-mono">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    filter === cat ? "bg-[#1C1B1D] text-white font-semibold shadow-xs" : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  {cat}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {filtered.map((cert) => {
            const titleText = typeof cert.title === "string" ? cert.title : cert.title[lang];
            const issuerText = typeof cert.issuer === "string" ? cert.issuer : cert.issuer[lang];

            return (
              <div
                key={cert.id}
                className="p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 hover:bg-sky-500/[0.03] hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                      {cert.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 font-medium">{cert.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-[#1C1B1D] mb-1.5 leading-snug">{titleText}</h4>
                  <p className="text-xs font-mono text-sky-700 font-semibold mb-3">{issuerText}</p>

                  {cert.skills && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cert.skills.map((s) => (
                        <span key={s} className="text-[10px] bg-white text-zinc-600 px-2 py-0.5 rounded border border-zinc-200/80 font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {cert.url ? (
                  <div className="pt-2.5 border-t border-zinc-200/50 flex items-center justify-between">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1B1D] hover:text-sky-600 transition-colors"
                    >
                      <span>{lang === "id" ? "Verifikasi Kredensial" : "Verify Credential"}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                    <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300/60">
                      ✓ Verified
                    </span>
                  </div>
                ) : (
                  <div className="pt-2.5 border-t border-zinc-200/50 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Kompetisi Terdaftar</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
