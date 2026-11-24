import type { Transition } from "./types";
import { createPanel, showPanels, swapScenes } from "./helpers";

/** T7 — Credentials → Experience: a skewed brown ribbon sweeps across. */
export const t7CredentialsExperience: Transition = (tl, ctx) => {
  const ribbon = createPanel(ctx.fx, "fx-ribbon", {
    width: "160%",
    left: "-30%",
    transformOrigin: "0% 50%",
  });
  const thread = createPanel(ctx.fx, "fx-thread", {
    width: "160%",
    left: "-30%",
  });

  tl.fromTo(
    ribbon,
    { xPercent: -125 },
    { xPercent: 0, duration: ctx.dur * 0.46, ease: "power2.inOut", immediateRender: false },
    ctx.at,
  );
  tl.fromTo(
    thread,
    { xPercent: -125 },
    { xPercent: -18, duration: ctx.dur * 0.46, ease: "power2.inOut", immediateRender: false },
    ctx.at + ctx.dur * 0.04,
  );
  showPanels(tl, [ribbon, thread], ctx.at, ctx.at + ctx.dur);

  swapScenes(tl, ctx);

  tl.to(ribbon, { xPercent: 125, duration: ctx.dur * 0.5, ease: "power2.inOut" }, ctx.at + ctx.dur * 0.5);
  tl.to(thread, { xPercent: 125, duration: ctx.dur * 0.5, ease: "power2.inOut" }, ctx.at + ctx.dur * 0.52);
};
