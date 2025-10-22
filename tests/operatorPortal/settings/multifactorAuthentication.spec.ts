import { test } from '@fixtures';
import { CompanyPage, PassengerAppPage } from '@opePortalPages';

const companyName = "Automation Test";

test.describe('Push To Talk Page Tests - @pushToTalk @settings', () => {
    test.beforeEach(async ({ sharedPage }) => {
        const adminCompanyPage = new CompanyPage(sharedPage);
        await adminCompanyPage.navTo();

        const gpsTrackingPage = await adminCompanyPage.searchAndAccessCompany(companyName);
        await gpsTrackingPage.header.accessPushToTalkPage();
    });

    test('[TC-1443] [OP 7.0] - Multifactor Authentication: User CANNOT input text or special characters into [Number of remember days], verify nothing will be input', async ({ sharedPage }) => {
        const passengerAppPage = new PassengerAppPage(sharedPage);

    });

    test('[TC-1442] [OP 7.0] - Multifactor Authentication: User CANNOT input number smaller than 0 into [Number of remember days], verify when user click [Save], a warning message will be show', async ({ sharedPage }) => {
        const passengerAppPage = new PassengerAppPage(sharedPage);

    });

    test('[TC-1441] [OP 7.0] - Multifactor Authentication: User can input number into [Number of remember days], verify the new change', async ({ sharedPage }) => {
        const passengerAppPage = new PassengerAppPage(sharedPage);

    });

    test('[TC-1440] [OP 7.0] - Multifactor Authentication: Verify user can [Disable] [Two-factor authentication] by toggle the option, verify the new change', async ({ sharedPage }) => {
        const passengerAppPage = new PassengerAppPage(sharedPage);

    });

    test('[TC-1439] [OP 7.0] - Multifactor Authentication: Verify user can [Enable] [Two-factor authentication] by toggle the option, verify the new change', async ({ sharedPage }) => {
        const passengerAppPage = new PassengerAppPage(sharedPage);

    });
})
