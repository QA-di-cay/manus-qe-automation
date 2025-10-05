import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class DataIntegrationPage extends BasePage {
  constructor(page: Page) {
    super(page, 'dataIntegration');
  }

  //#region ====== LOCATORS ===================
  private get newBtn(): Locator {
    return this.page.locator('span:has-text("Add New Data Integrations")');
  }

  private get newDataIntegForm(): Locator {
    return this.page.locator("//xpath=//div[contains(text(),'New Integration')]//ancestor::form");
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.newBtn).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async createNewIntegration(
    name: string,
    url: string,
    areaCode: string,
    companyCode: string,
    apiVersion: string,
    appCode: string,
    type: string,
    smartcardFiel: string,
    studentStatus: string,
  ) {
    
  }
  //#endregion ================================
}