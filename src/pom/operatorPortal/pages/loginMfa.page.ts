import { Page } from "@playwright/test";
import { GenericElement } from "../../elements/genericElement";

class LoginMfaPage {
  private element: GenericElement;

  constructor(page: Page) {

    this.element = new GenericElement(page);
  }

  async someMethod() {
    // Some existing functionality
  }
}

export default LoginMfaPage;
