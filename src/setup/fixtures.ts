import { test as base, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '@opePortalPages';

type TestFixtures = {
  sharedPage: Page;
};

type WorkerFixtures = {
  sharedContext: BrowserContext;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  // Worker-scoped
  sharedContext: [async ({ browser }, use) => {
    const baseURL = process.env.BASE_URL;    
    const context = await browser.newContext({
      baseURL: baseURL
    });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    try {
      await loginPage.access();
      await loginPage.loginSuccess(
        process.env.ADMIN_USERNAME!,
        process.env.ADMIN_PASSWORD!,
        process.env.ADMIN_MFA_SECRET!
      );
    } catch (error) {
      console.error('Shared authentication failed:', error);
      throw error;
    }
    await page.close();
    await use(context);
    await context.close();
  }, { scope: 'worker', auto: false }],

  // Test-scoped
  sharedPage: async ({ sharedContext }, use) => {
    const page = await sharedContext.newPage();
    await use(page);
    await page.close();
  },
});
