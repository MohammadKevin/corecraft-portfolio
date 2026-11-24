"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { ProjectMockup } from "@/components/ProjectMockup";
import { getLocalizedProjects, getSubpageCopy, useLanguage } from "@/lib/i18n";
import type { Project } from "@/lib/types";

export default function ProjectDetail({
  project: rawProject,
  next: rawNext,
}: {
  project: Project;
  previous?: Project;
  next: Project;
}) {
  const { lang } = useLanguage();
  const copy = getSubpageCopy(lang).detail;

  const { project, next } = useMemo(() => {
    const localized = getLocalizedProjects(lang);
    return {
      project: localized.find((p) => p.slug === rawProject.slug) ?? rawProject,
      next: localized.find((p) => p.slug === rawNext.slug) ?? rawNext,
    };
  }, [lang, rawProject, rawNext]);

  const clientOrStudio = project.client ?? project.studio;

  return (
    <article id="main-content" className="subpage-wrap">
      <div
        className="edu-bar"
        style={{
          marginBottom: "32px",
          paddingBottom: "16px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link href="/#work" className="chip">
            <span aria-hidden="true">←</span>
            <span>{copy.home}</span>
          </Link>
          <Link href="/work" className="chip">
            <span>{copy.allSystems}</span>
          </Link>
        </div>

        <span className="label">
          {project.badge || project.category} · {project.year}
        </span>
      </div>

      <header>
        <p className="label">
          {copy.caseStudyPrefix} · {String(project.order).padStart(2, "0")} ·{" "}
          {project.category.toUpperCase()}
        </p>

        <h1
          className="ttl"
          style={{ marginTop: "14px", fontSize: "clamp(34px, 5.6vw, 76px)" }}
        >
          {project.title}
        </h1>

        <p
          style={{
            margin: "18px 0 0",
            maxWidth: "70ch",
            fontSize: "clamp(15px, 1.3vw, 18px)",
            lineHeight: 1.65,
            color: "var(--muted)",
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
              <span>{copy.liveDemo}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}

          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bt g"
            >
              <GithubIcon style={{ width: 15, height: 15 }} />
              <span>{copy.sourceCode}</span>
            </a>
          ) : null}

          <Link href="/#contact" className="bt g">
            <span>{copy.discuss}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <div className="case-meta-grid">
        <div className="g">
          <div className="label">{copy.roleTitle}</div>
          <ul
            style={{
              margin: "12px 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: "7px",
              fontSize: "13.5px",
              lineHeight: 1.45,
            }}
          >
            {project.role.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="g">
          <div className="label">
            {project.client ? copy.timelineClient : copy.timelineStudio}
          </div>
          <div style={{ marginTop: "12px", fontSize: "19px", fontWeight: 600 }}>
            {project.year}
          </div>
          {clientOrStudio ? (
            <div
              className="mo"
              style={{ marginTop: "4px", fontSize: "12px", color: "var(--muted)" }}
            >
              {clientOrStudio}
            </div>
          ) : null}
        </div>

        <div className="g">
          <div className="label">{copy.deliverablesTitle}</div>
          <ul
            style={{
              margin: "12px 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: "7px",
              fontSize: "13px",
              lineHeight: 1.45,
            }}
          >
            {project.deliverables.map((d) => (
              <li key={d} style={{ display: "flex", gap: "8px" }}>
                <span className="case-marker" aria-hidden="true" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="g">
          <div className="label">{copy.stackTitle}</div>
          <div className="tags" style={{ marginTop: "12px" }}>
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
        <div className="g" style={{ padding: "clamp(20px, 3vw, 28px)" }}>
          <span className="label" style={{ color: "var(--orange-text)" }}>
            {copy.problemLabel}
          </span>
          <h2
            style={{
              margin: "12px 0 14px",
              fontSize: "clamp(22px, 2.2vw, 30px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            {copy.problemTitle}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              lineHeight: 1.7,
              color: "var(--muted)",
            }}
          >
            {project.problem}
          </p>

          {project.metrics?.length ? (
            <div
              style={{
                display: "grid",
                gap: "0px",
                marginTop: "24px",
                paddingTop: "4px",
                borderTop: "1px solid var(--line)",
              }}
            >
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "12px 0",
                    borderBottom: "1px solid var(--line-soft)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "19px",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="mo"
                    style={{
                      fontSize: "11px",
                      color: "var(--muted)",
                      textAlign: "right",
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: "12px",
              padding: "clamp(20px, 3vw, 28px)",
            }}
          >
            <span className="label">{copy.archLabel}</span>
            <h2
              style={{
                margin: "12px 0 16px",
                fontSize: "clamp(22px, 2.2vw, 30px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              {copy.archTitle}
            </h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {project.architecture.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: "10px",
                    padding: "12px 0",
                    borderTop: "1px solid var(--line-soft)",
                    fontSize: "14px",
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  <span className="case-marker" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.solution?.length ? (
            <div
              style={{
                border: "1px solid var(--line)",
                borderLeft: "2px solid var(--orange)",
                borderRadius: "12px",
                padding: "clamp(20px, 3vw, 28px)",
              }}
            >
              <span className="label" style={{ color: "var(--orange-text)" }}>
                {copy.solutionLabel}
              </span>
              <h2
                style={{
                  margin: "12px 0 16px",
                  fontSize: "clamp(20px, 2vw, 26px)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                }}
              >
                {copy.solutionTitle}
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {project.solution.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "10px",
                      padding: "12px 0",
                      borderTop: "1px solid var(--line-soft)",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "var(--muted)",
                    }}
                  >
                    <span className="case-marker" aria-hidden="true" />
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
          <span className="label">{copy.buildTimelineLabel}</span>
          <div className="case-timeline-grid">
            {project.timeline.map((step) => (
              <div
                key={step.phase}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div className="label">
                  {step.period}
                </div>
                <div>
                  <h3
                    style={{
                      margin: "0 0 8px",
                      fontSize: "20px",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.phase}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13.5px",
                      lineHeight: 1.6,
                      color: "var(--muted)",
                    }}
                  >
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <nav aria-label="Next case study" style={{ marginTop: "44px" }}>
        <Link
          href={`/work/${next.slug}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "28px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="label" style={{ color: "var(--orange-text)" }}>
              {copy.nextCaseStudy}
            </span>
            <h3
              style={{
                margin: "10px 0 6px",
                fontSize: "clamp(22px, 2.6vw, 34px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              {next.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "var(--muted)",
                maxWidth: "62ch",
              }}
            >
              {next.summary}
            </p>
          </div>

          <span aria-hidden="true" style={{ fontSize: 22 }}>→</span>
        </Link>
      </nav>
    </article>
  );
}

