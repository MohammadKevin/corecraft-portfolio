"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useActiveSection } from "@/lib/useActiveSection";
import { useScrollToSection } from "@/lib/scroll";
import { spring } from "@/lib/motion";
import { profile, site, ui } from "@/data";

const links = site.navigation;
const NAV_IDS = site.navIds;

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const active = useActiveSection(NAV_IDS);
  const scrollTo = useScrollToSection();

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const effectiveActive = clickedId ?? active;


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = useCallback(
    (event: React.MouseEvent, id: string) => {
      event.preventDefault();
      setMenuOpen(false);
      setClickedId(id);
      scrollTo(id);

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = setTimeout(() => {
        setClickedId(null);
      }, 600);

      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `#${id}`);
      }
    },
    [scrollTo],
  );

  
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (NAV_IDS.includes(hash)) {
        const timer = setTimeout(() => {
          scrollTo(hash);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [scrollTo]);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const toggleButton = toggleRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      toggleButton?.focus();
    };
  }, [menuOpen]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navContainerRef = useRef<HTMLElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!navContainerRef.current) return;
    const rect = navContainerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <header className="fixed inset-x-0 top-7 z-50 flex justify-center px-4 pointer-events-none print:hidden">
      <motion.nav
        ref={navContainerRef}
        aria-label="Primary"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onPointerMove={handlePointerMove}
        className={`pointer-events-auto w-fit max-w-[94vw] rounded-full border border-white/20 transition-all duration-300 flex items-center justify-between gap-5 md:gap-7 px-4 sm:px-5 py-2 text-[#f3f1ed] relative overflow-hidden ${
          scrolled
            ? "bg-[#141413]/85 backdrop-blur-3xl shadow-[0_16px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.35)]"
            : "bg-[#141413]/50 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]"
        }`}
      >
          {/* Specular Highlight Layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full overflow-hidden transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div
              className="absolute -inset-full transition-transform duration-75"
              style={{
                background: `radial-gradient(140px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.22), transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                background: `linear-gradient(115deg, transparent calc(${mousePos.x}px - 50px), rgba(255,255,255,0.6) ${mousePos.x}px, transparent calc(${mousePos.x}px + 50px))`,
              }}
            />
          </div>

          <Link
            href="/#hero"
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname === "/") {
                goTo(e, "hero");
              }
            }}
            aria-current={effectiveActive === "hero" ? "true" : undefined}
            className="flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-80 shrink-0 cursor-pointer relative z-10"
            aria-label="Corecraft - Navigasi ke #hero"
          >
            <Image
              src={site.logo}
              alt={site.footer.brandName}
              width={26}
              height={26}
              className="h-6.5 w-6.5 object-contain"
            />
            <span
              style={{ fontFamily: "'More Sugar', cursive, sans-serif" }}
              className="text-base sm:text-lg font-bold tracking-tight text-white"
            >
              Corecraft
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:gap-1.5 lg:flex relative z-10">
            {links.map((link) => {
              const isActive = effectiveActive === link.id;

              return (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => goTo(event, link.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-neutral-300 hover:text-white"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-white/25 bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,0,0,0.25)] backdrop-blur-md"
                      />
                    ) : null}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 shrink-0 relative z-10">
            <a
              href={`mailto:${profile.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#f3f1ed] text-[#141413] hover:bg-white hover:scale-105 active:scale-95 transition-all shrink-0 px-4 py-1.5 text-xs font-mono font-bold tracking-tight shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
            >
              <span>{ui.buttons.letsTalk}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#141413]" aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 lg:hidden"
            >
              {menuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </motion.nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#121211]/92 backdrop-blur-3xl border-b border-white/10 text-white px-6 pb-10 pt-28 pointer-events-auto lg:hidden"
          >
            <ul className="flex flex-col gap-3">
              {links.map((link, index) => {
                const isActive = effectiveActive === link.id;

                return (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring, delay: 0.03 * index }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(event) => goTo(event, link.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center justify-between py-2 font-display text-2xl font-bold tracking-tight transition-opacity hover:opacity-70 ${
                        isActive ? "text-[#e85d2f]" : "text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-xs text-neutral-400">
                        /{String(index + 2).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#f3f1ed] text-[#141413] py-3.5 text-sm font-semibold tracking-tight shadow-md hover:bg-white transition-colors"
              >
                <span>{ui.buttons.letsTalk}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span>{profile.fullName}</span>
                <span>{profile.location}</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
