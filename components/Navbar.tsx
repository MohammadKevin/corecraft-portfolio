"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import ThemeToggle from "@/components/ThemeToggle";

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
    { label: n.services[lang], href: "/#services", id: "services" },
    { label: n.skills[lang], href: "/#skills", id: "skills" },
    { label: n.projects[lang], href: "/#projects", id: "projects" },
    { label: n.certs[lang], href: "/#certificates", id: "certificates" },
    { label: n.timeline[lang], href: "/#timeline", id: "timeline" },
    { label: "CV", href: "/cv", id: "cv" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
      if (pathname === "/cv") {
        setActiveSection("cv");
        return;
      }
      const sectionIds = ["hero", "about", "services", "skills", "projects", "certificates", "timeline", "contact"];
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
          if (rect.top <= 160) currentActive = id;
        }
      }
      setActiveSection(currentActive);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none print:hidden">
      <div className="pointer-events-auto w-full max-w-5xl xl:max-w-6xl">
        <div
          className={`brutal-card flex items-center justify-between gap-2 sm:gap-4 rounded-full px-3.5 sm:px-5 lg:px-6 h-12 sm:h-14 transition-all duration-300 ${
            scrolled ? "shadow-[8px_8px_0_var(--border)]" : "shadow-[4px_4px_0_var(--border)]"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/corecraft-logo-dark.svg"
                alt="CoreCraft Logo"
                width={32}
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-lg border-2 border-foreground transition-transform group-hover:scale-105"
              />
              <span className="text-[13px] sm:text-[14px] lg:text-[15px] font-extrabold text-ink tracking-tight leading-none whitespace-nowrap font-display">
                Kevin
              </span>
            </Link>
          </div>

          <nav className="relative hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] whitespace-nowrap font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-ink text-surface shadow-[3px_3px_0_var(--accent-yellow)] border-2 border-ink"
                      : "text-muted hover:text-ink hover:bg-accent-yellow/20"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div
              className="flex items-center bg-surface rounded-full p-0.5 border-2 border-foreground shadow-[2px_2px_0_var(--border)] text-[10px] sm:text-[11px] font-mono shrink-0"
              role="group"
              aria-label="Language Selector"
            >
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer ${
                  lang === "id"
                    ? "bg-ink text-surface shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-ink text-surface shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                EN
              </button>
            </div>

            <ThemeToggle />

            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-extrabold bg-accent-yellow text-[#141414] rounded-full border-2 border-[#141414] shadow-[3px_3px_0_#141414] hover:shadow-[5px_5px_0_#141414] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-[1px_1px_0_#141414] active:translate-x-[1px] active:translate-y-[1px] transition-all shrink-0 whitespace-nowrap"
            >
              {n.hireMe[lang]}
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="lg:hidden p-2 rounded-full border-2 border-foreground shadow-[2px_2px_0_var(--border)] hover:shadow-[4px_4px_0_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all active:shadow-[1px_1px_0_var(--border)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer bg-surface shrink-0"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                  className="absolute h-0.5 w-4 bg-ink rounded-full"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="absolute h-0.5 w-4 bg-ink rounded-full"
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                  className="absolute h-0.5 w-4 bg-ink rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2.5"
            >
              <div className="brutal-card rounded-[24px] p-3 sm:p-4 space-y-1 shadow-[8px_8px_0_var(--border)]">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        isActive
                          ? "bg-ink text-surface shadow-[3px_3px_0_var(--accent-yellow)] border-2 border-ink"
                          : "text-muted hover:text-ink hover:bg-accent-yellow/10"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />}
                    </Link>
                  );
                })}
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 flex items-center justify-center w-full text-sm py-3 rounded-full font-extrabold bg-accent-yellow text-[#141414] border-2 border-[#141414] shadow-[4px_4px_0_#141414] hover:shadow-[6px_6px_0_#141414] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-[1px_1px_0_#141414] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                >
                  {n.hireMe[lang]}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}