import { test } from '@fixtures';
import { HolidayPage, CompanyPage } from '@opePortalPages';
import { getFutureDate } from '@utils';


const companyName = "Automation Test";
const holidayDate = getFutureDate();

test.describe('Holiday testcases - @holiday @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessHolidayPage();
  });

  test('[TC-1131][TC-1130] Verify Holiday - Functionality', async ({ sharedPage }) => {
    const holidayPage = new HolidayPage(sharedPage);

    // Add public holiday
    await holidayPage.checkHolidayExisted(holidayDate, 'public');
    await holidayPage.addNewHoliday(holidayDate, 'public');
    await holidayPage.verifyAddSuccess(holidayDate, 'public');

    let travelConfigPage = await holidayPage.header.accessTravelConfiguration();
    await travelConfigPage.createFreeTravelConfig("[TC-1131] public", 90, 2, 'public');

    // Add school holiday
    await travelConfigPage.header.accessHolidayPage();
    await holidayPage.checkHolidayExisted(holidayDate, 'school');
    await holidayPage.addNewHoliday(holidayDate, 'school');
    await holidayPage.verifyAddSuccess(holidayDate, 'school');

    travelConfigPage = await holidayPage.header.accessTravelConfiguration();
    await travelConfigPage.createFreeTravelConfig("[TC-1131] school", 60, 2, 'school');

  });
})
