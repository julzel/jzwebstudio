import { defineConfig, devices } from '@playwright/test';

const env = process.env.APP_ENV ?? 'dev';
const envBaseUrls: Record<string, string> = {
  dev: 'http://localhost:5173',
  stg: process.env.STAGING_URL ?? 'https://staging.example.com',
};
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? envBaseUrls[env] ?? envBaseUrls.dev;
const shouldStartDevServer = baseURL.includes('localhost');

export default defineConfig({
  testDir: './tests/e2e',
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 10_000,
  },
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
  webServer: shouldStartDevServer
    ? {
        command: 'yarn dev --host',
        url: baseURL,
        reuseExistingServer: true,
        stdout: 'pipe',
        stderr: 'pipe',
        timeout: 120_000,
      }
    : undefined,
});
