import type { Transition } from "./types";
import { createPanel, showPanels, swapScenes } from "./helpers";

/** T8 — Experience → Education: five paper leaves fold open like a fan. */
export const t8ExperienceEducation: Transition = (tl, ctx) => {
  const fold = createPanel(ctx.fx, "fx-fold", {
    left: "0",
    width: "20%",
    transformOrigin: "0% 50%",
  });
  const leaves = Array.from({ length: 5 }, (_, i) =>
    createPanel(ctx.fx, "fx-fan", {
      left: `${i * 20}%`,
      width: "20.2%",
      transformOrigin: i % 2 === 0 ? "0% 50%" : "100% 50%",
    }),
  );

  // The base sheet folds down first, then each leaf unfolds.
  tl.fromTo(
    fold,
    { rotateY: 90 },
    { rotateY: 0, duration: ctx.dur * 0.2, ease: "power2.out", immediateRender: false },
    ctx.at,
  );

  tl.fromTo(
    leaves,
    { rotateY: (i: number) => (i % 2 === 0 ? 90 : -90) },
    {
      rotateY: 0,
      duration: ctx.dur * 0.24,
      stagger: ctx.dur * 0.028,
      ease: "power2.out",
      immediateRender: false,
    },
    ctx.at + ctx.dur * 0.04,
  );
  showPanels(tl, [fold, ...leaves], ctx.at, ctx.at + ctx.dur);

  swapScenes(tl, ctx);

  tl.to(
    leaves,
    {
      rotateY: (i: number) => (i % 2 === 0 ? -90 : 90),
      duration: ctx.dur * 0.22,
      stagger: ctx.dur * 0.028,
      ease: "power2.in",
    },
    ctx.at + ctx.dur * 0.5,
  );
  tl.to(fold, { rotateY: -90, duration: ctx.dur * 0.2, ease: "power2.in" }, ctx.at + ctx.dur * 0.52);
};
