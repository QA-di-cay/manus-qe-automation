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
    let context: BrowserContext | null = null;
    let loginAttempts = 0;
    const maxLoginAttempts = 3;
    
    try {
      context = await browser.newContext({
        baseURL: process.env.BASE_URL
      });
      
      // Retry login mechanism
      while (loginAttempts < maxLoginAttempts) {
        try {
          loginAttempts++;
          console.log(`Shared authentication attempt ${loginAttempts}/${maxLoginAttempts}`);
          
          // Login once per worker on temporary page
          const page = await context.newPage();
          const loginPage = new LoginPage(page);
          
          await loginPage.access();
          await loginPage.loginSuccess(
            process.env.ADMIN_USERNAME!,
            process.env.ADMIN_PASSWORD!,
            process.env.ADMIN_MFA_SECRET!
          );
          
          console.log('Shared authentication completed successfully');
          
          // Wait for successful login and navigation to dashboard/company page
          await page.waitForURL(/\/dashboard|\/company/i, { timeout: 15000 });
          console.log(`Authenticated and navigated to: ${page.url()}`);
          
          // Close temporary page after login
          await page.close();
          
          // If we reach here, login was successful
          break;
          
        } catch (error) {
          console.error(`Shared authentication attempt ${loginAttempts} failed:`, error);
          
          if (loginAttempts >= maxLoginAttempts) {
            throw new Error(`Shared authentication failed after ${maxLoginAttempts} attempts. Last error: ${error}`);
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      
      await use(context);
      
    } catch (error) {
      console.error('Critical error in shared authentication:', error);
      throw error;
    } finally {
      if (context) {
        await context.close();
      }
    }
  }, { scope: 'worker', auto: false }],

  // Test-scoped: each test gets a new page from the authenticated context
  sharedPage: async ({ sharedContext }, use) => {
    const page = await sharedContext.newPage();
    try {
      await use(page);
    } finally {
      await page.close();
    }
  },
});
