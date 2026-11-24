"use client";

import { useLanguage } from "@/lib/i18n";

export function LanguageToggle({
  variant = "island",
}: {
  variant?: "island" | "mobile";
}) {
  const { lang, setLang } = useLanguage();
  const labels = {
    en: "Switch language",
    id: "Ubah bahasa",
  } as const;

  return (
    <div
      className={variant === "mobile" ? "lang-switch is-mobile" : "lang-switch"}
      role="group"
      aria-label={labels[lang]}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
      <button
        type="button"
        className={`lang-btn${lang === "id" ? " act" : ""}`}
        aria-pressed={lang === "id"}
        onClick={() => setLang("id")}
      >
        ID
      </button>
      <button
        type="button"
        className={`lang-btn${lang === "en" ? " act" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
