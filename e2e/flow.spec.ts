import { test, expect } from "@playwright/test";

const SCENES = [
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

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("corecraft_loader_seen", "1");
  });
});

test.describe("home / flow mode", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, "flow mode is for small screens");

  test("renders every scene as a normal section", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-mode", "flow");
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator(".scene")).toHaveCount(10);

    for (const id of SCENES) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test("sections reveal as they enter the viewport", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    for (const id of ["about", "services", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id}`)).toHaveClass(/is-in/, { timeout: 8000 });
    }
  });

  test("nav links scroll to a scene and update the hash", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Menu" }).click();
    await page.locator('#mobile-menu a[href="#education"]').click();
    await expect(page).toHaveURL(/#education$/);
    await expect(page.locator("#education")).toBeInViewport({ timeout: 8000 });
  });

  test("no horizontal overflow", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("book pager is operable by button and keyboard", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const pager = page.locator(".book-pager");
    await expect(pager).toContainText("01");

    const next = page.getByRole("button", { name: "Berikutnya" });
    await next.scrollIntoViewIfNeeded();
    await next.click();
    await expect(pager).toContainText("02", { timeout: 8000 });

    await page.getByRole("button", { name: "Sebelumnya" }).click();
    await expect(pager).toContainText("01", { timeout: 8000 });
  });
});

test.describe("home / subpages", () => {
  test("the work archive lists every project", async ({ page }) => {
    await page.goto("/work", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toHaveCount(1);
    const links = page.locator('a[href^="/work/"]');
    expect(await links.count()).toBeGreaterThanOrEqual(7);
  });

  test("a project detail page renders its case study", async ({ page }) => {
    await page.goto("/work/worknest", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("WorkNest");
    await expect(page.locator('a[href="https://booking.corecraft.my.id"]')).toHaveCount(1);
  });

  test("unknown routes render the not-found page", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText(/not found|404/i);
  });

  test("sitemap and robots are published", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("<urlset");

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Sitemap:");
  });
});
