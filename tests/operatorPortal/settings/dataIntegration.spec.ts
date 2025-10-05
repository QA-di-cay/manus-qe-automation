import { test } from '@fixtures';
import { CompanyPage, DataIntegrationPage } from '@opePortalPages';

const companyName = "Automation Test";

test.describe('Data Integration testcases - @dataIntegrations @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    
    // Navigate to Data Integrations page
    await sharedPage.goto(process.env.BASE_URL + '/transportme/index.php/config/integrations');
  });

  test.only('[TC-1649] [OP 7.0] Verify user can add new [Data Integrations] in Settings', async ({ sharedPage }) => {
    const dataIntegrationPage = new DataIntegrationPage(sharedPage);
    
    // Step 01: User is successfully logged into the Operator Portal 7.0 (handled in beforeEach)
    // Step 02: Navigate to the 'Settings' section from the main menu (handled in beforeEach)
    // Step 03: Within 'Settings', go to the 'Data Integrations' section (handled in beforeEach)
    
    // Verify we're on the Data Integrations page
    await dataIntegrationPage.expectLoaded();
    
    // Step 04: Click on the [Create/New...] button to add a new integration
    const newIntegrationPage = await dataIntegrationPage.clickAddNewDataIntegrations();
    
    // Verify form/modal is displayed
    await newIntegrationPage.verifyFormDisplayed();
    
    // Step 05: Fill in the required details for the new data integration
    const integrationName = `Test Integration ${Date.now()}`;
    const url = 'https://test-integration.com';
    const authorisationToken = 'test_auth_token_123';
    const areaCode = 'TEST_AREA';
    const companyCode = 'TEST_COMP';
    const apiVersion = '1.0';
    
    await newIntegrationPage.fillIntegrationDetails(integrationName, url, authorisationToken, areaCode, companyCode, apiVersion);
    
    // Step 06: Submit the form to add the new data integration
    await newIntegrationPage.saveIntegration();
    
    // Verify confirmation message (success alert appears)
    await dataIntegrationPage.verifySuccessMessage();
    
    // Step 07: Verify that the new data integration appears in the list of existing integrations
    await dataIntegrationPage.verifyIntegrationInList(integrationName);
  });
});
