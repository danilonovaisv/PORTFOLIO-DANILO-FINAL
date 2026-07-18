import { defineConfig } from '@playwright/test';
import process from 'node:process';

// Define the test port we'll use consistently
const TEST_PORT = 5099;
const TEST_SUPABASE_URL = 'https://supabase.test.invalid';
const TEST_SUPABASE_KEY = 'test-anon-key-placeholder';
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
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
        },
      },
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
      `PLAYWRIGHT_TEST=true NEXT_PUBLIC_PLAYWRIGHT_TEST=true NEXT_PUBLIC_SUPABASE_URL=${TEST_SUPABASE_URL} NEXT_PUBLIC_SUPABASE_ANON_KEY=${TEST_SUPABASE_KEY} NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=${TEST_SUPABASE_KEY} pnpm exec next dev --port ${TEST_PORT} --hostname 127.0.0.1`,
    port: TEST_PORT,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
