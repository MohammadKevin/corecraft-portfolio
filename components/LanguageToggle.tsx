"use client";

import React from "react";
import { Globe } from "lucide-react";
import { NAV_SECTIONS, useLanguage } from "@/lib/i18n";

export function LanguageToggle({
  variant = "island",
}: {
  variant?: "island" | "mobile";
}) {
  const { lang, setLang } = useLanguage();
  const labels = NAV_SECTIONS[lang];

  return (
    <div
      className={variant === "mobile" ? "di-lang di-lang-mobile mo" : "di-lang mo"}
      role="group"
      aria-label={labels.langSwitchAriaLabel}
    >
      <Globe className="di-lang-icon" aria-hidden="true" />
      <button
        type="button"
        className={`di-lang-btn${lang === "id" ? " act" : ""}`}
        aria-pressed={lang === "id"}
        onClick={() => setLang("id")}
      >
        ID
      </button>
      <button
        type="button"
        className={`di-lang-btn${lang === "en" ? " act" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}

