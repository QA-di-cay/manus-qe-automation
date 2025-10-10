// Enable support for absolute import paths based on tsconfig.json
import 'tsconfig-paths/register';
import { defineConfig, devices } from '@playwright/test';

// BrowserStack configuration for Playwright
export default defineConfig({
  globalSetup: '@globalSetup',
  testDir: './tests',
  timeout: 60 * 1000,
  expect: { timeout: 10 * 1000 },
  fullyParallel: true,
  workers: 2,

  // Enhanced reporter configuration for BrowserStack
  reporter: [
    ['html', { 
      open: 'never',
      outputFolder: 'playwright-report'
    }],
    ['json', { 
      outputFile: 'test-results.json' 
    }],
    ['junit', { 
      outputFile: 'test-results.xml' 
    }],
    ['list'],
    // Custom BrowserStack reporter
    ['./src/reporters/browserstack-reporter.ts']
  ],

  use: {
    headless: true,
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 20_000,
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    {
      name: 'chromium-local',
      use: { 
        ...devices['Desktop Chrome'],
        // Local execution but report to BrowserStack
      }
    }
  ],

  retries: 0,

  // Output directories
  outputDir: 'test-results/',
});
