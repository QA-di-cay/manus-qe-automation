import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@operatorPortalPages';

export class DataIntegrationPage extends BasePage {
  constructor(page: Page) {
    super(page, 'dataIntegration');
  }

  //#region ====== LOCATORS ===================
  private get addNewDataIntegrationsButton(): Locator {
    return this.page.locator('button:has-text("Add New Data Integrations")');
  }

  private get searchInput(): Locator {
    return this.page.locator('input[placeholder="Search"]');
  }

  private get dataTable(): Locator {
    return this.page.locator('table, .data-table');
  }

  private get noDataMessage(): Locator {
    return this.page.locator('text="No data available"');
  }

  private get pageTitle(): Locator {
    return this.page.locator('text="DATA INTEGRATIONS"');
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
    await newIntegrationPage.expectLoaded();
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

  async verifyNoDataMessage(): Promise<void> {
    await expect(this.noDataMessage).toBeVisible();
  }
  //#endregion ================================
}

export class NewDataIntegrationPage extends BasePage {
  constructor(page: Page) {
    super(page, 'newIntegrationPage');
  }

  //#region ====== LOCATORS ===================
  // Based on the actual form fields visible in the modal
  private get integrationNameInput(): Locator {
    // The first input field after "Integration Name" label
    return this.page.locator('label:has-text("Integration Name") + input, input').first();
  }

  private get urlInput(): Locator {
    // Input field with URL label/placeholder
    return this.page.locator('input').nth(2); // 3rd input field based on screenshot
  }

  private get authorisationTokenInput(): Locator {
    // Input field for Authorisation Token
    return this.page.locator('input').nth(3); // 4th input field
  }

  private get areaCodeInput(): Locator {
    // Area Code input field
    return this.page.locator('input').nth(5); // 6th input field
  }

  private get companyCodeInput(): Locator {
    // Company Code input field
    return this.page.locator('input').nth(6); // 7th input field
  }

  private get apiVersionInput(): Locator {
    // API Version input field
    return this.page.locator('input').nth(7); // 8th input field
  }

  private get appCodeInput(): Locator {
    // App Code input field
    return this.page.locator('input').nth(8); // 9th input field
  }

  private get typeInput(): Locator {
    // Type input field (appears to be TASS by default)
    return this.page.locator('input').nth(10); // Type field
  }

  private get smartcardFieldInput(): Locator {
    // Smartcard Field input
    return this.page.locator('input').nth(11);
  }

  private get studentStatusesInput(): Locator {
    // Student Statuses input
    return this.page.locator('input').nth(12);
  }

  private get lastRunAtInput(): Locator {
    // Last Run at input
    return this.page.locator('input').nth(13);
  }

  private get saveButton(): Locator {
    return this.page.locator('button:has-text("Save")');
  }

  private get verifyButton(): Locator {
    return this.page.locator('button:has-text("Verify")');
  }

  private get closeButton(): Locator {
    return this.page.locator('button:has-text("Close")');
  }

  private get formModal(): Locator {
    return this.page.locator('.modal, .dialog, [role="dialog"]').first();
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await expect(this.integrationNameInput).toBeVisible();
    await expect(this.saveButton).toBeVisible();
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async fillIntegrationDetails(
    integrationName: string, 
    url: string, 
    authorisationToken: string, 
    areaCode?: string, 
    companyCode?: string, 
    apiVersion?: string
  ): Promise<void> {
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

  async verifyIntegration(): Promise<void> {
    await this.verifyButton.click();
  }

  async cancelIntegration(): Promise<void> {
    await this.closeButton.click();
  }
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async verifyFormDisplayed(): Promise<void> {
    await expect(this.integrationNameInput).toBeVisible();
    await expect(this.saveButton).toBeVisible();
    await expect(this.closeButton).toBeVisible();
  }

  async verifyFormClosed(): Promise<void> {
    await expect(this.formModal).not.toBeVisible();
  }
  //#endregion ================================
}
