import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

const testDataPath = "src/testData"
export class GeneralInfoPage extends BasePage {
  constructor(page: Page) {
    super(page, 'generalInfoPage');
  }

  //#region ====== LOCATORS ===================
  private get uploadLogoBtn(): Locator {
    return this.page.locator('label:has-text("Upload Logo") ~ input[type="file"]');
  }

  private get saveBtn(): Locator {
    return this.page.locator('span:has-text("Save")');
  }

  private get successAlert(): Locator {
    return this.page.locator('.v-alert__content');
  }

  private get logoFileName(): Locator {
    return this.page.locator('label:has-text("Upload Logo") + div');
  }

  private get logoPreview(): Locator {
    return this.page.locator("xpath=//div[contains(@style,'background-image') and contains(@style,'Logo_') and contains(@style,'.png')]");
  }

  get nationalLocationCodeInput(): Locator {
    return this.page.locator('label:has-text("National Location Code") + input');
  }

  get timezoneSelect(): Locator {
    return this.page.locator('.v-select__slot:has-text("Timezone") input[type="text"]');
  }

  private get firstTimezoneOption(): Locator {
    return this.page.locator('div[role="option"]:first-child');
  }

  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.saveBtn).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async uploadCompanyLogo(
    fileName: string
  ): Promise<void> {
    const logoPath = `${testDataPath}/${fileName}`;
    await this.uploadLogoBtn.setInputFiles(logoPath);
    // await this.saveBtn.click();
  }

  async verifyLogoIsAdded() {
    // await expect(this.successAlert).toBeVisible();
    await this.reloadIdle();
    await this.logoPreview.waitFor({ state: 'visible', timeout: 3000 });
    await expect(this.logoPreview).toBeVisible();
  }

  async checkExistingLogo(): Promise<string> {
    return await this.logoPreview.evaluate(el => {
      const s = getComputedStyle(el as HTMLElement);
      return s.backgroundImage || '';
    });
  }
  async addNationalLocationCode(code: string) {
    await this.clearNationalLocationCode();
    await this.nationalLocationCodeInput.fill(code);
    await this.saveBtn.click();
  }

  async addTimeZone(timezone: string) {
    await this.timezoneSelect.fill(timezone);
    await this.firstTimezoneOption.click();
    await this.saveBtn.click();
  }

  async verifyAdded(locator: Locator, expectedText: string) {
    await this.successAlert.waitFor({ state: 'visible', timeout: 3000 });
    await expect(this.successAlert).toBeVisible();
    await expect(locator).toHaveValue(expectedText);
  }

  async clearNationalLocationCode() {
    await this.nationalLocationCodeInput.clear();
    await this.saveBtn.click();
  }

  async verifyFieldIsEmpty() {
    await this.nationalLocationCodeInput.waitFor({ state: 'visible', timeout: 3000 });
    await expect(this.nationalLocationCodeInput).toHaveValue("");
  }
}