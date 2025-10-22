import { Page, Locator } from '@playwright/test';

// XPath patterns để dễ maintain và migrate sang framework khác
const XPATH_PATTERNS = {
  // Input elements
  INPUT_BY_NAME: "//input[@name='{}']",
  INPUT_BY_LABEL: "//label[contains(text(),'{}')]/following-sibling::input",
  INPUT_BY_PLACEHOLDER: "//input[@placeholder='{}']",
  
  // Button elements  
  BUTTON_BY_TEXT: "//button[contains(text(),'{}')]",
  BUTTON_BY_SPAN: "//button//span[contains(text(),'{}')]",
  BUTTON_BY_ARIA_LABEL: "//button[@aria-label='{}']",
  
  // Form elements
  FORM_BY_HEADER: "//h2[contains(text(),'{}')]/ancestor::form",
  FORM_BY_TEXT: "//div[contains(text(),'{}')]/ancestor::form",
  
  // Table elements
  TABLE_CELL: "//tbody/tr[{}]/td[{}]",
  TABLE_ROW_BY_TEXT: "//tbody/tr[contains(.,'{}')]",
  TABLE_WRAPPER: "//div[contains(@class,'v-data-table__wrapper')]",
  
  // Dropdown elements
  DROPDOWN_BY_LABEL: "//label[contains(text(),'{}')]/following-sibling::*//input",
  DROPDOWN_OPTION: "//div[@role='option'][contains(text(),'{}')]",
  DROPDOWN_OPTION_BY_CLASS: "//div[contains(@class,'v-list-item__title')][contains(text(),'{}')]",
  
  // Other common elements
  CHECKBOX_BY_LABEL: "//label[contains(text(),'{}')]/preceding-sibling::input[@type='checkbox']",
  LINK_BY_TEXT: "//a[contains(text(),'{}')]",
  DIV_BY_TEXT: "//div[contains(text(),'{}')]",
  SPAN_BY_TEXT: "//span[contains(text(),'{}')]",
  ALERT_CONTENT: "//div[contains(@class,'v-alert__content')]",
  
  // File upload
  FILE_INPUT_BY_LABEL: "//label[contains(text(),'{}')]/following-sibling::input[@type='file']",
  
  // Search and filter
  SEARCH_INPUT: "//input[contains(@placeholder,'Search') or contains(@label,'Search')]",
  
  // Navigation
  SIDEBAR_ITEM: "//div[contains(@class,'v-list-item')][contains(.,'{}')]"
} as const;

export class GenericElement {
  constructor(private readonly page: Page) { }

  // Input Elements
  inputByName = (name: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.INPUT_BY_NAME.replace('{}', name)}`);

  inputByLabel = (label: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.INPUT_BY_LABEL.replace('{}', label)}`);

  inputByPlaceholder = (placeholder: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.INPUT_BY_PLACEHOLDER.replace('{}', placeholder)}`);

  // Button Elements
  buttonByText = (text: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.BUTTON_BY_TEXT.replace('{}', text)}`);

  buttonBySpanText = (text: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.BUTTON_BY_SPAN.replace('{}', text)}`);

  buttonByAriaLabel = (ariaLabel: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.BUTTON_BY_ARIA_LABEL.replace('{}', ariaLabel)}`);

  // Form Elements
  formByHeader = (headerText: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.FORM_BY_HEADER.replace('{}', headerText)}`);

  formByText = (text: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.FORM_BY_TEXT.replace('{}', text)}`);

  // Table Elements
  tableCell = (rowIndex: number, colIndex: number): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.TABLE_CELL.replace('{}', rowIndex.toString()).replace('{}', colIndex.toString())}`);

  tableRowByText = (text: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.TABLE_ROW_BY_TEXT.replace('{}', text)}`);

  get tableWrapper(): Locator {
    return this.page.locator(`xpath=${XPATH_PATTERNS.TABLE_WRAPPER}`);
  }

  // Dropdown Elements
  dropdownByLabel = (label: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.DROPDOWN_BY_LABEL.replace('{}', label)}`);

  dropdownOption = (optionText: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.DROPDOWN_OPTION.replace('{}', optionText)}`);

  dropdownOptionByClass = (optionText: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.DROPDOWN_OPTION_BY_CLASS.replace('{}', optionText)}`);

  // Other Elements
  checkboxByLabel = (label: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.CHECKBOX_BY_LABEL.replace('{}', label)}`);

  linkByText = (text: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.LINK_BY_TEXT.replace('{}', text)}`);

  divByText = (text: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.DIV_BY_TEXT.replace('{}', text)}`);

  spanByText = (text: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.SPAN_BY_TEXT.replace('{}', text)}`);

  get alertContent(): Locator {
    return this.page.locator(`xpath=${XPATH_PATTERNS.ALERT_CONTENT}`);
  }

  // File Upload
  fileInputByLabel = (label: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.FILE_INPUT_BY_LABEL.replace('{}', label)}`);

  // Search
  get searchInput(): Locator {
    return this.page.locator(`xpath=${XPATH_PATTERNS.SEARCH_INPUT}`);
  }

  // Navigation
  sidebarItem = (itemText: string): Locator =>
    this.page.locator(`xpath=${XPATH_PATTERNS.SIDEBAR_ITEM.replace('{}', itemText)}`);

  // Custom XPath
  elementByXPath = (xpath: string): Locator =>
    this.page.locator(`xpath=${xpath}`);

  // Utility methods for common patterns
  elementWithClass = (className: string): Locator =>
    this.page.locator(`xpath=//*[contains(@class,'${className}')]`);

  elementByAttribute = (attribute: string, value: string): Locator =>
    this.page.locator(`xpath=//*[@${attribute}='${value}']`);

  // Form input helpers
  formInputByLabel = (formHeader: string, inputLabel: string): Locator =>
    this.page.locator(`xpath=//h2[contains(text(),'${formHeader}')]/ancestor::form//label[contains(text(),'${inputLabel}')]/following-sibling::input`);

  formButtonByText = (formHeader: string, buttonText: string): Locator =>
    this.page.locator(`xpath=//h2[contains(text(),'${formHeader}')]/ancestor::form//button[contains(text(),'${buttonText}')]`);
}
