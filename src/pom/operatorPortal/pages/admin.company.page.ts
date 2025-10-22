import { Page, Locator } from '@playwright/test';
import { GenericElement } from '@opePortalGeneEl';

export class AdminCompanyPage {
  readonly element: GenericElement;

  constructor(public page: Page) {
    this.element = new GenericElement(page);
  }

  // Example locators to be replaced
  readonly createCompanyButton: Locator =this.element.buttonByText('Create Company')
  readonly companyNameInput: Locator =this.element.inputByName('companyName')
  readonly searchInput: Locator =this.element.searchInput
  readonly firstTableCell: Locator = this.element.tableCell(1, 1);
  readonly companyDetailsLink: Locator =this.element.linkByText('Company Details')
  readonly statusDiv: Locator =this.element.divByText('Active')
  readonly saveButton: Locator =this.element.buttonBySpanText('Save')
  readonly alertMessage: Locator =this.element.alertContent
  readonly fileUploadInput: Locator = this.element.fileInputByLabel('');
}
