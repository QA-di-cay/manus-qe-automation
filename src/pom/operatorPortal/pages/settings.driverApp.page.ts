import { Page, Locator } from '@playwright/test';
import { GenericElement } from '@opePortalGeneEl';

export class SettingsDriverAppPage {
  readonly element: GenericElement;
  constructor(public readonly page: Page) {
    this.element = new GenericElement(page);
  }

  // Example locators to be replaced
  public readonly saveButton: Locator = this.element.buttonByText('Save');
  public readonly cancelButton: Locator = this.element.buttonBySpanText('Cancel');
  public readonly nameInput: Locator = this.element.inputByName('driverName');
  public readonly emailInput: Locator = this.element.inputByPlaceholder('Driver Email');
  public readonly statusDropdown: Locator = this.element.dropdownByLabel('Status');
  public readonly activeOption: Locator = this.element.dropdownOption('Active');
  public readonly firstTableCell: Locator = this.element.tableCell(1, 1);
  public readonly driverRow: Locator = this.element.tableRowByText('John Doe');
  public readonly profileLink: Locator = this.element.linkByText('Profile');
  public readonly headerDiv: Locator = this.element.divByText('Settings');
  public readonly versionSpan: Locator = this.element.spanByText('v1.0');
  public readonly fileUploadInput: Locator = this.element.fileInputByLabel('Upload Photo');
  public readonly searchField: Locator = this.element.searchInput;
}
