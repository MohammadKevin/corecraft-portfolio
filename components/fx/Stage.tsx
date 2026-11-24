"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "./Nav";
import { Loader } from "./Loader";
import { useStageMode } from "@/lib/useStageMode";
import { buildStageTimeline } from "@/lib/timeline";
import { goTo } from "@/lib/stage-api";
import { setActiveScene } from "@/lib/stage-store";

function subscribeLoader(callback: () => void) {
  window.addEventListener("corecraft:loader-done", callback);
  return () => window.removeEventListener("corecraft:loader-done", callback);
}

function readLoaderDone() {
  return window.__loaderDone === true;
}

function countUp(scope: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    if (el.dataset.counted === "true") return;
    el.dataset.counted = "true";
    const raw = el.dataset.count ?? "";
    const target = parseInt(raw.replace(/\D/g, ""), 10);
    const suffix = raw.replace(/[0-9]/g, "");
    const pad = Number(el.dataset.pad) || 0;
    if (Number.isNaN(target)) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1200);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased)).padStart(pad, "0") + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

export function Stage({ children }: { children: ReactNode }) {
  const { mode, ready } = useStageMode();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const introPlayed = useRef(false);
  const loaderDone = useSyncExternalStore(subscribeLoader, readLoaderDone, () => false);

  // Build / destroy the pinned scroll timeline.
  useEffect(() => {
    if (!ready || mode !== "stage") return;
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const fx = fxRef.current;
    if (!wrap || !stage || !fx) return;

    const scenes = Array.from(stage.querySelectorAll<HTMLElement>(".scene"));
    const bookRoot = stage.querySelector<HTMLElement>("[data-book-root]");
    const book = bookRoot
      ? {
          root: bookRoot,
          book: stage.querySelector<HTMLElement>("[data-book-body]")!,
          cover: stage.querySelector<HTMLElement>("[data-book-cover]")!,
          leaves: Array.from(
            stage.querySelectorAll<HTMLElement>("[data-leaf]"),
          ),
          shadow: stage.querySelector<HTMLElement>("[data-book-shadow]"),
        }
      : null;

    const handle = buildStageTimeline({
      wrap,
      stage,
      fx,
      scenes,
      book,
      onPageChange: (page) => {
        window.dispatchEvent(new CustomEvent("corecraft:page", { detail: page }));
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      handle.destroy();
      setActiveScene("hero");
    };
  }, [mode, ready]);

  // Hero entrance, once the loader is gone.
  useEffect(() => {
    if (!loaderDone || introPlayed.current) return;
    introPlayed.current = true;

    const scope = stageRef.current;
    if (!scope) return;
    if (document.documentElement.dataset.motion === "off") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const word = scope.querySelector<HTMLElement>("[data-hero-word]");
    const photo = scope.querySelector<HTMLElement>(".hero-photo");
    const copy = scope.querySelectorAll<HTMLElement>(".hero-copy > *");
    const top = scope.querySelectorAll<HTMLElement>(".hero-ui-top > *");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (word) {
      tl.fromTo(
        word,
        { clipPath: "inset(100% 0 0 0)", y: 40 },
        { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.1, ease: "expo.out" },
        0,
      );
    }
    if (photo) {
      tl.fromTo(photo, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.25);
    }
    if (top.length) {
      tl.fromTo(top, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 }, 0.1);
    }
    if (copy.length) {
      tl.fromTo(
        copy,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09 },
        0.3,
      );
    }

    const counts = scope.querySelectorAll<HTMLElement>(".hero-stats [data-count]");
    counts.forEach((el) => el.setAttribute("data-counted", "false"));
    countUp(scope);
  }, [loaderDone]);

  // Section reveals in FLOW mode.
  useEffect(() => {
    if (!ready || mode !== "flow") return;
    const scenes = Array.from(document.querySelectorAll<HTMLElement>(".scene"));
    scenes.forEach((scene) => {
      if (scene.id === "hero") scene.classList.add("is-in");
    });
    if (!("IntersectionObserver" in window)) {
      scenes.forEach((scene) => scene.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );
    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, [mode, ready]);

  // Pointer parallax on the hero (fine pointers only).
  useEffect(() => {
    if (!ready) return;
    const hero = document.getElementById("hero");
    if (!hero) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    if (document.documentElement.dataset.motion === "off") return;

    const word = hero.querySelector<HTMLElement>(".hero-word-inner");
    const photo = hero.querySelector<HTMLElement>(".hero-photo img");
    if (!word || !photo) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const loop = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      word.style.transform = `translate3d(${(-currentX * 14).toFixed(2)}px, ${(
        -currentY * 8
      ).toFixed(2)}px, 0)`;
      photo.style.transform = `translate3d(${(currentX * 6).toFixed(2)}px, ${(
        currentY * 3
      ).toFixed(2)}px, 0)`;
      frame = window.requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    hero.addEventListener("pointermove", onMove, { passive: true });
    frame = window.requestAnimationFrame(loop);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(frame);
      word.style.transform = "";
      photo.style.transform = "";
    };
  }, [ready, mode]);

  // Anchor navigation has to go through the stage timeline.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onClick = (event: MouseEvent) => {
      if (document.documentElement.dataset.mode !== "stage") return;
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      event.preventDefault();
      goTo(id);
    };
    wrap.addEventListener("click", onClick);
    return () => wrap.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Loader />
      <Nav />
      <main className="stage-wrap" id="main-content" ref={wrapRef}>
        <div className="stage" ref={stageRef}>
          {children}
          <div className="fx" ref={fxRef} aria-hidden="true" />
        </div>
      </main>
    </>
  );
}
