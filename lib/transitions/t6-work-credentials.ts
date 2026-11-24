import type { Transition } from "./types";
import { createTitleCard, showTitle } from "./helpers";

/** T6 — Work → Credentials: the cover closes, the book leaves upward. */
export const t6WorkCredentials: Transition = (tl, ctx) => {
  const book = ctx.book;

  if (book) {
    tl.to(
      book.cover,
      { rotateY: 0, duration: ctx.dur * 0.4, ease: "power2.inOut" },
      ctx.at,
    );
    tl.to(
      book.book,
      { xPercent: 25, duration: ctx.dur * 0.4, ease: "power2.inOut" },
      ctx.at,
    );
    tl.to(
      book.root,
      { yPercent: -110, autoAlpha: 0, duration: ctx.dur * 0.4, ease: "power2.in" },
      ctx.at + ctx.dur * 0.28,
    );
  }

  tl.fromTo(
    ctx.to,
    { y: "12vh", autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: ctx.dur * 0.55,
      ease: "power2.out",
      immediateRender: false,
    },
    ctx.at + ctx.dur * 0.4,
  );

  tl.set(ctx.from, { autoAlpha: 0 }, ctx.at + ctx.dur * 0.55);

  const card = createTitleCard(ctx.fx, ctx.label);
  showTitle(tl, ctx, card);
};
