// import { expect, Page, Locator } from '@playwright/test';
// import * as accessTo from '@opePortalPages';
// import { makeNameRegex } from '@utils';


// export const sidebarItems = [
//   'General Information',
//   'Geofence Range',
//   'Driver App',
//   'Passenger App',
//   'Offline Data',
//   'Route',
//   'PTB Report',
//   'Fatigue Management',
//   'Stationary Time',
//   'Public Tracking',
//   'Push To Talk',
//   'Ticket Sell Mode',
//   'Multifactor Authentication (MFA)',
//   'Holiday',
// ] as const;
// export type SidebarItem = typeof sidebarItems[number];

// export class SidebarSettings {
//   constructor(private readonly page: Page) {}

//   //#region ====== LOCATORS ===================
//   private get sidebar(): Locator {
//     return this.page.locator('xpath=//div[@class="right_nav_table"]');
//   }

//   private subMenuItem(subMenuText: SidebarItem): Locator {
//     const re = makeNameRegex(subMenuText);
//     return this.sidebar.locator('div', { hasText: re });
//   }
//   //#endregion ================================


//   //#region ====== GUARDS =====================
//   async expectLoaded(): Promise<void> {
//     await expect(this.sidebar).toBeVisible();
//   }
//   //#endregion ================================


//   //#region ====== ACTIONS ====================
//   async accessHolidayPage(): Promise<void> {
//     return this.clickSubMenu('Holiday', accessTo.HolidayPage);
//   }
//   //#endregion ================================
// }
