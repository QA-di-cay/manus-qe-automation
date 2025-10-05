import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class DataIntegrationPage extends BasePage {
  constructor(page: Page) {
    super(page, 'dataIntegration');
  }

  //#region ====== LOCATORS ===================
  private get addNewDataIntegrationsButton(): Locator {
    return this.page.locator('button:has-text("ADD NEW DATA INTEGRATIONS")');
  }

  private get searchInput(): Locator {
    return this.page.locator('input[placeholder="Search"]');
  }

  private get dataTable(): Locator {
    return this.page.locator('table, .table');
  }

  private get noDataMessage(): Locator {
    return this.page.locator('text="No data available"');
  }

  private get pageTitle(): Locator {
    return this.page.locator('h1, h2, h3, .page-title').filter({ hasText: 'DATA INTEGRATIONS' });
  }

  // Success/Error message locators
  private get successAlert(): Locator {
    return this.page.locator('.alert-success, .success-message');
  }

  private get errorAlert(): Locator {
    return this.page.locator('.alert-error, .error-message');
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await expect(this.addNewDataIntegrationsButton).toBeVisible();
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async clickAddNewDataIntegrations(): Promise<NewDataIntegrationPage> {
    await this.addNewDataIntegrationsButton.click();
    const newIntegrationPage = new NewDataIntegrationPage(this.page);
    return newIntegrationPage;
  }

  async searchIntegration(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
  }
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async verifyDataIntegrationsPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.addNewDataIntegrationsButton).toBeVisible();
  }

  async verifyIntegrationInList(integrationName: string): Promise<void> {
    await expect(this.page.locator(`text="${integrationName}"`)).toBeVisible();
  }

  async verifySuccessMessage(): Promise<void> {
    await expect(this.successAlert).toBeVisible();
  }

  async verifyNoDataAvailable(): Promise<void> {
    await expect(this.noDataMessage).toBeVisible();
  }
  //#endregion ================================
}

export class NewDataIntegrationPage extends BasePage {
  constructor(page: Page) {
    super(page, 'newIntegrationPage');
  }

  //#region ====== LOCATORS ===================
  private get integrationNameInput(): Locator {
    return this.page.locator('input[placeholder="Integration Name"]');
  }

  private get urlInput(): Locator {
    return this.page.locator('input[placeholder="URL"]');
  }

  private get authorisationTokenInput(): Locator {
    return this.page.locator('input[placeholder="Authorisation Token"]');
  }

  private get areaCodeInput(): Locator {
    return this.page.locator('input[placeholder="Area Code"]');
  }

  private get companyCodeInput(): Locator {
    return this.page.locator('input[placeholder="Company Code"]');
  }

  private get apiVersionInput(): Locator {
    return this.page.locator('input[placeholder="API Version"]');
  }

  private get appCodeInput(): Locator {
    return this.page.locator('input[placeholder="App Code"]');
  }

  private get typeInput(): Locator {
    return this.page.locator('input[placeholder="Type"]');
  }

  private get saveButton(): Locator {
    return this.page.locator('button:has-text("SAVE")');
  }

  private get verifyButton(): Locator {
    return this.page.locator('button:has-text("VERIFY")');
  }

  private get closeButton(): Locator {
    return this.page.locator('button:has-text("CLOSE")');
  }

  private get formModal(): Locator {
    return this.page.locator('.modal, .dialog').first();
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.formModal.or(this.integrationNameInput)).toBeVisible(),
      expect(this.saveButton).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async fillIntegrationDetails(integrationName: string, url: string, authorisationToken: string, areaCode?: string, companyCode?: string, apiVersion?: string): Promise<void> {
    await this.integrationNameInput.fill(integrationName);
    await this.urlInput.fill(url);
    await this.authorisationTokenInput.fill(authorisationToken);
    
    if (areaCode) {
      await this.areaCodeInput.fill(areaCode);
    }
    
    if (companyCode) {
      await this.companyCodeInput.fill(companyCode);
    }
    
    if (apiVersion) {
      await this.apiVersionInput.fill(apiVersion);
    }
  }

  async saveIntegration(): Promise<void> {
    await this.saveButton.click();
  }

  async cancelIntegration(): Promise<void> {
    await this.closeButton.click();
  }
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async verifyFormDisplayed(): Promise<void> {
    await expect(this.integrationNameInput).toBeVisible();
    await expect(this.saveButton).toBeVisible();
  }

  async verifyFormClosed(): Promise<void> {
    await expect(this.formModal).not.toBeVisible();
  }
  //#endregion ================================
}
