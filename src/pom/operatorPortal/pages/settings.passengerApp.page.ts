import { Page, Locator } from '@playwright/test';
import { GenericElement } from '@opePortalGeneEl';

export class SettingsPassengerAppPage {
  readonly element: GenericElement;
  constructor(public readonly page: Page) {
    this.element = new GenericElement(page);
  }

  // Example locators to be replaced
  get someButton(): Locator {
    return this.element.buttonByText("Some Button");
  }

  get someInput(): Locator {
    return this.element.inputByName("someInputName");
  }

  get anotherInput(): Locator {
    return this.element.inputByPlaceholder("Another Placeholder");
  }

  get labelInput(): Locator {
    return this.element.inputByLabel("Label Text");
  }

  get complexXPathElement(): Locator {
    return this.element.elementByXPath("//div[@id=\"complex\"]/span[contains(.,\"text\")]");
  }

  get fileUploadInput(): Locator {
    return this.element.fileInputByLabel("File Upload"); // Assuming a label 'File Upload' for this input
  }

  get alertContentDiv(): Locator {
    return this.element.alertContent;
  }

  get searchInput(): Locator {
    return this.element.searchInput;
  }

  get tableCellLocator(): Locator {
    return this.element.tableCell(1, 1);
  }

  get tableRowByTextLocator(): Locator {
    return this.element.tableRowByText("Row Text");
  }

  get linkByTextLocator(): Locator {
    return this.element.linkByText("Link Text");
  }

  get divByTextLocator(): Locator {
    return this.element.divByText("Div Text");
  }

  get spanByTextLocator(): Locator {
    return this.element.spanByText("Span Text");
  }

  get buttonBySpanTextLocator(): Locator {
    return this.element.buttonBySpanText("Button Span Text");
  }

  get dropdownByLabelLocator(): Locator {
    return this.element.dropdownByLabel("Dropdown Label");
  }

  get dropdownOptionLocator(): Locator {
    return this.element.dropdownOption("Option Text");
  }

  get dropdownOptionByClassLocator(): Locator {
    return this.element.dropdownOptionByClass("Class Option Text");
  }
}
