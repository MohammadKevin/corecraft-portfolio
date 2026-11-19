"use client";

import React, { useRef, useState } from "react";
import type { ServiceItem } from "@/data/services";

export default function ServicesAccordion({ items }: { items: ServiceItem[] }) {
  const [open, setOpen] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [highlight, setHighlight] = useState({ y: 0, height: 0 });
  const listRef = useRef<HTMLDivElement>(null);

  const moveHighlight = (index: number, target: HTMLElement) => {
    const list = listRef.current;
    if (!list) return;
    const listTop = list.getBoundingClientRect().top;
    const rect = target.getBoundingClientRect();
    setHighlight({ y: rect.top - listTop, height: rect.height });
    setHover(index);
  };

  return (
    <div className="svc-list" ref={listRef}>
      <span
        className="svc-highlight glass"
        aria-hidden="true"
        style={{
          transform: `translateY(${highlight.y}px)`,
          height: `${highlight.height}px`,
          opacity: hover === null ? 0 : 1,
        }}
      />

      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.title}
            className={`svc-row${isOpen ? " is-open" : ""}`}
            onMouseEnter={(event) =>
              moveHighlight(index, event.currentTarget)
            }
            onMouseLeave={() => setHover(null)}
          >
            <button
              type="button"
              className="svc-head"
              aria-expanded={isOpen}
              aria-controls={`service-panel-${index}`}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span className="label svc-number">{item.number}</span>
              <span className="svc-title">{item.title}</span>
              <span className="svc-arrow" aria-hidden="true">
                ↗
              </span>
            </button>

            <div className="svc-panel" id={`service-panel-${index}`}>
              <div className="svc-panel-inner">
                <p>{item.description}</p>
                <ul className="svc-tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
