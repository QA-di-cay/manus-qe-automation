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
    // Create context with baseURL to fix navigation issues
    const baseURL = process.env.BASE_URL;
    console.log('Creating shared context with baseURL:', baseURL);
    
    const context = await browser.newContext({
      baseURL: baseURL
    });

    // Login using a temporary tab
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    
    try {
      await loginPage.access();
      await loginPage.loginSuccess(
        process.env.ADMIN_USERNAME!,
        process.env.ADMIN_PASSWORD!,
        process.env.ADMIN_MFA_SECRET!
      );
      console.log('Shared authentication completed successfully');
    } catch (error) {
      console.error('Shared authentication failed:', error);
      throw error;
    }
    
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
