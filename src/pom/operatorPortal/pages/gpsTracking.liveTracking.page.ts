import { Page } from '@playwright/test';
import { GenericElement } from '../../genericElement';

class LiveTrackingPage {
  public element: GenericElement;

  constructor(public page: Page) {
    this.element = new GenericElement(page);
  }

  // Other methods would go here
}


export default LiveTrackingPage;