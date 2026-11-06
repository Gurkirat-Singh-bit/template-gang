import { expect, test, type Page } from "@playwright/test";
import { readdirSync } from "node:fs";
const componentCount = readdirSync("../category/react/components", {
  withFileTypes: true,
}).filter((entry) => entry.isDirectory()).length;
const resourceCount = componentCount + 1;

async function expectNoOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}

async function loadShowcases(page: Page) {
  const frames = page.locator(
    '.resource-item--showcase iframe[title="Action button thumbnail"], .resource-item--showcase iframe[title="Availability badge thumbnail"], .resource-item--showcase iframe[title="Stack card thumbnail"]',
  );
  for (let index = 0; index < (await frames.count()); index++) {
    const frame = frames.nth(index);
    await frame.scrollIntoViewIfNeeded();
    await frame.contentFrame().locator("button[aria-pressed]").waitFor();
  }
  await page.evaluate(() => scrollTo(0, 0));
}

test("carbon catalog, category discovery, filters, search and layout switching", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Library" })).toBeVisible();
  await expect(page.locator(".resource-item")).toHaveCount(resourceCount);
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(8, 8, 8)",
  );
  expect(
    await page
      .locator("h1")
      .evaluate((element) => getComputedStyle(element).fontFamily),
  ).toContain("jetbrains");
  await page.getByRole("button", { name: /^Docker/ }).click();
  await expect(page.getByText("No resources yet")).toBeVisible();
  await page.getByRole("button", { name: /^All resources/ }).click();
  const search = page.getByRole("textbox", { name: "Find a resource" });
  await page.keyboard.press("Control+k");
  await expect(search).toBeFocused();
  await search.fill("action button");
  await expect(page.locator(".resource-item")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.getByRole("combobox", { name: "Sort by", exact: true }).click();
  await page
    .getByRole("option", { name: "Recently added", exact: true })
    .click();
  await page.getByRole("button", { name: "List view" }).click();
  await expect(page.locator(".resource-item--row")).toHaveCount(resourceCount);
  await page.getByRole("button", { name: "Grid view" }).click();
  await expect(page.locator(".resource-item--showcase")).toHaveCount(
    componentCount,
  );
  await page.getByRole("tab", { name: "Templates", exact: true }).click();
  await expect(page.locator(".resource-item")).toHaveCount(1);
  await page.getByRole("tab", { name: "Everything", exact: true }).click();
  expect(errors).toEqual([]);
});

test("preview interaction, responsive controls, keyboard tabs and persistent demo state", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/item/react/components/action-button", {
    waitUntil: "domcontentloaded",
  });
  const action = page
    .frameLocator('iframe[title="Action button interactive preview"]')
    .getByRole("button", { name: /Start building|Ready to build/ });
  await expect(action).toHaveCSS("background-color", "rgb(8, 8, 8)");
  await action.click();
  await expect(action).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Mobile preview" }).click();
  await expect(page.locator(".preview-stage iframe")).toHaveCSS(
    "width",
    "375px",
  );
  await page.getByRole("tab", { name: "Preview", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Source code", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.locator(".code-panel pre")).toContainText(
    "function ActionButton",
  );
  await page.getByRole("button", { name: "Copy", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Copied", exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "function ActionButton",
  );
  await page.getByRole("button", { name: "item.json", exact: true }).click();
  await expect(page.locator(".code-panel pre")).toContainText(
    '"title": "Action button"',
  );
  await page.getByRole("tab", { name: "Documentation", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Usage", exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Preview", exact: true }).click();
  await expect(action).toHaveAttribute("aria-pressed", "true");
});

test("source loading and retry states retain a useful, selectable code view", async ({
  page,
}, testInfo) => {
  await page.goto("/item/react/components/action-button", {
    waitUntil: "domcontentloaded",
  });
  await page.getByRole("tab", { name: "Source code", exact: true }).click();
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/api/source**", async (route) => {
    await gate;
    await route.fulfill({ status: 500, body: "Unavailable" });
  });
  await page.getByRole("button", { name: "item.json", exact: true }).click();
  await expect(
    page.getByRole("status", { name: "Loading source", exact: true }),
  ).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("source-loading.png") });
  release();
  await expect(page.locator(".source-error")).toContainText(
    "Couldn’t load this file",
  );
  await page.screenshot({ path: testInfo.outputPath("source-error.png") });
  await page.unroute("**/api/source**");
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(page.locator(".code-panel pre")).toContainText(
    '"title": "Action button"',
  );
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, "writeText", {
      configurable: true,
      value: () => Promise.reject(new Error("Denied")),
    }),
  );
  await page.getByRole("button", { name: "Copy", exact: true }).click();
  await expect(
    page.getByText("Copy unavailable. Select the text to copy manually."),
  ).toBeVisible();
  await expect(page.locator(".code-panel pre")).toContainText(
    '"title": "Action button"',
  );
  await page.screenshot({ path: testInfo.outputPath("clipboard-error.png") });
});

