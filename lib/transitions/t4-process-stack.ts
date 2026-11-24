import type { Transition } from "./types";
import { createPanel, showPanels, swapScenes } from "./helpers";

/** T4 — Process → Stack: six staggered columns rise like a staircase. */
export const t4ProcessStack: Transition = (tl, ctx) => {
  const steps = Array.from({ length: 6 }, (_, i) =>
    createPanel(ctx.fx, i % 2 === 0 ? "fx-step is-brown" : "fx-step is-tan", {
      left: `${(i * 100) / 6}%`,
      width: `${100 / 6 + 0.15}%`,
    }),
  );

  tl.fromTo(
    steps,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: ctx.dur * 0.3,
      stagger: ctx.dur * 0.035,
      ease: "power2.out",
      immediateRender: false,
    },
    ctx.at,
  );
  showPanels(tl, steps, ctx.at, ctx.at + ctx.dur);

  swapScenes(tl, ctx);

  tl.to(
    steps,
    {
      yPercent: -100,
      duration: ctx.dur * 0.3,
      stagger: ctx.dur * 0.035,
      ease: "power2.in",
    },
    ctx.at + ctx.dur * 0.5,
  );
};
