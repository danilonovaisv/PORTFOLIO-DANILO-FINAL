import { defineConfig } from '@playwright/test';
import process from 'node:process';

// Define the test port we'll use consistently
const TEST_PORT = 5005;
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${TEST_PORT}`;

export default defineConfig({
  testDir: './test/e2e',
  timeout: 120_000,
  fullyParallel: false,
  workers: 3,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
  ],
  webServer: {
    command:
      process.env.PLAYWRIGHT_SERVER_COMMAND ||
      `PLAYWRIGHT_TEST=true NEXT_PUBLIC_PLAYWRIGHT_TEST=true npx pnpm run dev --port ${TEST_PORT}`,
    port: TEST_PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
