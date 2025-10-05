import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { MfaPage, CompanyPage } from '@opePortalPages';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, 'loginPage');
  }

  //#region ====== LOCATORS ===================
  private get username(): Locator {
    return this.page.locator('input[name="username"]');
  }

  private get password(): Locator {
    return this.page.locator('input[name="password"]');
  }

  private get submitBtn(): Locator {
    return this.page.locator('input[name="Login"]');
  }
  //#endregion =================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.username).toBeVisible(),
      expect(this.password).toBeVisible(),
      expect(this.submitBtn).toBeVisible(),
    ]);
  }
  //#endregion =================================

  //#region ====== ACTIONS ====================
  async access(): Promise<void> {
    await this.page.goto('/');
    await this.expectLoaded();
  }

  async submitCredential(
    user: string,
    pass: string,
    submitWithEnter = false
  ): Promise<MfaPage> {
    await this.username.fill(user ?? '');
    await this.password.fill(pass ?? '');

    if (submitWithEnter) {
      await this.password.press('Enter');
    } else {
      await this.submitBtn.click();
    }

    const mfaPage = new MfaPage(this.page);
    await mfaPage.expectLoaded();
    return mfaPage;
  }

  async loginSuccess(
    user: string,
    pass: string,
    mfaSecret: string,
    submitWithEnter = false
  ): Promise<CompanyPage> {
    const mfaPage = await this.submitCredential(user, pass, submitWithEnter);
    const adminCompanyPage = await mfaPage.submitValidOtp(mfaSecret, submitWithEnter);
    return adminCompanyPage;
  }
  //#endregion =================================
}
