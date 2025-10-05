import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class PassengerAppPage extends BasePage {
  constructor(page: Page) {
    super(page, 'passengerAppPage');
  }

  //#region ====== LOCATORS ===================
  private get pageHeader(): Locator {
    return this.page.locator('h1, h2, .page-title').filter({ hasText: /passenger.*app/i });
  }

  private get settingsContainer(): Locator {
    return this.page.locator('.settings-container, .content-container, main');
  }

  private get configurationForm(): Locator {
    return this.page.locator('form, .form-container');
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.settingsContainer).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  // Add specific actions for passenger app configuration when requirements are defined
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async verifyPageLoaded(): Promise<void> {
    await expect(this.settingsContainer).toBeVisible();
  }
  //#endregion ================================
}
