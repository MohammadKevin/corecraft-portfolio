import type { Transition } from "./types";
import { createPanel, createTitleCard, showPanels, showTitle, swapScenes } from "./helpers";

/** T3 — Services → Process: two caramel doors meet on a cream seam, then part. */
export const t3ServicesProcess: Transition = (tl, ctx) => {
  const left = createPanel(ctx.fx, "fx-door", {
    left: "0",
    width: "50.1%",
    transformOrigin: "0% 50%",
  });
  const right = createPanel(ctx.fx, "fx-door", {
    left: "50%",
    width: "50.1%",
    transformOrigin: "100% 50%",
  });
  const seam = createPanel(ctx.fx, "fx-seam", {
    left: "50%",
    width: "2px",
    marginLeft: "-1px",
  });

  tl.fromTo(
    left,
    { xPercent: -100 },
    { xPercent: 0, duration: ctx.dur * 0.46, ease: "power2.inOut", immediateRender: false },
    ctx.at,
  );
  showPanels(tl, [left, right], ctx.at, ctx.at + ctx.dur);
  tl.fromTo(
    right,
    { xPercent: 100 },
    { xPercent: 0, duration: ctx.dur * 0.46, ease: "power2.inOut", immediateRender: false },
    ctx.at,
  );
  tl.fromTo(
    seam,
    { scaleY: 0, autoAlpha: 0 },
    { scaleY: 1, autoAlpha: 1, duration: ctx.dur * 0.3, ease: "none", immediateRender: false },
    ctx.at + ctx.dur * 0.12,
  );

  swapScenes(tl, ctx);
  showTitle(tl, ctx, createTitleCard(ctx.fx, ctx.label));

  tl.to(left, { xPercent: -100, duration: ctx.dur * 0.46, ease: "power2.inOut" }, ctx.at + ctx.dur * 0.5);
  tl.to(right, { xPercent: 100, duration: ctx.dur * 0.46, ease: "power2.inOut" }, ctx.at + ctx.dur * 0.5);
  tl.to(seam, { autoAlpha: 0, duration: ctx.dur * 0.2 }, ctx.at + ctx.dur * 0.5);
};
