import { Page } from '@playwright/test';
import { GenericElement } from '@opePortalGeneEl';

export class BasePage {
  protected readonly page: Page;
  public readonly element: GenericElement;

  constructor(page: Page) {
    this.page = page;
    this.element = new GenericElement(page);
  }

  // Example locators to be replaced
  async getButtonByText(text: string) {
    return this.element.buttonByText(text);
  }

  async getInputByName(name: string) {
    return this.element.inputByName(name);
  }

  async getDivByText(text: string) {
    return this.element.divByText(text);
  }
}
