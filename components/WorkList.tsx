"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

const EXISTING_PREVIEWS = new Set(["outerco", "clinic-portal", "corecraft"]);

export default function WorkList({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!fine) return;

    const onMove = (event: PointerEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = 0;
        const card = cardRef.current;
        if (!card) return;
        const { x, y } = targetRef.current;
        card.style.transform = `translate3d(${x + 24}px, ${y - 140}px, 0)`;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [fine]);

  const active = hovered !== null ? projects[hovered] : null;

  return (
    <div className="work-list">
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="work-row"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(index)}
          onBlur={() => setHovered(null)}
        >
          <span className="label work-number">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="work-body">
            <span className="work-title">{project.title}</span>
            <span className="work-meta">
              {project.category} · {project.year}
            </span>

            {EXISTING_PREVIEWS.has(project.slug) && project.thumbnail ? (
              <span className="work-inline-media">
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} preview`}
                  width={640}
                  height={400}
                  sizes="(max-width: 1024px) 92vw, 0px"
                  className="work-inline-image"
                />
              </span>
            ) : null}

            <span className="work-tags">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
          </span>

          <span className="work-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ))}

      {fine ? (
        <div
          ref={cardRef}
          className={`work-preview glass${active ? " is-visible" : ""}`}
          aria-hidden="true"
        >
          {active ? (
            <>
              <span className="work-preview-media">
                {EXISTING_PREVIEWS.has(active.slug) && active.thumbnail ? (
                  <Image
                    src={active.thumbnail}
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover object-top"
                  />
                ) : (
                  <span className="work-preview-placeholder">
                    {active.shortTitle ?? active.title}
                  </span>
                )}
              </span>
              <span className="work-preview-foot">
                {active.tags.slice(0, 2).join(" · ")}
              </span>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
