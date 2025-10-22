import { Page } from '@playwright/test';
import { GenericElement } from '../../genericElement';

export class SettingsReferenceDataPage {
  constructor(page: Page) {
    this.element = new GenericElement(page);
  }
}
