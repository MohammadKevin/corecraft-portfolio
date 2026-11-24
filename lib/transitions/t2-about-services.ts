import type { Transition } from "./types";
import { createPanel, showPanels, swapScenes } from "./helpers";

/** T2 — About → Services: ten brown blades close like venetian blinds. */
export const t2AboutServices: Transition = (tl, ctx) => {
  const bars = Array.from({ length: 10 }, (_, i) =>
    createPanel(ctx.fx, "fx-blind", {
      top: `${i * 10}%`,
      height: "10.2%",
      transformOrigin: "50% 0%",
    }),
  );

  tl.fromTo(
    bars,
    { rotateX: 90 },
    {
      rotateX: 0,
      duration: ctx.dur * 0.18,
      stagger: ctx.dur * 0.035,
      ease: "none",
      immediateRender: false,
    },
    ctx.at,
  );
  showPanels(tl, bars, ctx.at, ctx.at + ctx.dur);

  swapScenes(tl, ctx);

  tl.to(
    bars,
    {
      rotateX: -90,
      duration: ctx.dur * 0.18,
      stagger: ctx.dur * 0.035,
      ease: "none",
    },
    ctx.at + ctx.dur * 0.5,
  );
};
