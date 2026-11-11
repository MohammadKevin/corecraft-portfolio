"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Server } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { ProjectMockup } from "@/components/ProjectMockup";
import type { Project } from "@/lib/types";

export default function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  previous?: Project;
  next: Project;
}) {
  const clientOrStudio = project.client ?? project.studio;
  const titleParts = project.title.split(" ");
  const firstWord = titleParts[0];
  const restWords = titleParts.slice(1).join(" ");

  return (
    <article className="subpage-wrap">
      <div
        className="edu-bar"
        style={{
          marginBottom: "28px",
          paddingBottom: "16px",
          borderBottom: "1px solid var(--ln)",
        }}
      >
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link href="/#work" className="g nf chip mo" style={{ fontWeight: 600 }}>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link href="/work" className="g nf chip mo" style={{ fontWeight: 600 }}>
            <span>All 07 Systems</span>
          </Link>
        </div>

        <span
          className="g nf chip mo"
          style={{
            color: "var(--cb)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          ● {project.badge || project.category} · {project.year}
        </span>
      </div>

      <header>
        <div className="mo" style={{ fontSize: "12px", color: "var(--mu)", marginBottom: "12px" }}>
          /CASE STUDY · {String(project.order).padStart(2, "0")} · {project.category.toUpperCase()}
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(34px, 6.2vw, 88px)",
            lineHeight: 0.92,
            letterSpacing: "-0.055em",
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "var(--ink)" }}>{firstWord} </span>
          <span className="sf" style={{ fontWeight: 400 }}>
            {restWords}
          </span>
        </h1>

        <p
          style={{
            margin: "20px 0 0",
            maxWidth: "780px",
            fontSize: "clamp(16px, 1.5vw, 21px)",
            lineHeight: 1.55,
            color: "var(--mu)",
          }}
        >
          {project.summary}
        </p>

        <div className="bs" style={{ marginTop: "24px" }}>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bt p"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}

          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bt g"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Source Code</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}

          <Link href="/#contact" className="bt g">
            <span>Discuss Architecture</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <div className="case-meta-grid">
        <div className="g nf" style={{ padding: "18px" }}>
          <div className="mo" style={{ fontSize: "11px", color: "var(--mu)" }}>
            ROLE
          </div>
          <ul
            style={{
              margin: "10px 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: "6px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {project.role.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="g nf" style={{ padding: "18px" }}>
          <div className="mo" style={{ fontSize: "11px", color: "var(--mu)" }}>
            TIMELINE &amp; {project.client ? "CLIENT" : "STUDIO"}
          </div>
          <div style={{ marginTop: "10px", fontSize: "20px", fontWeight: 800 }}>
            {project.year}
          </div>
          {clientOrStudio ? (
            <div className="mo" style={{ marginTop: "6px", fontSize: "12px", color: "var(--cb)" }}>
              {clientOrStudio}
            </div>
          ) : null}
        </div>

        <div className="g nf" style={{ padding: "18px" }}>
          <div className="mo" style={{ fontSize: "11px", color: "var(--mu)" }}>
            DELIVERABLES
          </div>
          <ul
            style={{
              margin: "10px 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {project.deliverables.map((d) => (
              <li key={d} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--o)" }} />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="g nf" style={{ padding: "18px" }}>
          <div className="mo" style={{ fontSize: "11px", color: "var(--mu)" }}>
            STACK
          </div>
          <div className="tags mo" style={{ marginTop: "10px" }}>
            {project.tags.map((t) => (
              <span key={t} className="tg">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "28px" }}>
        <ProjectMockup
          slug={project.slug}
          title={project.title}
          domain={`corecraft.my.id/work/${project.slug}`}
          preferRealImage
          imageSrc={project.image || project.thumbnail}
        />
      </div>

      <div className="case-grid-2">
        <div
          style={{
            background: "var(--pe)",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "20px",
            border: "1px solid var(--ln)",
          }}
        >
          <div>
            <span className="mo" style={{ fontSize: "11px", color: "var(--od)", fontWeight: 700 }}>
              /01 THE PROBLEM
            </span>
            <h2
              style={{
                margin: "10px 0 12px",
                fontSize: "clamp(24px, 2.5vw, 34px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              Problem &amp; Friction
            </h2>
            <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.65, color: "var(--ink)" }}>
              {project.problem}
            </p>
          </div>

          {project.metrics?.length ? (
            <div style={{ display: "grid", gap: "10px" }}>
              {project.metrics.map((m) => (
                <div key={m.label} className="g nf" style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--cb)" }}>
                    {m.value}
                  </div>
                  <div className="mo" style={{ fontSize: "11px", color: "var(--mu)", marginTop: "2px" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              background: "var(--cb)",
              color: "#fff",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <span className="mo" style={{ fontSize: "11px", opacity: 0.8 }}>
              /02 SYSTEM DESIGN &amp; ARCHITECTURE
            </span>
            <h2
              style={{
                margin: "10px 0 14px",
                fontSize: "clamp(24px, 2.5vw, 34px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              Architectural Breakdown
            </h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "10px" }}>
              {project.architecture.map((item) => (
                <li
                  key={item}
                  className="g k nf"
                  style={{
                    padding: "13px 16px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "14px",
                    lineHeight: 1.5,
                  }}
                >
                  <Server className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.solution?.length ? (
            <div
              className="g nf"
              style={{
                padding: "24px",
                borderLeft: "5px solid var(--o)",
              }}
            >
              <span className="mo" style={{ fontSize: "11px", color: "var(--od)", fontWeight: 700 }}>
                /03 IMPLEMENTED SOLUTIONS
              </span>
              <h2
                style={{
                  margin: "10px 0 14px",
                  fontSize: "clamp(22px, 2.2vw, 30px)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                Resilience &amp; Outcomes
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "10px" }}>
                {project.solution.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "14px",
                      lineHeight: 1.55,
                      padding: "10px 12px",
                      borderRadius: "10px",
                      background: "var(--g)",
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--cb)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {project.timeline?.length ? (
        <section style={{ marginTop: "36px" }}>
          <span className="mo" style={{ fontSize: "11px", color: "var(--mu)" }}>
            /04 BUILD TIMELINE
          </span>
          <div className="case-timeline-grid">
            {project.timeline.map((step, idx) => {
              const colors = [
                { bg: "#f5f1ea", fg: "#0a0a0f" },
                { bg: "#2440ff", fg: "#ffffff" },
                { bg: "#ff4d12", fg: "#0a0a0f" },
              ][idx % 3];
              return (
                <div
                  key={step.phase}
                  style={{
                    background: colors.bg,
                    color: colors.fg,
                    borderRadius: "14px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "14px",
                  }}
                >
                  <div className="mo" style={{ fontSize: "11px", opacity: 0.8 }}>
                    0{idx + 1} · {step.period}
                  </div>
                  <div>
                    <h3
                      style={{
                        margin: "0 0 8px",
                        fontSize: "24px",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {step.phase}
                    </h3>
                    <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.5 }}>
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <nav aria-label="Next case study" style={{ marginTop: "40px" }}>
        <Link
          href={`/work/${next.slug}`}
          className="g nf"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "28px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="mo" style={{ fontSize: "11px", color: "var(--cb)", fontWeight: 700 }}>
              NEXT CASE STUDY →
            </span>
            <h3
              style={{
                margin: "8px 0 6px",
                fontSize: "clamp(24px, 3vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.045em",
                textTransform: "uppercase",
              }}
            >
              {next.title}
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--mu)", maxWidth: "620px" }}>
              {next.summary}
            </p>
          </div>

          <span
            className="bt p"
            style={{ borderRadius: "999px", width: "52px", height: "52px", padding: 0 }}
            aria-hidden="true"
          >
            <ArrowRight className="h-5 w-5" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