test("add-resource dialog: focus, scrolling, clipboard feedback and Escape", async ({
  page,
  context,
}, testInfo) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const trigger = page.getByRole("button", {
    name: "Add resource",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", {
    name: "Add a resource",
    exact: true,
  });
  await expect(dialog).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  for (let index = 0; index < 6; index++) await page.keyboard.press("Tab");
  expect(
    await dialog.evaluate((element) =>
      element.contains(document.activeElement),
    ),
  ).toBe(true);
  await dialog.getByRole("button", { name: "Copy path", exact: true }).click();
  await expect(
    dialog.getByRole("button", { name: "Copied", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("add-resource-dialog.png"),
  });
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("existing template docs, disabled preview and missing routes", async ({
  page,
  request,
}, testInfo) => {
  await page.goto("/item/expo/expo-01", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".markdown")).toContainText("bun install");
  await expect(
    page.getByRole("tab", { name: "Preview", exact: true }),
  ).toBeDisabled();
  await page.getByRole("tab", { name: "Source code", exact: true }).click();
  await page.getByRole("button", { name: "package.json", exact: true }).click();
  await expect(page.locator(".code-panel pre")).toContainText('"expo"');
  await page.goto("/item/expo/not-a-real-project", {
    waitUntil: "domcontentloaded",
  });
  await expect(
    page.getByRole("heading", { name: "This resource isn’t here." }),
  ).toBeVisible();
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex",
  );
  await page.screenshot({ path: testInfo.outputPath("missing-resource.png") });
  expect(
    (
      await request.get(
        "/api/source?id=expo/expo-01&file=../../web/package.json",
      )
    ).status(),
  ).toBe(404);
});

test("desktop and mobile layouts, visible scrollbars and mobile source selection", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await loadShowcases(page);
  await expect
    .poll(async () =>
      page
        .locator(
          '.resource-preview:has(iframe[title="Action button thumbnail"]), .resource-preview:has(iframe[title="Availability badge thumbnail"]), .resource-preview:has(iframe[title="Stack card thumbnail"])',
        )
        .evaluateAll((elements) =>
          elements.every((element) => {
            const frame = element.querySelector("iframe");
            return (
              !!frame?.contentDocument &&
              frame.contentDocument.body.scrollHeight <= frame.clientHeight + 2
            );
          }),
        ),
    )
    .toBe(true);
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () =>
        getComputedStyle(document.documentElement, "::-webkit-scrollbar-thumb")
          .backgroundColor,
    ),
  ).toBe("rgb(74, 74, 74)");
  await expectNoOverflow(page);
  await page.screenshot({
    path: testInfo.outputPath("desktop-catalog.png"),
    fullPage: true,
  });
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await expectNoOverflow(page);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: testInfo.outputPath("mobile-catalog.png"),
    fullPage: true,
  });
  await page.getByRole("button", { name: "Open categories" }).click();
  const menu = page.getByRole("dialog", { name: "Category navigation" });
  await expect(menu).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("mobile-navigation.png") });
  await menu.getByRole("button", { name: /^Docker/ }).click();
  await expect(menu).not.toBeVisible();
  await expect(page.getByText("No resources yet")).toBeVisible();
  await page.goto("/item/react/components/action-button", {
    waitUntil: "domcontentloaded",
  });
  await page.getByRole("tab", { name: "Source code", exact: true }).click();
  await page
    .getByRole("combobox", { name: "Source file", exact: true })
    .click();
  await page.getByRole("option", { name: "item.json", exact: true }).click();
  await expect(page.locator(".code-panel pre")).toContainText(
    '"title": "Action button"',
  );
  await expectNoOverflow(page);
  await page.screenshot({
    path: testInfo.outputPath("mobile-source.png"),
    fullPage: true,
  });
});
