import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Scan with motion disabled so reveal/entrance animations cannot produce
// false contrast results mid-transition; the reduced-motion path is also a
// required accessibility target.
test.use({ reducedMotion: "reduce" });

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("corecraft_loader_seen", "1");
  });
});

async function scan(page: Page) {
  return new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
}

test.describe("accessibility", () => {
  test("home has no serious axe violations", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const results = await scan(page);
    const serious = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );
    expect(
      serious,
      serious
        .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)
        .join("\n"),
    ).toEqual([]);
  });

  test("the work archive has no serious axe violations", async ({ page }) => {
    await page.goto("/work", { waitUntil: "networkidle" });
    const results = await scan(page);
    const serious = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );
    expect(
      serious,
      serious
        .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)
        .join("\n"),
    ).toEqual([]);
  });

  test("every scene can be reached from the navigation", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const primary = page.getByRole("navigation", { name: "Primary" });
    const expanded = await primary.isVisible();
    if (!expanded) {
      await page.getByRole("button", { name: "Menu" }).click();
    }
    const nav = expanded
      ? primary
      : page.getByRole("navigation", { name: "Mobile" });
    const links = nav.locator('a[href^="#"]');
    expect(await links.count()).toBeGreaterThanOrEqual(7);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", /^#/);
    }
  });

  test("reduced motion is respected", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.addInitScript(() => {
      sessionStorage.setItem("corecraft_loader_seen", "1");
    });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
    await context.close();
  });
});
