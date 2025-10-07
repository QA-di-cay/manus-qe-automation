import { test } from '@fixtures';
import { CompanyPage, DataIntegrationPage } from '@opePortalPages';

const companyName = "Automation Test";


test.describe('Data Integration testcases - @dataIntegrations @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessDataIntegrationPage();
  });

  test.only('[TC-1649] [OP 7.0] Verify user can add new [Data Integrations] in Settings', async ({ sharedPage }) => {
    const dataItgPage = new DataIntegrationPage(sharedPage);
    await dataItgPage.createNewIntegration(
      'Sandbox automation test',
      process.env.INTEGRATION_URL!,
      process.env.INTEGRATION_URL!,
      '1',
      '33',
      '3',
      'TRANSPORTM',
      'TASS',
      'ud21_text',
      'current,future',
      ''
    );

    
    // Step 01: User is successfully logged into the Operator Portal 7.0 (handled in beforeEach)
    // Step 02: Navigate to the 'Settings' section from the main menu (handled in beforeEach)
    // Step 03: Within 'Settings', go to the 'Data Integrations' section (handled in beforeEach)
    
    // Verify we're on the Data Integrations page
    // await dataIntegrationPage.expectLoaded();
    
    // // Step 04: Click on the [Create/New...] button to add a new integration
    // const newIntegrationPage = await dataIntegrationPage.clickAddNewDataIntegrations();
    
    // // Verify form/modal is displayed
    // await newIntegrationPage.verifyFormDisplayed();
    
    // // Step 05: Fill in the required details for the new data integration
    // const integrationName = `Test Integration ${Date.now()}`;
    // const url = 'https://test-integration.com';
    // const authorisationToken = 'test_auth_token_123';
    // const areaCode = 'TEST_AREA';
    // const companyCode = 'TEST_COMP';
    // const apiVersion = '1.0';
    
    // await newIntegrationPage.fillIntegrationDetails(integrationName, url, authorisationToken, areaCode, companyCode, apiVersion);
    
    // // Step 06: Submit the form to add the new data integration
    // await newIntegrationPage.saveIntegration();
    
    // // Wait for form to close and return to main page
    // await sharedPage.waitForTimeout(2000);
    // await dataIntegrationPage.expectLoaded();
    
    // // Step 07: Verify that the new data integration appears in the list
    // // Try to verify success message first, if not available, check integration in list
    // try {
    //   await dataIntegrationPage.verifySuccessMessage();
    // } catch (error) {
    //   console.log('No success message found, checking integration in list directly');
    // }
    
    // // Final verification: Integration should be visible in the list
    // await dataIntegrationPage.verifyIntegrationInList(integrationName);
  });
});
