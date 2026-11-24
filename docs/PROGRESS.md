# Redesign progress

Branch: `redesign`. Baseline tag: `pre-redesign`.
Approach: one commit per phase, each phase verified before moving on.

| Phase | Scope                                                                                         | Status |
| ----- | --------------------------------------------------------------------------------------------- | ------ |
| 1     | Audit and cleanup: remove unused components/libs/deps, keep subpage stack.                    | Done   |
| 2     | Content + assets: credentials rename, profile hero fields, hero images, data index.            | Done   |
| 3     | Foundations: scene registry, stage store/API, mode hook, media resolver, timeline builder.      | Done   |
| 4     | Transitions T1–T9, shared helpers, title cards, panel visibility.                              | Done   |
| 5     | Ten scenes (Hero → Contact), SceneHead, ContactActions, ProjectPlate fallback.                  | Done   |
| 6     | Runtime: Loader, Stage (pin + scrub), Nav, Book, anchor interception, hash sync.                | Done   |
| 7     | Design system: Tailwind v4 tokens, STAGE/FLOW layouts, book, subpages, not-found.               | Done   |
| 8     | Loader behaviour: Sacramento mask, 3.4s draw, 1s hold, lift, once-per-session, failsafes.        | Done   |
| 9     | QA harness: Playwright config, screenshots, e2e specs, axe, overflow checks, FPS script.       | Done   |
| 10    | Final gates: typecheck, lint, build, Playwright matrix, FPS, Lighthouse, docs.                  | In progress |

## Decisions recorded

- Homepage copy stays English while the document is declared `lang="id"`, per the
  brief. Subpages follow the language toggle.
- STAGE mode: `(min-width:1024px) and (min-height:700px)`, motion on, no reduced
  motion. Everything else uses FLOW.
- One unit = `0.9 × innerHeight`; the pinned timeline is 15.1 units of scene time,
  26.1 total (see `lib/timeline.ts`). Scene labels:
  `hero 0`, `about 2`, `services 4`, `process 6`, `stack 8`, `work 10.8`,
  `credentials 19.1`, `experience 21.1`, `education 23.1`, `contact 25.1`.
- Book: 7 leaves, one 0.9-unit flip plus a 0.4 hold each; T5 is 1.8 and T6 is 1.6.
- Scene visibility is driven by GSAP `autoAlpha`; `data-current` exists only for
  CSS/labels. Transition panels are built at build time and start hidden via
  `.fx-panel` and `showPanels()`.

## Known open items

- Missing project gallery/thumbnail assets → runtime placeholder (`ProjectPlate`).
- Hero source image resolution is below the requested size.
- Next.js 16.4.0 prints a security upgrade recommendation; not applied because it
  is outside the redesign scope and needs the user's decision.
- Lighthouse has not been run at the time of writing; results will be appended to
  `docs/QA_REPORT.md` once measured.
