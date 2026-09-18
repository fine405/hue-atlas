import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4317',
    ...devices['Desktop Chrome'],
    channel: 'chrome',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:4317',
    env: { PORT: '4317', HOST: '127.0.0.1' },
    reuseExistingServer: !process.env.CI,
  },
})
