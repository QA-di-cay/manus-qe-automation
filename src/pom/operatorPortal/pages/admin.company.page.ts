import { Page, expect, Locator } from '@playwright/test';
import {BasePage} from '@opePortalBasePage';
import { LiveTrackingPage } from '@opePortalPages';

export class CompanyPage extends BasePage {
  constructor(page: Page) {
    super(page, 'companyPage');
  }


  //#region ====== LOCATORS ===================
  private get addNewCompanyBtn(): Locator {
    return this.page.locator('button[aria-label="Add New Company"]');
  }
  private get searchTextBox(): Locator {
    return this.page.locator("xpath=//*[contains(text(), 'Search')]/following-sibling::input");
  }
  private company(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }
  //#endregion ================================



  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.addNewCompanyBtn).toBeVisible(),
      expect(this.searchTextBox).toBeVisible(),
    ]);
  }
  //#endregion ================================
  


  //#region ====== ACTIONS ====================
  async navTo() {
    // With shared authentication, page should already be on company page
    // Just verify we're loaded correctly
    if (!this.page.url().includes('/company')) {
      await this.page.goto('/transportme/index.php/company');
    }
    await this.expectLoaded();
  }
  async searchAndAccessCompany(
    name: string
  ): Promise<LiveTrackingPage> {
    await this.searchTextBox.fill(name);
    const targetCompany = this.company(name);
    await targetCompany.click()

    const liveTrackingPage = new LiveTrackingPage(this.page);
    await liveTrackingPage.expectLoaded();
    return liveTrackingPage;
  }
  //#endregion ================================
}