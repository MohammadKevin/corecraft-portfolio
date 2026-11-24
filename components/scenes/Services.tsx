"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { SceneHead } from "./SceneHead";

export function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="scene scene--services"
      aria-labelledby="services-title"
    >
      <div className="scene-inner">
        <SceneHead id="services" />

        <div className="scene-lead">
          <h2 className="scene-title" id="services-title">
            Production capabilities <em>delivered end-to-end.</em>
          </h2>
          <p className="body-muted">
            Specialized engineering capabilities architected for high concurrency,
            robust fault-tolerance, and resilient scale.
          </p>
        </div>

        <ul
          className="svc-list"
          style={{ "--hover": hover ?? 0 } as React.CSSProperties}
          onMouseLeave={() => setHover(null)}
          data-hover={hover !== null && open === null ? "true" : "false"}
        >
          <i className="svc-glider" aria-hidden="true" />
          {services.map((service, index) => {
            const isOpen = open === index;
            return (
              <li
                key={service.number}
                className={`svc${isOpen ? " is-open" : ""}`}
                onMouseEnter={() => setHover(index)}
              >
                <button
                  type="button"
                  className="svc-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`svc-panel-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="svc-num">{service.number}</span>
                  <span className="svc-title">{service.title}</span>
                  <span className="svc-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>

                <div className="svc-panel" id={`svc-panel-${index}`}>
                  <div className="svc-panel-inner">
                    <p>{service.description}</p>
                    <ul className="tags" aria-label={`${service.title} tools`}>
                      {service.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
