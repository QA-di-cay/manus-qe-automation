export const Routes = {
  // Login
  loginPage:          { path: '/transportme/admin', title: 'Administrator Login' },
  loginMfaPage:       { path: '/transportme/admin/login', title: 'Administrator Login' },
  
  // Admin
  companyPage:        { path: '/transportme/company', title: 'COMPANIES' },
  
  // GPS Tracking
  liveTrackingPage:   { path: '/transportme/gpstracking', title: 'TRIPS' },
  
  // Settings
  ptbReportPage:      { path: '/transportme/config/ptb_report', title: 'PTB Report' },
  generalInfoPage:    { path: '/transportme/config', title: 'General Information' },
  holidayPage:        { path: '/transportme/ph', title: 'Holidays' },
  referenceDataPage:  { path: '/transportme/config/ptb_report', title: 'Reference Data' },
  ticketSellModePage: { path: '/transportme/config/setting_ticket_sell_mode', title: 'Ticket Sell Mode' },
  driverAppPage:      { path: '/transportme/config/setting_driver_app', title: 'Driver App' },
  dataIntegrationPage:{ path: '/transportme/config/integrations', title: 'Data Integrations' },
  pushToTalkPage:     { path: '/transportme/config/push_to_talk', title: 'Push To Talk' },
  offlineDataPage:    { path: '/transportme/config/offline_data', title: 'Offline Data' },
  passengerAppPage:   { path: '/transportme/config/passenger_app', title: 'Passenger App' },
  publicTrackingPage: { path: '/transportme/config/public_tracking', title: 'Public Tracking' },
  geofenceRangePage:  { path: '/transportme/config/geofence', title: 'Geofence Range' },

  // Smart Card
  travelConfigPage:   { path: '/transportme/smart_cards/smartcard_config', title: 'Travel Configuration' },
} as const;
