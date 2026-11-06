import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  timeout: 60_000,
  use: {
    baseURL: process.env.WAREHOUSE_BASE_URL ?? "http://127.0.0.1:3100",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chromium",
        launchOptions: { ignoreDefaultArgs: ["--hide-scrollbars"] },
      },
    },
  ],
  webServer: process.env.WAREHOUSE_BASE_URL
    ? undefined
    : {
        command: "bun run dev --port 3100",
        url: "http://127.0.0.1:3100",
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
