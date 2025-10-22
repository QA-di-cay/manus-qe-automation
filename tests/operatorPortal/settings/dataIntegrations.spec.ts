import { test } from '@fixtures';
import { CompanyPage, DataIntegrationPage } from '@opePortalPages';

const companyName = "Automation Test";


test.describe('Data Integration testcases - @dataIntegrations @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessDataIntegrationPage();
  });

  test('[TC-1649] [OP 7.0] Verify user can add new [Data Integrations] in Settings', async ({ sharedPage }) => {
    const dataItgPage = new DataIntegrationPage(sharedPage);
    await dataItgPage.createNewIntegration(
      'Sandbox automation test',
      process.env.INTEGRATION_URL!,
      process.env.INTEGRATION_URL!,
      '1',
      '33',
      '3',
      'TRANSPORTM',
      'TASS',
      'ud21_text',
      'current,future',
      ''
    );
  });

  // this test is failed due to visible v-card element
  test('[TC-1324] Data Integrations: Verify that v-card design is no longer visible and all the contents display correctly', async ({ sharedPage }) => {
    const dataItgPage = new DataIntegrationPage(sharedPage);
    await dataItgPage.assertEleWithClassNotVisible('v-card');
  });

  test('[TC-1323] Data Integrations: Verify that on low width monitor, there is a horizontal scrollbar so user can able to see all the contents', async ({ sharedPage }) => {
    const dataItgPage = new DataIntegrationPage(sharedPage);
    await dataItgPage.assertHasHorizontalScrollbar();
  });
});
