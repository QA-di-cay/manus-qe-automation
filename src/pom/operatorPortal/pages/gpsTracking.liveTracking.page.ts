import { Page, expect } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class LiveTrackingPage extends BasePage {
  constructor(page: Page) {
    super(page, 'liveTrackingPage');
  }


  //#region ====== LOCATORS ===================
  private get activeGpsTrackingMenu() {
    return this.page.locator('a.active_menu:has-text("GPS Tracking")');
  }
  //#endregion ================================


  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.activeGpsTrackingMenu).toBeVisible(),
    ]);
  }
  //#endregion ================================


  //#region ====== ACTIONS ====================
  //#endregion ================================

}
