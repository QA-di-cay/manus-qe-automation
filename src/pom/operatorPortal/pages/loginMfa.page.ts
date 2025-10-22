import { Page, Locator } from '@playwright/test';
import { GenericElement } from '@opePortalGeneEl';

export class LoginMfaPage {
  constructor(public readonly page: Page) {
    this.element = new GenericElement(page);
  }

  public readonly element: GenericElement;

  public get emailInput(): Locator {
    return this.element.inputByName('email');
  }

  public get passwordInput(): Locator {
    return this.element.inputByName('password');
  }

  public get loginButton(): Locator {
    return this.element.buttonByText('Login');
  }

  public get mfaCodeInput(): Locator {
    return this.element.inputByName('mfaCode');
  }

  public get verifyButton(): Locator {
    return this.element.buttonByText('Verify');
  }
}
