import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class TravelConfigPage extends BasePage {
  constructor(page: Page) {
    super(page, 'travelConfigPage');
  }

  //#region ====== LOCATORS ===================
  private get newFreeTravelConfigBtn(): Locator {
    return this.page.getByRole('button', { name: /^\s*New Configuration\s*$/ });
  }

  private get configNameTextbox(): Locator {
    return this.page.getByLabel('Configuration name *');
  }

  private get durationTextbox(): Locator {
    return this.page.locator('label:has-text("Duration (minutes)") + input');
  }

  private get freeSessionsTextbox(): Locator {
    return this.page.locator('label:has-text("Free sessions") + input');
  }

  private get validFromTimePicker(): Locator {
    return this.page.locator('label:has-text("Valid from") + input');
  }

  private get validToTimePicker(): Locator {
    return this.page.locator('label:has-text("Valid to") + input');
  }

  private get excludePublicHolidayCheckbox(): Locator {
    return this.page.locator('div[class="v-input__slot"]:has-text("Exclude public holiday") input');
  }

  private get excludeSchoolHolidayCheckbox(): Locator {
    return this.page.locator('div[class="v-input__slot"]:has-text("Exclude school holiday") input');
  }

  private get saveBtn(): Locator {
    return this.page.locator('span:has-text("Save")');
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.newFreeTravelConfigBtn).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async createFreeTravelConfig(
    configurationName: string,
    duration: number = 40,
    freeSessions: number = 1,
    holidayType: 'public' | 'school'
  ): Promise<void> {
    await this.newFreeTravelConfigBtn.click();
    await this.configNameTextbox.fill(configurationName);
    await this.durationTextbox.fill(duration.toString());
    await this.freeSessionsTextbox.fill(freeSessions.toString());
    await this.validFromTimePicker.pressSequentially("0100A", { delay: 100 });
    await this.validToTimePicker.pressSequentially("1200P", { delay: 100 });
    
    const checkbox = holidayType === 'public' 
      ? this.excludePublicHolidayCheckbox 
      : this.excludeSchoolHolidayCheckbox;

    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
    
    await this.saveBtn.click();
  }
  //#endregion ================================
}
