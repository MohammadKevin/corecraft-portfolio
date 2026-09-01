"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, toggle } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const n = translations.nav;

  const navItems = [
    { label: n.home[lang], href: "/#hero", id: "hero" },
    { label: n.about[lang], href: "/#about", id: "about" },
    { label: "Features", href: "/#features", id: "features" },
    { label: "Services", href: "/#services", id: "services" },
    { label: n.skills[lang], href: "/#stack", id: "stack" },
    { label: n.projects[lang], href: "/#projects", id: "projects" },
    { label: n.timeline[lang], href: "/#experience", id: "experience" },
    { label: "CV", href: "/cv", id: "cv" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["hero", "about", "features", "services", "stack", "projects", "experience", "contact"];
      const scrollY = window.scrollY;

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 90) {
        setActiveSection("contact");
        return;
      }

      let currentActive = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            currentActive = id;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname && pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-xs"
          : "bg-white/70 backdrop-blur-sm border-b border-zinc-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        
        {/* ── Brand / Minimalist Logo ─────────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-mono font-bold text-xs sm:text-sm shadow-xs group-hover:scale-105 transition-transform overflow-hidden relative border border-zinc-200 shrink-0">
            <Image
              src="/images/icon.png"
              alt="Mohammad Kevin"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm font-bold text-zinc-950 tracking-tight group-hover:text-sky-600 transition-colors truncate">
                Mohammad Kevin
              </span></div>
            <span className="text-[10px] sm:text-[11px] text-zinc-500 font-mono hidden sm:block truncate">
              Fullstack & Backend Engineer
            </span>
          </div>
        </Link>

        {/* ── Desktop Navigation Links ─────────────────── */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-zinc-100/60 rounded-xl border border-zinc-200/50">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "text-sky-700 bg-white shadow-2xs font-bold border border-zinc-200/80"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Action Buttons (Desktop Language + Primary CTA) ─────────────────── */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* Language Toggle Pill */}
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-700 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-500" />
            <span className="uppercase font-mono">{lang}</span>
          </button>

          {/* Primary Cyan CTA Button */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 active:scale-98 text-white shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <span>{n.hireMe?.[lang] || "Get in Touch"}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </a>
        </div>

        {/* ── Mobile Controls (Language Pill + Hamburger) ─────────────────── */}
        <div className="flex items-center gap-1.5 lg:hidden shrink-0">
          <button
            onClick={toggle}
            className="px-2 py-1 rounded-lg text-xs font-mono font-bold text-zinc-700 bg-zinc-100 border border-zinc-200 cursor-pointer"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors border border-zinc-200 cursor-pointer"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown ─────────────────── */}
      {menuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-zinc-200 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-bold border border-sky-200"
                    : "text-zinc-800 hover:bg-zinc-50 hover:text-sky-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full text-center text-sm py-2.5 rounded-xl font-bold bg-sky-500 hover:bg-sky-600 text-white shadow-sm transition-all"
            >
              <span>{n.hireMe?.[lang] || "Get in Touch"}</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
