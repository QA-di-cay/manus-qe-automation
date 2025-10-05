import { test } from '@fixtures';
import { CompanyPage, DriverAppPage } from '@opePortalPages';

const companyName = "Automation Test";

test.describe('Data Integration testcase - @driverApp', () => {

  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessDriverAppPage();
  });

  test('[TC-1649] [OP 7.0] Verify user can add new [Data Integrations] in Settings', async ({ sharedPage }) => {
    const driverAppPage = new DriverAppPage(sharedPage);
    await driverAppPage.assertCheckboxState(driverAppPage.allowDestiCheckbox, "unchecked");
  });

})