// src/pom/operatorPortal/types.ts

// Authentication Types
export interface LoginParams {
  user: string;
  pass: string;
  mfaSecret: string;
  submitWithEnter?: boolean;
}

export interface UserCredentials {
  username: string;
  password: string;
  mfaSecret: string;
}

// Form Data Types
export interface IntegrationFormData {
  name: string;
  url: string;
  authToken: string;
  areaCode: string;
  companyCode: string;
  apiVersion: string;
  appCode: string;
  type: string;
  smartcardField: string;
  studentStatuses: string;
  lastRunAt: string;
}

export interface HolidayData {
  date: string;
  type: 'public' | 'school';
}

export interface GeneralInfoData {
  nationalLocationCode?: string;
  timezone?: string;
  logoFile?: string;
}

// UI Element Types
export interface ElementSelector {
  xpath: string;
  description?: string;
}

// Test Data Types
export interface TestCompany {
  name: string;
  code: string;
}

export interface TestEnvironment {
  name: string;
  baseUrl: string;
  adminCredentials: UserCredentials;
}

// Page Navigation Types
export interface PageRoute {
  path: string;
  title: string;
}

// Test Configuration Types
export interface TestConfig {
  timeout: number;
  retries: number;
  baseURL: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Settings Types
export interface DriverAppSettings {
  enablePushNotifications: boolean;
  enableLocationTracking: boolean;
  enableChatFeature: boolean;
}

export interface PassengerAppSettings {
  enableRealTimeTracking: boolean;
  enableBookingFeature: boolean;
  enablePaymentIntegration: boolean;
}

export interface FatigueManagementSettings {
  maxDrivingHours: number;
  mandatoryBreakDuration: number;
  enableAlerts: boolean;
}

// Smart Card Types
export interface TravelConfigData {
  name: string;
  discountPercentage: number;
  maxUsageCount: number;
  holidayType: 'public' | 'school';
}
