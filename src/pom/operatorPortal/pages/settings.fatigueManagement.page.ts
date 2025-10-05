import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from '@opePortalBasePage';

export class FatigueManagementPage extends BasePage {
  constructor(page: Page) {
    super(page, 'companyPage');
  }

  protected async loadCondition(): Promise<void> {
    await Promise.all([
      
    ]);
  }
}
