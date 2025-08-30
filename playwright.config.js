const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 480000, // 8 minutes
  retries: 1,
  workers: 1,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 120000,
    navigationTimeout: 180000,
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});