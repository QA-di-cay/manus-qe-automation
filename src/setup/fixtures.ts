import { test as base, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '@opePortalPages';

type TestFixtures = {
  sharedPage: Page;
};

type WorkerFixtures = {
  sharedContext: BrowserContext;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  // Worker-scoped: Log in once for all tests within a worker.
  sharedContext: [async ({ browser }, use) => {
    const context = await browser.newContext();

    // Login using a temporary tab
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.access();
    await loginPage.loginSuccess(
      process.env.ADMIN_USERNAME!,
      process.env.ADMIN_PASSWORD!,
      process.env.ADMIN_MFA_SECRET!
    )
    await page.close();

    await use(context);
    await context.close();
  }, { scope: 'worker', auto: true }],

  // Test-scoped: a new tab is opened for each test using the authenticated context.
  sharedPage: async ({ sharedContext }, use) => {
    const page = await sharedContext.newPage();
    await use(page);
    await page.close();
  },
});
