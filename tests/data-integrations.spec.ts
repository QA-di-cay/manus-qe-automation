import { test, expect } from '@fixtures';
import { CompanyPage } from '@opePortalPages';
import { NewIntegrationPage } from '../src/pom/operatorPortal/pages/newIntegration.page';

require('dotenv').config();

test.describe('Data Integrations - @dataIntegrations @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    // Select 'Automation Test' company
    const gpsTrackingPage = await companyPage.searchAndAccessCompany('Automation Test');
    
    // Navigate to Data Integrations page
    await sharedPage.goto(process.env.BASE_URL + '/transportme/index.php/config/integrations');
  });

  test('Verify user can add new Data Integrations in Settings', async ({ sharedPage }) => {
    // Create page object instance
    const newIntegrationPage = new NewIntegrationPage(sharedPage);

    // Step 4: Click on the [Create/New...] button to add a new integration.
    const addButton = sharedPage.locator('button, a').filter({ hasText: /create|new|add/i }).first();
    await addButton.click();
    await expect(sharedPage.locator('text="New Integration"')).toBeVisible();

    // Step 5: Fill in the required details for the new data integration
    const integrationName = `Test Integration ${Date.now()}`;
    const url = 'https://test-integration.com';
    const authToken = 'test_auth_token_123';
    const type = 'TransportMe'; // Assuming 'TransportMe' is an option in the Type dropdown

    await newIntegrationPage.fillIntegrationDetails(integrationName, url, authToken, type);

    // Step 6: Submit the form to add the new data integration.
    await newIntegrationPage.saveIntegration();

    // Verify confirmation message (assuming a success alert appears)
    await expect(sharedPage.locator('.v-alert__content')).toContainText('successfully added'); // Adjust selector based on actual UI

    // Step 7: Verify that the new data integration appears in the list of existing integrations.
    await expect(sharedPage.locator(`text=${integrationName}`)).toBeVisible();
  });
});
