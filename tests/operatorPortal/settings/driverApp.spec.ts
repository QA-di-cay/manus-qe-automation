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
    await driverAppPage.assertCheckboxState(driverAppPage.allowDestiCheckbox, "unchecked");
  })

  test('[TC-1311] Verify Settings | Driver App | "Allow multiple destination stops per transaction" - UNCHECKED', async ({ sharedPage }) => {
    const driverAppPage = new DriverAppPage(sharedPage);
    await driverAppPage.assertCheckboxState(driverAppPage.allowMultipleCheckbox, "unchecked");
  })
})