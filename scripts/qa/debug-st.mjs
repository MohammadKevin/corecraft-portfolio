import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
page.on("pageerror", (err) => console.log("pageerror:", err.message));
await page.addInitScript(() => sessionStorage.setItem("corecraft_loader_seen", "1"));
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  const st = window.__stage.scrollTrigger;
  return {
    hasOnUpdate: typeof st.vars.onUpdate,
    hasOnRefresh: typeof st.vars.onRefresh,
    keys: Object.keys(st.vars),
    animationType: st.animation?.constructor?.name,
    animOnUpdate: typeof st.animation?.vars?.onUpdate,
  };
});
console.log(info);

await page.evaluate(() => window.scrollTo(0, 6000));
await page.waitForTimeout(1800);
console.log(
  await page.evaluate(() => ({
    currents: [...document.querySelectorAll(".scene")].filter(
      (s) => s.getAttribute("data-current") === "true",
    ).map((s) => s.id),
    time: window.__stage.scrollTrigger.animation.time(),
  })),
);

const manual = await page.evaluate(() => {
  const st = window.__stage.scrollTrigger;
  try {
    st.vars.onUpdate?.();
    return {
      ok: true,
      currents: [...document.querySelectorAll(".scene")].filter(
        (s) => s.getAttribute("data-current") === "true",
      ).map((s) => s.id),
    };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
});
console.log(manual);
await browser.close();
