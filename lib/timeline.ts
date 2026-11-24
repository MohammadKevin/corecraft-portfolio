"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES } from "@/lib/scenes";
import { TRANSITIONS } from "@/lib/transitions";
import { clearFx } from "@/lib/transitions/helpers";
import type { BookRefs } from "@/lib/transitions/types";
import { registerStageApi } from "@/lib/stage-api";
import { setActiveScene } from "@/lib/stage-store";

gsap.registerPlugin(ScrollTrigger);

const UNIT_RATIO = 0.9;
const WORK_PAGES = 7;
const PAGE_FLIP = 0.9;
const WORK_HOLD = WORK_PAGES * PAGE_FLIP + 0.4;
const TRANSITION_DURATION = [1, 1, 1, 1, 1.8, 1.6, 1, 1, 1];

interface BuildArgs {
  wrap: HTMLElement;
  stage: HTMLElement;
  fx: HTMLElement;
  scenes: HTMLElement[];
  book: BookRefs | null;
  onPageChange: (page: number) => void;
}

interface StageHandle {
  timeline: gsap.core.Timeline;
  scrollTrigger: ScrollTrigger;
  labels: Record<string, number>;
  duration: number;
  goto: (progress: number) => void;
  gotoId: (id: string) => void;
  destroy: () => void;
}

