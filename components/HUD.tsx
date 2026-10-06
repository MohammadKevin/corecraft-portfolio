"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ThemeToggle from "@/components/ThemeToggle";
import CvModal from "@/components/CvModal";
import { translations } from "@/data/translations";
import Link from "next/link";

export default function HUD() {
  const { lang, toggle } = useLanguage();
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const t = translations.hero;

  return (
    <>
      <div className="fixed inset-0 z-30 pointer-events-none">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-auto">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl px-4 py-3 text-white border border-white/10">
            <h1 className="font-bold text-lg sm:text-xl leading-tight font-display">
              Mohammad Kevin
            </h1>
            <p className="text-xs text-white/60 font-mono mt-0.5">
              Backend & Fullstack Engineer
            </p>
          </div>
        </div>

        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => toggle()}
            className="bg-black/30 backdrop-blur-xl rounded-xl px-3 py-2 text-white text-xs font-mono font-bold border border-white/10 hover:bg-white/20 transition-all"
          >
            {lang === "id" ? "ID" : "EN"}
          </button>
          <ThemeToggle />
          <button
            onClick={() => setIsCvModalOpen(true)}
            className="bg-white/90 text-black rounded-xl px-4 py-2 text-xs font-bold hover:bg-white transition-all"
          >
            CV
          </button>
        </div>

        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 pointer-events-auto">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl px-4 py-3 text-white border border-white/10 max-w-xs">
            <p className="text-[11px] text-white/50 font-mono uppercase tracking-wider mb-1">
              Controls
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono text-white/70">
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/90 text-[9px]">W A S D</kbd> Move</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/90 text-[9px]">SHIFT</kbd> Sprint</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/90 text-[9px]">SPACE</kbd> Jump</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/90 text-[9px]">MOUSE</kbd> Look</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/90 text-[9px]">E</kbd> Interact</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-right pointer-events-auto">
          <p className="text-[10px] font-mono text-white/30">
            corecraft.my.id &copy; {new Date().getFullYear()}
          </p>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
          >
            <p className="text-white/60 text-sm font-mono">
              {lang === "id"
                ? "Gunakan WASD untuk menjelajah pulau"
                : "Use WASD to explore the island"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        lang={lang}
      />
    </>
  );
}