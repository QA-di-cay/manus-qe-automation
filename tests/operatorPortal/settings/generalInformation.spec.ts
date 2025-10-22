import { test } from '@fixtures';
import { Page, expect, Locator } from "@playwright/test";
import { CompanyPage, GeneralInfoPage } from '@opePortalPages';
import { generateRandomString } from '@utils';


const companyName = "Automation Test";
const fileName = "Logo.png";
const nationalLocationCode = generateRandomString(6);
const timezone = "Australia/Darwin";
const timezone1 = "Pacific/Chatham";

test.describe('General Information Page Tests - @generalInfo @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const adminCompanyPage = new CompanyPage(sharedPage);
    await adminCompanyPage.navTo();

    const gpsTrackingPage = await adminCompanyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessGeneralInfoPage();
  });

  test('[TC-1068] Company Logo - Setting Company Logo', async ({ sharedPage }) => {
    const generalInfoPage = new GeneralInfoPage(sharedPage);
    await generalInfoPage.uploadCompanyLogo(fileName);
    await generalInfoPage.verifyLogoIsAdded();
  });
  test('[TC-1320] Verify user can upload Logo successful and the logo will be visible after that', async ({ sharedPage }) => {
    const generalInfoPage = new GeneralInfoPage(sharedPage);
    await generalInfoPage.uploadCompanyLogo(fileName);
    await generalInfoPage.verifyLogoIsAdded();
  });

  test('[TC-1321] Verify user can upload new Logo successful and the existing logo will be replace', async ({ sharedPage }) => {
      const generalInfoPage = new GeneralInfoPage(sharedPage);
      const beforeStr = await generalInfoPage.checkExistingLogo();
      await generalInfoPage.uploadCompanyLogo(fileName);
      await generalInfoPage.verifyLogoIsAdded();
      await sharedPage.reload();
      const afterStr  = await generalInfoPage.checkExistingLogo();
      expect(afterStr).not.toBe(beforeStr);
  });

  test('[TC-1410] User can input new [National Location Code], click [Save] and verify the new change', async ({ sharedPage }) => {
      const generalInfoPage = new GeneralInfoPage(sharedPage);
      await generalInfoPage.addNationalLocationCode(nationalLocationCode);
      await generalInfoPage.verifyAdded(generalInfoPage.nationalLocationCodeInput, nationalLocationCode)
  });

  test('[TC-1411] User can clear [National Location Code], click [Save] and verify that the [National Location Code] will be empty', async ({ sharedPage }) => {
      const generalInfoPage = new GeneralInfoPage(sharedPage);
      await generalInfoPage.clearNationalLocationCode();
      await generalInfoPage.verifyFieldIsEmpty();
  });

  test('[TC-1412] User can change the [Timezone], click [Save] and verify the new change', async ({ sharedPage }) => {
      const generalInfoPage = new GeneralInfoPage(sharedPage);
      await generalInfoPage.addTimeZone(timezone);
      await generalInfoPage.verifyAdded(generalInfoPage.timezoneSelect, timezone);
      await generalInfoPage.addTimeZone(timezone1);
      await generalInfoPage.verifyAdded(generalInfoPage.timezoneSelect, timezone1);
  });

  test('[TC-1413] User can [Upload Logo], click [Save] and verify the new change', async ({ sharedPage }) => {
      const generalInfoPage = new GeneralInfoPage(sharedPage);
      await generalInfoPage.uploadCompanyLogo(fileName);
      await generalInfoPage.verifyLogoIsAdded();
  });

  test('[TC-1414] User can replace existing logo by [Upload Logo], click [Save] and verify the new change', async ({ sharedPage }) => {
      const generalInfoPage = new GeneralInfoPage(sharedPage);
      const beforeStr = await generalInfoPage.checkExistingLogo();
      await generalInfoPage.uploadCompanyLogo(fileName);
      await generalInfoPage.verifyLogoIsAdded();
      await sharedPage.reload();
      const afterStr  = await generalInfoPage.checkExistingLogo();
      expect(afterStr).not.toBe(beforeStr);
  })
})