export function buildStageTimeline({
  wrap,
  stage,
  fx,
  scenes,
  book,
  onPageChange,
}: BuildArgs): StageHandle {
  clearFx(fx);

  scenes.forEach((el, index) => {
    gsap.set(el, { autoAlpha: index === 0 ? 1 : 0, scale: 1, y: 0 });
    el.removeAttribute("inert");
    el.removeAttribute("aria-hidden");
  });

  if (book) {
    gsap.set(book.root, { yPercent: 0, autoAlpha: 1 });
    gsap.set(book.book, { xPercent: 25, rotateX: 4 });
    gsap.set(book.cover, { rotateY: 0 });
    gsap.set(book.leaves, { rotateY: 0 });
  }

  const tl = gsap.timeline({ defaults: { ease: "none" } });
  let cursor = 0;
  const windows: { start: number; end: number; from: number; to: number }[] = [];
  let pageStart = 0;
  let pageEnd = 0;

  scenes.forEach((scene, index) => {
    tl.addLabel(SCENES[index].id, cursor);
    const hold = SCENES[index].id === "work" ? WORK_HOLD : 1;

    if (SCENES[index].id === "work") {
      pageStart = cursor + 0.45;
      pageEnd = pageStart + WORK_PAGES * PAGE_FLIP;
      if (book) {
        tl.addLabel("work:book", cursor);
        book.leaves.forEach((leaf, leafIndex) => {
          const start = pageStart + leafIndex * PAGE_FLIP;
          const shade = leaf.querySelector<HTMLElement>("[data-leaf-shade]");
          const depth = leaf.querySelector<HTMLElement>("[data-leaf-depth]");

          tl.addLabel(`work:page-${leafIndex + 1}`, start);
          tl.fromTo(
            leaf,
            { rotateY: 0 },
            {
              rotateY: -180,
              duration: PAGE_FLIP,
              ease: "power1.inOut",
              immediateRender: false,
            },
            start,
          );
          tl.set(leaf, { zIndex: 30 + leafIndex }, start + PAGE_FLIP * 0.5);
          if (shade) {
            tl.fromTo(
              shade,
              { autoAlpha: 0 },
              {
                autoAlpha: 0.42,
                duration: PAGE_FLIP * 0.5,
                ease: "none",
                immediateRender: false,
              },
              start,
            );
            tl.to(shade, { autoAlpha: 0, duration: PAGE_FLIP * 0.5, ease: "none" }, start + PAGE_FLIP * 0.5);
          }
          if (depth) {
            tl.fromTo(
              depth,
              { autoAlpha: 0 },
              {
                autoAlpha: 0.35,
                duration: PAGE_FLIP * 0.5,
                ease: "none",
                immediateRender: false,
              },
              start,
            );
            tl.to(depth, { autoAlpha: 0, duration: PAGE_FLIP * 0.5, ease: "none" }, start + PAGE_FLIP * 0.5);
          }
        });
      }
    }

    cursor += hold;

    if (index < scenes.length - 1) {
      const dur = TRANSITION_DURATION[index] ?? 1;
      tl.addLabel(`t:${SCENES[index].id}`, cursor);
      TRANSITIONS[index](tl, {
        from: scene,
        to: scenes[index + 1],
        fx,
        label: {
          number: SCENES[index + 1].number,
          label: SCENES[index + 1].label,
        },
        n: index,
        at: cursor,
        dur,
        book,
      });
      windows.push({ start: cursor, end: cursor + dur, from: index, to: index + 1 });
      cursor += dur;
    }
  });

  const duration = tl.duration();
  const labels = { ...(tl.labels as Record<string, number>) };
  let lastActive = "";
  let lastPage = 0;

  const syncActive = () => {
    const time = tl.time();
    let index = 0;
    for (let i = 0; i < scenes.length; i++) {
      if (time >= labels[SCENES[i].id] - 0.0001) index = i;
    }
    const activeWindow = windows.find(
      (w) => time >= w.start - 0.0001 && time < w.end,
    );
    scenes.forEach((el, i) => {
      const interactive =
        i === index ||
        (activeWindow !== undefined &&
          (i === activeWindow.from || i === activeWindow.to));
      el.dataset.current = i === index ? "true" : "false";
      if (interactive) {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      } else {
        el.setAttribute("inert", "");
        el.setAttribute("aria-hidden", "true");
      }
    });

    const id = SCENES[index].id;
    if (id !== lastActive) {
      lastActive = id;
      setActiveScene(id);
      if (typeof history.replaceState === "function") {
        history.replaceState(null, "", `#${id}`);
      }
    }

    if (time >= pageStart && time <= pageEnd + 0.001) {
      const page = Math.min(
        WORK_PAGES,
        Math.max(1, Math.ceil((time - pageStart) / PAGE_FLIP + 0.0001)),
      );
      if (page !== lastPage) {
        lastPage = page;
        onPageChange(page);
      }
    }
  };

  const unit = () => window.innerHeight * UNIT_RATIO;

  const scrollTrigger = ScrollTrigger.create({
    trigger: wrap,
    start: "top top",
    end: () => `+=${duration * unit()}`,
    pin: stage,
    scrub: 0.7,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    animation: tl,
    onRefresh: syncActive,
  });

  // ScrollTrigger's onUpdate is unreliable while it drives a scrubbed timeline,
  // so listen to the timeline itself — it re-renders on every scrub tick.
  tl.eventCallback("onUpdate", syncActive);

  const goto = (progress: number, smooth = true) => {
    const clamped = Math.min(1, Math.max(0, progress));
    const top = scrollTrigger.start + clamped * (scrollTrigger.end - scrollTrigger.start);
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  };

  const gotoId = (id: string, smooth = true) => {
    const time = labels[id];
    if (time === undefined) return;
    // Nudge past the label boundary so sub-pixel scroll rounding cannot leave
    // the timeline in the tail of the previous transition.
    goto(Math.min(1, (time + 0.1) / duration), smooth);
  };

  // Honour a deep link on first load, after the pinned range is measured.
  const hash = window.location.hash.replace("#", "");
  if (hash && labels[hash] !== undefined) {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const time = labels[hash];
      if (time === undefined) return;
      window.scrollTo(
        0,
        scrollTrigger.start +
          (Math.min(1, (time + 0.1) / duration)) *
            (scrollTrigger.end - scrollTrigger.start),
      );
    });
  }

  registerStageApi({ goto, gotoId, labels, duration });

  if (process.env.NEXT_PUBLIC_QA === "1") {
    (window as unknown as Record<string, unknown>).__stage = {
      goto,
      gotoId,
      labels,
      duration,
      scrollTrigger,
    };
  }

  syncActive();

  const destroy = () => {
    scrollTrigger.kill();
    tl.kill();
    registerStageApi(null);
    scenes.forEach((el) => {
      el.removeAttribute("inert");
      el.removeAttribute("aria-hidden");
      gsap.set(el, { clearProps: "all" });
    });
    clearFx(fx);
    if (book) {
      gsap.set([book.root, book.book, book.cover, ...book.leaves], { clearProps: "all" });
    }
  };

  return { timeline: tl, scrollTrigger, labels, duration, goto, gotoId, destroy };
}
