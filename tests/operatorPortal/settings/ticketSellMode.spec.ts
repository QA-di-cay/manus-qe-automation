import { test } from '@fixtures';
import { CompanyPage, TicketSellModePage } from '@opePortalPages';

const companyName = "Automation Test";

test.describe('Ticket Sell Mode testcases - @ticketSellMode @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessTicketSellModePage();
  });

  test('[TC-1261] Verify that Ticket Sell Mode use radio buttons for single choice selection', async ({ sharedPage }) => {
    const tsmPage = new TicketSellModePage(sharedPage);
    await tsmPage.clickRatioBtn("Between any Stops in system");
    await tsmPage.clickRatioBtn("Select Stop directly");
    await tsmPage.clickRatioBtn("Select Zone then Stops");
    await tsmPage.clickRatioBtn("Route Stop List");
    await tsmPage.clickRatioBtn("Stop List");
    await tsmPage.clickRatioBtn("Between Stops of active Route");
  })

  test('[TC-1759] Ticket Sell Mode: Verify the [Save] button is align to the right for better User Experience', async ({ sharedPage }) => {
    const tsmPage = new TicketSellModePage(sharedPage);
    
    await tsmPage.assertSaveRightAligned(24);
    await tsmPage.assertNoOverlapAroundSave();
    await tsmPage.assertSaveUsable(44, 36);
  });

  test('[TC-1758] Ticket Sell Mode: Verify when user select [Between Stops of active Route], there is no white space between options and the UI should be close together', async ({ sharedPage }) => {
    const tsmPage = new TicketSellModePage(sharedPage);

    await tsmPage.clickRatioBtn('Between Stops of active Route');
    await tsmPage.assertRatioBtn();
  });

  test('[TC-1757] Ticket Sell Mode: Verify when user select [Between Any Stop in System] then the [Stop Selection Mode] is visible', async ({ sharedPage }) => {
    const tsmPage = new TicketSellModePage(sharedPage);

    await tsmPage.clickRatioBtn('Between any Stops in system');
    await tsmPage.assertRatioBtn();

    await tsmPage.clickRatioBtn('Select Stop directly');
    await tsmPage.assertRatioBtn();

    await tsmPage.clickRatioBtn('Select Zone then Stops');
    await tsmPage.assertRatioBtn();
  });
})