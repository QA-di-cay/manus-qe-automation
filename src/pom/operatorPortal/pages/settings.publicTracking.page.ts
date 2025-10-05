import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class PublicTrackingPage extends BasePage {
  constructor(page: Page) {
    super(page, 'publicTrackingPage');
  }

  //#region ====== LOCATORS ===================
  private get pageHeader(): Locator {
    return this.page.locator('h1, h2, .page-title').filter({ hasText: /public.*tracking/i });
  }

  private get settingsContainer(): Locator {
    return this.page.locator('.settings-container, .content-container, main');
  }

  private get trackingConfigForm(): Locator {
    return this.page.locator('form, .form-container');
  }

  private get enableTrackingToggle(): Locator {
    return this.page.locator('input[type="checkbox"], .toggle, .switch').first();
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
  async enablePublicTracking(): Promise<void> {
    const toggle = this.enableTrackingToggle;
    if (await toggle.isVisible()) {
      const isChecked = await toggle.isChecked();
      if (!isChecked) {
        await toggle.click();
      }
    }
  }

  async disablePublicTracking(): Promise<void> {
    const toggle = this.enableTrackingToggle;
    if (await toggle.isVisible()) {
      const isChecked = await toggle.isChecked();
      if (isChecked) {
        await toggle.click();
      }
    }
  }
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async verifyPageLoaded(): Promise<void> {
    await expect(this.settingsContainer).toBeVisible();
  }

  async verifyTrackingEnabled(): Promise<void> {
    await expect(this.enableTrackingToggle).toBeChecked();
  }

  async verifyTrackingDisabled(): Promise<void> {
    await expect(this.enableTrackingToggle).not.toBeChecked();
  }
  //#endregion ================================
}
