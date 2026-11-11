"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile, site } from "@/data";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [time, setTime] = useState<string>("--:--:-- WIB");

  useEffect(() => {
    if (isHome) return;

    function updateClock() {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: profile.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(`${formatted} WIB`);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [isHome]);

  if (isHome) return null;

  const tickText =
    "AVAILABLE FOR NEW PROJECTS ✱ CORECRAFT PORTFOLIO ✱ KVN4.200581@GMAIL.COM ✱ MALANG, EAST JAVA ✱ ";

  return (
    <footer className="subfoot print:hidden">
      <div className="subfoot-inner">
        <div className="g cg4 mo nf">
          <div>
            <b>NAVIGATE</b>
            <Link href="/">Home</Link> · <Link href="/work">All Systems</Link> ·{" "}
            <Link href="/#education">Education</Link> ·{" "}
            <Link href="/#contact">Contact</Link>
          </div>
          <div>
            <b>ELSEWHERE</b>
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
            <b>MALANG · WIB</b>
            <span>{time}</span>
          </div>
          <div>
            <b>© {site.footer.copyrightYear}</b>
            {profile.fullName}
            <br />
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="subfoot-top"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>

      <div className="tick mo" style={{ position: "relative" }}>
        <div>
          <span>{tickText.repeat(6)}</span>
          <span>{tickText.repeat(6)}</span>
        </div>
      </div>
    </footer>
  );
}
