"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { projectCategories, type ProjectFilter } from "@/data/projects";
import { ProjectMockup } from "@/components/ProjectMockup";
import { getLocalizedProjects, getSubpageCopy, useLanguage } from "@/lib/i18n";

export default function WorkArchive() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const { lang } = useLanguage();
  const copy = getSubpageCopy(lang).archive;
  const localizedProjects = useMemo(() => getLocalizedProjects(lang), [lang]);

  const sortedProjects = useMemo(
    () =>
      [...localizedProjects]
        .sort((a, b) => a.order - b.order)
        .filter((p) => filter === "All" || p.category === filter),
    [filter, localizedProjects]
  );

  return (
    <main id="main-content" className="subpage-wrap">
      <p className="label">
        {copy.badgeLeft} · {String(localizedProjects.length).padStart(2, "0")}{" "}
        {copy.systemsDelivered}
      </p>

      <div className="hd" style={{ marginTop: "18px" }}>
        <h1 className="ttl" style={{ fontSize: "clamp(38px, 6.4vw, 88px)" }}>
          {copy.headingLead} <em className="sf">{copy.headingEm}</em>
        </h1>
        <p>{copy.subtitle}</p>
      </div>

      <div
        className="edu-bar"
        style={{
          marginTop: "28px",
          paddingBottom: "18px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="edu-tabs" role="tablist" aria-label={copy.filterAriaLabel}>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              className={`edu-tab${filter === cat ? " act" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat === "All" ? copy.allFilterLabel : cat}
            </button>
          ))}
        </div>

        <Link href="/#work" className="chip">
          {copy.backToHome}
        </Link>
      </div>

      <div className="work-grid">
        {sortedProjects.map((project) => (
          <article key={project.slug} className="work-card-archive">
            <div className="wm">
              <span>
                {String(project.order).padStart(2, "0")} / {project.category}
              </span>
              <span>{project.year}</span>
            </div>

            <div>
              <h2
                style={{
                  margin: "0 0 10px",
                  fontSize: "clamp(21px, 2vw, 28px)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                <Link href={`/work/${project.slug}`}>{project.title}</Link>
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "var(--muted)",
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

            <div className="wi">
              <div className="tags">
                {project.tags.map((t) => (
                  <span key={t} className="tg">
                    {t}
                  </span>
                ))}
              </div>

              <div
                className="wi-links"
                style={{ justifyContent: "space-between", marginTop: "4px" }}
              >
                <Link href={`/work/${project.slug}`} style={{ fontWeight: 500 }}>
                  {copy.caseStudy}
                </Link>
                <div style={{ display: "flex", gap: "14px" }}>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {copy.live}
                    </a>
                  ) : null}
                  {project.sourceUrl ? (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {copy.code}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

