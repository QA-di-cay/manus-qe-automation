import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class ReferenceDataPage extends BasePage {
  constructor(page: Page) {
    super(page, 'referenceDataPage');
  }

  //#region ====== LOCATORS ===================
  private get addContractNumberBtn(): Locator {
    return this.page.locator('button span:has-text("Add Contract Number")');
  }
  private get contractNumberTextbox(): Locator {
    return this.page.locator('label:has-text("Contract number *") + input');
  }
  private get saveCreateContractNumberBtn(): Locator {
    return this.page.locator('button span:has-text("Save")');
  }
  private get cancelCreateContractNumberBtn(): Locator {
    return this.page.locator('button span:has-text("Cancel")');
  }
  private get searchContractNumberTextbox(): Locator {
    return this.page.locator('label:has-text("Search") + input');
  }
  private get firstContractNumberValue(): Locator {
    return this.page.locator('tbody tr:first-child td:nth-child(2)');
  }
  private get addSuccessAlert(): Locator {
    return this.page.locator('div[role="alert"]:has-text("Add PTB report contract number")');
  }
  private get firstEditBtn(): Locator {
    return this.page.locator('tbody tr:first-child td:nth-child(3) button:first-child');
  }
  private get editSuccessAlert(): Locator {
    return this.page.locator('div[role="alert"]:has-text("Updated PTB report contract number")');
  }
  //#endregion ================================

  //#region ====== INTERNAL HELPERS ===========
  private async searchContractNumber(value: string): Promise<void> {
    await this.searchContractNumberTextbox.fill(value);
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await expect(this.addContractNumberBtn).toBeVisible();
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async addNewContractNumber(contractNumber: string): Promise<void> {
    await this.addContractNumberBtn.click();
    await this.contractNumberTextbox.fill(contractNumber);
    await this.saveCreateContractNumberBtn.click();
  }

  async verifyAddSuccess(contractNumber: string): Promise<void> {
    await expect(this.addSuccessAlert).toBeVisible();
    await this.reloadIdle();

    await this.searchContractNumber(contractNumber);
    await expect(this.firstContractNumberValue).toHaveText(contractNumber);
    await this.reloadIdle();
  }

  async editContractNumber(contractNumber: string, save: boolean = true): Promise<void> {
    await this.searchContractNumber(contractNumber);
    await this.firstEditBtn.click();

    const edited = `${contractNumber} test edit`;
    await this.contractNumberTextbox.fill(edited);

    if (save) {
      await this.saveCreateContractNumberBtn.click();
    } else {
      await this.cancelCreateContractNumberBtn.click();
    }
  }

  async verifyEditSuccess(contractNumber: string, saved: boolean = true): Promise<void> {
    const edited = `${contractNumber} test edit`;

    if (saved) {
      await expect(this.editSuccessAlert).toBeVisible();
      await this.reloadIdle();

      await this.searchContractNumber(edited);
      await expect(this.firstContractNumberValue).toHaveText(edited);
    } else {
      await expect(this.editSuccessAlert).not.toBeVisible();
      await this.reloadIdle();

      await this.searchContractNumber(edited);
      await expect(this.firstContractNumberValue).not.toHaveText(edited);
    }
  }
  //#endregion ================================
}
