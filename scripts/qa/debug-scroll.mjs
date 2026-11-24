import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
page.on("console", (msg) => {
  if (msg.type() !== "info" && msg.type() !== "log") console.log("console:", msg.type(), msg.text());
});
page.on("pageerror", (err) => console.log("pageerror:", err.message, err.stack?.slice(0, 400)));
await page.addInitScript(() => sessionStorage.setItem("corecraft_loader_seen", "1"));
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const before = await page.evaluate(() => ({
  time: window.__stage.scrollTrigger.animation.time(),
  currents: [...document.querySelectorAll(".scene")].filter(
    (s) => s.getAttribute("data-current") === "true",
  ).map((s) => s.id),
  navActive: document.querySelector(".nav-links a.is-active")?.textContent,
}));
console.log("before", before);

await page.mouse.wheel(0, 6000);
await page.waitForTimeout(2500);
const after = await page.evaluate(() => ({
  time: window.__stage.scrollTrigger.animation.time(),
  scrollY: window.scrollY,
  currents: [...document.querySelectorAll(".scene")].filter(
    (s) => s.getAttribute("data-current") === "true",
  ).map((s) => s.id),
  navActive: document.querySelector(".nav-links a.is-active")?.textContent,
}));
console.log("after", after);
await browser.close();
