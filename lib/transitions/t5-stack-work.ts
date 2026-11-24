import type { Transition } from "./types";

/**
 * T5 — Stack → Work: the stack recedes, a closed book rises from below, then
 * the cover opens as the reader keeps scrolling.
 */
export const t5StackWork: Transition = (tl, ctx) => {
  const book = ctx.book;

  tl.to(
    ctx.from,
    { scale: 0.94, autoAlpha: 0, duration: ctx.dur * 0.42, ease: "power1.in" },
    ctx.at,
  );
  tl.set(ctx.to, { autoAlpha: 1 }, ctx.at);

  if (!book) {
    tl.set(ctx.from, { autoAlpha: 0 }, ctx.at + ctx.dur * 0.42);
    return;
  }

  tl.fromTo(
    book.root,
    { yPercent: 100, autoAlpha: 0 },
    {
      yPercent: 0,
      autoAlpha: 1,
      duration: ctx.dur * 0.36,
      ease: "power2.out",
      immediateRender: false,
    },
    ctx.at + ctx.dur * 0.04,
  );

  tl.fromTo(
    book.book,
    { rotateX: 18, xPercent: 25 },
    {
      rotateX: 4,
      xPercent: 0,
      duration: ctx.dur * 0.6,
      ease: "power2.inOut",
      immediateRender: false,
    },
    ctx.at + ctx.dur * 0.34,
  );

  tl.fromTo(
    book.cover,
    { rotateY: 0 },
    {
      rotateY: -178,
      duration: ctx.dur * 0.62,
      ease: "power2.inOut",
      immediateRender: false,
    },
    ctx.at + ctx.dur * 0.36,
  );

  if (book.shadow) {
    tl.fromTo(
      book.shadow,
      { scaleX: 0.72, autoAlpha: 0.25 },
      {
        scaleX: 1,
        autoAlpha: 0.6,
        duration: ctx.dur * 0.6,
        ease: "power2.out",
        immediateRender: false,
      },
      ctx.at + ctx.dur * 0.34,
    );
  }

  tl.set(ctx.from, { scale: 1, autoAlpha: 0 }, ctx.at + ctx.dur);
};
