import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
page.on("console", (msg) => console.log("console:", msg.type(), msg.text()));
page.on("pageerror", (err) => console.log("pageerror:", err.message));
await page.addInitScript(() => sessionStorage.setItem("corecraft_loader_seen", "1"));
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const info = await page.evaluate(() => {
  const pick = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      cls: String(el.className).slice(0, 60),
      opacity: s.opacity,
      visibility: s.visibility,
      display: s.display,
      bg: s.backgroundColor,
      z: s.zIndex,
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
    };
  };
  return {
    mode: document.documentElement.dataset.mode,
    motion: document.documentElement.dataset.motion,
    bodyClass: document.body.className,
    hash: location.hash,
    scrollY: window.scrollY,
    stage: pick(document.querySelector(".stage")),
    scenes: [...document.querySelectorAll(".scene")].map(pick),
    fx: pick(document.querySelector(".fx")),
    fxChildren: [...document.querySelectorAll(".fx > *")].map(pick),
    hero: pick(document.querySelector("#hero")),
    heroVisual: pick(document.querySelector(".hero-visual")),
    heroPhoto: pick(document.querySelector(".hero-photo")),
    loader: pick(document.querySelector(".loader")),
    stageApi: Boolean(window.__stage),
    labels: window.__stage?.labels,
  };
});
console.log(JSON.stringify(info, null, 2));

await page.screenshot({ path: "docs/qa/debug-hero.png" });
await browser.close();
