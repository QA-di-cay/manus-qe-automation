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
  
  //#endregion ================================

  //#region ====== ASSERTS ====================

  //#endregion ================================
}