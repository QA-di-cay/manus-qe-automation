import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { MfaPage, CompanyPage } from '@opePortalPages';
import { GenericElement } from '@opePortalGeneEl';

export class LoginPage extends BasePage {
  readonly element: GenericElement;
  constructor(page: Page) {
    super(page, 'loginPage');
    this.element = new GenericElement(page);
  }

  //#region ====== LOCATORS ===================
  private get username(): Locator {
    return this.element.inputField('username');
  };
  private get password(): Locator {
    return this.element.inputField('password');
  };
  private get loginBtn(): Locator {
    return this.element.inputBtn('Login');
  };
  //#endregion =================================



  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.username).toBeVisible(),
      expect(this.password).toBeVisible(),
      expect(this.loginBtn).toBeVisible(),
    ]);
  }
  //#endregion =================================

  //#region ====== ACTIONS ====================
  async access(): Promise<void> {
    await this.page.goto('/');
    await this.expectLoaded();
  };

  private async submitValidCredential({
    user,
    pass,
    submitWithEnter = false
  }: {
    user: string,
    pass: string,
    submitWithEnter?: boolean
  }): Promise<MfaPage> {
    await this.username.fill(user ?? '');
    await this.password.fill(pass ?? '');

    if (submitWithEnter) {
      await this.password.press('Enter');
    } else {
      await this.loginBtn.click();
    }

    const mfaPage = new MfaPage(this.page);
    await mfaPage.expectLoaded();
    return mfaPage;
  };

  async loginSuccess({
    user,
    pass,
    mfaSecret,
    submitWithEnter = false
  }: {
    user: string,
    pass: string,
    mfaSecret: string,
    submitWithEnter?: boolean
  }): Promise<CompanyPage> {
    const mfaPage = await this.submitValidCredential({
      user: user,
      pass: pass,
      submitWithEnter: submitWithEnter,
    });
    const adminCompanyPage = await mfaPage.submitValidOtp(mfaSecret, submitWithEnter);
    return adminCompanyPage;
  };
  //#endregion =================================
}
