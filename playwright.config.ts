import { defineConfig } from "@playwright/test";
import path from "node:path";

const fixturePath = path.resolve(
  process.cwd(),
  "src",
  "features",
  "ical",
  "__fixtures__",
  "basic.ics"
);

export default defineConfig({
  testDir: "e2e",
  timeout: 60_000,
  use: {
    baseURL: "http://localhost:4321",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --host --port 4321",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
    env: {
      BOOKING_API_TOKEN: "test-token",
      PUBLIC_BOOKING_API_TOKEN: "test-token",
      LOCAL_TEST_ICAL_PATHS: fixturePath,
    },
  },
});
