import type { Transition } from "./types";

/**
 * T1 — Hero → About: "Flying through the word".
 * The hero word + portrait scale up past the camera; About grows in behind.
 */
export const t1HeroAbout: Transition = (tl, ctx) => {
  const visual = ctx.from.querySelector<HTMLElement>("[data-hero-visual]");
  const word = ctx.from.querySelector<HTMLElement>("[data-hero-word]");

  if (visual) {
    tl.to(
      visual,
      {
        scale: 2.6,
        transformOrigin: "50% 34%",
        autoAlpha: 0,
        duration: ctx.dur,
        ease: "power1.in",
      },
      ctx.at,
    );
  }

  if (word) {
    tl.fromTo(
      word,
      { filter: "blur(0px)" },
      {
        filter: "blur(9px)",
        duration: ctx.dur * 0.55,
        ease: "power1.in",
        immediateRender: false,
      },
      ctx.at,
    );
  }

  tl.fromTo(
    ctx.to,
    { scale: 0.9, autoAlpha: 0 },
    {
      scale: 1,
      autoAlpha: 1,
      duration: ctx.dur * 0.75,
      ease: "power1.out",
      immediateRender: false,
    },
    ctx.at + ctx.dur * 0.22,
  );

  // Keep the timeline reversible: reset the hero once it is fully hidden.
  tl.set(visual ?? [], { scale: 1, filter: "none" }, ctx.at + ctx.dur);
  tl.set(word ?? [], { filter: "none" }, ctx.at + ctx.dur);
  tl.set(ctx.from, { autoAlpha: 0 }, ctx.at + ctx.dur);
};
