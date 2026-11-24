# Cleanup log

Baseline: tag `pre-redesign` (commit `f0f21af` and later). All removals below were
verified with `knip`, `depcheck` and `ts-prune` before deletion; the raw reports
are kept in `docs/audit/`.

## Dependencies removed

| Package         | Why it went away                                                                 |
| --------------- | -------------------------------------------------------------------------------- |
| `framer-motion` | Replaced by one GSAP + ScrollTrigger timeline for the stage and CSS for reveals. |
| `lenis`         | Native scrolling + ScrollTrigger scrub; Lenis fought the pinned timeline.         |
| `lucide-react`  | Icons are now inline SVG or text glyphs; no runtime icon package needed.          |

Added: `gsap`, `@gsap/react` (runtime), `@playwright/test`, `@axe-core/playwright`
(QA). `knip`, `depcheck` and `ts-prune` are dev-only audit tools.

`@tailwindcss/postcss`, `tailwindcss` and `@types/react-dom` are reported as unused
by `depcheck`, but Tailwind v4 is loaded through `postcss.config.mjs` and React DOM
types are required by the Next.js type setup. They stay.

## Files removed

Old runtime components, superseded by the scene/transition architecture:

- `components/AppleHelloLoader.tsx`
- `components/CorecraftLoader.tsx`, `components/Preloader.tsx`
- `components/Atmosphere.tsx`, `components/CustomCursor.tsx`, `components/MotionRoot.tsx`
- `components/CountUp.tsx`, `components/Reveal.tsx`, `components/MagneticButton.tsx`
- `components/SmoothScroll.tsx`
- `components/ServicesAccordion.tsx`, `components/StackSection.tsx`
- `components/WorkList.tsx`, `components/SiteNav.tsx`
- `components/ContactActions.tsx` (rebuilt as `components/scenes/ContactActions.tsx`)

Old helpers and data that no longer had a consumer:

- `lib/hooks.ts`, `lib/icons.ts`, `lib/motion.ts`, `lib/scroll.ts`, `lib/sections.ts`
- `lib/useActiveSection.ts`, `lib/useSectionProgress.ts`
- `data/site.ts`, `data/ui.ts`
- `scripts/generate-placeholders.mjs` (placeholder SVG generator, replaced by the
  runtime `ProjectPlate` fallback)

`scripts/build-hero-assets.cjs` replaces ad-hoc image conversion and generates
`public/images/hero-kevin.webp` (864×1156) plus `hero-kevin-sm.webp` (432×578)
from `public/images/kevinimg.png`.

## Renames / retained

- `data/certificates.ts` → `data/credentials.ts`; `certificateCount` and the
  grouped helper live there now. `data/index.ts` no longer re-exports `site`/`ui`.
- `public/images/profile-removebg.png` → `public/images/kevinimg.png` (source image
  kept in the repo, not shipped at runtime).
- `data/stack.ts` stays even though the old UI dropped it: the Stack scene renders
  `stackGroups`.
- Subpage stack (`WorkArchive`, `ProjectDetail`, `ProjectMockup`, `LanguageToggle`,
  `lib/i18n.tsx`) is retained and restyled; it is not part of the scene timeline.
- Bilingual `data/*Id` exports and the language toggle remain for subpages. The
  homepage renders English copy with `<html lang="id">`, as decided in the brief.

## Asset gaps (honest TODO)

- Only Outer.Co, Clinic and CoreCraft project thumbnails exist. Other projects render
  the `ProjectPlate` “Visual pending” fallback. Gallery SVGs referenced by
  `data/projects.ts` are also absent.
- `hero-kevin.webp` is 864×1156; the brief asks for a larger cutout. The source
  `kevinimg.png` is below that resolution, so it is documented rather than upscaled.

## Verification

- `npx tsc --noEmit` — passed.
- `npx eslint app components lib data e2e scripts/*.mjs` — passed.
- `npx next build` — passed (after retrying past Next.js' security notice).
- `npx playwright test` — see `docs/QA_REPORT.md` for the current result.
