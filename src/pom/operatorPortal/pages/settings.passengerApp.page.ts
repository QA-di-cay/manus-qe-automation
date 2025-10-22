import { Page } from '@playwright/test';
import { GenericElement } from '../../elements/genericElement';

class SettingsPassengerAppPage {
  private element: GenericElement;

  constructor(page: Page) {
    this.element = new GenericElement(page);
  }

  // Existing functionality and methods would go here
}

export default SettingsPassengerAppPage;
