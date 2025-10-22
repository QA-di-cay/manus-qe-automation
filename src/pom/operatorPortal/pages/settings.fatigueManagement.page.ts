import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from '@opePortalBasePage';
import { GenericElement } from '@opePortalGeneEl';
const testDataPath = "src/testData";

export class FatigueManagementPage extends BasePage {
  readonly element: GenericElement;
  constructor(page: Page) {
    super(page, 'fatigueManagementPage');
    this.element = new GenericElement(page);
  }

  //#region ====== LOCATORS ===================
  private uploadFilePopup(title: string): Locator {
    return this.page.locator(
      `xpath=//*[text()='${title}']/ancestor::div[contains(@class,'fancybox-opened')]`
    );
  }
  private get importRulesBtn(): Locator {
    return this.page.locator("xpath=//*[contains(text(), 'Import Rules')]");
  }
  private get uploadRulesBtn(): Locator {
    return this.uploadFilePopup('Select a Rule Json').locator(
      "xpath=//*[@class='custom-upload-button']"
    );
  }
  private get confirmImportRulesBtn(): Locator {
    return this.uploadFilePopup('Select a Rule Json').locator("xpath=//input[@value='Import']");
  }

  private get importTestBtn(): Locator {
    return this.page.locator("xpath=//*[contains(text(), 'Import Test')]");
  }
  private get uploadTestBtn(): Locator {
    return this.uploadFilePopup('Select a Test Json').locator(
      "xpath=//*[@class='custom-upload-button']"
    );
  }
  private get confirmImportTestBtn(): Locator {
    return this.uploadFilePopup('Select a Test Json').locator("xpath=//input[@value='Import']");
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.importRulesBtn).toBeVisible(),
      expect(this.importTestBtn).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  async importFile({
    fileType,
    importType,
  }: {
    fileType: 'valid' | 'invalid',
    importType: 'rules' | 'test'
  }): Promise<void> {

    if (importType === 'rules') {
      const fileName = fileType === 'valid'
        ? 'settings.validImportRules.json'
        : 'settings.invalidImportRules.json';
      const filePath = `${testDataPath}/${fileName}`;

      await this.importRulesBtn.click();
      await this.uploadFilePopup('Select a Rule Json').waitFor({ state: 'visible', timeout: 5000 });

      const [fileChooser] = await Promise.all([
        this.page.waitForEvent('filechooser'),
        this.uploadRulesBtn.click(),
      ]);
      await fileChooser.setFiles(filePath);

      await this.confirmImportRulesBtn.click();
      return;
    }

    const fileName = fileType === 'valid'
      ? 'settings.validImportTest.json'
      : 'settings.invalidImportTest.json';
    const filePath = `${testDataPath}/${fileName}`;

    await this.importTestBtn.click();
    await this.uploadFilePopup('Select a Test Json').waitFor({ state: 'visible', timeout: 5000 });

    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadTestBtn.click(),
    ]);
    await fileChooser.setFiles(filePath);

    await this.confirmImportTestBtn.click();
  }
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async assertImportFile({
    fileType,
    importType,
  }: {
    fileType: 'valid' | 'invalid',
    importType: 'rules' | 'test'
  }): Promise<void> {

    const expectedOk = importType === 'rules'
      ? (fileType === 'valid'
          ? 'Rules is imported successfully.'
          : 'There was an error when importing rules.')
      : (fileType === 'valid'
          ? 'Test is imported successfully.'
          : 'There was an error when importing test.');

    await new Promise<void>((resolve) => {
      this.page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe(expectedOk);
        await dialog.accept();
        resolve();
      });
    });

    const title = importType === 'rules' ? 'Select a Rule Json' : 'Select a Test Json';
    await this.uploadFilePopup(title).waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  }
  //#endregion ================================
}
