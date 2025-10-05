import { test } from '@fixtures';
import { HolidayPage, CompanyPage } from '@opePortalPages';

const companyName = "Automation Test";
const iconExpectation = {
  'General Information': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Geofence Range': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Driver App': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Passenger App': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Offline Data': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Route': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'PTB Report': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Fatigue Management': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Stationary Time': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Public Tracking': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Push To Talk': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Ticket Sell Mode': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Multifactor Authentication (MFA)': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  'Holiday': { color: 'rgb(0, 113, 188)', width: 18, height: 18 },
  };

test.describe('Settings icon testcases - @icon @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessHolidayPage();
  });

  test('[TC-1748] [OP 7.0] Verify the icons for settings menus are correct', async ({ sharedPage }) => {
    const holidayPage = new HolidayPage(sharedPage);
    await holidayPage.header.assertSubMenuIcons('Settings', iconExpectation);
  });
})