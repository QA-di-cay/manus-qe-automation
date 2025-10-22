import { test } from '@fixtures';
import { CompanyPage, DataIntegrationsPage } from '@opePortalPages';
import { IntegrationFormData } from '@opePortalTypes';
import { integrationTestData, testCompany } from '@data/integration.data';

test.describe('Data Integrations - @dataIntegrations @settings', () => {
  let dataIntegrationsPage: DataIntegrationsPage;

  test.beforeEach(async ({ sharedPage }) => {
    // Navigate to company page and access data integrations
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(testCompany.name);
    await gpsTrackingPage.header.accessDataIntegrationPage();
    
    // Initialize page object
    dataIntegrationsPage = new DataIntegrationsPage(sharedPage);
  });

  test('[TC-1649] Should create new data integration successfully', async () => {
    const testData = integrationTestData.validIntegration;
    
    // Open new integration form
    await dataIntegrationsPage.openNewIntegrationForm();
    await dataIntegrationsPage.expectFormIsVisible();
    
    // Fill basic information
    await dataIntegrationsPage.fillBasicInfo({
      name: testData.name,
      url: testData.url,
      authToken: testData.authToken
    });
    
    // Fill integration codes
    await dataIntegrationsPage.fillCodes({
      areaCode: testData.areaCode,
      companyCode: testData.companyCode,
      apiVersion: testData.apiVersion
    });
    
    // Fill advanced settings
    await dataIntegrationsPage.fillAdvancedSettings({
      appCode: testData.appCode,
      smartcardField: testData.smartcardField,
      studentStatuses: testData.studentStatuses
    });
    
    // Verify and save
    await dataIntegrationsPage.expectSaveButtonIsEnabled();
    await dataIntegrationsPage.save();
    await dataIntegrationsPage.expectFormIsClosed();
    
    // Verify integration was created
    await dataIntegrationsPage.searchIntegration(testData.name);
    await dataIntegrationsPage.expectIntegrationExists(testData.name);
  });

  test('[TC-1649-Alternative] Should create integration using helper method', async () => {
    const testData = integrationTestData.validIntegration;
    
    // Use helper method for complete integration creation
    await dataIntegrationsPage.createCompleteIntegration(testData);
    
    // Verify integration was created
    await dataIntegrationsPage.searchIntegration(testData.name);
    await dataIntegrationsPage.expectIntegrationExists(testData.name);
  });

  test('[TC-1324] Should verify v-card design is not visible', async () => {
    // Verify that v-card elements are not visible
    await dataIntegrationsPage.expectElementWithClassNotVisible('v-card');
  });

  test('[TC-1323] Should have horizontal scrollbar on low width monitor', async () => {
    // Verify horizontal scrollbar functionality
    await dataIntegrationsPage.expectHasHorizontalScrollbar();
  });

  test('Should verify form validation for required fields', async () => {
    // Open form
    await dataIntegrationsPage.openNewIntegrationForm();
    await dataIntegrationsPage.expectFormIsVisible();
    
    // Try to save without filling required fields
    await dataIntegrationsPage.expectSaveButtonIsDisabled();
    
    // Fill only name field
    await dataIntegrationsPage.fillBasicInfo({
      name: 'Test Integration',
      url: '',
      authToken: ''
    });
    
    // Save button should still be disabled
    await dataIntegrationsPage.expectSaveButtonIsDisabled();
  });

  test('Should be able to close form without saving', async () => {
    // Open form
    await dataIntegrationsPage.openNewIntegrationForm();
    await dataIntegrationsPage.expectFormIsVisible();
    
    // Fill some data
    await dataIntegrationsPage.fillBasicInfo({
      name: 'Test Integration',
      url: 'https://test.com',
      authToken: 'test-token'
    });
    
    // Close form without saving
    await dataIntegrationsPage.closeForm();
    await dataIntegrationsPage.expectFormIsClosed();
    
    // Verify integration was not created
    await dataIntegrationsPage.searchIntegration('Test Integration');
    await dataIntegrationsPage.expectIntegrationNotExists('Test Integration');
  });

  test('Should be able to search and filter integrations', async () => {
    const testData = integrationTestData.validIntegration;
    
    // Create an integration first
    await dataIntegrationsPage.createCompleteIntegration(testData);
    
    // Clear search and verify table has data
    await dataIntegrationsPage.clearSearch();
    await dataIntegrationsPage.expectTableHasData();
    
    // Search for specific integration
    await dataIntegrationsPage.searchIntegration(testData.name);
    await dataIntegrationsPage.expectIntegrationExists(testData.name);
    
    // Search for non-existent integration
    await dataIntegrationsPage.searchIntegration('Non-existent Integration');
    await dataIntegrationsPage.expectTableIsEmpty();
  });

  test('Should verify verify button functionality', async () => {
    // Open form
    await dataIntegrationsPage.openNewIntegrationForm();
    await dataIntegrationsPage.expectFormIsVisible();
    
    // Fill basic info
    await dataIntegrationsPage.fillBasicInfo({
      name: 'Test Integration',
      url: integrationTestData.validIntegration.url,
      authToken: integrationTestData.validIntegration.authToken
    });
    
    // Verify button should be visible
    await dataIntegrationsPage.expectVerifyButtonIsVisible();
    
    // Click verify button
    await dataIntegrationsPage.verifyIntegration();
    
    // Note: Add specific verification expectations based on actual behavior
  });

  test('Should handle horizontal scrolling in table', async () => {
    // Ensure table has data
    await dataIntegrationsPage.expectTableHasData();
    
    // Test horizontal scrolling
    await dataIntegrationsPage.scrollTableHorizontally();
    
    // Verify scrollbar exists
    await dataIntegrationsPage.expectHasHorizontalScrollbar();
  });
});
