import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class DriverAppPage extends BasePage {
  constructor(page: Page) {
    super(page, 'driverApp');
  }

  //#region ====== LOCATORS ===================
  get allowDestiCheckbox(): Locator {
    return this.page.locator('.v-input__slot:has-text("Allow destination") input[type="checkbox"]');
  }

  get allowMultipleCheckbox(): Locator {
    return this.page.locator('.v-input__slot:has-text("Allow multiple") input[type="checkbox"]');
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.allowDestiCheckbox).toBeVisible(),
      expect(this.allowMultipleCheckbox).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async assertCheckboxState(locator: Locator, expected: 'checked' | 'unchecked') {
    const state = await locator.isChecked();
    if (expected === 'checked') {
      expect(state).toBeTruthy();
    } else {
      expect(state).toBeFalsy();
    }
  }
}