import { Page, Locator } from "@playwright/test";
import { GenericElement } from '@opePortalGeneEl';

export class SettingsOfflineDataPage {
  readonly element: GenericElement;

  constructor(private page: Page) {
    this.element = new GenericElement(page);
  }

  // Example locators to be updated
  readonly saveButton: Locator = this.element.buttonByText("Save");
  readonly cancelButton: Locator = this.element.buttonBySpanText("Cancel");
  readonly nameInput: Locator = this.element.inputByName("offlineDataName");
  readonly descriptionInput: Locator = this.element.inputByPlaceholder("Enter description");
  readonly statusDropdown: Locator = this.element.dropdownByLabel("Status");
  readonly optionActive: Locator = this.element.dropdownOption("Active");
  readonly firstTableCell: Locator = this.element.tableCell(1, 1);
  readonly linkDetails: Locator = this.element.linkByText("Details");
  readonly divMessage: Locator = this.element.divByText("Success Message");
  readonly spanError: Locator = this.element.spanByText("Error Message");
  readonly complexXPathElement: Locator = this.element.elementByXPath('//div[@id="someId"]/span[contains(text(), "Complex")]');
}
