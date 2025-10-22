import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { GenericElement } from '@opePortalGeneEl';


export class DriverAppPage extends BasePage {
  readonly gElem: GenericElement;
  constructor(page: Page) {
    super(page, 'driverAppPage');
    this.gElem = new GenericElement(page);
  }

  //#region ====== LOCATORS ===================
  get hideRevenueCheckbox(): Locator {
    return this.gElem.checkbox('Hide Revenue of Printout');
  }
  get disableWrongBoardingCheckbox(): Locator {
    return this.gElem.checkbox('Disable wrong boarding');
  }
  get skipStopNoStudentCheckbox(): Locator {
    return this.gElem.checkbox('Skip stop without student');
  }
  get autoLockWhenLoggedOutCheckbox(): Locator {
    return this.gElem.checkbox('Auto lock screen when logged out');
  }
  get allowSameStopCheckbox(): Locator {
    return this.gElem.checkbox('Allow destination stop same as departing stop');
  }
  get allowMultipleStopsCheckbox(): Locator {
    return this.gElem.checkbox('Allow multiple destination stops per transaction');
  }
  get disableAutoLogoutCheckbox(): Locator {
    return this.gElem.checkbox('Disable auto log out at midnight');
  }
  get saveBtn(): Locator {
    return this.gElem.divBtn('Save');
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.allowSameStopCheckbox).toBeVisible(),
      expect(this.allowMultipleStopsCheckbox).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async assertCheckbox({
    element,
  }: {
    element: Locator,
  }) {
    await expect(element, `${element} should be visible`).toBeVisible();
    await expect(element, `${element} should be enabled`).toBeEnabled();
    await element.locator("//ancestor::*[@class='v-input__slot']").click();

    // await expect(async () => {
    //   await element.click({ trial: true });
    // }, `${element} should be clickable`).not.toThrow();
  }

  async assertCheckboxState({
    element,
    expected,
  }: {
    element: 'Allow destination' | 'Allow multiple' | 'Skip stop without',
    expected: 'checked' | 'unchecked'
  }) {

    const elementMap: Record<
      'Allow destination' | 'Allow multiple' | 'Skip stop without',
      Locator
    > = {
      'Allow destination': this.allowSameStopCheckbox,
      'Allow multiple': this.allowMultipleStopsCheckbox,
      'Skip stop without': this.skipStopNoStudentCheckbox,
    };
    const state = await elementMap[element].isChecked();
    if (expected === 'checked') {
      expect(state).toBeTruthy();
    } else {
      expect(state).toBeFalsy();
    }
  }

  async assertUi() {
    await expect(this.hideRevenueCheckbox).toBeEnabled();
    await expect(this.disableWrongBoardingCheckbox).toBeEnabled();
    await expect(this.skipStopNoStudentCheckbox).toBeEnabled();
    await expect(this.autoLockWhenLoggedOutCheckbox).toBeEnabled();
    await expect(this.allowSameStopCheckbox).toBeEnabled();
    await expect(this.allowMultipleStopsCheckbox).toBeEnabled();
    await expect(this.disableAutoLogoutCheckbox).toBeEnabled();
    await expect(this.saveBtn).toBeEnabled();
  }

  async assertOptList() {
    await this.assertCheckbox({ element: this.hideRevenueCheckbox });
    await this.assertCheckbox({ element: this.disableWrongBoardingCheckbox });
    await this.assertCheckbox({ element: this.skipStopNoStudentCheckbox });
    await this.assertCheckbox({ element: this.autoLockWhenLoggedOutCheckbox });
    await this.assertCheckbox({ element: this.allowSameStopCheckbox });
    await this.assertCheckbox({ element: this.allowMultipleStopsCheckbox });
    await this.assertCheckbox({ element: this.disableAutoLogoutCheckbox });
  }
  //#endregion ================================
}