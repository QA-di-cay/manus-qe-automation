import { Page } from '@playwright/test';
import { GenericElement } from '@opePortalGeneEl';

export class SmartCardsTravelConfigurationPage {
  readonly element: GenericElement;
  constructor(private page: Page) {
    this.element = new GenericElement(page);
  }

  // Existing locators
  async getButtonByText(text: string) {
    return this.element.buttonByText(text);
  }

  async getInputByName(name: string) {
    return this.element.inputByName(name);
  }

  async getPlaceholderInput(placeholder: string) {
    return this.element.inputByPlaceholder(placeholder);
  }

  async getLabelInput(label: string) {
    return this.element.inputByLabel(label);
  }

  async getDropdownInput(label: string) {
    return this.element.dropdownByLabel(label);
  }

  async getDropdownOption(option: string) {
    return this.element.dropdownOption(option);
  }

  async getDropdownOptionByClass(option: string) {
    return this.element.dropdownOptionByClass(option);
  }

  async getTableCell(row: number, col: number) {
    return this.element.tableCell(row, col);
  }

  async getTableRowByText(text: string) {
    return this.element.tableRowByText(text);
  }

  async getLinkByText(text: string) {
    return this.element.linkByText(text);
  }

  async getDivByText(text: string) {
    return this.element.divByText(text);
  }

  async getSpanByText(text: string) {
    return this.element.spanByText(text);
  }

  async getComplexXPathLocator(xpath: string) {
    return this.element.elementByXPath(xpath);
  }

  async getFileInputByLabel(label: string) {
    return this.element.fileInputByLabel(label);
  }

  async getAlertContent() {
    return this.element.alertContent;
  }

  async getSearchInput() {
    return this.element.searchInput;
  }

  async getButtonBySpanText(text: string) {
    return this.element.buttonBySpanText(text);
  }
}
