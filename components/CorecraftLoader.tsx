"use client";

import React, { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "corecraft_loader_seen";

export default function CorecraftLoader() {
  const [gone, setGone] = useState(false);
  const [caption, setCaption] = useState(false);
  const [lift, setLift] = useState(false);

  const textRef = useRef<SVGTextElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      const skip = setTimeout(() => setGone(true), 0);
      return () => clearTimeout(skip);
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    document.body.classList.add("is-loading");

    const finish = () => {
      if (cancelled) return;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // storage unavailable
      }
      document.body.classList.remove("is-loading");
      setGone(true);
    };

    const liftAndFinish = () => {
      if (cancelled) return;
      setLift(true);
      timers.push(setTimeout(finish, 1100));
    };

    const holdCaption = () => {
      if (cancelled) return;
      setCaption(true);
      timers.push(setTimeout(liftAndFinish, 1000));
    };

    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hardStop = setTimeout(finish, 12000);
    timers.push(hardStop);

    if (reduced) {
      timers.push(setTimeout(() => setCaption(true), 0));
      timers.push(setTimeout(liftAndFinish, 600));
      return () => {
        cancelled = true;
        timers.forEach(clearTimeout);
        document.body.classList.remove("is-loading");
      };
    }

    const draw = () => {
      if (cancelled) return;
      const text = textRef.current;
      const path = pathRef.current;
      const svg = svgRef.current;
      if (!text || !path || !svg) return;

      const b = text.getBBox();
      const pad = 30;
      svg.setAttribute(
        "viewBox",
        `${b.x - pad} ${b.y - pad} ${b.width + pad * 2} ${b.height + pad * 2}`
      );

      const sw = b.height * 0.62;
      const yA = b.y + sw / 2 - 8;
      const yB = b.y + b.height - sw / 2 + 8;
      const dx = sw * 0.42;

      let x = b.x - sw / 2;
      let k = 0;
      let d = `M ${x} ${yA}`;
      while (x < b.x + b.width + sw / 2) {
        x += dx;
        k++;
        d += ` L ${x} ${k % 2 ? yB : yA}`;
      }

      path.setAttribute("d", d);
      path.setAttribute("stroke-width", String(sw));

      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);

      const animation = path.animate(
        [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
        {
          duration: 3400,
          delay: 350,
          easing: "cubic-bezier(.5,.05,.3,1)",
          fill: "forwards",
        }
      );
      animation.onfinish = holdCaption;
    };

    const fallback = () => {
      if (cancelled) return;
      setCaption(true);
      timers.push(setTimeout(liftAndFinish, 600));
    };

    let settled = false;
    const fontTimeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        fallback();
      }
    }, 2600);

    if (document.fonts?.load) {
      const family =
        Array.from(document.fonts).find((face) =>
          /sacramento/i.test(face.family)
        )?.family ?? "Sacramento";

      document.fonts
        .load(`400 300px "${family}"`)
        .then(() => {
          if (settled || cancelled) return;
          settled = true;
          clearTimeout(fontTimeout);
          requestAnimationFrame(draw);
        })
        .catch(() => {
          if (settled || cancelled) return;
          settled = true;
          clearTimeout(fontTimeout);
          fallback();
        });
    } else {
      clearTimeout(fontTimeout);
      requestAnimationFrame(draw);
    }

    return () => {
      cancelled = true;
      settled = true;
      timers.forEach(clearTimeout);
      clearTimeout(fontTimeout);
      document.body.classList.remove("is-loading");
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`loader${lift ? " is-lifting" : ""}`}
      aria-hidden="true"
      data-loader
    >
      <div className="loader-inner">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 400"
          role="img"
          aria-label="Corecraft"
        >
          <defs>
            <mask
              id="pm"
              maskUnits="userSpaceOnUse"
              x="-3000"
              y="-3000"
              width="8000"
              height="8000"
            >
              <path
                ref={pathRef}
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </mask>
            <linearGradient id="pg" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#0a0a0f" />
              <stop offset=".6" stopColor="#0a0a0f" />
              <stop offset="1" stopColor="#ff4d12" />
            </linearGradient>
          </defs>
          <g mask="url(#pm)">
            <text
              ref={textRef}
              x="500"
              y="260"
              textAnchor="middle"
              fill="url(#pg)"
              style={{
                fontFamily: "var(--font-sacramento), Sacramento, cursive",
                fontSize: 300,
              }}
            >
              Corecraft
            </text>
          </g>
        </svg>

        <p className={`loader-caption${caption ? " show" : ""}`}>
          Backend &amp; Fullstack Engineer
        </p>
      </div>
    </div>
  );
}
