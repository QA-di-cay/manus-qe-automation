import { Locator, Page } from '@playwright/test';

export class NewIntegrationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get integrationNameInput(): Locator {
    return this.page.locator('//label[text()="Integration Name"]/following-sibling::input');
  }

  private get urlInput(): Locator {
    return this.page.locator('//label[text()="URL"]/following-sibling::input');
  }

  private get authorisationTokenInput(): Locator {
    return this.page.locator('//label[text()="Authorisation Token"]/following-sibling::input');
  }

  private get areaCodeInput(): Locator {
    return this.page.locator('//label[text()="Area Code"]/following-sibling::input');
  }

  private get companyCodeInput(): Locator {
    return this.page.locator('//label[text()="Company Code"]/following-sibling::input');
  }

  private get apiVersionInput(): Locator {
    return this.page.locator('//label[text()="API Version"]/following-sibling::input');
  }

  private get appCodeInput(): Locator {
    return this.page.locator('//label[text()="App Code"]/following-sibling::input');
  }

  private get tassInput(): Locator {
    return this.page.locator('//label[text()="TASS"]/following-sibling::input');
  }

  private get smartcardFieldInput(): Locator {
    return this.page.locator('//label[text()="Smartcard Field"]/following-sibling::input');
  }

  private get studentStatusesInput(): Locator {
    return this.page.locator('//label[text()="Student Statuses"]/following-sibling::input');
  }

  private get lastRunAtInput(): Locator {
    return this.page.locator('//label[text()="Last Run at"]/following-sibling::input');
  }

  private get typeDropdown(): Locator {
    return this.page.locator('//label[text()="Type"]/following-sibling::input');
  }

  private get closeButton(): Locator {
    return this.page.locator('button:has-text("Close")');
  }

  private get verifyButton(): Locator {
    return this.page.locator('button:has-text("Verify")');
  }

  private get saveButton(): Locator {
    return this.page.locator('button:has-text("Save")');
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

