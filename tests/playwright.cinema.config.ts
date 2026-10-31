import baseConfig from '../playwright.config';

export default {
  ...baseConfig,
  testDir: '.',
  webServer: undefined,
  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
        headless: true,
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
        },
      },
    },
  ],
  use: {
    ...baseConfig.use,
    channel: 'chrome',
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
  },
};
