import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.addInitScript(() => sessionStorage.setItem("corecraft_loader_seen", "1"));
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.evaluate(() => window.__stage?.gotoId("about"));
await page.waitForTimeout(1800);

const info = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("*").forEach((el) => {
    const s = getComputedStyle(el);
    if (s.visibility === "hidden" || Number(s.opacity) < 0.02) return;
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.width <= 6 && r.height > 300) {
      out.push({
        tag: el.tagName,
        cls: String(el.className).slice(0, 60),
        bg: s.backgroundColor,
        bgImage: s.backgroundImage.slice(0, 80),
        opacity: s.opacity,
        rect: [Math.round(r.x), Math.round(r.y), r.width, Math.round(r.height)],
      });
    }
  });
  return out;
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
