import { expect, test } from "@playwright/test";
import { readdirSync } from "node:fs";

const entries = readdirSync("../category/react/components")
  .filter((name) => /^(mission-india|repoassistant)-/.test(name))
  .sort();

for (const entry of entries) {
  test(`imported preview: ${entry}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    const failedAssets: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (
        response.status() >= 400 &&
        /\.(png|webp|svg|avif|woff2)/.test(response.url())
      )
        failedAssets.push(response.url());
    });
    for (const width of [1280, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/preview/react/components/${entry}`, {
        waitUntil: "domcontentloaded",
      });
      await expect(page.locator(".imported-preview")).toBeVisible();
      await expect(
        page.locator(".mi-scope:visible, .ra-scope:visible").first(),
      ).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        )
        .toBe(true);
      await expect
        .poll(() =>
          page
            .locator("img")
            .evaluateAll((images) =>
              images
                .filter(
                  (image) => image.getBoundingClientRect().top < innerHeight,
                )
                .every(
                  (image) =>
                    (image as HTMLImageElement).complete &&
                    (image as HTMLImageElement).naturalWidth > 0,
                ),
            ),
        )
        .toBe(true);
      await page.screenshot({
        path: testInfo.outputPath(`${width}.png`),
        fullPage: true,
      });
    }
    expect(errors).toEqual([]);
    expect(failedAssets).toEqual([]);
  });
}

test("imported forms, booking, accordion, calculators and local URL fixture", async ({
  page,
}, testInfo) => {
  const mutations: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") mutations.push(request.url());
  });
  await page.goto("/preview/react/components/mission-india-faq-accordion", {
    waitUntil: "domcontentloaded",
  });
  const question = page.getByRole("button", {
    name: "Can I customize the content?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");

  await page.goto("/preview/react/components/mission-india-interest-form", {
    waitUntil: "domcontentloaded",
  });
  await page.getByLabel("Name", { exact: true }).fill("Demo User");
  await page.getByLabel("Email address").fill("demo@example.com");
  await page.getByLabel("Student", { exact: true }).check();
  await expect(
    page.getByRole("button", { name: "Join the interest list" }),
  ).toBeDisabled();
  await page
    .getByLabel("How could YuvaCompute help you?")
    .fill(
      "I want to train a small language model for my university project and need affordable GPU access to complete experiments this semester.",
    );
  await page.getByRole("button", { name: "Join the interest list" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Demo response captured",
  );

  await page.goto("/preview/react/components/repoassistant-cal-popup-button", {
    waitUntil: "domcontentloaded",
  });
  await page.getByRole("button", { name: "Book a call", exact: true }).click();
  const booking = page.getByRole("dialog");
  await expect(booking).toBeVisible();
  await booking.getByLabel("Date", { exact: true }).fill("2027-01-15");
  await booking.getByLabel("Time", { exact: true }).selectOption("10:00");
  await booking.getByLabel("Name", { exact: true }).fill("Demo User");
  await booking.getByLabel("Email", { exact: true }).fill("demo@example.com");
  await page.screenshot({ path: testInfo.outputPath("booking-filled.png") });
  await booking.getByRole("button", { name: "Preview booking" }).click();
  await expect(booking.getByRole("status")).toContainText(
    "No appointment was scheduled",
  );
  await page.keyboard.press("Escape");
  await expect(booking).not.toBeVisible();

  await page.goto(
    "/preview/react/components/repoassistant-project-intake-button",
    { waitUntil: "domcontentloaded" },
  );
  await page.getByRole("button", { name: "Start a project" }).click();
  const intake = page.getByRole("dialog");
  await intake.getByRole("textbox").fill("Deploy a Next.js app on a VPS.");
  await intake.getByRole("button", { name: "Continue", exact: true }).click();
  await intake.getByLabel("Name", { exact: true }).fill("Demo User");
  await intake.getByLabel("Email", { exact: true }).fill("demo@example.com");
  await page.screenshot({
    path: testInfo.outputPath("project-intake-filled.png"),
  });
  await intake.getByRole("button", { name: "Preview submission" }).click();
  await expect(intake.getByRole("status")).toContainText(
    "No payment was started",
  );
  await page.screenshot({
    path: testInfo.outputPath("project-intake-success.png"),
  });
  await intake.getByRole("button", { name: "Done", exact: true }).click();
  await expect(intake).not.toBeVisible();

  await page.goto(
    "/preview/react/components/repoassistant-vps-cost-calculator",
    { waitUntil: "domcontentloaded" },
  );
  const before = await page.locator(".ra-scope").innerText();
  await page.getByRole("button", { name: "More apps" }).click();
  expect(await page.locator(".ra-scope").innerText()).not.toEqual(before);
  await page.goto("/preview/react/components/repoassistant-launch-url-tester", {
    waitUntil: "domcontentloaded",
  });
  await page.getByRole("textbox", { name: "Website URL" }).fill("example.com");
  await page.getByRole("button", { name: "Test launch URL" }).click();
  await expect(
    page.getByText("Local fixture only. No network request was made."),
  ).toBeVisible();
  expect(mutations).toEqual([]);
});

test("imported entries are discoverable and expose their implementation", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page
    .getByRole("textbox", { name: "Find a resource" })
    .fill("repoassistant hero");
  const card = page.locator(".resource-item");
  await expect(card).toHaveCount(1);
  await expect(card.locator("iframe")).toHaveClass(/is-ready/);
  await card.click();
  await page.getByRole("tab", { name: "Source code", exact: true }).click();
  await expect(page.locator(".code-panel pre")).toContainText("function Hero");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/preview/react/components/repoassistant-header", {
    waitUntil: "domcontentloaded",
  });
  await page.getByRole("button", { name: "Toggle menu" }).click();
  await page
    .getByRole("button", { name: "Book a meeting", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("scroll-driven section thumbnails keep their content in view", async ({
  page,
}, testInfo) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page
    .getByRole("textbox", { name: "Find a resource" })
    .fill("mission india approach");
  const frame = page.locator(".resource-item iframe");
  await expect(frame).toHaveClass(/is-ready/);
  await expect(frame).toHaveCSS("height", "900px");
  const heading = frame
    .contentFrame()
    .getByRole("heading", { name: "A workspace that outlives the GPU." });
  expect(
    await heading.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom < innerHeight;
    }),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("scroll-section-thumbnail.png"),
  });
});

test("imported motion respects reduced motion and keeps content readable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/preview/react/components/mission-india-why-explore", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("#problem-title span").first()).toHaveCSS(
    "color",
    "rgb(250, 249, 246)",
  );
  await page.goto("/preview/react/components/mission-india-use-cases", {
    waitUntil: "domcontentloaded",
  });
  await page
    .getByRole("button", { name: "Next use case", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Try the idea.", exact: true }),
  ).toBeVisible();
  await page.goto("/preview/react/components/mission-india-smooth-scroll", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("html")).not.toHaveClass(/\blenis\b/);
  await page.getByRole("link", { name: /Scroll to the next section/ }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
});
