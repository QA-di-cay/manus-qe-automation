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
  driverApp:          { path: '/transportme/config/setting_driver_app', title: 'Driver App' },
  dataIntegration:    { path: '/transportme/config/integrations', title: 'Data Integrations' },


  // Smart Card
  travelConfigPage:   { path: '/transportme/smart_cards/smartcard_config', title: 'Travel Configuration' },
} as const;
