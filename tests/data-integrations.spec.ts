import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pom/operatorPortal/pages/login.page';
import { LoginMfaPage } from '../src/pom/operatorPortal/pages/loginMfa.page';
import { CompanyPage } from '../src/pom/operatorPortal/pages/company.page';
import { DataIntegrationsPage } from '../src/pom/operatorPortal/pages/dataIntegrations.page';
import { NewIntegrationPage } from '../src/pom/operatorPortal/pages/newIntegration.page';
import { generateMfaCode } from '../src/utils/mfa.helper';

require('dotenv').config();

test.describe('Data Integrations', () => {
  let loginPage: LoginPage;
  let loginMfaPage: LoginMfaPage;
  let companyPage: CompanyPage;
  let dataIntegrationsPage: DataIntegrationsPage;
  let newIntegrationPage: NewIntegrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loginMfaPage = new LoginMfaPage(page);
    companyPage = new CompanyPage(page);
    dataIntegrationsPage = new DataIntegrationsPage(page);
    newIntegrationPage = new NewIntegrationPage(page);

    // Step 1: Log in to the Operator Portal 7.0 with valid credentials.
    await page.goto(process.env.BASE_URL + '/transportme/admin');
    await loginPage.login(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);

    // Handle MFA
    const mfaCode = generateMfaCode(process.env.ADMIN_MFA_SECRET!); // Use the helper to generate MFA code
    await loginMfaPage.enterMfaAndVerify(mfaCode);

    // Select 'Automation Test' company
    await companyPage.selectCompany('Automation Test');

    // Step 2 & 3: Navigate to the 'Settings' section and then 'Data Integrations' section.
    // Direct navigation to Data Integrations page after successful login and company selection
    await page.goto(process.env.BASE_URL + '/transportme/index.php/config/integrations');
  });

  test('Verify user can add new Data Integrations in Settings', async ({ page }) => {
    // Step 4: Click on the [Create/New...] button to add a new integration.
    await dataIntegrationsPage.addNewDataIntegrationButton.click();
    await expect(page.locator('text="New Integration"')).toBeVisible();

    // Step 5: Fill in the required details for the new data integration
    const integrationName = `Test Integration ${Date.now()}`;
    const url = 'https://test-integration.com';
    const authToken = 'test_auth_token_123';
    const type = 'TransportMe'; // Assuming 'TransportMe' is an option in the Type dropdown

    await newIntegrationPage.fillIntegrationDetails(integrationName, url, authToken, type);

    // Step 6: Submit the form to add the new data integration.
    await newIntegrationPage.saveIntegration();

    // Verify confirmation message (assuming a success alert appears)
    await expect(page.locator('.v-alert__content')).toContainText('successfully added'); // Adjust selector based on actual UI

    // Step 7: Verify that the new data integration appears in the list of existing integrations.
    await expect(page.locator(`text=${integrationName}`)).toBeVisible();
  });
});

