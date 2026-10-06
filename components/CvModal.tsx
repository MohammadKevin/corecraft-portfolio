"use client";

import React from "react";
import Link from "next/link";
import { FileText, Download, ExternalLink, X } from "lucide-react";
import { motion } from "framer-motion";
import { Lang } from "@/data/translations";

interface CvModalProps { isOpen: boolean; onClose: () => void; lang: Lang; }

export default function CvModal({ isOpen, onClose, lang }: CvModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      role="dialog" aria-modal="true"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="w-full max-w-md bg-[#141416] rounded-3xl p-6 border border-white/[0.06]"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.06] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white/50" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === "id" ? "Unduh Curriculum Vitae" : "Download Resume / CV"}
              </h3>
              <p className="text-xs text-[#8A8A8A] mt-0.5">
                {lang === "id" ? "Pilih format:" : "Select format:"}
              </p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-full hover:bg-white/[0.06] text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { label: "English (Resume)", badge: "Tech Standard", downloadName: "Resume - Mohammad Kevin (English).pdf", btnText: "Download" },
            { label: "Bahasa Indonesia (CV)", badge: "Standar Magang", downloadName: "CV - Mohammad Kevin (Indonesia).pdf", btnText: "Unduh" },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-white">{item.label}</span>
                  <span className="text-[10px] font-mono bg-white/[0.08] text-white/60 px-2 py-0.5 rounded-full">{item.badge}</span>
                </div>
                <p className="text-[11px] text-[#8A8A8A]">{lang === "id" ? "Format internasional untuk tech recruiters." : "Standard format for tech recruiters."}</p>
              </div>
              <div className="flex items-center gap-2">
                <a href="/CV%20Mohammad%20Kevin.pdf" download={item.downloadName} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all">
                  <Download className="w-3.5 h-3.5" /> {item.btnText}
                </a>
                <a href="/CV%20Mohammad%20Kevin.pdf" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/[0.04] text-white/40 hover:text-white/80 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px]">
          <Link href="/cv" onClick={onClose} className="text-white/40 hover:text-white transition-colors font-mono">
            {lang === "id" ? "CV Digital →" : "Digital CV →"}
          </Link>
          <span className="font-mono text-white/20">PDF &bull; 640 KB</span>
        </div>
      </motion.div>
    </motion.div>
  );
}