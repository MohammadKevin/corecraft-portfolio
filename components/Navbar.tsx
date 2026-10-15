"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { useActiveSection } from "@/lib/hooks";
import { useScrollToSection } from "@/lib/scroll";
import { spring } from "@/lib/motion";

const links = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "credentials", label: "Credentials" },
  { id: "experience", label: "Experience" },
];

const sectionIds = ["hero", ...links.map((link) => link.id), "contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const scrollTo = useScrollToSection();

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const goTo = useCallback(
    (event: React.MouseEvent, id: string) => {
      event.preventDefault();
      setMenuOpen(false);
      scrollTo(id);
    },
    [scrollTo],
  );

  /** Lock scroll, trap focus and wire Escape while the mobile menu is open. */
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
    <header className="fixed inset-x-0 top-4 z-50 print:hidden pointer-events-none">
      <div className="page-container">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 rounded-full border border-black/[0.08] bg-white/80 px-3 shadow-md backdrop-blur-md pointer-events-auto sm:px-4"
        >
          {/* Availability indicator — green status beacon */}
          <a
            href="#hero"
            onClick={(e) => goTo(e, "hero")}
            className="flex min-w-0 items-center gap-2 pl-1 cursor-pointer transition-opacity hover:opacity-80"
          >
            <span className="status-dot shrink-0" aria-hidden="true" />
            <span className="hidden truncate font-mono text-xs font-medium tracking-tight text-ink sm:inline">
              Available for New Project
            </span>
            <span className="sr-only">Available for new projects</span>
          </a>

          {/* Nav links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => goTo(event, link.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                      isActive ? "text-ink font-semibold" : "text-muted hover:text-ink"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        transition={spring}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-black/[0.06]"
                      />
                    ) : null}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <MagneticButton
              href="#contact"
              variant="solid"
              className="px-3.5 py-1.5 text-xs font-medium"
              onClick={(event) => goTo(event, "contact")}
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </MagneticButton>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] text-ink transition-colors duration-200 hover:bg-neutral-100 lg:hidden"
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

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pb-10 pt-28 pointer-events-auto lg:hidden"
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
                    className="block py-2 font-display text-3xl font-extrabold tracking-tight text-ink hover:text-emerald-700"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.03 * links.length }}
              >
                <a
                  href="#contact"
                  onClick={(event) => goTo(event, "contact")}
                  className="block py-2 font-display text-3xl font-extrabold tracking-tight text-ink hover:text-emerald-700"
                >
                  Contact
                </a>
              </motion.li>
            </ul>

            <div className="border-t border-black/[0.08] pt-6 flex flex-col gap-2 font-mono text-xs text-muted">
              <span>Mohammad Kevin · Software Engineer</span>
              <span>Malang, East Java · WIB (UTC+7)</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
