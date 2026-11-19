"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getSubpageCopy, useLanguage } from "@/lib/i18n";

export default function NotFound() {
  const { lang } = useLanguage();
  const copy = getSubpageCopy(lang).notFound;

  return (
    <main className="subpage-wrap" style={{ display: "grid", placeItems: "start" }}>
      <div style={{ maxWidth: "640px", paddingTop: "clamp(24px, 8vh, 72px)" }}>
        <p className="label" style={{ color: "var(--orange-text)" }}>
          {copy.badge}
        </p>

        <h1
          className="ttl"
          style={{ margin: "16px 0", fontSize: "clamp(44px, 9vw, 108px)" }}
        >
          404 <em className="sf">{copy.missingWord}</em>
        </h1>

        <p className="lede">{copy.body}</p>

        <div className="bs" style={{ marginTop: "26px" }}>
          <Link href="/" className="bt p">
            <ArrowLeft style={{ width: 15, height: 15 }} aria-hidden="true" />
            <span>{copy.backHome}</span>
          </Link>
          <Link href="/work" className="bt g">
            <span>{copy.browseAllWork}</span>
            <ArrowUpRight style={{ width: 15, height: 15 }} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
