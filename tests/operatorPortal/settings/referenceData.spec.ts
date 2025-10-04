import { test } from '@fixtures';
import { CompanyPage, ReferenceDataPage } from '@opePortalPages';
import { generateRandomString } from '@utils'

const companyName = "Automation Test 2";

test.describe('Reference Data testcases - @referenceData @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const adminCompanyPage = new CompanyPage(sharedPage);
    await adminCompanyPage.navTo();

    const gpsTrackingPage = await adminCompanyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessReferenceDataPage();
  });

  test('[TC-1024] Verify Reference Data screen display and function', async ({ sharedPage }) => {
    const referenceDataPage = new ReferenceDataPage(sharedPage);

    // Add and edit success
    let contractNumber = generateRandomString();
    await referenceDataPage.addNewContractNumber(contractNumber);
    await referenceDataPage.verifyAddSuccess(contractNumber);
    await referenceDataPage.editContractNumber(contractNumber);
    await referenceDataPage.verifyEditSuccess(contractNumber);

    // Add and edit fail
    contractNumber = generateRandomString();
    await referenceDataPage.addNewContractNumber(contractNumber);
    await referenceDataPage.verifyAddSuccess(contractNumber);
    await referenceDataPage.editContractNumber(contractNumber, false);
    await referenceDataPage.verifyEditSuccess(contractNumber, false);
  });
})