import type { Transition } from "./types";
import { createPanel, createTitleCard, showPanels, showTitle, swapScenes } from "./helpers";

/** T9 — Education → Contact: a brown curtain drops, then lifts away. */
export const t9EducationContact: Transition = (tl, ctx) => {
  const curtain = createPanel(ctx.fx, "fx-curtain", {
    transformOrigin: "50% 0%",
  });
  const card = createTitleCard(ctx.fx, ctx.label);

  tl.fromTo(
    curtain,
    { scaleY: 0 },
    { scaleY: 1, duration: ctx.dur * 0.42, ease: "power2.inOut", immediateRender: false },
    ctx.at,
  );
  showPanels(tl, [curtain], ctx.at, ctx.at + ctx.dur);

  swapScenes(tl, ctx);
  showTitle(tl, ctx, card);

  tl.set(curtain, { transformOrigin: "50% 100%" }, ctx.at + ctx.dur * 0.5);
  tl.to(curtain, { scaleY: 0, duration: ctx.dur * 0.46, ease: "power2.inOut" }, ctx.at + ctx.dur * 0.52);
};
