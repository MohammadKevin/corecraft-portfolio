"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const isExpanded = isHovered || menuOpen;
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
    <header className="fixed top-2.5 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded
            ? "w-full max-w-5xl lg:max-w-6xl scale-100"
            : "w-[96%] max-w-3xl lg:max-w-4xl scale-100 sm:scale-[0.96]"
        }`}
      >
        <div
          className={`relative flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] liquid-glass-nav ${
            isExpanded
              ? "h-14 sm:h-16 px-4 sm:px-7 bg-white/85 shadow-[0_24px_50px_rgba(28,27,29,0.14),inset_0_1.5px_2px_rgba(255,255,255,1)] border-white/95 ring-1 ring-black/[0.06]"
              : scrolled
              ? "h-12 sm:h-13 px-3.5 sm:px-6 bg-white/75 shadow-[0_14px_30px_rgba(28,27,29,0.10),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] border-white/85 ring-1 ring-black/[0.04]"
              : "h-12 sm:h-13 px-3.5 sm:px-6 bg-white/60 shadow-[0_10px_24px_rgba(28,27,29,0.06),inset_0_1.5px_1.5px_rgba(255,255,255,0.90)] border-white/80 ring-1 ring-black/[0.03]"
          }`}
        >
          {/* top glass sheen */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/80 to-transparent" />

          <div className="relative flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/corecraft-logo-dark.svg"
                alt="CoreCraft Logo"
                width={34}
                height={34}
                className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 object-contain rounded-[9px] shadow-2xs transition-transform group-hover:scale-105"
              />
              <span className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold text-[#1C1B1D] tracking-tight leading-none">
                Kevin
              </span>
            </Link>
          </div>

          <div className="hidden xl:block h-4.5 w-[1px] bg-black/10 relative mx-1" />

          <nav className="relative hidden md:flex items-center gap-0.5 lg:gap-1.5 shrink-0" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 lg:px-3 py-1.5 rounded-full text-xs lg:text-[13px] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] ${
                    isActive
                      ? "bg-[#1C1B1D] text-white font-medium shadow-sm"
                      : "text-[#52525B] hover:text-[#1C1B1D] hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="relative flex items-center gap-2 sm:gap-3 shrink-0">
            {/* language toggle in glass capsule */}
            <div
              className="flex items-center bg-black/[0.04] backdrop-blur-md rounded-full p-0.5 border border-black/10 text-[10px] sm:text-[11px] font-mono transition-transform duration-200 hover:scale-[1.02]"
              role="group"
              aria-label="Language Selector"
            >
              <button
                type="button"
                onClick={() => setLang("id")}
                aria-label="Bahasa Indonesia"
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  lang === "id" ? "bg-white text-[#1C1B1D] font-semibold shadow-xs" : "text-[#71717A] hover:text-[#1C1B1D]"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-label="English"
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  lang === "en" ? "bg-white text-[#1C1B1D] font-semibold shadow-xs" : "text-[#71717A] hover:text-[#1C1B1D]"
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA pill button with generous and balanced padding */}
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#1C1B1D] text-white px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-xs font-semibold hover:bg-black transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-md"
            >
              {n.hireMe[lang]}
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden p-1.5 rounded-full text-[#1C1B1D] hover:bg-black/5 transition-colors cursor-pointer"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="md:hidden mt-2 rounded-[22px] p-3 space-y-1 relative overflow-hidden bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_20px_40px_rgba(28,27,29,0.12)]"
            role="navigation"
            aria-label="Mobile Navigation"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[22px] bg-gradient-to-b from-white/70 to-transparent" />
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`relative block px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                    isActive ? "bg-[#1C1B1D] text-white font-semibold" : "text-[#1C1B1D] hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="relative mt-2 flex items-center justify-center w-full text-sm py-2.5 rounded-full font-semibold bg-[#1C1B1D] text-white"
            >
              {n.hireMe[lang]}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
