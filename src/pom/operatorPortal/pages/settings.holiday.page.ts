import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { isValidDDMMYYYY } from '@utils';

export class HolidayPage extends BasePage {
  constructor(page: Page) {
    super(page, 'holidayPage');
  }

  //#region ====== LOCATORS ===================
  private get addNewHolidayBtn(): Locator {
    return this.page.locator('button span:has-text("Add New Holiday")');
  }
  private get headerCreateHolidayPopup(): Locator {
    return this.page.locator('h2:has-text("Create holiday")');
  }
  private get holidayDateTextBox(): Locator {
    return this.page.locator('[placeholder="Select Holiday date"]');
  }
  private get holidayTypeDropdown(): Locator {
    return this.page.locator('label:has-text("Holiday type") + input ');
  }
  private get publicHolidayOption(): Locator {
    return this.page.locator('div[class="v-list-item__title"]:has-text("Public Holiday")');
  }
  private get schoolHolidayOption(): Locator {
    return this.page.locator('div[class="v-list-item__title"]:has-text("School Holiday")');
  }
  private get saveBtnAddHolidayPopup(): Locator {
    return this.page.locator('button:has-text("Save")');
  }
  private get firstDateValue(): Locator {
    return this.page.locator('tbody tr:first-child td:first-child');
  }
  private get firstTypeValue(): Locator {
    return this.page.locator('tbody tr:first-child td:nth-child(2)');
  }
  private get firstDeleteBtn(): Locator {
    return this.page.locator('tbody tr:first-child td:nth-child(3) button[aria-label="delete holiday"]');
  }
  private get secondTypeValue(): Locator {
    return this.page.locator('tbody tr:nth-child(2) td:nth-child(2)');
  }
  private get secondDeleteBtn(): Locator {
    return this.page.locator('tbody tr:nth-child(2) td:nth-child(3) button[aria-label="delete holiday"]');
  }
  private get searchTextBox(): Locator {
    return this.page.locator('label:has-text("Search") + input');
  }
  private get confirmDeleteHolidayBtn(): Locator {
    return this.page.locator('div:has-text("Are you sure you want to delete this holiday?") + div button:has-text("OK")');
  }
  private get rows(): Locator {
    return this.page.locator('tbody tr');
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
