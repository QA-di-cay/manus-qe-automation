import { Page } from '@playwright/test';
import { GenericElement } from '../../elements/genericElement';

class SettingsOfflineDataPage {
  private element: GenericElement;

  constructor(page: Page) {
    this.element = new GenericElement(page);
  }

  // Existing methods would go here
}
