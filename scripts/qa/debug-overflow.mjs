import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
await page.addInitScript(() => sessionStorage.setItem("corecraft_loader_seen", "1"));
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const info = await page.evaluate(() => {
  const width = document.documentElement.clientWidth;
  const out = [];
  document.querySelectorAll("*").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.right > width + 0.5 || r.left < -0.5)) {
      const style = getComputedStyle(el);
      out.push({
        tag: el.tagName,
        cls: String(el.className).slice(0, 70),
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
        pos: style.position,
        overflowX: style.overflowX,
      });
    }
  });
  return {
    docWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    items: out.slice(0, 60),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
