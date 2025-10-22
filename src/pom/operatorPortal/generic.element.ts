import { Page, Locator } from '@playwright/test';

export class GenericElement {
  constructor(private readonly page: Page) { }

  inputField = (text: string): Locator =>
    this.page.locator(`input[name='${text}']`);

  inputBtn = (text: string): Locator =>
    this.page.locator(`input[name='${text}']`);

  divBtn = (text: string): Locator =>
    this.page.locator(`xpath=//*[contains(text(),'${text}')]//ancestor::button`);

  inputBox = (text: string): Locator =>
    this.page.locator(`xpath=//*[contains(text(), '${text}')]/following-sibling::input`);

  checkbox = (text: string): Locator =>
    this.page.locator(`xpath=//*[text()='${text}']//ancestor::*[@class='v-input__slot']//input`);

  searchResult = ({ 
    text,
    colIndex = 1 
  }: { 
    text: string;
    colIndex?: number 
  }): Locator => {
    const xpath = `xpath=(//*[(text()='${text}')])[${colIndex}]`;
    return this.page.locator(xpath);
  };

  get uploadBtn(): Locator {
    return this.page.locator(`xpath=//*[@class='custom-upload-button']//ancestor::label`);
  }





}
