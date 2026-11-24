import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.addInitScript(() => sessionStorage.setItem("corecraft_loader_seen", "1"));
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const result = await page.evaluate(async () => {
  const api = window.__stage;
  const out = {};
  out.duration = api.duration;
  out.labelsWork = api.labels.work;
  out.targetProgress = (api.labels.work + 0.02) / api.duration;
  api.gotoId("work", false);
  await new Promise((r) => setTimeout(r, 1600));
  out.after = {
    scrollY: window.scrollY,
    stProgress: api.scrollTrigger.progress,
    time: api.scrollTrigger.animation.time(),
    start: api.scrollTrigger.start,
    end: api.scrollTrigger.end,
    active: [...document.querySelectorAll(".scene")].filter(
      (s) => s.getAttribute("data-current") === "true",
    ).map((s) => s.id),
    currentLabels: [...document.querySelectorAll(".scene")].map((s) => [
      s.id,
      s.getAttribute("data-current"),
      getComputedStyle(s).visibility,
    ]),
  };
  return out;
});
console.log(JSON.stringify(result, null, 2));
await browser.close();

