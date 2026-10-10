import { defineConfig, devices } from '@playwright/test';

// Serve the production build (dist/) with a static server for tests
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 2,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
    {
      // Mobile emulation on Chromium (no extra browser download needed)
      name: 'mobile-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 667 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    },
  ],
  webServer: {
    command: 'npx http-server dist -p 4321 --silent',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});