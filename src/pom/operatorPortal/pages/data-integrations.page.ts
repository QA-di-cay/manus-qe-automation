import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { GenericElement } from '@opePortalGeneEl';
import { IntegrationFormData } from '@opePortalTypes';

export class DataIntegrationsPage extends BasePage {
  readonly element: GenericElement;
  
  constructor(page: Page) {
    super(page, 'dataIntegrationsPage');
    this.element = new GenericElement(page);
  }

  //#region ====== LOCATORS ===================
  private get addNewBtn(): Locator {
    return this.element.buttonBySpanText('Add New Data Integrations');
  }

  private get searchInput(): Locator {
    return this.element.searchInput;
  }

  private get newIntegrationForm(): Locator {
    return this.element.formByText('New Integration');
  }

  private get saveBtn(): Locator {
    return this.element.formButtonByText('New Integration', 'Save');
  }

  private get verifyBtn(): Locator {
    return this.element.formButtonByText('New Integration', 'Verify');
  }

  private get closeBtn(): Locator {
    return this.element.formButtonByText('New Integration', 'Close');
  }

  private get tableWrapper(): Locator {
    return this.element.tableWrapper;
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.addNewBtn).toBeVisible(),
      expect(this.searchInput).toBeVisible(),
      this.tableWrapper.waitFor({ state: 'visible' }),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async openNewIntegrationForm(): Promise<void> {
    await this.addNewBtn.click();
  }

  async fillBasicInfo(data: Pick<IntegrationFormData, 'name' | 'url' | 'authToken'>): Promise<void> {
    await this.element.formInputByLabel('New Integration', 'Integration Name').fill(data.name);
    await this.element.formInputByLabel('New Integration', 'URL').fill(data.url);
    await this.element.formInputByLabel('New Integration', 'Authorisation Token').fill(data.authToken);
  }

  async fillCodes(data: Pick<IntegrationFormData, 'areaCode' | 'companyCode' | 'apiVersion'>): Promise<void> {
    await this.element.formInputByLabel('New Integration', 'Area Code').fill(data.areaCode);
    await this.element.formInputByLabel('New Integration', 'Company Code').fill(data.companyCode);
    await this.element.formInputByLabel('New Integration', 'API Version').fill(data.apiVersion);
  }

  async fillAdvancedSettings(data: Pick<IntegrationFormData, 'appCode' | 'smartcardField' | 'studentStatuses'>): Promise<void> {
    await this.element.formInputByLabel('New Integration', 'App Code').fill(data.appCode);
    await this.element.formInputByLabel('New Integration', 'Smartcard Field').fill(data.smartcardField);
    await this.element.formInputByLabel('New Integration', 'Student Statuses').fill(data.studentStatuses);
  }

  async verifyIntegration(): Promise<void> {
    await this.verifyBtn.click();
  }

  async save(): Promise<void> {
    await this.saveBtn.click();
  }

  async closeForm(): Promise<void> {
    await this.closeBtn.click();
  }

  async searchIntegration(name: string): Promise<void> {
    await this.searchInput.clear();
    await this.searchInput.fill(name);
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
  }

  async scrollTableHorizontally(): Promise<void> {
    await this.page.mouse.wheel(2000, 0);
  }
  //#endregion ================================

  //#region ====== VERIFICATIONS ==============
  async expectFormIsVisible(): Promise<void> {
    await expect(this.newIntegrationForm).toBeVisible({ timeout: 5000 });
  }

  async expectFormIsClosed(): Promise<void> {
    await expect(this.newIntegrationForm).toBeHidden({ timeout: 5000 });
  }

  async expectSaveButtonIsEnabled(): Promise<void> {
    await expect(this.saveBtn).toBeEnabled();
  }

  async expectSaveButtonIsDisabled(): Promise<void> {
    await expect(this.saveBtn).toBeDisabled();
  }

  async expectVerifyButtonIsVisible(): Promise<void> {
    await expect(this.verifyBtn).toBeVisible();
  }

  async expectIntegrationExists(name: string): Promise<void> {
    const resultRow = this.element.tableRowByText(name);
    await expect(resultRow).toBeVisible({ timeout: 10000 });
  }

  async expectIntegrationNotExists(name: string): Promise<void> {
    const resultRow = this.element.tableRowByText(name);
    await expect(resultRow).not.toBeVisible();
  }

  async expectTableHasData(): Promise<void> {
    const firstRow = this.element.tableCell(1, 1);
    await expect(firstRow).toBeVisible();
  }

  async expectTableIsEmpty(): Promise<void> {
    const noDataMessage = this.element.divByText('No data available');
    await expect(noDataMessage).toBeVisible();
  }

  async expectElementWithClassNotVisible(className: string): Promise<void> {
    const elements = this.element.elementWithClass(className);
    const count = await elements.count();
    
    if (count === 0) {
      expect(count, 'No element should be visible or present').toBe(0);
      return;
    }

    for (let i = 0; i < count; i++) {
      const el = elements.nth(i);
      const isVisible = await el.isVisible();
      expect(
        isVisible,
        `Element at index ${i} (out of ${count}) should not be visible`
      ).toBeFalsy();
    }
  }

  async expectHasHorizontalScrollbar(): Promise<void> {
    const hasScrollbar = await this.tableWrapper.evaluate(
      (el) => el.scrollWidth > el.clientWidth
    );
    expect(hasScrollbar, 'Horizontal scrollbar should be present').toBeTruthy();
  }
  //#endregion ================================

  //#region ====== HELPER METHODS =============
  async createCompleteIntegration(data: IntegrationFormData): Promise<void> {
    await this.openNewIntegrationForm();
    await this.expectFormIsVisible();
    
    await this.fillBasicInfo({
      name: data.name,
      url: data.url,
      authToken: data.authToken
    });
    
    await this.fillCodes({
      areaCode: data.areaCode,
      companyCode: data.companyCode,
      apiVersion: data.apiVersion
    });
    
    await this.fillAdvancedSettings({
      appCode: data.appCode,
      smartcardField: data.smartcardField,
      studentStatuses: data.studentStatuses
    });
    
    await this.expectSaveButtonIsEnabled();
    await this.save();
    await this.expectFormIsClosed();
  }
  //#endregion ================================
}
