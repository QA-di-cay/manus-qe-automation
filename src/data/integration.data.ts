import { IntegrationFormData } from '@opePortalTypes';

export const integrationTestData = {
  validIntegration: {
    name: 'Sandbox automation test',
    url: process.env.INTEGRATION_URL || 'https://apidev.tassweb.com.au/tassweb/api/',
    authToken: process.env.INTEGRATION_AUTH_TOKEN || 'FjPSwQu6OZf9bJ6y8rhG/A==',
    areaCode: '1',
    companyCode: '33',
    apiVersion: '3',
    appCode: 'TRANSPORTM',
    type: 'TASS',
    smartcardField: 'ud21_text',
    studentStatuses: 'current,future',
    lastRunAt: ''
  } as IntegrationFormData,

  invalidIntegration: {
    name: '',
    url: 'invalid-url',
    authToken: '',
    areaCode: '',
    companyCode: '',
    apiVersion: '',
    appCode: '',
    type: '',
    smartcardField: '',
    studentStatuses: '',
    lastRunAt: ''
  } as IntegrationFormData,

  updateIntegration: {
    name: 'Updated automation test',
    url: process.env.INTEGRATION_URL || 'https://apidev.tassweb.com.au/tassweb/api/',
    authToken: process.env.INTEGRATION_AUTH_TOKEN || 'FjPSwQu6OZf9bJ6y8rhG/A==',
    areaCode: '2',
    companyCode: '44',
    apiVersion: '4',
    appCode: 'TRANSPORTM_V2',
    type: 'TASS_V2',
    smartcardField: 'ud22_text',
    studentStatuses: 'current,future,past',
    lastRunAt: ''
  } as IntegrationFormData
};

export const testCompany = {
  name: "Automation Test",
  code: "AUTO_TEST"
};

export const integrationMessages = {
  success: 'Integration created successfully',
  error: 'Failed to create integration',
  validation: 'Please fill all required fields'
};
