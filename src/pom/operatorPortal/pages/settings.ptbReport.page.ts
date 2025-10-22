import { Page } from '@playwright/test';
import { GenericElement } from '@opePortalGeneEl';

export class PTBReportPage {
  readonly element: GenericElement;
  constructor(public page: Page) {
    this.element = new GenericElement(page);
  }

  async someMethod() {
    await this.element.buttonByText('Save').click();
    await this.element.inputByName('reportName').fill('My Report');
    await this.element.inputByPlaceholder('Search...').fill('query');
    await this.element.inputByLabel('Start Date').click();
    await this.element.dropdownByLabel('Report Type').click();
    await this.element.dropdownOption('Daily').click();
    await this.element.dropdownOptionByClass('Monthly').click();
    await this.element.tableCell(1, 1).textContent();
    await this.element.tableRowByText('Report A').click();
    await this.element.linkByText('Download').click();
    await this.element.divByText('Report Generated').isVisible();
    await this.element.spanByText('Success').isVisible();
    await this.element.buttonBySpanText('Cancel').click();
    await this.element.fileInputByLabel('file').setInputFiles('path/to/file.pdf');
    await this.element.alertContent.textContent();
    await this.element.searchInput.fill('search term');
    await this.element.elementByXPath('//xpath/to/complex/element').click();
  }
}
