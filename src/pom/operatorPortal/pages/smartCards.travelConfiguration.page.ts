import { Page, expect } from '@playwright/test';
import { Header } from '@headerComponent';

export class TravelConfigPage {
  readonly header: Header;

  constructor(private readonly page: Page) {
    this.header = new Header(page);
  }

  // ----- Locators -----
  get newFreeTravelConfigBtn() {
    return this.page.getByRole('button', { name: /^\s*New Configuration\s*$/ });
  }
  get configNameTextbox() {
    return this.page.getByLabel('Configuration name *');
  }
  get durationTextbox() {
    return this.page.locator('label:has-text("Duration (minutes)") + input');
  }
  get freeSessionsTextbox() {
    return this.page.locator('label:has-text("Free sessions") + input');
  }
  get validFromTimePicker() {
    return this.page.locator('label:has-text("Valid from") + input');
  }
  get validToTimePicker() {
    return this.page.locator('label:has-text("Valid to") + input');
  }
  get excludePublicHolidayCheckbox() {
    return this.page.locator('div[class="v-input__slot"]:has-text("Exclude public holiday") input');
  }
  get excludeSchoolHolidayCheckbox() {
    return this.page.locator('div[class="v-input__slot"]:has-text("Exclude school holiday") input');
  }
  get saveBtn() {
    return this.page.locator('span:has-text("Save")');
  }

  // ----- Guards -----
  async expectLoaded() {
    await Promise.all([
      expect(this.newFreeTravelConfigBtn).toBeVisible(),
    ]);
  }

  // ----- Actions -----
  async createFreeTravelConfig(
    configurationName: string,
    duration: number = 40,
    freeSessions: number = 1,
    holidayType: 'public' | 'school'
  ) {
    await this.newFreeTravelConfigBtn.click();
    await this.configNameTextbox.fill(configurationName);
    await this.durationTextbox.fill(duration.toString());
    await this.freeSessionsTextbox.fill(freeSessions.toString());
    await this.validFromTimePicker.pressSequentially("0100A", { delay: 100 });
    await this.validToTimePicker.pressSequentially("1200P", { delay: 100 });
    const Checkbox =
      holidayType === 'public'
        ? this.excludePublicHolidayCheckbox
        : this.excludeSchoolHolidayCheckbox;

    if (!(await Checkbox.isChecked())) {
      await Checkbox.check();
    }
    await this.saveBtn.click();
  }
}