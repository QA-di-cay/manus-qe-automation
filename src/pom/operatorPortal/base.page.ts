import { Page, expect } from '@playwright/test';
import { Header } from '@opePortalComp';
import { Routes } from '@opePortalRoutes';

export abstract class BasePage {
  readonly header: Header;

  protected constructor(
    protected readonly page: Page,
    protected readonly routeKey: keyof typeof Routes
  ) {
    this.header = new Header(page);
  }


  //#region ====== Generic Actions ============
  protected abstract loadCondition(): Promise<void>;

  async expectLoaded(): Promise<void> {
    const { path, title } = Routes[this.routeKey];
    const regex = new RegExp(
      path.replace('/transportme', '/transportme(?:/index\\.php)?') + '(?:[?#].*)?$'
    );
    await expect(this.page).toHaveURL(regex);
    // await expect(this.page.getByRole('heading', { name: title })).toBeVisible(),
    await this.loadCondition();
  }
  
  async reloadIdle(): Promise<void> {
    await this.page.waitForTimeout(1000);
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }
  //#endregion ================================
}