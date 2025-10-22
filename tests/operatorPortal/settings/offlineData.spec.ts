import { test } from '@fixtures';
import { CompanyPage, OfflineDataPage } from '@opePortalPages';

const companyName = "Automation Test";

test.describe('Push To Talk Page Tests - @pushToTalk @settings', () => {
    test.beforeEach(async ({ sharedPage }) => {
        const adminCompanyPage = new CompanyPage(sharedPage);
        await adminCompanyPage.navTo();

        const gpsTrackingPage = await adminCompanyPage.searchAndAccessCompany(companyName);
        await gpsTrackingPage.header.accessOfflineDataPage();
    });

    test('[TC-1426] [OP 7.0] - Offline Data: Verify when user click on [Update Offline Data], the upload data will now be reflect in [Driver App Offline Mode]', async ({ sharedPage }) => {
        const offlineDataPage = new OfflineDataPage(sharedPage);
        await offlineDataPage.verifyUploadData();
    });
})
