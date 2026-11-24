import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = process.env.OUT_DIR ?? "docs/qa/screenshots";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
];

const scenes = [
  "hero",
  "about",
  "services",
  "process",
  "stack",
  "work",
  "credentials",
  "experience",
  "education",
  "contact",
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.evaluate(() => sessionStorage.setItem("corecraft_loader_seen", "1"));
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    const mode = await page.evaluate(() => document.documentElement.dataset.mode);
    console.log(`${vp.name}: mode=${mode}`);

    if (mode === "stage") {
      for (const id of scenes) {
        await page.evaluate((sceneId) => {
          window.__stage?.gotoId(sceneId, false);
        }, id);
        await page.waitForTimeout(1500);
        await page.screenshot({
          path: `${OUT}/${vp.name}-${id}.png`,
          animations: "disabled",
        });
      }
    } else {
      for (const id of scenes) {
        await page.evaluate((sceneId) => {
          const el = document.getElementById(sceneId);
          if (!el) return;
          window.scrollTo({ top: el.offsetTop, behavior: "instant" });
        }, id);
        await page.waitForTimeout(900);
        await page.screenshot({
          path: `${OUT}/${vp.name}-${id}.png`,
          animations: "disabled",
        });
      }
    }

    // Overflow check
    const overflow = await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll("*")) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && (rect.right > window.innerWidth + 2 || rect.left < -2)) {
          const style = getComputedStyle(el);
          if (style.position === "fixed" || style.overflow !== "visible") continue;
          bad.push(
            `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} → ${Math.round(rect.left)}..${Math.round(rect.right)}`,
          );
        }
      }
      return {
        docWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        bad: bad.slice(0, 8),
      };
    });
    console.log(`${vp.name}: overflow`, JSON.stringify(overflow));

    await context.close();
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
