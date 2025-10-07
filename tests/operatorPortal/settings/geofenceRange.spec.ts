import { test } from '@fixtures';
import { CompanyPage, GeofenceRangePage } from '@opePortalPages';

const companyName = "Automation Test";


test.describe('Geofence Range testcases - @geofenceRange @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessGeofenceRangePage();
  });

  test('[TC-1422] [OP 7.0] - Geofence Range: Verify User CANNOT leave [Geofence range for alerting message (meter)] input box empty, verify a warning message will be show when user click [Save]', async ({ sharedPage }) => {
    const geoRangePage = new GeofenceRangePage(sharedPage);

    await geoRangePage.fillEmptyValue('Geofence range for changing stop (meter)');
    await geoRangePage.clickSaveBtn();
    await geoRangePage.assertRequiredIpt('Geofence range for changing stop (meter)');

    await geoRangePage.fillEmptyValue('Geofence range for alerting message (meter)');
    await geoRangePage.clickSaveBtn();
    await geoRangePage.assertRequiredIpt('Geofence range for alerting message (meter)');
  });
  
  test('TC-1421 [OP 7.0] - Geofence Range: Verify User CANNOT input text or special characters into [Geofence range for alerting message (meter)] input box, verify nothing happen when user try to do that', async ({ sharedPage }) => {
    const inputFieldTxt = 'Geofence range for alerting message (meter)';
    const geoRangePage = new GeofenceRangePage(sharedPage);

    await geoRangePage.fillValue(
      inputFieldTxt,
      'aaaaaaaa'
    );
    await geoRangePage.clickSaveBtn();
    await geoRangePage.assertRequiredIpt(inputFieldTxt,);

    await geoRangePage.fillValue(
      inputFieldTxt,
      '@#$%^&*'
    );
    await geoRangePage.clickSaveBtn();
    await geoRangePage.assertRequiredIpt(inputFieldTxt,);
  });

  test('TC-1420 [OP 7.0] - Geofence Range: Verify User CANNOT input new number smaller than 0 into [Geofence range for alerting (meter)] input box, a warning message will be show', async ({ sharedPage }) => {
    const inputFieldTxt = 'Geofence range for alerting message (meter)';
    const geoRangePage = new GeofenceRangePage(sharedPage);

    await geoRangePage.fillValue(
      inputFieldTxt,
      '-1'
    );
    await geoRangePage.clickSaveBtn();
    await geoRangePage.assertIptLessThan0(inputFieldTxt);
  });
});
