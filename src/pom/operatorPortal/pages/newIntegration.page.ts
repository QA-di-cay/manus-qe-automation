import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class NewIntegrationPage extends BasePage {
  constructor(page: Page) {
    super(page, 'newIntegrationPage');
  }

  //#region ====== LOCATORS ===================
  private get integrationNameInput(): Locator {
    return this.page.locator('//label[text()="Integration Name"]/following-sibling::input');
  }

  private get urlInput(): Locator {
    return this.page.locator('//label[text()="URL"]/following-sibling::input');
  }

  private get authorisationTokenInput(): Locator {
    return this.page.locator('//label[text()="Authorisation Token"]/following-sibling::input');
  }

  private get areaCodeInput(): Locator {
    return this.page.locator('//label[text()="Area Code"]/following-sibling::input');
  }

  private get companyCodeInput(): Locator {
    return this.page.locator('//label[text()="Company Code"]/following-sibling::input');
  }

  private get apiVersionInput(): Locator {
    return this.page.locator('//label[text()="API Version"]/following-sibling::input');
  }

  private get appCodeInput(): Locator {
    return this.page.locator('//label[text()="App Code"]/following-sibling::input');
  }

  private get tassInput(): Locator {
    return this.page.locator('//label[text()="TASS"]/following-sibling::input');
  }

  private get smartcardFieldInput(): Locator {
    return this.page.locator('//label[text()="Smartcard Field"]/following-sibling::input');
  }

  private get studentStatusesInput(): Locator {
    return this.page.locator('//label[text()="Student Statuses"]/following-sibling::input');
  }

  private get lastRunAtInput(): Locator {
    return this.page.locator('//label[text()="Last Run at"]/following-sibling::input');
  }

  private get typeDropdown(): Locator {
    return this.page.locator('//label[text()="Type"]/following-sibling::input');
  }

  private get closeButton(): Locator {
    return this.page.locator('button:has-text("Close")');
  }

  private get verifyButton(): Locator {
    return this.page.locator('button:has-text("Verify")');
  }

  private get saveButton(): Locator {
    return this.page.locator('button:has-text("Save")');
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.integrationNameInput).toBeVisible(),
      expect(this.saveButton).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async fillIntegrationDetails(integrationName: string, url: string, authToken: string, type: string): Promise<void> {
    await this.integrationNameInput.fill(integrationName);
    await this.urlInput.fill(url);
    await this.authorisationTokenInput.fill(authToken);
    await this.typeDropdown.click();
    await this.page.locator(`text=${type}`).click();
  }

  async fillOptionalFields(options: {
    areaCode?: string;
    companyCode?: string;
    apiVersion?: string;
    appCode?: string;
    tass?: string;
    smartcardField?: string;
    studentStatuses?: string;
    lastRunAt?: string;
  }): Promise<void> {
    if (options.areaCode) await this.areaCodeInput.fill(options.areaCode);
    if (options.companyCode) await this.companyCodeInput.fill(options.companyCode);
    if (options.apiVersion) await this.apiVersionInput.fill(options.apiVersion);
    if (options.appCode) await this.appCodeInput.fill(options.appCode);
    if (options.tass) await this.tassInput.fill(options.tass);
    if (options.smartcardField) await this.smartcardFieldInput.fill(options.smartcardField);
    if (options.studentStatuses) await this.studentStatusesInput.fill(options.studentStatuses);
    if (options.lastRunAt) await this.lastRunAtInput.fill(options.lastRunAt);
  }

  async saveIntegration(): Promise<void> {
    await this.saveButton.click();
  }

  async verifyIntegration(): Promise<void> {
    await this.verifyButton.click();
  }

  async closeForm(): Promise<void> {
    await this.closeButton.click();
  }
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async verifySaveSuccess(): Promise<void> {
    // Add verification logic for successful save
    // This could be checking for success message, redirect, etc.
  }

  async verifyFormVisible(): Promise<void> {
    await expect(this.integrationNameInput).toBeVisible();
    await expect(this.urlInput).toBeVisible();
    await expect(this.authorisationTokenInput).toBeVisible();
  }
  //#endregion ================================
}
