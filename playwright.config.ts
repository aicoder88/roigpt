import { defineConfig, devices } from '@playwright/test';
import { isCI, getBaseUrl } from './src/lib/env';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI(),
  /* Retry on CI only */
  retries: isCI() ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI() ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html']],
  use: {
    baseURL: getBaseUrl(),
    trace: 'on-first-retry',
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  /* Run local dev server during tests */
  webServer: {
    command: 'npm run dev',
    url: getBaseUrl(),
    reuseExistingServer: !isCI(),
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 120000,
  },
});

