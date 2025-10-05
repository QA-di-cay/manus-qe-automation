import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class OfflineDataPage extends BasePage {
  constructor(page: Page) {
    super(page, 'offlineDataPage');
  }

  //#region ====== LOCATORS ===================
  private get pageHeader(): Locator {
    return this.page.locator('h1, h2, .page-title').filter({ hasText: /offline.*data/i });
  }

  private get settingsContainer(): Locator {
    return this.page.locator('.settings-container, .content-container, main');
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
  // Add specific actions for offline data management when requirements are defined
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async verifyPageLoaded(): Promise<void> {
    await expect(this.settingsContainer).toBeVisible();
  }
  //#endregion ================================
}
