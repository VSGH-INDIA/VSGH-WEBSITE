import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/business",
  "/business/aerospace-systems-components",
  "/business/imports-exports",
  "/business/global-programmes",
  "/contact",
] as const;

for (const route of publicRoutes) {
  test(`public route renders without client errors: ${route}`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.ok()).toBe(true);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("Business cards and CTA preserve the three approved landing-page routes", async ({
  page,
}) => {
  await page.goto("/business", { waitUntil: "networkidle" });
  const links = page.locator('a[href^="/business/"]');
  await expect(links).toHaveCount(3);
  await expect(links.nth(0)).toHaveAttribute(
    "href",
    "/business/aerospace-systems-components",
  );
  await expect(links.nth(1)).toHaveAttribute(
    "href",
    "/business/imports-exports",
  );
  await expect(links.nth(2)).toHaveAttribute(
    "href",
    "/business/global-programmes",
  );
});

test("unmatched routes return a branded non-indexable 404 experience", async ({
  page,
}) => {
  const response = await page.goto("/route-that-does-not-exist", {
    waitUntil: "networkidle",
  });
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", {
      name: "This page is not part of the public platform.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Return to home" }),
  ).toBeVisible();
});
