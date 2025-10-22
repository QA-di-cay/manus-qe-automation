import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Routes } from '../routes';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, 'loginPage');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    // Login logic
  }
}