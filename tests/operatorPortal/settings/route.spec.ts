import { test } from '@fixtures';
import { CompanyPage, RoutePage } from '@opePortalPages';

const companyName = "Automation Test";

test.describe('Push To Talk Page Tests - @pushToTalk @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const adminCompanyPage = new CompanyPage(sharedPage);
    await adminCompanyPage.navTo();

    const gpsTrackingPage = await adminCompanyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessRoutePagePage();
  });

  // test('[TC-1426] [OP 7.0] - Offline Data: Verify when user click on [Update Offline Data], the upload data will now be reflect in [Driver App Offline Mode]', async ({ sharedPage }) => {
  //   const routePage = new RoutePage(sharedPage);
  //   await routePage = verifyOfflineData();

  // });

  test('[]', async ({ sharedPage }) => {
    const routePage = new RoutePage(sharedPage);

  });
})
