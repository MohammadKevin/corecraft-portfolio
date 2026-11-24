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

test.describe("home / stage mode", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "stage mode is desktop-only");

  test("renders all ten scenes and the pinned stage", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-mode", "stage");
    await expect(page.locator(".scene")).toHaveCount(10);

    for (const id of SCENES) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("KEVIN");
    await expect(page.locator(".pin-spacer")).toHaveCount(1);
  });

  test("loader is skipped once per session", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("[data-loader]")).toHaveCount(0);
  });

  test("navigation jumps to each scene without leaving the page", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const api = await page.evaluate(() => Boolean(window.__stage));
    expect(api).toBe(true);

    for (const id of ["about", "services", "work", "education", "contact"]) {
      await page.evaluate((scene) => window.__stage?.gotoId(scene, false), id);
      await expect
        .poll(
          () =>
            page.evaluate(
              (scene) => document.querySelector(`#${scene}`)?.getAttribute("data-current"),
              id,
            ),
          { timeout: 8000 },
        )
        .toBe("true");
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
    }
  });

  test("scene content stays inside the viewport", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    for (const id of SCENES) {
      await page.evaluate((scene) => window.__stage?.gotoId(scene, false), id);
      await page.waitForTimeout(1200);
      const overflow = await page.evaluate((scene) => {
        const section = document.getElementById(scene);
        if (!section) return null;
        const inner = section.querySelector<HTMLElement>(".scene-inner") ?? section;
        const sectionRect = section.getBoundingClientRect();
        const innerRect = inner.getBoundingClientRect();
        return {
          bottomOverflow: Math.round(innerRect.bottom - sectionRect.bottom),
          rightOverflow: Math.round(innerRect.right - sectionRect.right),
          docOverflow:
            document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      }, id);

      expect(overflow, id).not.toBeNull();
      expect(overflow?.docOverflow ?? 0, `${id} document overflow`).toBeLessThanOrEqual(1);
      expect(overflow?.bottomOverflow ?? 0, `${id} bottom overflow`).toBeLessThanOrEqual(1);
      expect(overflow?.rightOverflow ?? 0, `${id} right overflow`).toBeLessThanOrEqual(1);
    }
  });

  test("book controls turn pages", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => window.__stage?.gotoId("work", false));
    await expect(page.locator(".book-pager")).toContainText("01");

    // The stage is pinned; scrolling a button into view would scrub the
    // timeline, so trigger the click directly.
    const clickButton = (name: string) =>
      page
        .getByRole("button", { name })
        .evaluate((element) => (element as HTMLButtonElement).click());

    await clickButton("Berikutnya");
    await expect(page.locator(".book-pager")).toContainText("02", { timeout: 8000 });

    await clickButton("Sebelumnya");
    await expect(page.locator(".book-pager")).toContainText("01", { timeout: 8000 });
  });
});

test.describe("home / shared", () => {
  test("primary CTAs and contact links are real", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.locator('a[href="/CV Mohammad Kevin.pdf"]').first()).toHaveCount(1);
    await expect(page.locator('a[href^="mailto:kvn4.200581@gmail.com"]').first()).toHaveCount(1);

    const external = page.locator('.hero-socials a[target="_blank"]');
    expect(await external.count()).toBeGreaterThan(0);
    for (const link of await external.all()) {
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("skip link targets the main landmark", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.keyboard.press("Tab");
    const skip = page.locator(".skip-link");
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#main-content");
    await expect(page.locator("main#main-content")).toHaveCount(1);
  });
});
