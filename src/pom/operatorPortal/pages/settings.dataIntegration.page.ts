import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class DataIntegrationPage extends BasePage {
  constructor(page: Page) {
    super(page, 'dataIntegrationPage');
  };

  //#region ====== LOCATORS ===================
  private get addNewBtn(): Locator {
    return this.page.locator("//span[contains(text(),'Add New Data Integrations')]//parent::button");
  };

  private get searchIpt(): Locator {
    return this.page.locator("//label[contains(text(),'Search')]//parent::div");
  };

  private get newIntegrationForm(): Locator {
    return this.page.locator("//div[contains(text(),'New Integration')]/ancestor::form");
  };

  private itgFormIpt(
    text: 
      'Integration Name' | 
      'URL' |
      'Authorisation Token' |
      'Area Code' |
      'Company Code' |
      'API Version' |
      'App Code' |
      'Type' |
      'Smartcard Field' |
      'Student Statuses' |
      'Last Run at'
    ): Locator {
    return this.newIntegrationForm.locator(`//label[contains(text(),'${text}')]/following-sibling::input`);
  };

  private itgFormBtn(
    text: 
      'Close' |
      'Verify' |
      'Save'
  ): Locator {
    return this.newIntegrationForm.locator(`//span[contains(text(),'${text}')]/parent::button`);
  };

  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.addNewBtn).toBeVisible(),
      expect(this.searchIpt).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async createNewIntegration(    
    igtNameTxt: string,
    igtUrlTxt: string,
    igtAuthorTokenTxt: string,
    igtAreaCodeTxt: string,
    igtCompanyCodeTxt: string,
    igtAPIVersionTxt: string,
    igtAppCodeTxt: string,
    igtTypeTxt: string,
    igtSmartcardFieldTxt: string,
    igtStudentSatusTxt: string,
    igtLastRunAtTxt: string,
  ): Promise<void> {
    await this.addNewBtn.click();
    await this.newIntegrationForm.waitFor({ state: 'visible' });
    await expect(this.newIntegrationForm).toBeVisible();

    const igtNameIpt = this.itgFormIpt('Integration Name');
    const igtUrlIpt = this.itgFormIpt('URL');
    const igtAuthorTokenIpt = this.itgFormIpt('Authorisation Token');
    const igtAreaCodeIpt = this.itgFormIpt('Area Code');
    const igtCompanyCodeIpt = this.itgFormIpt('Company Code');
    const igtAPIVersionIpt = this.itgFormIpt('API Version');
    const igtAppCodeIpt = this.itgFormIpt('App Code');
    const igtTypeIpt = this.itgFormIpt('Type');
    const igtSmartcardFieldIpt = this.itgFormIpt('Smartcard Field');
    const igtStudentSatusIpt = this.itgFormIpt('Student Statuses');
    const igtLastRunAtIpt = this.itgFormIpt('Last Run at');
    await Promise.all([
      expect(igtNameIpt).toBeVisible(),
      expect(igtUrlIpt).toBeVisible(),
      expect(igtAuthorTokenIpt).toBeVisible(),
      expect(igtAreaCodeIpt).toBeVisible(),
      expect(igtCompanyCodeIpt).toBeVisible(),
      expect(igtAPIVersionIpt).toBeVisible(),
      expect(igtAppCodeIpt).toBeVisible(),
      expect(igtTypeIpt).toBeVisible(),
      expect(igtSmartcardFieldIpt).toBeVisible(),
      expect(igtStudentSatusIpt).toBeVisible(),
      expect(igtLastRunAtIpt).toBeVisible(),
    ]);

    await igtNameIpt.fill(igtNameTxt);
    await igtUrlIpt.fill(igtUrlTxt);
    await igtAuthorTokenIpt.fill(igtAuthorTokenTxt);
    await igtAreaCodeIpt.fill(igtAreaCodeTxt);
    await igtCompanyCodeIpt.fill(igtCompanyCodeTxt);
    await igtAPIVersionIpt.fill(igtAPIVersionTxt);
    await igtAppCodeIpt.fill(igtAppCodeTxt);
    // await igtTypeIpt.fill(igtTypeTxt);
    await igtSmartcardFieldIpt.fill(igtSmartcardFieldTxt);
    await igtStudentSatusIpt.fill(igtStudentSatusTxt);

    const igtSaveBtn = this.itgFormBtn('Save')
    await expect(igtSaveBtn).toBeEnabled();
    await igtSaveBtn.click();

    await this.newIntegrationForm.waitFor({ state: 'hidden' });
    await expect(this.newIntegrationForm).toBeHidden();
  }
  //#endregion ================================

  //#region ====== ASSERTS ====================

  //#endregion ================================
}