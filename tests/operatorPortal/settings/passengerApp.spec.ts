import { test } from '@fixtures';
import { CompanyPage, PassengerAppPage } from '@opePortalPages';

const companyName = "Automation Test";

test.describe('Push To Talk Page Tests - @pushToTalk @settings', () => {
    test.beforeEach(async ({ sharedPage }) => {
        const adminCompanyPage = new CompanyPage(sharedPage);
        await adminCompanyPage.navTo();

        const gpsTrackingPage = await adminCompanyPage.searchAndAccessCompany(companyName);
        // await gpsTrackingPage.header.accessPassengerAppPage();
    });

    test('[TC-1555] [OP 7.0] - Passenger App: Verify UX', async ({ sharedPage }) => {
        const passengerAppPage = new PassengerAppPage(sharedPage);
        // await passengerAppPage.verifyUx();
    });

    test('[TC-1425] [OP 7.0] - Settings for Passenger App: User CANNOT input text or special characters into [Bus late notification duration (mins)] input box, verify nothing will be input', async ({ sharedPage }) => {
        const passengerAppPage = new PassengerAppPage(sharedPage);
        // await passengerAppPage.verifyInputCharacter('sssssss');
        // await passengerAppPage.verifyInputCharacter('@#$%');
    });

    test('[TC-1424] [OP 7.0] - Settings for Passenger App: User CANNOT input new number smaller than 0 into [Bus late notification duration (mins)] input box, verify a warning message will be show when trying to click [Save]', async ({ sharedPage }) => {
        const passengerAppPage = new PassengerAppPage(sharedPage);
        // await passengerAppPage.verifyInputCharacter('-2');
    });

    test('[TC-1423] [OP 7.0] - Settings for Passenger App: User can input new number into [Bus late notification duration (mins)] input box, verify new change', async ({ sharedPage }) => {
        const passengerAppPage = new PassengerAppPage(sharedPage);
        // await passengerAppPage.verifyInputCharacter('33');
        // await passengerAppPage.verifyChange('');
    });
})
