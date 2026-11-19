"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";
import { LanguageToggle } from "@/components/LanguageToggle";
import { NAV_SECTIONS, useLanguage } from "@/lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useLanguage();
  const labels = NAV_SECTIONS[lang];

  useEffect(() => {
    if (isHome) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isHome]);

  useEffect(() => {
    if (isHome || !menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isHome, menuOpen]);

  if (isHome) return null;

  return (
    <>
      <header className="subnav print:hidden">
        <Link className="lg" href="/" aria-label="Corecraft — Back to Home">
          Corecraft<i>/</i>
        </Link>

        <nav className="subnav-pill" aria-label={labels.navAriaLabel}>
          {labels.subpageLinks.map((item) => {
            const active =
              item.href === "/work"
                ? pathname.startsWith("/work")
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "subnav-link act" : "subnav-link"}
              >
                {item.label}
              </Link>
            );
          })}
          <span className="di-sep" aria-hidden="true" />
          <LanguageToggle />
        </nav>

        <div className="subnav-actions">
          <a href={`mailto:${profile.email}`} className="bt p subnav-cta">
            {labels.letsTalkCta}
          </a>
          <button
            type="button"
            className="g subnav-mb"
            aria-expanded={menuOpen}
            aria-controls="subpage-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <u aria-hidden="true" />
            <span>{menuOpen ? labels.closeLabel : labels.menuLabel}</span>
          </button>
        </div>
      </header>

      <nav
        id="subpage-menu"
        className={`mn-overlay${menuOpen ? " open" : ""}`}
        aria-label="Mobile Navigation"
      >
        <div className="mn-lang-row">
          <LanguageToggle variant="mobile" />
        </div>
        {labels.subpageMobileLinks.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ "--i": i } as React.CSSProperties}
            onClick={() => setMenuOpen(false)}
          >
            <span className="mo">{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
