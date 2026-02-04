import { defineConfig } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './test/e2e',
  timeout: 120_000,
  fullyParallel: false,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL,
    headless: true,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command:
      process.env.PLAYWRIGHT_SERVER_COMMAND ||
      'pnpm run dev --hostname 0.0.0.0 --port 3000',
    url: baseURL,
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
