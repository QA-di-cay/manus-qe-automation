import { Locator, Page } from '@playwright/test';

export class NewIntegrationPage {
  readonly page: Page;
  readonly integrationNameInput: Locator;
  readonly urlInput: Locator;
  readonly authorisationTokenInput: Locator;
  readonly areaCodeInput: Locator;
  readonly companyCodeInput: Locator;
  readonly apiVersionInput: Locator;
  readonly appCodeInput: Locator;
  readonly tassInput: Locator;
  readonly smartcardFieldInput: Locator;
  readonly studentStatusesInput: Locator;
  readonly lastRunAtInput: Locator;
  readonly typeDropdown: Locator;
  readonly closeButton: Locator;
  readonly verifyButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.integrationNameInput = page.locator('//label[text()="Integration Name"]/following-sibling::input');
    this.urlInput = page.locator('//label[text()="URL"]/following-sibling::input');
    this.authorisationTokenInput = page.locator('//label[text()="Authorisation Token"]/following-sibling::input');
    this.areaCodeInput = page.locator('//label[text()="Area Code"]/following-sibling::input');
    this.companyCodeInput = page.locator('//label[text()="Company Code"]/following-sibling::input');
    this.apiVersionInput = page.locator('//label[text()="API Version"]/following-sibling::input');
    this.appCodeInput = page.locator('//label[text()="App Code"]/following-sibling::input');
    this.tassInput = page.locator('//label[text()="TASS"]/following-sibling::input');
    this.smartcardFieldInput = page.locator('//label[text()="Smartcard Field"]/following-sibling::input');
    this.studentStatusesInput = page.locator('//label[text()="Student Statuses"]/following-sibling::input');
    this.lastRunAtInput = page.locator('//label[text()="Last Run at"]/following-sibling::input');
    this.typeDropdown = page.locator('//label[text()="Type"]/following-sibling::input');
    this.closeButton = page.locator('button:has-text("Close")');
    this.verifyButton = page.locator('button:has-text("Verify")');
    this.saveButton = page.locator('button:has-text("Save")');
  }

  async fillIntegrationDetails(integrationName: string, url: string, authToken: string, type: string) {
    await this.integrationNameInput.fill(integrationName);
    await this.urlInput.fill(url);
    await this.authorisationTokenInput.fill(authToken);
    await this.typeDropdown.click();
    await this.page.locator(`text=${type}`).click(); // Assuming type is a visible option after clicking the dropdown
  }

  async saveIntegration() {
    await this.saveButton.click();
  }

  async verifyIntegration() {
    await this.verifyButton.click();
  }

  async closeForm() {
    await this.closeButton.click();
  }
}

