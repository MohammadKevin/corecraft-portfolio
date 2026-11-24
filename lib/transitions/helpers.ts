import type { gsap } from "gsap";
import type { TransitionCtx } from "./types";

export function createPanel(
  fx: HTMLElement,
  className: string,
  style: Partial<CSSStyleDeclaration> = {},
): HTMLDivElement {
  const el = document.createElement("div");
  el.className = `fx-panel ${className}`;
  Object.assign(el.style, style);
  fx.appendChild(el);
  return el;
}

/**
 * Panels are created at build time, so they must stay invisible until their
 * transition actually starts — otherwise every overlay would cover the stage
 * while the scroll position is still at zero.
 */
export function showPanels(
  tl: gsap.core.Timeline,
  panels: HTMLElement[],
  at: number,
  until: number,
) {
  tl.set(panels, { autoAlpha: 1 }, at);
  tl.set(panels, { autoAlpha: 0 }, until);
}

/** Hide the outgoing scene and reveal the incoming one while covered. */
export function swapScenes(tl: gsap.core.Timeline, ctx: TransitionCtx) {
  const mid = ctx.at + ctx.dur / 2;
  tl.set(ctx.from, { autoAlpha: 0 }, mid);
  tl.set(ctx.to, { autoAlpha: 1 }, mid);
  tl.set(ctx.from, { autoAlpha: 0 }, ctx.at + ctx.dur);
}

/** Square destination card: "02 · About". */
export function createTitleCard(
  fx: HTMLElement,
  label: { number: string; label: string },
): HTMLDivElement {
  const card = document.createElement("div");
  card.className = "fx-title";
  const n = document.createElement("span");
  n.textContent = label.number;
  const separator = document.createElement("i");
  separator.textContent = "·";
  const name = document.createElement("span");
  name.textContent = label.label.toUpperCase();
  card.append(n, separator, name);
  fx.appendChild(card);
  return card;
}

export function showTitle(
  tl: gsap.core.Timeline,
  ctx: TransitionCtx,
  card: HTMLElement,
) {
  tl.fromTo(
    card,
    { autoAlpha: 0, y: 18 },
    {
      autoAlpha: 1,
      y: 0,
      duration: ctx.dur * 0.16,
      ease: "power2.out",
      immediateRender: false,
    },
    ctx.at + ctx.dur * 0.34,
  );
  tl.to(
    card,
    { autoAlpha: 0, duration: ctx.dur * 0.15, ease: "power2.in" },
    ctx.at + ctx.dur * 0.6,
  );
}

export function clearFx(fx: HTMLElement) {
  fx.replaceChildren();
}
