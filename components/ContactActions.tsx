"use client";

import React, { useEffect, useState } from "react";
import { profile } from "@/data/profile";

export default function ContactActions() {
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState("--:--:-- WIB");

  useEffect(() => {
    const update = () => {
      setClock(
        `${new Date().toLocaleTimeString("en-GB", {
          timeZone: profile.timezone,
        })} WIB`
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // clipboard unavailable
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <span className="contact-clock label">{clock} · Malang</span>

      <div className="contact-actions">
        <button type="button" className="btn btn-ink" onClick={copy}>
          {copied ? "Copied ✓" : "Copy email"}
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
      </div>
    </>
  );
}
