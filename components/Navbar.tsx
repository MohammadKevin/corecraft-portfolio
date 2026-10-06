"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const n = translations.nav;
  const navItems = [
    { label: n.home[lang], href: "/#hero", id: "hero" },
    { label: n.about[lang], href: "/#about", id: "about" },
    { label: n.skills[lang], href: "/#skills", id: "skills" },
    { label: n.projects[lang], href: "/#projects", id: "projects" },
    { label: n.certs[lang], href: "/#certificates", id: "certificates" },
    { label: n.timeline[lang], href: "/#timeline", id: "timeline" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (pathname === "/cv") return;
      const ids = ["hero", "about", "skills", "projects", "certificates", "timeline", "contact"];
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= 200) current = id; }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 print:hidden ${scrolled ? "bg-[#0A0A0C]/80 backdrop-blur-xl border-b border-white/[0.04]" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/images/corecraft-logo-dark.svg" alt="CoreCraft" width={28} height={28} className="w-7 h-7 object-contain rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="text-sm font-bold text-[#F5F5F0] tracking-tight font-display">Kevin</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link key={item.href} href={item.href} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isActive ? "bg-white/10 text-white" : "text-[#8A8A8A] hover:text-white hover:bg-white/5"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-white/5 rounded-full p-0.5 text-[10px] font-mono">
            <button onClick={() => setLang("id")} className={`px-2.5 py-1 rounded-full transition-all ${lang === "id" ? "bg-white/15 text-white font-bold" : "text-[#8A8A8A] hover:text-white"}`}>ID</button>
            <button onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-full transition-all ${lang === "en" ? "bg-white/15 text-white font-bold" : "text-[#8A8A8A] hover:text-white"}`}>EN</button>
          </div>

          <Link href="/#contact" className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold bg-white text-black rounded-full hover:bg-white/90 transition-all">
            {n.hireMe[lang]}
          </Link>

          <Link href="/cv" className="text-xs font-mono text-[#8A8A8A] hover:text-white transition-colors">
            CV
          </Link>

          <button onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" className="md:hidden p-2 text-white/70 hover:text-white transition-colors">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#0A0A0C]/95 backdrop-blur-xl border-b border-white/[0.04] overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-white/10 text-white" : "text-[#8A8A8A] hover:text-white"}`}>
                    {item.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.04]">
                <button onClick={() => { setLang("id"); setMenuOpen(false); }} className={`px-3 py-2 rounded-full text-xs font-mono font-bold transition-all ${lang === "id" ? "bg-white/15 text-white" : "text-[#8A8A8A]"}`}>ID</button>
                <button onClick={() => { setLang("en"); setMenuOpen(false); }} className={`px-3 py-2 rounded-full text-xs font-mono font-bold transition-all ${lang === "en" ? "bg-white/15 text-white" : "text-[#8A8A8A]"}`}>EN</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}