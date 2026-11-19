"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";
import { getSubpageCopy, useLanguage } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lang } = useLanguage();
  const copy = getSubpageCopy(lang).footer;

  if (isHome) return null;

  return (
    <footer className="subfoot print:hidden">
      <div className="subfoot-inner">
        <div className="cg4">
          <div>
            <b>{copy.navTitle}</b>
            <Link href="/">{copy.home}</Link> ·{" "}
            <Link href="/work">{copy.allSystems}</Link> ·{" "}
            <Link href="/#education">{copy.education}</Link> ·{" "}
            <Link href="/#contact">{copy.contact}</Link>
          </div>
          <div>
            <b>{copy.elsewhereTitle}</b>
            {profile.socials.map((s, idx) => (
              <React.Fragment key={s.label}>
                {idx > 0 ? " · " : null}
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </React.Fragment>
            ))}
          </div>
          <div>
            <b>{copy.locationTimezone}</b>
            <span>{profile.location}</span>
          </div>
          <div>
            <b>© 2026</b>
            {profile.fullName}
            <br />
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="subfoot-top"
            >
              {copy.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
