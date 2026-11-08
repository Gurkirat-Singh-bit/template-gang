import { expect, test } from "@playwright/test";

test("find components by function, filter groups, and follow sidebar links", async ({
  page,
}, testInfo) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".resource-section h2").first()).toContainText(
    "Navbars",
  );
  const search = page.getByRole("textbox", { name: "Find a resource" });
  await search.fill("navbar");
  await expect(page.locator(".resource-item")).toHaveCount(2);
  await expect(
    page.getByRole("heading", { name: "Minimal navbar", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Navbar with mobile menu", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("navbar-search-desktop.png"),
  });
  await search.fill("repoassistant navbar");
  await expect(page.locator(".resource-item")).toHaveCount(1);
  await search.fill("");
  await page
    .getByRole("combobox", { name: "Component type", exact: true })
    .click();
  await page.getByRole("option", { name: "Footers (2)", exact: true }).click();
  await expect(page.locator(".resource-item")).toHaveCount(2);
  await expect(page.locator(".resource-section h2")).toContainText("Footers");
  await page.getByRole("button", { name: /^React/ }).click();
  await page.getByRole("button", { name: /^Navbars/ }).click();
  await expect(page.locator(".resource-item")).toHaveCount(2);
});

test("sidebar group links work on desktop and mobile", async ({
  page,
}, testInfo) => {
  await page.goto("/item/react/components/mission-india-site-header", {
    waitUntil: "domcontentloaded",
  });
  await expect(
    page.getByRole("heading", { name: "Minimal navbar", exact: true }),
  ).toBeVisible();
  await page
    .locator(".sidebar-component-group")
    .getByRole("link", { name: /^Footers/ })
    .click();
  await expect(page.locator(".resource-item")).toHaveCount(2);
  await page.setViewportSize({ width: 320, height: 844 });
  await expect(
    page.getByRole("combobox", { name: "Component type", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("footer-filter-mobile.png"),
  });
});

test("decorative reference image is absent and header aliases find navbars", async ({
  page,
  request,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const search = page.getByRole("textbox", { name: "Find a resource" });
  await search.fill("header");
  await expect(page.locator(".resource-item")).toHaveCount(2);
  await search.fill("reference image");
  await expect(page.locator(".resource-item")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "No matches", exact: true }),
  ).toBeVisible();
  expect(
    (
      await request.get(
        "/api/source?id=react/components/mission-india-reference-image&file=component.tsx",
      )
    ).status(),
  ).toBe(404);
});

test("functional browsing covers the whole library", async ({
  page,
}, testInfo) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("textbox", { name: "Find a resource" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "List view", exact: true }).click();
  for (const [group, count] of Object.entries({
    Forms: 1,
    Dialogs: 2,
    Steps: 2,
    Carousels: 1,
    Pricing: 2,
    FAQ: 2,
    Tools: 3,
    Logos: 2,
    Features: 3,
    Motion: 2,
    Buttons: 1,
    Cards: 1,
  })) {
    await page
      .getByRole("combobox", { name: "Component type", exact: true })
      .click();
    await page
      .getByRole("option", { name: `${group} (${count})`, exact: true })
      .click();
    await expect(page.locator(".resource-item")).toHaveCount(count);
    await expect(page.locator(".resource-section h2")).toContainText(group);
  }
  await page.screenshot({ path: testInfo.outputPath("cards-by-purpose.png") });
  await page.getByRole("tab", { name: "Everything", exact: true }).click();
  const search = page.getByRole("textbox", { name: "Find a resource" });
  await search.fill("calculator");
  await expect(page.locator(".resource-item")).toHaveCount(2);
  await search.fill("signup form");
  await expect(page.locator(".resource-item")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "Interest signup form", exact: true }),
  ).toBeVisible();
});
