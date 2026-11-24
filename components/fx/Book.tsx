"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getStageApi, goToProgress } from "@/lib/stage-api";
import { SCENES } from "@/lib/scenes";
import { useStageModeStore } from "@/lib/stage-store";
import type { Project } from "@/lib/types";
import { ProjectPlate } from "@/components/ui/ProjectPlate";

const WORK = SCENES.find((scene) => scene.id === "work")!;
const TOTAL = 7;

export function Book({ projects }: { projects: Project[] }) {
  const mode = useStageModeStore();
  const [page, setPage] = useState(1);
  const startX = useRef<number | null>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  const goToPage = useCallback(
    (next: number) => {
      const target = Math.min(TOTAL, Math.max(1, next));
      const api = getStageApi();
      if (mode === "stage" && api) {
        const label =
          api.labels[`work:page-${target}`] ?? api.labels["work:book"];
        if (label !== undefined) {
          goToProgress((label + 0.01) / api.duration);
        }
        return;
      }
      setPage(target);
    },
    [mode],
  );

  useEffect(() => {
    const onPage = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail;
      if (typeof detail === "number") setPage(detail);
    };
    window.addEventListener("corecraft:page", onPage);
    return () => window.removeEventListener("corecraft:page", onPage);
  }, []);

  useEffect(() => {
    if (mode === "flow" && flowRef.current) {
      flowRef.current.dataset.page = String(page);
    }
  }, [page, mode]);

  const onPointerDown = (event: React.PointerEvent) => {
    startX.current = event.clientX;
  };
  const onPointerUp = (event: React.PointerEvent) => {
    if (startX.current === null) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) < 48) return;
    goToPage(delta < 0 ? page + 1 : page - 1);
  };

  const current = projects[page - 1] ?? projects[0];

  return (
    <div className="book-shell">
      <div className="book-stage" data-book-root>
        <div className="book" data-book-body>
          <div className="book-base page-right-base">
            <p className="book-kicker">End of volume</p>
            <p className="book-count-large">07 / 07</p>
            <p className="book-intro">
              Every system here was built to hold up a year after launch. The archive
              continues online.
            </p>
          </div>

          {projects.map((project, index) => (
            <div
              className="leaf"
              key={project.slug}
              data-leaf
              style={{ zIndex: 30 - index } as React.CSSProperties}
            >
              <div className="leaf-face leaf-front">
                <ProjectPlate
                  src={project.image}
                  alt={project.title}
                  priority={index < 2}
                />
                <div className="leaf-caption">
                  <p>
                    {String(project.order).padStart(2, "0")} / {project.category} ·{" "}
                    {project.year}
                  </p>
                  <h3>{project.shortTitle ?? project.title}</h3>
                </div>
              </div>

              <div className="leaf-face leaf-back">
                <p className="leaf-kicker">
                  {project.category} · {project.year}
                </p>
                <h3>{project.title}</h3>
                <p className="leaf-role">{project.role.join(" · ")}</p>
                <p className="leaf-summary">{project.summary}</p>
                <ul className="tags leaf-tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <p className="leaf-links">
                  <a href={`/work/${project.slug}`}>Case Study ↗</a>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo ↗
                    </a>
                  ) : null}
                </p>
              </div>

              <i className="leaf-shade" data-leaf-shade aria-hidden="true" />
              <i className="leaf-depth" data-leaf-depth aria-hidden="true" />
            </div>
          ))}

          <div className="book-cover" data-book-cover>
            <div className="cover-inner">
              <p className="cover-kicker">Corecraft</p>
              <p className="cover-title">Selected Work</p>
              <p className="cover-years">2024 – 2026</p>
              <span className="cover-square" aria-hidden="true" />
            </div>
            <div className="cover-inside">
              <p className="book-kicker">Selected Work</p>
              <p className="book-count-large">
                {String(projects.length).padStart(2, "0")} projects
              </p>
              <p className="book-intro">
                Production systems in live deployment — booking platforms, archives,
                POS engines, commerce and integration layers.
              </p>
              <ul className="book-legend">
                <li>Fullstack</li>
                <li>Backend</li>
                <li>E-Commerce</li>
              </ul>
              <p className="book-edition">2024 – 2026 · Corecraft</p>
            </div>
          </div>
          <i className="book-spine" aria-hidden="true" />
        </div>
        <i className="book-shadow" data-book-shadow aria-hidden="true" />
      </div>

      <div className="flow-book" ref={flowRef} data-page={page}>
        <article
          className="flow-spread"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          aria-roledescription="carousel"
          aria-label="Selected work"
        >
          <div className="flow-left">
            <p className="leaf-kicker">
              {current.category} · {current.year}
            </p>
            <h3>{current.title}</h3>
            <p className="leaf-role">{current.role.join(" · ")}</p>
            <p className="leaf-summary">{current.summary}</p>
            <ul className="tags leaf-tags">
              {current.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p className="leaf-links">
              <a href={`/work/${current.slug}`}>Case Study ↗</a>
              {current.liveUrl ? (
                <a href={current.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo ↗
                </a>
              ) : null}
            </p>
          </div>
          <div className="flow-right">
            <ProjectPlate src={current.image} alt={current.title} />
          </div>
        </article>
      </div>

      <div className="book-ui">
        <p className="book-pager" aria-live="polite">
          <b>{String(page).padStart(2, "0")}</b> / {String(TOTAL).padStart(2, "0")} ·
          <span data-book-status> {current.shortTitle ?? current.title}</span>
        </p>
        <div className="book-nav">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
          >
            ← Sebelumnya
          </button>
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page >= TOTAL}
          >
            Berikutnya →
          </button>
        </div>
      </div>
      <p className="book-hint label">
        {WORK.number} / 10 · 07 projects · swipe or scroll to turn pages
      </p>
    </div>
  );
}
