import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { GenericElement } from '@opePortalGeneEl';
import { isValidDDMMYYYY } from '@utils';

export class HolidayPage extends BasePage {
  readonly element: GenericElement;
  
  constructor(page: Page) {
    super(page, 'holidayPage');
    this.element = new GenericElement(page);
  }

  //#region ====== LOCATORS ===================
  private get addNewHolidayBtn(): Locator {
    return this.element.buttonBySpanText('Add New Holiday');
  }
  
  private get headerCreateHolidayPopup(): Locator {
    return this.element.divByText('Create holiday');
  }
  
  private get holidayDateTextBox(): Locator {
    return this.element.inputByPlaceholder('Select Holiday date');
  }
  
  private get holidayTypeDropdown(): Locator {
    return this.element.dropdownByLabel('Holiday type');
  }
  
  private get publicHolidayOption(): Locator {
    return this.element.dropdownOptionByClass('Public Holiday');
  }
  
  private get schoolHolidayOption(): Locator {
    return this.element.dropdownOptionByClass('School Holiday');
  }
  
  private get saveBtnAddHolidayPopup(): Locator {
    return this.element.buttonByText('Save');
  }
  
  private get firstDateValue(): Locator {
    return this.element.tableCell(1, 1);
  }
  
  private get firstTypeValue(): Locator {
    return this.element.tableCell(1, 2);
  }
  
  private get firstDeleteBtn(): Locator {
    return this.element.elementByXPath('//tbody/tr[1]/td[3]//button[@aria-label="delete holiday"]');
  }
  
  private get secondTypeValue(): Locator {
    return this.element.tableCell(2, 2);
  }
  
  private get secondDeleteBtn(): Locator {
    return this.element.elementByXPath('//tbody/tr[2]/td[3]//button[@aria-label="delete holiday"]');
  }
  
  private get searchTextBox(): Locator {
    return this.element.inputByLabel('Search');
  }
  
  private get confirmDeleteHolidayBtn(): Locator {
    return this.element.elementByXPath('//div[contains(text(),"Are you sure you want to delete this holiday?")]/following-sibling::div//button[contains(text(),"OK")]');
  }
  
  private get rows(): Locator {
    return this.element.elementByXPath('//tbody/tr');
  }
  //#endregion ================================

  //#region ====== INTERNAL HELPERS ===========
  private async searchByDate(date: string): Promise<void> {
    await this.searchTextBox.fill(date);
  }

  private typeCellSelector(typeText: string): string {
    return `td:nth-child(2):has-text("${typeText}")`;
  }

  private targetTypeRows(typeText: string): Locator {
    return this.rows.filter({ has: this.page.locator(this.typeCellSelector(typeText)) });
  }

  private async totalRows(): Promise<number> {
    return this.rows.count();
  }

  private async cellText(cell: Locator): Promise<string> {
    return ((await cell.textContent()) ?? '').trim();
  }

  private async firstRowTypeText(): Promise<string> {
    return this.cellText(this.firstTypeValue);
  }

  private async secondRowTypeTextIfAny(hasSecond: boolean): Promise<string | null> {
    return hasSecond ? this.cellText(this.secondTypeValue) : null;
  }

  private async deleteRowAt(index: number): Promise<void> {
    const btn = index === 0 ? this.firstDeleteBtn : this.secondDeleteBtn;
    await btn.click();
    await this.confirmDeleteHolidayBtn.click();
  }

  private async waitNoRowOfType(typeText: string): Promise<void> {
    await expect(this.targetTypeRows(typeText)).toHaveCount(0);
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await expect(this.addNewHolidayBtn).toBeVisible();
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async addNewHoliday(holidayDate: string, holidayType: 'public' | 'school'): Promise<void> {
    const selectedHolidayType = {
      public: this.publicHolidayOption,
      school: this.schoolHolidayOption,
    } as const;
    isValidDDMMYYYY(holidayDate);

    await this.addNewHolidayBtn.click();
    await this.holidayDateTextBox.fill(holidayDate);
    await this.headerCreateHolidayPopup.click();
    await this.holidayTypeDropdown.click();
    await selectedHolidayType[holidayType].click();
    await this.saveBtnAddHolidayPopup.click();
  }

  async verifyAddSuccess(holidayDate: string, holidayType: 'public' | 'school'): Promise<void> {
    const typeText = holidayType === 'public' ? 'Public Holiday' : 'School Holiday';

    await this.reloadIdle();
    await expect(this.firstDateValue).toHaveText(holidayDate);
    await expect(this.firstTypeValue).toHaveText(typeText);
  }

  async checkHolidayExisted(holidayDate: string, holidayType: 'public' | 'school'): Promise<void> {
    const typeText = holidayType === 'public' ? 'Public Holiday' : 'School Holiday';

    await this.searchByDate(holidayDate);

    const rows = await this.totalRows();
    if (rows === 0) return;

    const typeRows = await this.targetTypeRows(typeText).count();
    if (typeRows === 0) return;

    const firstType = await this.firstRowTypeText();
    const secondType = await this.secondRowTypeTextIfAny(rows > 1);

    if (firstType === typeText) {
      await this.deleteRowAt(0);
    } else if (secondType === typeText) {
      await this.deleteRowAt(1);
    } else {
      throw new Error('Invariant violated: Có row với type cần xoá nhưng không nằm ở hàng 1/2.');
    }

    await this.waitNoRowOfType(typeText);
  }
  //#endregion ================================
}
