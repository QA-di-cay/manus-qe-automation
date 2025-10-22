import { Page } from '@playwright/test';
import { BasePage } from '../../base.page';
import { GenericElement } from '../../elements/generic.element';
import { Routes } from '../../../config/routes';

export class SettingsGeneralInfoPage extends BasePage {
  readonly someElement: GenericElement;

  constructor(page: Page) {
    super(page, 'generalInfoPage');
    this.someElement = new GenericElement(page, '#someElementId');
  }

  async someMethod() {
    // Existing functionality
  }
}
