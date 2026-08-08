import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test/visual',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  snapshotPathTemplate: '{testDir}/visual-snapshots/{arg}{ext}',
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixels: 0,
    },
  },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    colorScheme: 'light',
    locale: 'en-US',
    timezoneId: 'UTC',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 900 },
  },
  webServer: {
    command: 'pnpm dev --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
