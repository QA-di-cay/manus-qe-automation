import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { LiveTrackingPage } from '@opePortalPages';
import { GenericElement } from '@opePortalGeneEl';

export class CompanyPage extends BasePage {
  readonly element: GenericElement;
  constructor(page: Page) {
    super(page, 'companyPage');
    this.element = new GenericElement(page);
  }

  //#region ====== LOCATORS ===================
  private get newCompanyBtn(): Locator {
    return this.element.divBtn('Add New Company');
  }
  private get searchInput(): Locator {
    return this.element.inputBox('Search');
  }
  private selectedCompany(
    name: string
  ): Locator {
    return this.element.searchResult({
      text: name,
      colIndex: 1,
    });
  };
  //#endregion ================================



  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.newCompanyBtn).toBeVisible(),
      expect(this.searchInput).toBeVisible(),
    ]);
  }
  //#endregion ================================
  


  //#region ====== ACTIONS ====================
  async navTo() {
    if (!this.page.url().includes('/company')) {
      await this.page.goto('/transportme/index.php/company');
    }
    await this.expectLoaded();
  }
  async searchAndAccessCompany(
    name: string
  ): Promise<LiveTrackingPage> {
    await this.searchInput.fill(name);
    const targetCompany = this.selectedCompany(name);
    await targetCompany.waitFor({state: 'visible'});
    await targetCompany.click()

    const liveTrackingPage = new LiveTrackingPage(this.page);
    await liveTrackingPage.expectLoaded();
    return liveTrackingPage;
  }
  //#endregion ================================
}