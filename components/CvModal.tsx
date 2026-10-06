"use client";

import React from "react";
import Link from "next/link";
import { FileText, Download, ExternalLink, X } from "lucide-react";
import { motion } from "framer-motion";
import { Lang } from "@/data/translations";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

export default function CvModal({ isOpen, onClose, lang }: CvModalProps) {
  if (!isOpen) return null;

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
        className="w-full max-w-lg max-h-[92vh] overflow-y-auto brutal-card p-5 sm:p-8 shadow-[8px_8px_0_var(--border)] flex flex-col gap-5 sm:gap-6 text-left my-auto"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-accent-violet/20 text-accent-violet flex items-center justify-center border-2 border-foreground shadow-[3px_3px_0_var(--border)] shrink-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-extrabold text-ink">
                {lang === "id" ? "Unduh Curriculum Vitae" : "Download Resume / CV"}
              </h3>
              <p className="text-xs text-muted mt-0.5 leading-snug">
                {lang === "id" ? "Pilih format bahasa yang Anda butuhkan:" : "Select your preferred language format:"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 sm:p-2 rounded-full border-2 border-foreground shadow-[2px_2px_0_var(--border)] hover:shadow-[4px_4px_0_var(--accent-pink)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer bg-surface text-ink shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {[
            {
              label: "English (Resume)",
              badge: "Tech Standard",
              badgeColor: "bg-accent-violet text-white",
              desc: lang === "id" ? "Format internasional untuk tech recruiters & tim remote." : "Standard format for tech recruiters & engineering teams.",
              btnClass: "bg-ink text-surface border-ink",
              shadowColor: "shadow-[3px_3px_0_var(--accent-pink)]",
            },
            {
              label: "Bahasa Indonesia (CV)",
              badge: "Standar Magang",
              badgeColor: "bg-accent-lime text-[#141414]",
              desc: lang === "id" ? "Format resmi untuk magang industri SMK & instansi lokal." : "Official format for vocational internships & local industry.",
              btnClass: "bg-accent-lime text-[#141414] border-accent-lime",
              shadowColor: "shadow-[3px_3px_0_var(--border)]",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="brutal-card p-4 sm:p-4.5 shadow-[4px_4px_0_var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-sm font-extrabold text-ink">{item.label}</span>
                  <span className={`text-[10px] font-mono ${item.badgeColor} px-2 py-0.5 rounded-full font-bold border-2 border-foreground`}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                <a
                  href="/CV%20Mohammad%20Kevin.pdf"
                  download={`Resume - Mohammad Kevin (${item.label.split(" ")[0]}).pdf`}
                  className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold border-2 border-foreground ${item.btnClass} ${item.shadowColor} hover:shadow-[5px_5px_0_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <a
                  href="/CV%20Mohammad%20Kevin.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-surface text-ink border-2 border-foreground shadow-[2px_2px_0_var(--border)] hover:shadow-[4px_4px_0_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                  title="Preview Tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t-[3px] border-foreground flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <Link href="/cv" onClick={onClose} className="inline-flex items-center gap-1 text-accent-violet hover:text-ink font-extrabold hover:underline">
            <span>{lang === "id" ? "Buka Format Web Digital →" : "Open Digital Web Version →"}</span>
          </Link>
          <span className="font-mono text-[11px] text-muted font-bold">PDF &bull; 640 KB</span>
        </div>
      </motion.div>
    </motion.div>
  );
}