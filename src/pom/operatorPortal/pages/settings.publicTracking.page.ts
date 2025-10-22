import { Page, Locator } from '@playwright/test';
import { GenericElement } from '@opePortalGeneEl';

export class PublicTrackingSettingsPage {
  readonly element: GenericElement;
  constructor(public page: Page) {
    this.element = new GenericElement(page);
  }

  publicTrackingToggle = this.element.buttonByText("Public Tracking");
  saveButton = this.element.buttonByText("Save");
  cancelButton = this.element.buttonByText("Cancel");
  inputFieldName = this.element.inputByName("fieldName");
  inputFieldPlaceholder = this.element.inputByPlaceholder("Placeholder Text");
  inputFieldLabel = this.element.inputByLabel("Label Text");
  dropdownFieldLabel = this.element.dropdownByLabel("Dropdown Label");
  dropdownOptionText = this.element.dropdownOption("Option 1");
  dropdownOptionClass = this.element.dropdownOptionByClass("Option 2");
  tableCellLocator = this.element.tableCell(1, 1);
  tableRowByTextLocator = this.element.tableRowByText("Row Text");
  linkByTextLocator = this.element.linkByText("Link Text");
  divByTextLocator = this.element.divByText("Div Text");
  spanByTextLocator = this.element.spanByText("Span Text");
  complexXPathLocator = this.element.elementByXPath("//div[@id=\"complex\"]/span[contains(.,\"XPath\")]");
  fileInputLocator = this.element.fileInputByLabel("Upload File");
  alertContentLocator = this.element.alertContent;
  searchInputLocator = this.element.searchInput;
}
