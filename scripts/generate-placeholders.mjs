/**
 * Generates lightweight SVG placeholders for project covers, galleries,
 * service previews and experience thumbnails.
 *
 * These exist so the redesign renders correctly before real screenshots are
 * available. Replace the files in `public/images/**` with real captures and
 * delete this script (see TODO in the final report).
 *
 * Usage: node scripts/generate-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");

const palettes = [
  { from: "#eef2f7", to: "#dbe4ee", accent: "#0f172a" },
  { from: "#f5f0ea", to: "#e8ded2", accent: "#3f3226" },
  { from: "#eaf3ef", to: "#d6e7de", accent: "#123528" },
  { from: "#eef0f7", to: "#dfe3f0", accent: "#1c2340" },
  { from: "#f7eef1", to: "#eeddE3", accent: "#3d1f2a" },
  { from: "#eef4f7", to: "#dce8ef", accent: "#0d2b38" },
  { from: "#f2f1ec", to: "#e4e2d8", accent: "#2f3128" },
];

function esc(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function svg({ w, h, palette, label, kicker, variant }) {
  const id = `${label}-${variant}`.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const cx = variant % 2 === 0 ? w * 0.72 : w * 0.28;
  const cy = variant % 3 === 0 ? h * 0.3 : h * 0.66;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.from}"/>
      <stop offset="100%" stop-color="${palette.to}"/>
    </linearGradient>
    <radialGradient id="glow-${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${palette.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid-${id}" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="${palette.accent}" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
  <rect width="${w}" height="${h}" fill="url(#grid-${id})"/>
  <circle cx="${cx}" cy="${cy}" r="${Math.max(w, h) * 0.42}" fill="url(#glow-${id})"/>

  <rect x="${w * 0.08}" y="${h * 0.1}" width="${w * 0.84}" height="${h * 0.8}"
        fill="none" stroke="${palette.accent}" stroke-opacity="0.12" stroke-width="1"/>

  <text x="${w * 0.1}" y="${h * 0.86}" font-family="Syne, Inter, sans-serif"
        font-size="${Math.round(h * 0.05)}" font-weight="600" letter-spacing="6"
        fill="${palette.accent}" fill-opacity="0.5">${esc(kicker)}</text>
  <text x="${w * 0.1}" y="${h * 0.94}" font-family="Syne, Inter, sans-serif"
        font-size="${Math.round(h * 0.085)}" font-weight="800" letter-spacing="-1"
        fill="${palette.accent}" fill-opacity="0.82">${esc(label)}</text>
</svg>
`;
}

function write(rel, content) {
  const target = join(outDir, rel);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, "utf8");
  return rel;
}

const work = [
  ["worknest", "WorkNest", "WORKNEST"],
  ["invdocs", "InvDocs", "INVDOCS"],
  ["corepos", "CorePOS", "COREPOS"],
  ["inventory-api", "Inventory API", "INVENTORY"],
  ["clinic-portal", "Clinic Portal", "CLINIC"],
  ["corecraft", "CoreCraft", "CORECRAFT"],
  ["outerco", "Outer.Co", "OUTER.CO"],
];

const services = [
  ["backend-api", "Backend API", "SERVICES"],
  ["database-tuning", "Database", "SERVICES"],
  ["fullstack-apps", "Fullstack", "SERVICES"],
  ["pos-inventory", "POS", "SERVICES"],
  ["digital-archive", "Archive", "SERVICES"],
  ["integrations", "Integrations", "SERVICES"],
];

const experience = [
  ["sidigs", "SIDIGS", "EXPERIENCE"],
  ["independent", "Independent", "EXPERIENCE"],
  ["smk-telkom-malang", "SMK Telkom", "EXPERIENCE"],
];

const written = [];

work.forEach(([slug, label, kicker], i) => {
  const palette = palettes[i % palettes.length];
  written.push(
    write(`work/${slug}-cover.svg`, svg({ w: 1600, h: 1200, palette, label, kicker, variant: i + 1 })),
  );
  for (let g = 1; g <= 3; g += 1) {
    written.push(
      write(
        `work/${slug}-${String(g).padStart(2, "0")}.svg`,
        svg({
          w: g === 2 ? 1600 : 1600,
          h: g === 2 ? 900 : 1100,
          palette,
          label,
          kicker: `${kicker} / 0${g}`,
          variant: i + g + 1,
        }),
      ),
    );
  }
});

services.forEach(([slug, label, kicker], i) => {
  written.push(
    write(`services/${slug}.svg`, svg({ w: 1200, h: 900, palette: palettes[i % palettes.length], label, kicker, variant: i + 2 })),
  );
});

experience.forEach(([slug, label, kicker], i) => {
  written.push(
    write(`experience/${slug}.svg`, svg({ w: 900, h: 700, palette: palettes[i % palettes.length], label, kicker, variant: i + 3 })),
  );
});

console.log(`Generated ${written.length} placeholder images:`);
written.forEach((f) => console.log(`  public/images/${f}`));
