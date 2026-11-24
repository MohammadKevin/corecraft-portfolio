import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const SCROLL_MS = Number(process.env.FPS_SCROLL_MS ?? 9000);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.addInitScript(() => {
  sessionStorage.setItem("corecraft_loader_seen", "1");
});
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const result = await page.evaluate(async (duration) => {
  const frames = [];
  const longTasks = [];
  let last = performance.now();
  let running = true;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      longTasks.push(Math.round(entry.duration));
    }
  });
  try {
    observer.observe({ type: "longtask", buffered: true });
  } catch {
    // longtask unsupported
  }

  const tick = (now) => {
    frames.push(now - last);
    last = now;
    if (running) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const total = document.documentElement.scrollHeight - window.innerHeight;
  const start = performance.now();
  await new Promise((resolve) => {
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      window.scrollTo(0, total * progress);
      if (progress < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
  await new Promise((resolve) => setTimeout(resolve, 300));
  running = false;
  observer.disconnect();

  const sorted = [...frames].sort((a, b) => a - b);
  const avg = frames.reduce((sum, value) => sum + value, 0) / frames.length;
  const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 0;
  const jank = frames.filter((value) => value > 50).length;

  return {
    frames: frames.length,
    avgFps: Math.round(1000 / avg),
    avgFrameMs: Number(avg.toFixed(2)),
    p95FrameMs: Number(p95.toFixed(2)),
    jankFrames: jank,
    jankRatio: Number((jank / frames.length).toFixed(4)),
    longTasks,
    longTaskTotalMs: longTasks.reduce((sum, value) => sum + value, 0),
  };
}, SCROLL_MS);

console.log(JSON.stringify(result, null, 2));
await browser.close();
