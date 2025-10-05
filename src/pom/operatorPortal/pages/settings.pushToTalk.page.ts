import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class PushToTalkPage extends BasePage {
  constructor(page: Page) {
    super(page, 'pushToTalkPage');
  }

  //#region ====== LOCATORS ===================
  private get headerPushToTalk(): Locator {
    return this.page.locator('span:has-text("Push to talk")');
  }

  private get adminUsernameTextBox(): Locator {
    return this.page.locator('label:has-text("Admin Username") + input');
  }

  private get adminPasswordTextBox(): Locator {
    return this.page.locator('label:has-text("Admin Password") + input');
  }

  private get adminUsernameTextTip(): Locator {
    return this.page.locator('label[class="v-label theme--light"]:has-text("Admin Username")');
  }

  private get adminPasswordTextTip(): Locator {
    return this.page.locator('label[class="v-label theme--light"]:has-text("Admin Password")');
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.headerPushToTalk).toBeVisible(),
      expect(this.adminUsernameTextBox).toBeVisible(),
      expect(this.adminPasswordTextBox).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async fillAdminCredentials(username: string, password: string): Promise<void> {
    await this.adminUsernameTextBox.fill(username);
    await this.adminPasswordTextBox.fill(password);
  }

  async clearAdminCredentials(): Promise<void> {
    await this.adminUsernameTextBox.clear();
    await this.adminPasswordTextBox.clear();
  }

  async clickHeader(): Promise<void> {
    await this.headerPushToTalk.click();
  }

  async verifyCredentialFieldsVisible(): Promise<void> {
    await expect(this.adminUsernameTextBox).toBeVisible();
    await expect(this.adminPasswordTextBox).toBeVisible();
  }

  async verifyTextTipsNotVisible(): Promise<void> {
    await expect(this.adminUsernameTextTip).not.toBeVisible();
    await expect(this.adminPasswordTextTip).not.toBeVisible();
  }

  async verifyTextTipsVisible(): Promise<void> {
    await expect(this.adminUsernameTextTip).toBeVisible();
    await expect(this.adminPasswordTextTip).toBeVisible();
  }
  //#endregion ================================
}
