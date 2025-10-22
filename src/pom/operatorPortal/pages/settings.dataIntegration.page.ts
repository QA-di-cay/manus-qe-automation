import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { GenericElement } from '@opePortalGeneEl';

export class DataIntegrationPage extends BasePage {
  readonly element: GenericElement;
  constructor(page: Page) {
    super(page, 'dataIntegrationPage');
    this.element = new GenericElement(page);
  }

  //#region ====== LOCATORS ===================
  private get addNewBtn(): Locator {
    return this.element.divBtn('Add New Data Integrations');
  };

  private get searchInput(): Locator {
    return this.element.inputBox('Search');
  };

  private get newIntegrationForm(): Locator {
    return this.page.locator("xpath=//div[contains(text(),'New Integration')]/ancestor::form");
  };

  private get searchResultWrapper(): Locator {
    return this.page.locator("xpath=//div[contains(@class,'v-data-table__wrapper')]");
  };

  private eleWithClass(eleClass: string): Locator {
    return this.page.locator(`xpath=//*[contains(@class,'${eleClass}')]`);
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
    return this.newIntegrationForm.locator(`xpath=//label[contains(text(),'${text}')]/following-sibling::input`);
  };

  private itgFormBtn(
    text:
      'Close' |
      'Verify' |
      'Save'
  ): Locator {
    return this.newIntegrationForm.locator(`xpath=//span[contains(text(),'${text}')]/parent::button`);
  };

  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.addNewBtn).toBeVisible(),
      expect(this.searchInput).toBeVisible(),
      this.searchResultWrapper.waitFor({ state: 'visible' }),
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
    await this.newIntegrationForm.waitFor({ state: 'visible', timeout: 3000 });
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
    await igtSaveBtn.waitFor({ state: 'visible', timeout: 3000 });
    await expect(igtSaveBtn).toBeEnabled();
    await igtSaveBtn.click();

    await this.newIntegrationForm.waitFor({ state: 'hidden', timeout: 3000 });
    await expect(this.newIntegrationForm).toBeHidden();
  }
  async scrollHorizontally() {
    await this.page.mouse.wheel(2000, 0);
  }
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async assertNotVisibleOrAbsent(locator: Locator): Promise<void> {
    const count = await locator.count();

    if (count === 0) {
      expect(count, 'No element should be visible or present').toBe(0);
      return;
    }

    for (let i = 0; i < count; i++) {
      const el = locator.nth(i);
      const isVisible = await el.isVisible();
      expect(
        isVisible,
        `Element at index ${i} (out of ${count}) should not be visible`
      ).toBeFalsy();
    }
  };

  async assertEleWithClassNotVisible(eleClass: string): Promise<void> {
    const locator = this.eleWithClass(eleClass);
    await this.assertNotVisibleOrAbsent(locator);
  };


  async assertHasHorizontalScrollbar(): Promise<void> {
    let hasScrollbar = true;
    const locator = this.searchResultWrapper
    hasScrollbar = await locator.evaluate((el) => el.scrollWidth > el.clientWidth);
    expect(hasScrollbar, 'Horizontal scrollbar should not appear.').toBeTruthy();
  };
  //#endregion ================================
}