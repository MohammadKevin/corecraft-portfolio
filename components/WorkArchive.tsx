"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { projectCategories, projects, type ProjectFilter } from "@/data/projects";
import { ProjectMockup } from "@/components/ProjectMockup";

const CARD_THEMES = [
  { bg: "#2440ff", fg: "#ffffff", dark: true },
  { bg: "#ff4d12", fg: "#0a0a0f", dark: false },
  { bg: "#0a0a0f", fg: "#ffffff", dark: true },
  { bg: "#e8edff", fg: "#0a0a0f", dark: false },
  { bg: "#f5f1ea", fg: "#0a0a0f", dark: false },
];

export default function WorkArchive() {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const sortedProjects = useMemo(
    () =>
      [...projects]
        .sort((a, b) => a.order - b.order)
        .filter((p) => filter === "All" || p.category === filter),
    [filter]
  );

  return (
    <main className="subpage-wrap">
      <div className="g nf chip mo" style={{ marginBottom: "18px" }}>
        <span>06 / ARCHIVE</span>
        <span>·</span>
        <span style={{ color: "var(--cb)", fontWeight: 700 }}>
          {String(projects.length).padStart(2, "0")} SYSTEMS DELIVERED
        </span>
      </div>

      <div className="hd" style={{ alignItems: "flex-end" }}>
        <h1 className="ttl" style={{ fontSize: "clamp(38px, 7.5vw, 108px)" }}>
          Selected <em className="sf">work.</em>
        </h1>
        <p>
          Full-lifecycle production systems across RESTful APIs, booking SaaS,
          e-commerce, POS terminals, and encrypted document archives.
        </p>
      </div>

      <div
        className="edu-bar"
        style={{ marginTop: "26px", paddingBottom: "18px", borderBottom: "1px solid var(--ln)" }}
      >
        <div className="edu-tabs mo" role="tablist" aria-label="Filter projects">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              className={`edu-tab${filter === cat ? " act" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <Link href="/#work" className="g chip mo" style={{ fontWeight: 600 }}>
          ← Back to Home Stack
        </Link>
      </div>

      <div className="work-grid">
        {sortedProjects.map((project, i) => {
          const theme = CARD_THEMES[i % CARD_THEMES.length];
          return (
            <article
              key={project.slug}
              className="work-card-archive"
              style={
                {
                  "--card-bg": theme.bg,
                  "--card-fg": theme.fg,
                } as React.CSSProperties
              }
            >
              <div className="wm mo">
                <span>
                  {String(project.order).padStart(2, "0")} / {project.category}
                </span>
                <span>{project.year}</span>
              </div>

              <div>
                <h2
                  style={{
                    margin: "0 0 8px",
                    fontSize: "clamp(22px, 2.2vw, 32px)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.08,
                  }}
                >
                  {project.title}
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: 1.55,
                    opacity: theme.dark ? 0.85 : 0.78,
                  }}
                >
                  {project.summary}
                </p>
              </div>

              <ProjectMockup
                slug={project.slug}
                title={project.title}
                domain={`corecraft.my.id/work/${project.slug}`}
                preferRealImage
                imageSrc={project.image || project.thumbnail}
              />

              <div className={`g nf wi${theme.dark ? " k" : ""}`}>
                <div className="tags mo">
                  {project.tags.map((t) => (
                    <span key={t} className="tg">
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  className="mo wi-links"
                  style={{ justifyContent: "space-between", marginTop: "4px" }}
                >
                  <Link
                    href={`/work/${project.slug}`}
                    style={{ fontWeight: 700 }}
                  >
                    Case Study ↗
                  </Link>
                  <div style={{ display: "flex", gap: "12px" }}>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live ↗
                      </a>
                    ) : null}
                    {project.sourceUrl ? (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

