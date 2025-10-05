import { test } from '@fixtures';
import { CompanyPage, PushToTalkPage } from '@opePortalPages';

const companyName = "Automation Test";
const username = "Test admin username";
const password = "Test admin password";

test.describe('Push To Talk Page Tests - @pushToTalk @settings', () => {
    test.beforeEach(async ({ sharedPage }) => {
        const adminCompanyPage = new CompanyPage(sharedPage);
        await adminCompanyPage.navTo();

        const gpsTrackingPage = await adminCompanyPage.searchAndAccessCompany(companyName);
        await gpsTrackingPage.header.accessPushToTalkPage();
    });

    test('[TC-1192] Push to talk Page - When there are value inside input box of [Admin Username] + [Admin Password], the default text tip will not be display', async ({ sharedPage }) => {
        const pushToTalkPage = new PushToTalkPage(sharedPage);
        await pushToTalkPage.expectLoaded();
        
        await pushToTalkPage.verifyCredentialFieldsVisible();
        await pushToTalkPage.fillAdminCredentials(username, password);
        await pushToTalkPage.verifyTextTipsNotVisible();
    });

    test('[TC-1193] Push to talk Page - When there are NO value inside input box of [Admin Username] + [Admin Password], the default text tip will be display', async ({ sharedPage }) => {
        const pushToTalkPage = new PushToTalkPage(sharedPage);
        await pushToTalkPage.expectLoaded();
        
        await pushToTalkPage.verifyCredentialFieldsVisible();
        await pushToTalkPage.clearAdminCredentials();
        await pushToTalkPage.clickHeader();
        await pushToTalkPage.verifyTextTipsVisible();
    });
})
