import { expect, Page, Locator } from '@playwright/test';
import * as accessTo from '@opePortalPages';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const normalize = (s: string) => s.trim().toLowerCase();
const makeNameRegex = (keyword: string) =>
  new RegExp(`^\\s*${escapeRegExp(keyword)}\\s*$`, 'i');


const subMenuMap: Record<string, string> = {
  // Settings
  'holiday': 'settings',
  'general information': 'settings',
  'push to talk': 'settings',
  'reference data': 'settings',
  'fatigue management': 'settings',
  'ptb report': 'settings',
  'ticket sell mode': 'settings',

  // Smartcards
  'travel configuration': 'smartcards',

  // GPS Tracking
  'live tracking': 'gps tracking',
};

type IconInfo = {
  menuText: string;
  tagName: string;
  className: string;
  width: number;
  height: number;
  color?: string | null;
  fill?: string | null;
  viewBox?: string | null;
  pathCount?: number | null;
};

export class Header {
  constructor(private readonly page: Page) { }

  //#region ====== LOCATORS ===================
  private get headerMenu(): Locator {
    return this.page.locator('xpath=//div[@id="top_menu"]//ul[@class="menu"]');
  }

  private menuItem(menuText: string): Locator {
    const re = makeNameRegex(menuText);
    return this.page.locator("xpath=//li[@class='menu-item']/a", { hasText: re });
  }

  private subMenuWrapper(menuText: string): Locator {
    return this.menuItem(menuText).locator("xpath=/following-sibling::*[@class='submenu-wrapper']");
  }

  private subMenuItem(subMenuText: string): Locator {
    const menuText = this.getMenuText(subMenuText);
    const re = makeNameRegex(subMenuText);
    return this.subMenuWrapper(menuText).locator('a', { hasText: re });
  }

  private subMenuItems(parentMenuText: string): Locator {
    return this.subMenuWrapper(parentMenuText).locator('a');
  }

  private iconSubMenus(anchor: Locator): Locator {
    return anchor.locator('svg, i, img').first();
  }
  //#endregion ================================

  //#region ====== INTERNAL HELPERS ===========
  private async hoverMenu(menuText: string): Promise<void> {
    await this.expectLoaded();
    await this.menuItem(menuText).hover();
    await this.subMenuWrapper(menuText).waitFor({ state: 'visible', timeout: 1500 }),
      await expect(this.subMenuWrapper(menuText)).toBeVisible();
  }

  private getMenuText(subMenuText: string): string {
    const key = normalize(subMenuText);
    const parent = subMenuMap[key];
    if (!parent) {
      throw new Error(
        `No mapping for submenu "${subMenuText}". ` +
        `Add mapping to header.component.ts`
      );
    }
    return parent;
  }

  private async getSettingsItemsWithIcons(parentMenuText: string): Promise<IconInfo[]> {
    await this.hoverMenu(parentMenuText);

    const items = this.subMenuItems(parentMenuText);
    const count = await items.count();
    const results: IconInfo[] = [];

    for (let i = 0; i < count; i++) {
      const anchor = items.nth(i);
      const menuText = ((await anchor.innerText()) || '').trim();

      const iconEl = this.iconSubMenus(anchor);
      await expect(iconEl, `Icon must exist for "${menuText}"`).toBeVisible();

      const data = await iconEl.evaluate((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        const styles = window.getComputedStyle(el as HTMLElement);

        let viewBox: string | null = null;
        let pathCount: number | null = null;

        if (el instanceof SVGElement) {
          const svg = el as SVGSVGElement;
          viewBox = svg.getAttribute('viewBox');
          pathCount = svg.querySelectorAll('path').length;
        }

        return {
          tagName: el.tagName.toLowerCase(),
          className: (el as HTMLElement).className?.toString?.() ?? '',
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          color: styles.color ?? null,
          fill: styles.fill ?? null,
          viewBox,
          pathCount,
        };
      });

      results.push({
        menuText,
        ...data,
      });
    }

    return results;
  }

  async clickSubMenu<TargetPage extends { expectLoaded: () => Promise<void> }>(
    subMenuText: string,
    pageObject: new (page: Page) => TargetPage
  ): Promise<TargetPage> {
    const menuText = this.getMenuText(subMenuText);
    await this.hoverMenu(menuText);
    await this.subMenuItem(subMenuText).waitFor({ state: 'visible', timeout: 1500 }),
      await expect(this.subMenuItem(subMenuText)).toBeVisible();
    await this.subMenuItem(subMenuText).click();

    const targetPage = new pageObject(this.page);
    await targetPage.expectLoaded();
    return targetPage;
  }
  //#endregion ================================


  //#region ====== GUARDS =====================
  async expectLoaded(): Promise<void> {
    await expect(this.headerMenu).toBeVisible();
  }
  //#endregion ================================


  //#region ====== ACTIONS ====================
  async accessHolidayPage(): Promise<accessTo.HolidayPage> {
    return this.clickSubMenu('Holiday', accessTo.HolidayPage);
  }
  async accessGeneralInfoPage(): Promise<accessTo.GeneralInfoPage> {
    return this.clickSubMenu('General Information', accessTo.GeneralInfoPage);
  }
  async accessPushToTalkPage(): Promise<accessTo.PushToTalkPage> {
    return this.clickSubMenu('Push To Talk', accessTo.PushToTalkPage);
  }
  async accessReferenceDataPage(): Promise<accessTo.ReferenceDataPage> {
    return this.clickSubMenu('Reference Data', accessTo.ReferenceDataPage);
  }
  async accessTravelConfiguration(): Promise<accessTo.TravelConfigPage> {
    return this.clickSubMenu('Travel Configuration', accessTo.TravelConfigPage);
  }
  async accessPtbReportPage(): Promise<accessTo.PtbReportPage> {
    return this.clickSubMenu('PTB Report', accessTo.PtbReportPage);
  }
  async accessTicketSellModePage(): Promise<accessTo.TicketSellModePage> {
    return this.clickSubMenu('Ticket Sell Mode', accessTo.TicketSellModePage);
  }
  async accessDriverAppPage(): Promise<accessTo.DriverAppPage> {
    return this.clickSubMenu('Ticket Sell Mode', accessTo.DriverAppPage);
  }
  //#endregion ================================

  //#region ====== ASSERTS =====================
  async assertSubMenuIcons(
    parentMenuText: string,
    expectedSpecs: Record<string, { color: string; width: number; height: number }>
  ): Promise<void> {
    const items: IconInfo[] = await this.getSettingsItemsWithIcons(parentMenuText);

    for (const [subMenuText, spec] of Object.entries(expectedSpecs)) {
      const target = items.find(
        (it: IconInfo) => it.menuText.toLowerCase() === subMenuText.toLowerCase()
      );

      expect(target, `Expected submenu "${subMenuText}" to exist but not found`).toBeTruthy();

      // check if have icon
      expect(target?.tagName, `Expected submenu "${subMenuText}" to have an icon`).toBeTruthy();

      // check collor and fill
      const actualColor =
        target?.color && target.color !== 'rgba(0, 0, 0, 0)' ? target.color : target?.fill;

      expect(
        actualColor,
        `Icon color mismatch for "${subMenuText}": expected ${spec.color}, got ${actualColor}`
      ).toBe(spec.color);

      // check width and height
      expect(target?.width, `Icon width mismatch for "${subMenuText}"`).toBe(spec.width);
      expect(target?.height, `Icon height mismatch for "${subMenuText}"`).toBe(spec.height);
    }
  }
  //#endregion ================================

}
