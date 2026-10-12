<div align="center">

# CoreCraft Portfolio

<p>Mohammad Kevin — Backend & Fullstack Software Engineer Portfolio</p>

![Next.js](https://img.shields.io/badge/Next.js-blue?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-blue?style=flat-square) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-blue?style=flat-square)

</div>

---

## Overview

A light editorial portfolio built around case studies: an outlined giant name in
the hero, a filterable selected-work grid, an accordion of engineering services,
and a dark experience band with a floating hover thumbnail. Every project has
its own page at `/work/[slug]`.

## Key Features

- Editorial hero with an outline + solid display name and a subtle parallax
- Filterable project grid (`role="tablist"`) linking to `/work/[slug]`
- Services accordion with a mockup preview per row
- Dark experience section with a pointer-following hover thumbnail
- Lenis smooth scrolling, magnetic buttons and a custom cursor, all disabled on
  touch devices and under `prefers-reduced-motion`
- Static generation for every project page, plus sitemap and robots

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Motion**: Framer Motion, Lenis
- **Icons**: Lucide React, plus local brand SVGs

## Getting Started

### Installation & Local Setup

```bash
git clone https://github.com/MohammadKevin/corecraft-portfolio.git
cd corecraft-portfolio
npm install
npm run dev
```

### Environment

Copy `.env.example` to `.env.local`. The only variable is optional:

```bash
NEXT_PUBLIC_SITE_URL=https://corecraft.my.id
```

If it is not set, the canonical base URL falls back to `https://corecraft.my.id`.

### Regenerating placeholder art

Project covers, galleries, service previews and experience thumbnails are
generated SVGs so the layout is complete before real screenshots exist:

```bash
node scripts/generate-placeholders.mjs
```

Replace the files in `public/images/**` with real captures and delete the script
once that is done.

---

## Author

**Mohammad Kevin**
- **Domain:** [corecraft.my.id](https://corecraft.my.id)
- **GitHub:** [@MohammadKevin](https://github.com/MohammadKevin)
- **LinkedIn:** [Mohammad Kevin](https://www.linkedin.com/in/mohammad-kevin-arif-rudianto-945733347/)
- **Email:** [kvn4.200581@gmail.com](mailto:kvn4.200581@gmail.com)

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
