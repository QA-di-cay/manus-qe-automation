import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { GenericElement } from '@opePortalGeneEl';

const testDataPath = "src/testData"

export class GeneralInfoPage extends BasePage {
  readonly element: GenericElement;
  
  constructor(page: Page) {
    super(page, 'generalInfoPage');
    this.element = new GenericElement(page);
  }

  //#region ====== LOCATORS ===================
  private get uploadLogoBtn(): Locator {
    return this.element.fileInputByLabel('Upload Logo');
  }

  private get saveBtn(): Locator {
    return this.element.buttonBySpanText('Save');
  }

  private get successAlert(): Locator {
    return this.element.alertContent;
  }

  private get logoFileName(): Locator {
    return this.element.elementByXPath('//label[contains(text(),"Upload Logo")]/following-sibling::div');
  }

  private get logoPreview(): Locator {
    return this.element.elementByXPath("//div[contains(@style,'background-image') and contains(@style,'Logo_') and contains(@style,'.png')]");
  }

  get nationalLocationCodeInput(): Locator {
    return this.element.inputByLabel('National Location Code');
  }

  get timezoneSelect(): Locator {
    return this.element.dropdownByLabel('Timezone');
  }

  private get firstTimezoneOption(): Locator {
    return this.element.elementByXPath('//div[@role="option"][1]');
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
  async uploadCompanyLogo(fileName: string): Promise<void> {
    const logoPath = `${testDataPath}/${fileName}`;
    await this.uploadLogoBtn.setInputFiles(logoPath);
    // await this.saveBtn.click();
  }

  async verifyLogoIsAdded(): Promise<void> {
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
  
  async addNationalLocationCode(code: string): Promise<void> {
    await this.clearNationalLocationCode();
    await this.nationalLocationCodeInput.fill(code);
    await this.saveBtn.click();
  }

  async addTimeZone(timezone: string): Promise<void> {
    await this.timezoneSelect.fill(timezone);
    await this.firstTimezoneOption.click();
    await this.saveBtn.click();
  }

  async verifyAdded(locator: Locator, expectedText: string): Promise<void> {
    await this.successAlert.waitFor({ state: 'visible', timeout: 3000 });
    await expect(this.successAlert).toBeVisible();
    await expect(locator).toHaveValue(expectedText);
  }

  async clearNationalLocationCode(): Promise<void> {
    await this.nationalLocationCodeInput.clear();
    await this.saveBtn.click();
  }

  async verifyFieldIsEmpty(): Promise<void> {
    await this.nationalLocationCodeInput.waitFor({ state: 'visible', timeout: 3000 });
    await expect(this.nationalLocationCodeInput).toHaveValue("");
  }
}
