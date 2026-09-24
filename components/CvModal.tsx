"use client";

import React from "react";
import Link from "next/link";
import { FileText, Download, ExternalLink, X } from "lucide-react";
import { Lang } from "@/data/translations";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

export default function CvModal({ isOpen, onClose, lang }: CvModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-8 shadow-2xl border border-zinc-200/80 relative flex flex-col gap-5 sm:gap-6 text-left my-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center border border-sky-400/20 shrink-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-[#1C1B1D] truncate sm:whitespace-normal">
                {lang === "id" ? "Unduh Curriculum Vitae" : "Download Resume / CV"}
              </h3>
              <p className="text-xs text-[#71717A] mt-0.5 leading-snug">
                {lang === "id"
                  ? "Pilih format bahasa yang Anda butuhkan:"
                  : "Select your preferred language format:"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 sm:p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="p-4 sm:p-4.5 rounded-2xl border border-zinc-200/90 bg-zinc-50/80 hover:bg-sky-500/[0.04] hover:border-sky-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-sm font-bold text-[#1C1B1D]">
                  English (Resume)
                </span>
                <span className="text-[10px] font-mono bg-sky-700 text-white px-2 py-0.5 rounded-full font-semibold">
                  Tech Standard
                </span>
              </div>
              <p className="text-xs text-[#71717A] leading-relaxed">
                {lang === "id"
                  ? "Format internasional untuk tech recruiters & tim remote."
                  : "Standard format for tech recruiters & engineering teams."}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <a
                href="/CV%20Mohammad%20Kevin.pdf"
                download="Resume - Mohammad Kevin (English).pdf"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#1C1B1D] hover:bg-black text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
              <a
                href="/CV%20Mohammad%20Kevin.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 transition-colors"
                title="Preview Tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-4.5 rounded-2xl border border-zinc-200/90 bg-zinc-50/80 hover:bg-emerald-500/[0.04] hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-sm font-bold text-[#1C1B1D]">
                  Bahasa Indonesia (CV)
                </span>
                <span className="text-[10px] font-mono bg-emerald-800 text-white px-2 py-0.5 rounded-full font-semibold">
                  Standar Magang
                </span>
              </div>
              <p className="text-xs text-[#71717A] leading-relaxed">
                {lang === "id"
                  ? "Format resmi untuk magang industri SMK & instansi lokal."
                  : "Official format for vocational internships & local industry."}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <a
                href="/CV%20Mohammad%20Kevin.pdf"
                download="CV - Mohammad Kevin (Indonesia).pdf"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh</span>
              </a>
              <a
                href="/CV%20Mohammad%20Kevin.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 transition-colors"
                title="Preview Tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
          <Link
            href="/cv"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-800 font-semibold hover:underline"
          >
            <span>{lang === "id" ? "Buka Format Web Digital →" : "Open Digital Web Version →"}</span>
          </Link>
          <span className="font-mono text-[11px] text-zinc-400">PDF • 640 KB</span>
        </div>
      </div>
    </div>
  );
}
