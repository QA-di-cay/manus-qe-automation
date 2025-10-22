import { test } from '@fixtures';
import { CompanyPage, DriverAppPage } from '@opePortalPages';

const companyName = "Automation Test";

test.describe('Driver App testcase - @driverApp', () => {

  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessDriverAppPage();
  });

  test('[TC-1310] Verify Settings | Driver App | "Allow destination stop same as departing stop" - UNCHECKED', async ({ sharedPage }) => {
    const driverAppPage = new DriverAppPage(sharedPage);
    await driverAppPage.assertCheckboxState({
      element: "Allow destination",
      expected: "unchecked"
    });
  });

  test('[TC-1311] Verify Settings | Driver App | "Allow multiple destination stops per transaction" - UNCHECKED', async ({ sharedPage }) => {
    const driverAppPage = new DriverAppPage(sharedPage);
    await driverAppPage.assertCheckboxState({
      element: "Allow multiple",
      expected: "unchecked"
    });
  });

  test('[TC-1623] Driver App - Verify UI', async ({ sharedPage }) => {
    const driverAppPage = new DriverAppPage(sharedPage);
    await driverAppPage.assertUi();
  });

  test('[TC-1532] [OP 7.0] - Option List Validation', async ({ sharedPage }) => {
    const driverAppPage = new DriverAppPage(sharedPage);
    await driverAppPage.assertOptList();
  });

  test('[TC-1087] [OP 7.0] - Verify Settings | Driver App | "Skip stop without student" UNCHECKED', async ({ sharedPage }) => {
    const driverAppPage = new DriverAppPage(sharedPage);
    await driverAppPage.assertCheckboxState({
      element: "Skip stop without",
      expected: "unchecked"
    });
  });

})