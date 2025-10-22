import { Page } from '@playwright/test';
import { BasePage } from '../../base.page';
import { GenericElement } from '../../../components/generic.element';
import { Routes } from '../../../routes';

export class SettingsHolidayPage extends BasePage {
  readonly holidayTable: GenericElement;

  constructor(page: Page) {
    super(page, 'holidayPage');
    this.holidayTable = new GenericElement(this.page, '.holiday-table');
  }
}
