import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const OUT = process.env.OUT_DIR ?? "docs/qa/screenshots";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

await page.goto(BASE, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/loader-early.png` });
await page.waitForTimeout(2600);
await page.screenshot({ path: `${OUT}/loader-late.png` });
await page.waitForTimeout(2200);
await page.screenshot({ path: `${OUT}/loader-after.png` });

const state = await page.evaluate(() => ({
  loader: document.querySelector("[data-loader]")?.outerHTML.slice(0, 80) ?? null,
  bodyClass: document.body.className,
  session: sessionStorage.getItem("corecraft_loader_seen"),
  loaderDone: window.__loaderDone,
  mode: document.documentElement.dataset.mode,
}));
console.log(JSON.stringify(state, null, 2));
await browser.close();
