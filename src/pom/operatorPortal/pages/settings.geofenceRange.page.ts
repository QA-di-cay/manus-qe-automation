
import { Locator, Page } from '@playwright/test';
import { GenericElement } from '@opePortalGeneEl';

export class SettingsGeofenceRangePage {
  readonly page: Page;
  readonly element: GenericElement;
  readonly geofenceRangeInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.element = new GenericElement(page);
    this.geofenceRangeInput = this.element.inputByName('geofenceRange');
    this.saveButton = this.element.buttonByText('Save');
    this.cancelButton = this.element.buttonByText('Cancel');
    this.successMessage = this.element.divByText('Geofence range updated successfully');
  }

  async setGeofenceRange(range: string) {
    await this.geofenceRangeInput.fill(range);
  }

  async saveChanges() {
    await this.saveButton.click();
  }

  async cancelChanges() {
    await this.cancelButton.click();
  }

  async getSuccessMessage() {
    return this.successMessage.textContent();
  }
}
