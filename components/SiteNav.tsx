"use client";

import React, { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/sections";
import { profile } from "@/data/profile";

export default function SiteNav() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${
          total > 0 ? Math.min(1, y / total) : 0
        })`;
      }

      setScrolled(y > 24);

      const marker = window.innerHeight * 0.35;
      let current = "hero";
      document.querySelectorAll<HTMLElement>("main section[id]").forEach((el) => {
        if (el.getBoundingClientRect().top <= marker) current = el.id;
      });
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (typeof window !== "undefined" && "chrome" in window) {
      document.documentElement.classList.add("chromium");
    }
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <svg width="0" height="0" className="glass-filter" aria-hidden="true">
        <filter id="lg" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".007 .011"
            numOctaves={2}
            seed={9}
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale={40}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <i ref={progressRef} className="scroll-progress" aria-hidden="true" />

      <div className="nav-wrap">
        <nav
          className={`nav-pill glass${scrolled ? " is-scrolled" : ""}`}
          aria-label="Primary"
        >
          <a
            href="#hero"
            className="nav-logo"
            onClick={() => setActive("hero")}
          >
            Corecraft
          </a>

          <span className="nav-rule" aria-hidden="true" />

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={active === link.id ? "is-active" : ""}
                  aria-current={active === link.id ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a className="nav-cta" href={`mailto:${profile.email}`}>
            Let&apos;s Talk
          </a>
        </nav>

        <div className="nav-mobile">
          <a href="#hero" className="nav-logo">
            Corecraft
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-btn glass"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <u aria-hidden="true" data-open={open} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`menu-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {NAV_LINKS.map((link, index) => (
              <li key={link.id} style={{ "--i": index } as React.CSSProperties}>
                <a
                  href={`#${link.id}`}
                  tabIndex={open ? 0 : -1}
                  className={active === link.id ? "is-active" : ""}
                  onClick={close}
                >
                  <span className="label">{String(index + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            className="btn btn-ink menu-panel-cta"
            tabIndex={open ? 0 : -1}
            onClick={close}
          >
            Let&apos;s Talk
          </a>
        </nav>
      </div>
    </>
  );
}
