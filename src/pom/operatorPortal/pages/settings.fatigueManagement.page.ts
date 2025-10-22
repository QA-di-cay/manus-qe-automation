import { Page } from '@playwright/test';
import { GenericElement } from '@opePortalGeneEl';

export class FatigueManagementPage {
  readonly element: GenericElement;
  constructor(public page: Page) {
    this.element = new GenericElement(page);
  }

  // Dummy locators to be replaced
  get saveButton() { return this.element.buttonByText('Save'); }
  get cancelButton() { return this.element.buttonBySpanText('Cancel'); }
  get nameInput() { return this.element.inputByName('fatigueName'); }
  get descriptionPlaceholder() { return this.element.inputByPlaceholder('Enter Description'); }
  get statusInput() { return this.element.inputByLabel('Status'); }
  get typeDropdown() { return this.element.dropdownByLabel('Type'); }
  get optionOne() { return this.element.dropdownOption('Option 1'); }
  get optionTwoClass() { return this.element.dropdownOptionByClass('Option 2'); }
  get firstTableCell() { return this.element.tableCell(1, 1); }
  get rowWithText() { return this.element.tableRowByText('Some Text'); }
  get viewLink() { return this.element.linkByText('View Details'); }
  get titleDiv() { return this.element.divByText('Page Title'); }
  get messageSpan() { return this.element.spanByText('Success Message'); }
  get complexElement() { return this.element.elementByXPath('//div[@id="complex"]/span'); }
  get fileUploadInput() { return this.element.fileInputByLabel('Upload File'); }
  get alertContentDiv() { return this.element.alertContent; }
  get searchInput() { return this.element.searchInput; }
}
