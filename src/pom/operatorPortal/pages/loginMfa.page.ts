import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { generateOtp } from '@utils';
import { CompanyPage } from '@opePortalPages';

export class MfaPage extends BasePage {
  constructor(page: Page) {
    super(page, 'loginMfaPage');
  }

  //#region ====== LOCATORS ===================
  private get otpInput(): Locator {
    return this.page.locator('form#frm1 input[name="code"]');
  }

  private get submitBtn(): Locator {
    return this.page.locator('form#frm1 input[type="submit"]');
  }
  //#endregion ================================


  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.otpInput).toBeVisible(),
      expect(this.submitBtn).toBeVisible(),
    ]);
  }
  //#endregion ================================


  //#region ====== ACTIONS ====================
  async submitValidOtp(
    mfaSecret: string,
    submitWithEnter: boolean = false
  ): Promise<CompanyPage> {
    const otp = await generateOtp(mfaSecret, this.page);
    await this.otpInput.fill(otp);
    await (submitWithEnter ? this.otpInput.press('Enter') : this.submitBtn.click());

    const adminCompanyPage = new CompanyPage(this.page);
    await adminCompanyPage.expectLoaded();
    return adminCompanyPage;
  }
  //#endregion ================================
}