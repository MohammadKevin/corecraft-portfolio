"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { certificates, certificateCount } from "@/data/certificates";
import { fadeUp, fadeUpDelayed, inView } from "@/lib/motion";

export default function CertificatesSection() {
  const [filterIssuer, setFilterIssuer] = useState<string>("All");

  const issuers = ["All", "HackerRank", "Dicoding Indonesia", "National Competition"];

  const filtered = certificates.filter((cert) => {
    if (filterIssuer === "All") return true;
    if (filterIssuer === "HackerRank") return cert.issuer.includes("HackerRank");
    if (filterIssuer === "Dicoding Indonesia") return cert.issuer.includes("Dicoding");
    if (filterIssuer === "National Competition") return !cert.issuer.includes("HackerRank") && !cert.issuer.includes("Dicoding");
    return true;
  });

  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="section-pad border-b border-black/[0.08] bg-bg relative"
    >
      <div className="page-container">
        {/* Monospace Sub-label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mb-8 flex items-center justify-between"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
            /06 VERIFIED CREDENTIALS
          </span>
          <span className="font-mono text-xs text-muted">
            {certificateCount} INDUSTRY ACCREDITATIONS
          </span>
        </motion.div>

        {/* Section Heading + Issuer Filters */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14"
        >
          <div className="max-w-2xl">
            <h2
              id="credentials-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink"
            >
              Audited problem-solving and software credentials.
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
              Technical assessments verified by HackerRank, Dicoding Indonesia (AWS partner),
              and national software engineering competitions.
            </p>
          </div>

          {/* Issuer Filters */}
          <div className="flex flex-wrap gap-1.5 rounded-full border border-black/[0.08] bg-surface p-1 shadow-2xs">
            {issuers.map((issuer) => {
              const isActive = filterIssuer === issuer;
              return (
                <button
                  key={issuer}
                  type="button"
                  onClick={() => setFilterIssuer(issuer)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-medium tracking-tight transition-all duration-200 ${
                    isActive
                      ? "bg-ink text-white shadow-2xs"
                      : "text-muted hover:text-ink hover:bg-neutral-100/60"
                  }`}
                >
                  {issuer}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Responsive Grid of Verified Credentials */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={fadeUpDelayed(Math.min(index, 6) * 0.04)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-surface p-6 shadow-2xs transition-all duration-300 hover:border-black/25 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {cert.category}
                  </span>
                  <span>{cert.date}</span>
                </div>

                <h3 className="font-display text-lg font-bold tracking-tight text-ink group-hover:text-black">
                  {cert.title}
                </h3>

                <p className="mt-1 text-xs text-muted font-medium">
                  Issued by {cert.issuer}
                </p>

                {/* Credential ID badge */}
                {cert.credentialId ? (
                  <div className="mt-3 inline-block rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-muted-3">
                    ID: {cert.credentialId}
                  </div>
                ) : null}

                {/* Skills tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-black/[0.06] bg-bg px-2.5 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom verification action */}
              <div className="mt-6 border-t border-black/[0.06] pt-4">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink transition-colors hover:text-emerald-700"
                    aria-label={`Verify ${cert.title} on ${cert.issuer}`}
                  >
                    <span>Verify Credential</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="font-mono text-xs text-muted-3">
                    National Finalist & Top Award
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
