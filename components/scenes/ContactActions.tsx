"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

export function ContactActions() {
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const [copiedLabel, setCopiedLabel] = useState("Copy email");

  useEffect(() => {
    const update = () => {
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: profile.timezone,
        }),
      );
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedLabel("Copied ✓");
    } catch {
      setCopiedLabel("Press Ctrl+C");
    }
    setCopied(true);
  };

  return (
    <div className="contact-actions">
      <button
        type="button"
        className="btn btn-ink"
        onClick={copy}
        aria-live="polite"
      >
        {copied ? "Copied ✓" : copiedLabel}
      </button>
      <a
        className="btn btn-outline"
        href={profile.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp ↗
      </a>
      <a
        className="btn btn-outline"
        href={profile.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Resume (PDF) ↗
      </a>
      <span className="contact-clock label" aria-label="Local time in Malang">
        {clock} WIB · Malang
      </span>
    </div>
  );
}
