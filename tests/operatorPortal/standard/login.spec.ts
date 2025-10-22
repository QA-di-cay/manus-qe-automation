import { test } from '@fixtures';
import { LoginPage } from '@opePortalPages';

const username = process.env.ADMIN_USERNAME!;
const password = process.env.ADMIN_PASSWORD!;
const mfaSecret = process.env.ADMIN_MFA_SECRET!;

test.describe('Operator Portal login success - @login', () => {
  test('Login success', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.access();
    await loginPage.loginSuccess({
      user: username,
      pass: password,
      mfaSecret: mfaSecret,
    });
  })
})
