import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';

export class GeofenceRangePage extends BasePage {
  constructor(page: Page) {
    super(page, 'geofenceRangePage');
  };

  //#region ====== LOCATORS ===================
  private iptField(
    iptFieldText: 
      'Geofence range for changing stop (meter)' |
      'Geofence range for alerting message (meter)'
    ): Locator {
    return this.page.locator(`//label[contains(text(),'${iptFieldText}')]/following-sibling::input`);
  };
//label[contains(text(),'Geofence range for changing stop (meter)')]/following-sibling::input/ancestor::div[contains(@class,'row')]//div[@role='alert']//div[contains(text(),'is required')]
  private get saveBtn(): Locator {
    return this.page.locator("//span[contains(text(),'Save')]//parent::button");
  };

  private alert(inputField: Locator, alertTxt: string): Locator {
    return inputField.locator(`/ancestor::div[contains(@class,'row')]//div[@role='alert']//div[contains(text(),'${alertTxt}')]`);
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.iptField('Geofence range for changing stop (meter)')).toBeVisible(),
      expect(this.iptField('Geofence range for alerting message (meter)')).toBeVisible(),
      expect(this.saveBtn).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== ACTIONS ====================
  private async clickOutside(element: Locator, p = this.page): Promise<void>  {
    const box = await element.boundingBox();
    if (!box) return;
    await p.mouse.click(box.x, box.y + 5);
  }

  async clickSaveBtn(): Promise<void>  {
    await this.saveBtn.click();
  }


  async fillEmptyValue(
    iptFieldText: 
      'Geofence range for changing stop (meter)' |
      'Geofence range for alerting message (meter)'
  ): Promise<void> {
    const inputField = this.iptField(iptFieldText);
    inputField.fill('');
    await this.clickOutside(inputField);
  }

  async fillValue(
    iptFieldText: 
      'Geofence range for changing stop (meter)' |
      'Geofence range for alerting message (meter)',
    value: string
  ): Promise<void> {
    const inputField = this.iptField(iptFieldText);
    inputField.fill(value);
    await this.clickOutside(inputField);
  }
  //#endregion ================================

  //#region ====== ASSERTS ====================
  async assertRequiredIpt(
    iptFieldText: 
      'Geofence range for changing stop (meter)' |
      'Geofence range for alerting message (meter)'
  ): Promise<void> {
    const alert = this.alert(this.iptField(iptFieldText),'is required');
    await alert.waitFor({ state: 'visible' });
    await expect(alert).toBeVisible();
  }
  async assertIptLessThan0(
    iptFieldText: 
      'Geofence range for changing stop (meter)' |
      'Geofence range for alerting message (meter)'
  ): Promise<void> {
    const alert = this.alert(this.iptField(iptFieldText), 'cannot be less than 0');
    await alert.waitFor({ state: 'visible' });
    await expect(alert).toBeVisible();
  }
  //#endregion ================================
}