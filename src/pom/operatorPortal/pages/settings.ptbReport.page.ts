// src/pom/operatorPortal/pages/settings.ptbReport.page.ts
import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class PtbReportPage extends BasePage {
  constructor(page: Page) {
    super(page, 'ptbReportPage');
  }

  //#region ====== LOCATORS ===================
  private get headerPTBReport(): Locator {
    return this.page.locator('span:has-text("PTB Report")');
  }

  private get addConTractNumberBtn(): Locator {
    return this.page.locator('button:has-text("Add Contract Number")');
  }

  private get addConTractNumberTextBox(): Locator {
    return this.page.locator('label:has-text("Contract number *") + input');
  }

  private get saveBtn(): Locator {
    return this.page.locator('header:has-text("Add Contract Number") + div + div button:has-text("Save")');
  }

  private get addSuccessAlert(): Locator {
    return this.page.locator('.v-alert__content:has-text("Add PTB report contract number")');
  }

  private get searchTextBox(): Locator {
    return this.page.locator('label:has-text("Search") + input');
  }

  private get firstContractNumber(): Locator {
    return this.page.locator('tbody tr:first-child td:nth-child(2)');
  }

  private get firstEditBtn(): Locator {
    return this.page.locator('tbody tr:first-child td:nth-child(3) button:has-text("Edit Contract Number")');
  }

  private get saveEditBtn(): Locator {
    return this.page.locator('header:has-text("Edit Contract Number") + div + div button:has-text("Save")');
  }

  private get editSuccessAlert(): Locator {
    return this.page.locator('.v-alert__content:has-text("Updated PTB report contract number")');
  }

  private get editConTractNumberTextBox(): Locator {
    return this.page.locator(
      'header:has-text("Edit Contract Number") + div label:has-text("Contract number *") + input'
    );
  }

  private get firstDeleteBtn(): Locator {
    return this.page.locator('tbody tr:first-child td:nth-child(3) [aria-label="Delete Contract Number"]');
  }

  private get deleteSuccessAlert(): Locator {
    return this.page.locator('.v-alert__content:has-text("Deleted PTB report contract number")');
  }

  private get noRecordsMessage(): Locator {
    return this.page.locator('td:has-text("No matching records found")');
  }

  private get confirmDeleteBtn(): Locator {
    return this.page.locator('header:has-text("Confirmation") + div + div button:has-text("OK")');
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([expect(this.headerPTBReport).toBeVisible()]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async addConTractNumber(contractNumber: string): Promise<void> {
    await this.addConTractNumberBtn.click();
    await this.addConTractNumberTextBox.fill(contractNumber);
    await this.saveBtn.click();
  }

  async searchContractNumber(contractNumber: string): Promise<void> {
    await this.searchTextBox.fill(contractNumber);
  }

  async verifyAddSuccess(contractNumber: string): Promise<void> {
    await expect(this.addSuccessAlert).toBeVisible();
    await this.searchContractNumber(contractNumber);
    await expect(this.firstContractNumber).toContainText(contractNumber);
  }

  async editConTractNumber(contractNumber: string): Promise<void> {
    await this.firstEditBtn.click();
    await this.editConTractNumberTextBox.fill(contractNumber + 'edit');
    await this.saveEditBtn.click();
  }

  async verifyEditSuccess(contractNumber: string): Promise<void> {
    await expect(this.editSuccessAlert).toBeVisible();
    await expect(this.firstContractNumber).toContainText(contractNumber + 'edit');
  }

  async deleteConTractNumberSuccess(): Promise<void> {
    await this.firstDeleteBtn.click();
    await this.confirmDeleteBtn.click();
    await expect(this.deleteSuccessAlert).toBeVisible();
    await expect(this.noRecordsMessage).toBeVisible();
  }
  //#endregion ================================
}
