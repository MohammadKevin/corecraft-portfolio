"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

const SUBPAGE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work Archive", href: "/work" },
  { label: "Education", href: "/#education" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

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

        <nav className="g nf subnav-pill mo" aria-label="Subpage Navigation">
          {SUBPAGE_LINKS.map((item) => {
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
        </nav>

        <div className="subnav-actions">
          <a
            href={`mailto:${profile.email}`}
            className="bt p subnav-cta mo hidden sm:inline-flex"
          >
            Let&apos;s talk ↗
          </a>
          <button
            type="button"
            className="g mb subnav-mb"
            aria-expanded={menuOpen}
            aria-controls="subpage-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <u></u>
            <span>{menuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </header>

      <nav
        id="subpage-menu"
        className={`mn-overlay${menuOpen ? " open" : ""}`}
        aria-label="Mobile Navigation"
      >
        {[
          { label: "Home", href: "/" },
          { label: "All Systems", href: "/work" },
          { label: "Education", href: "/#education" },
          { label: "Experience", href: "/#experience" },
          { label: "Credentials", href: "/#credentials" },
          { label: "Contact", href: "/#contact" },
        ].map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ "--i": i } as React.CSSProperties}
            onClick={() => setMenuOpen(false)}
          >
            <span className="mo">0{i + 1}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
