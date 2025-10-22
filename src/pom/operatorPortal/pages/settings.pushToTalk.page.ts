import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { GenericElement } from '@opePortalGeneEl';

export class PushToTalkPage extends BasePage {
  readonly element: GenericElement;
  
  constructor(page: Page) {
    super(page, 'pushToTalkPage');
    this.element = new GenericElement(page);
  }

  //#region ====== LOCATORS ===================
  private get headerPushToTalk(): Locator {
    return this.element.spanByText('Push to talk');
  }

  private get adminUsernameTextBox(): Locator {
    return this.element.inputByLabel('Admin Username');
  }

  private get adminPasswordTextBox(): Locator {
    return this.element.inputByLabel('Admin Password');
  }

  private get adminUsernameTextTip(): Locator {
    return this.element.elementByXPath('//label[contains(@class,"v-label") and contains(@class,"theme--light") and contains(text(),"Admin Username")]');
  }

  private get adminPasswordTextTip(): Locator {
    return this.element.elementByXPath('//label[contains(@class,"v-label") and contains(@class,"theme--light") and contains(text(),"Admin Password")]');
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
