import { test } from '@fixtures';
import { CompanyPage, FatigueManagementPage } from '@opePortalPages';

const companyName = "Automation Test";

test.describe('Fatigue Management testcase - @fatigueManagement @settings', () => {

  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessFatigueManagementPage();
  });

  test('[TC-1431] [OP 7.0] - Fatigue Management: Verify when User try to upload invalid [Import Rules] into Operator Portal, the system will reject an show an error', async ({ sharedPage }) => {
    const fatigueManagementPage = new FatigueManagementPage(sharedPage);
    await fatigueManagementPage.importFile({
      fileType: 'invalid',
      importType: 'rules'
    });
    await fatigueManagementPage.assertImportFile({
      fileType: 'invalid',
      importType: 'rules'
    });
  });

  test('[TC-1430] [OP 7.0] - Fatigue Management: User can click on [Import Rules] to upload a [Valid Rule Json] into Operator Portal, verify the new change', async ({ sharedPage }) => {
    const fatigueManagementPage = new FatigueManagementPage(sharedPage);
    await fatigueManagementPage.importFile({
      fileType: 'valid',
      importType: 'rules'
    });
    await fatigueManagementPage.assertImportFile({
      fileType: 'valid',
      importType: 'rules'
    });
  });
})