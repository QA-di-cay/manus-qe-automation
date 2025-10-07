import { test, expect } from '@playwright/test';
import { LoginPage } from '@opePortalPages';

test.describe('Debug Login Process', () => {
  test('Debug login step by step', async ({ page }) => {
    console.log('Environment variables:');
    console.log('BASE_URL:', process.env.BASE_URL);
    console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME);
    console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? '***' : 'NOT SET');
    console.log('ADMIN_MFA_SECRET:', process.env.ADMIN_MFA_SECRET ? '***' : 'NOT SET');
    
    const loginPage = new LoginPage(page);
    
    // Step 1: Navigate to login page
    console.log('Step 1: Navigating to login page...');
    await loginPage.access();
    await loginPage.expectLoaded();
    console.log('✅ Login page loaded successfully');
    
    // Step 2: Fill credentials
    console.log('Step 2: Filling credentials...');
    await page.locator('input[name="username"]').fill(process.env.ADMIN_USERNAME!);
    await page.locator('input[name="password"]').fill(process.env.ADMIN_PASSWORD!);
    console.log('✅ Credentials filled');
    
    // Step 3: Submit form
    console.log('Step 3: Submitting login form...');
    await page.locator('input[name="Login"]').click();
    
    // Wait a bit to see what happens
    await page.waitForTimeout(3000);
    
    // Check current URL and page content
    const currentUrl = page.url();
    console.log('Current URL after login attempt:', currentUrl);
    
    // Check if we're still on login page (error) or moved to MFA
    const isOnLoginPage = await page.locator('input[name="username"]').isVisible();
    const isOnMfaPage = await page.locator('form#frm1 input[name="code"]').isVisible();
    
    console.log('Is still on login page:', isOnLoginPage);
    console.log('Is on MFA page:', isOnMfaPage);
    
    // Check for error messages
    const errorMessage = await page.locator('text=Invalid username or password').isVisible();
    console.log('Has error message:', errorMessage);
    
    if (errorMessage) {
      console.log('❌ Login failed with invalid credentials');
      // Take screenshot for debugging
      await page.screenshot({ path: 'debug-login-error.png' });
    } else if (isOnMfaPage) {
      console.log('✅ Login successful, now on MFA page');
    } else {
      console.log('⚠️ Unexpected state after login');
      await page.screenshot({ path: 'debug-login-unexpected.png' });
    }
  });
});
