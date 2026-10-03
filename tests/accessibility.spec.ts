import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/business",
  "/business/aerospace-systems-components",
  "/contact",
];

for (const route of routes) {
  test(`has no automated accessibility violations: ${route}`, async ({
    page,
  }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
