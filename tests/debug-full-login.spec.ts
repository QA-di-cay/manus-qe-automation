import { test, expect } from '@playwright/test';
import { LoginPage, MfaPage } from '@opePortalPages';

test.describe('Debug Full Login Flow', () => {
  test('Debug complete login with MFA', async ({ page }) => {
    console.log('Starting complete login flow debug...');
    
    const loginPage = new LoginPage(page);
    
    // Step 1: Navigate and login
    console.log('Step 1: Navigating to login page...');
    await loginPage.access();
    await loginPage.expectLoaded();
    
    // Step 2: Submit credentials
    console.log('Step 2: Submitting credentials...');
    const mfaPage = await loginPage.submitCredential(
      process.env.ADMIN_USERNAME!,
      process.env.ADMIN_PASSWORD!
    );
    console.log('✅ Successfully moved to MFA page');
    
    // Step 3: Check MFA page elements
    console.log('Step 3: Checking MFA page elements...');
    const otpInput = page.locator('form#frm1 input[name="code"]');
    const submitBtn = page.locator('form#frm1 input[type="submit"]');
    
    console.log('OTP input visible:', await otpInput.isVisible());
    console.log('Submit button visible:', await submitBtn.isVisible());
    
    // Step 4: Complete MFA
    console.log('Step 4: Completing MFA...');
    const companyPage = await mfaPage.submitValidOtp(process.env.ADMIN_MFA_SECRET!);
    console.log('✅ Successfully completed MFA and reached company page');
    
    // Step 5: Verify final state
    const currentUrl = page.url();
    console.log('Final URL:', currentUrl);
    console.log('✅ Complete login flow successful');
  });
  
  test('Debug shared authentication fixture', async ({ page }) => {
    console.log('Testing shared authentication logic...');
    
    try {
      const context = await page.context();
      const tempPage = await context.newPage();
      
      const loginPage = new LoginPage(tempPage);
      await loginPage.access();
      await loginPage.loginSuccess(
        process.env.ADMIN_USERNAME!,
        process.env.ADMIN_PASSWORD!,
        process.env.ADMIN_MFA_SECRET!
      );
      console.log('✅ Shared authentication logic works');
      
      // Wait for navigation
      await tempPage.waitForURL(/\/dashboard|\/company/i, { timeout: 15000 });
      console.log('✅ Navigation after login successful');
      console.log('Final URL:', tempPage.url());
      
      await tempPage.close();
    } catch (error) {
      console.error('❌ Shared authentication failed:', error);
      throw error;
    }
  });
});
