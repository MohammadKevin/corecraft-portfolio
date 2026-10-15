"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useActiveSection } from "@/lib/hooks";
import { useScrollToSection } from "@/lib/scroll";
import { spring } from "@/lib/motion";

const links = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "stack", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "credentials", label: "Credentials" },
  { id: "experience", label: "Experience" },
];

const sectionIds = ["hero", ...links.map((link) => link.id), "contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const active = useActiveSection(sectionIds);
  const scrollTo = useScrollToSection();

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
      scrollTo(id);
    },
    [scrollTo],
  );

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 print:hidden pointer-events-none">
      <div className="w-full flex justify-center px-4">
        <nav
          aria-label="Primary"
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto max-w-fit rounded-full border backdrop-blur-2xl transition-all duration-300 pointer-events-auto flex items-center justify-between gap-6 md:gap-8 px-5 py-2.5 ${
            scrolled
              ? "bg-white/55 dark:bg-[#0A0A0C]/60 border-white/70 dark:border-white/15 shadow-[0_12px_40px_0_rgba(0,0,0,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.8)]"
              : "bg-white/40 dark:bg-[#0A0A0C]/40 border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.7)]"
          }`}
        >
          {/* Sisi Kiri: Wordmark Corecraft (Tanpa logo gambar, font More Sugar) */}
          <Link
            href="/"
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname === "/") {
                e.preventDefault();
                goTo(e, "hero");
              }
            }}
            className="flex min-w-0 items-center transition-opacity hover:opacity-80 shrink-0"
          >
            <span
              style={{ fontFamily: "'More Sugar', cursive, sans-serif" }}
              className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
            >
              Corecraft
            </span>
          </Link>

          {/* Bagian Tengah: Tautan Navigasi dengan Fluid Adaptive Hover Pill */}
          <ul
            onMouseLeave={() => setHoveredLink(null)}
            className="hidden items-center gap-1.5 md:gap-2 lg:flex"
          >
            {links.map((link) => {
              const isHovered = hoveredLink === link.id;
              const isActive = active === link.id;
              const isHighlighted = hoveredLink ? isHovered : isActive;

              return (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => goTo(event, link.id)}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      isHighlighted
                        ? "text-black dark:text-white font-semibold"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {isHighlighted ? (
                      <motion.span
                        layoutId="navLiquidHoverPill"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 32,
                        }}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-black/[0.07] dark:bg-white/[0.12] border border-black/5 dark:border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4)]"
                      />
                    ) : null}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Sisi Kanan: Tombol CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="mailto:kvn4.200581@gmail.com"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#0B0C0E] text-white dark:bg-white dark:text-[#0B0C0E] px-4 py-1.5 text-xs font-semibold hover:scale-105 transition-all shrink-0 shadow-sm"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/15 text-neutral-900 dark:text-neutral-100 transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/10 lg:hidden"
            >
              {menuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
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
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#F6F7F9] dark:bg-[#0A0A0C] text-neutral-900 dark:text-white px-6 pb-10 pt-28 pointer-events-auto lg:hidden"
          >
            <ul className="flex flex-col gap-3">
              {links.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.03 * index }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => goTo(event, link.id)}
                    className="flex items-center justify-between py-2 font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-white transition-opacity hover:opacity-70"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                      /{String(index + 2).padStart(2, "0")}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 border-t border-black/10 dark:border-white/10 pt-6">
              <a
                href="mailto:kvn4.200581@gmail.com"
                className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-3.5 text-sm font-semibold tracking-tight shadow-md"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span>Mohammad Kevin</span>
                <span>Malang, Indonesia</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
