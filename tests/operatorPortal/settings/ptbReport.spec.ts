import { test } from '@fixtures';
import { CompanyPage, PtbReportPage } from '@opePortalPages';
import { generateRandomString } from '@utils'

const companyName = "Automation Test";
const contractNumber = generateRandomString(10);

test.describe('PTB Report testcases - @ptbReport @settings', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const companyPage = new CompanyPage(sharedPage);
    await companyPage.navTo();

    const gpsTrackingPage = await companyPage.searchAndAccessCompany(companyName);
    await gpsTrackingPage.header.accessPtbReportPage();
  });

  test('[TC-1293] Contract Number: User can click [Add Contract Number] button to add a new [Contract Number]', async ({ sharedPage }) => {
    const ptbReportPage = new PtbReportPage(sharedPage);
    await ptbReportPage.addConTractNumber(contractNumber);
    await ptbReportPage.verifyAddSuccess(contractNumber);
  });

  test('[TC-1294] Contract Number: User can edit Contract Number by clicking on [Edit] icon', async ({ sharedPage }) => {
    const ptbReportPage = new PtbReportPage(sharedPage);
    await ptbReportPage.addConTractNumber(contractNumber);
    await ptbReportPage.verifyAddSuccess(contractNumber);
    await ptbReportPage.editConTractNumber(contractNumber);
    await ptbReportPage.verifyEditSuccess(contractNumber);
  });

  test('[TC-1295] Contract Number: User can delete Contract Number by clicking on [Delete] icon', async ({ sharedPage }) => {
    const ptbReportPage = new PtbReportPage(sharedPage);
    await ptbReportPage.addConTractNumber(contractNumber);
    await ptbReportPage.verifyAddSuccess(contractNumber);
    await ptbReportPage.deleteConTractNumberSuccess();
  });

  test('[TC-1296] Contract Number: User can search for a specify Contract Number by input [Id] or [Contract Number] into the search box', async ({ sharedPage }) => {
    const headerBAr = new HeaderBAr(sharedPage);
    const pTBReportPage = await headerBAr.accessPTBReport();
    await pTBReportPage.expectLoaded();
    await pTBReportPage.addConTractNumber(value);
    await pTBReportPage.verifyAddConTractNumberSuccess(value);

    const id = await pTBReportPage.getId(pTBReportPage.firstContractNumberId);
    await pTBReportPage.searchInConTractNumber(id);
    await pTBReportPage.verifyConTractNumberId(id);
  });

  test('[TC-1297] Contract Number: User can click on [sort] icon next to either [ID] or [Contract Number] to sort the current Contract Number List', async ({ sharedPage }) => {
    const headerBAr = new HeaderBAr(sharedPage);
    const pTBReportPage = await headerBAr.accessPTBReport();
    await pTBReportPage.expectLoaded();

    // Verify sort by ID Asc
    await pTBReportPage.sortIconByContractId.click();
    const idsAsc = await pTBReportPage.getContractNumberColumnValues('ID');
    await assertSortedAsc(idsAsc);

    // Verify sort by ID Desc
    await pTBReportPage.sortIconByContractId.click();
    const idsDesc = await pTBReportPage.getContractNumberColumnValues('ID');
    await assertSortedDesc(idsDesc);

    // Verify sort by Contract Number Asc
    await pTBReportPage.sortIconByContractNumber.click();
    const cnAsc = await pTBReportPage.getContractNumberColumnValues('Contract Number');
    await assertSortedAsc(cnAsc);

    // Verify sort by Contract Number Desc
    await pTBReportPage.sortIconByContractNumber.click();
    const cnDesc = await pTBReportPage.getContractNumberColumnValues('Contract Number');
    await assertSortedDesc(cnDesc);
  });

  test('[TC-1298] Contract Number: User can click [Export CSV] to download a .csv file contains all Contract Number details', async ({ sharedPage }, testInfo) => {
    const headerBAr = new HeaderBAr(sharedPage);
    const pTBReportPage = await headerBAr.accessPTBReport();
    await pTBReportPage.expectLoaded();

    // Snapshot data UI (Id, Contract Number)
    const uiSnapshot = await pTBReportPage.readTableSnapshot('contract');
    expect(uiSnapshot.length).toBeGreaterThan(0);

    // Export & save file CSV
    const { filePath, fileName } = await pTBReportPage.exportCsvAndSave('contract', testInfo.outputDir, `${stamp}-contract.csv`);

    // File CSV open/read OK & validate value
    await pTBReportPage.assertCsvFileNonEmpty(filePath);
    const parsed = await pTBReportPage.readCsv(filePath);

    // Expected header (case-insensitive)
    await pTBReportPage.assertCsvHeaders(parsed.headers, ['Id', 'Contract Number']);

    // Compare CSV and UI by key (Id, Contract Number)
    await pTBReportPage.compareCsvWithUi({
      csv: parsed,
      ui: uiSnapshot,
      keyFields: ['Id', 'Contract Number'],
      strictEqualRowCount: false,
      sampleCount: 3,
    });

    test.info().attach('downloaded-csv-filename', {
      body: fileName,
      contentType: 'text/plain',
    });
  });

  test('[TC-1299] Commodity Code: User can click [Add Commodity Code] button to add a new [Commodity Code]', async ({ sharedPage }) => {
    const headerBAr = new HeaderBAr(sharedPage);
    const pTBReportPage = await headerBAr.accessPTBReport();
    await pTBReportPage.expectLoaded();
    await pTBReportPage.goTocommodityCode();
    await pTBReportPage.addCommodityCode(value, category);
    await pTBReportPage.verifyAddCommodityCodeSuccess(value);
  });

  test('[TC-1300] Commodity Code: User can edit Commodity Code by clicking on [Edit] icon', async ({ sharedPage }) => {
    const headerBAr = new HeaderBAr(sharedPage);
    const pTBReportPage = await headerBAr.accessPTBReport();
    await pTBReportPage.expectLoaded();
    await pTBReportPage.goTocommodityCode();
    await pTBReportPage.addCommodityCode(value, category);
    await pTBReportPage.verifyAddCommodityCodeSuccess(value);
    await pTBReportPage.editCommodityCode(value, category);
    await pTBReportPage.verifyEditCommodityCodeSuccess(value, category);
  });

  test('[TC-1301] Commodity Code: User can delete a Commodity Code by clicking on [Delete] icon', async ({ sharedPage }) => {
    const headerBAr = new HeaderBAr(sharedPage);
    const pTBReportPage = await headerBAr.accessPTBReport();
    await pTBReportPage.expectLoaded();
    await pTBReportPage.goTocommodityCode();
    await pTBReportPage.addCommodityCode(value, category);
    await pTBReportPage.verifyAddCommodityCodeSuccess(value);
    await pTBReportPage.deleteCommodityCodeSuccess();
  });

  test('[TC-1302] Commodity Code: User can search for a specify Commodity Code by input [Id] or [Commodity Code] or [Category] into the search box', async ({ sharedPage }) => {
    const headerBAr = new HeaderBAr(sharedPage);
    const pTBReportPage = await headerBAr.accessPTBReport();
    await pTBReportPage.expectLoaded();
    await pTBReportPage.goTocommodityCode();
    await pTBReportPage.addCommodityCode(value, category);
    await pTBReportPage.verifyAddCommodityCodeSuccess(value);

    const id = await pTBReportPage.getId(pTBReportPage.firstCommodityCodeId);
    await pTBReportPage.searchInCommodityCode(id);
    await pTBReportPage.verifyCommodityCodeId(id);

    await pTBReportPage.searchInCommodityCode(category);
    await pTBReportPage.verifyCategory(category);
  });

  test('[TC-1303] Commodity Code: User can click on [sort] icon next to either [ID] or [Contract Number] or [Category] to sort the current Commodity Code', async ({ sharedPage }) => {
    const headerBAr = new HeaderBAr(sharedPage);
    const pTBReportPage = await headerBAr.accessPTBReport();
    await pTBReportPage.expectLoaded();
    await pTBReportPage.goTocommodityCode();

    // Verify sort by ID Asc
    await pTBReportPage.sortIconByCommodityId.click();
    const idsAsc = await pTBReportPage.getCommodityCodeColumnValues('ID');
    await assertSortedAsc(idsAsc);

    // Verify sort by ID Desc
    await pTBReportPage.sortIconByCommodityId.click();
    const idsDesc = await pTBReportPage.getCommodityCodeColumnValues('ID');
    await assertSortedDesc(idsDesc);

    // Verify sort by Commodity Code Asc
    await pTBReportPage.sortIconByCommodityCode.click();
    const ccAsc = await pTBReportPage.getCommodityCodeColumnValues('Commodity Code');
    await assertSortedAsc(ccAsc);

    // Verify sort by Commodity Code Desc
    await pTBReportPage.sortIconByCommodityCode.click();
    const ccDesc = await pTBReportPage.getCommodityCodeColumnValues('Commodity Code');
    await assertSortedDesc(ccDesc);

    // Verify sort by Category Asc
    await pTBReportPage.sortIconByCategory.click();
    const ctAsc = await pTBReportPage.getCommodityCodeColumnValues('Category');
    await assertSortedAsc(ctAsc);

    // Verify sort by Category Desc
    await pTBReportPage.sortIconByCategory.click();
    const ctDesc = await pTBReportPage.getCommodityCodeColumnValues('Category');
    await assertSortedDesc(ctDesc);
  });
  
  test('[TC-1304] Commodity Code: User can click [Export CSV] to download a .csv file contains all Commodity Code details', async ({ sharedPage }, testInfo) => {
    const headerBAr = new HeaderBAr(sharedPage);
    const pTBReportPage = await headerBAr.accessPTBReport();
    await pTBReportPage.expectLoaded();
    await pTBReportPage.goTocommodityCode();

    const uiSnapshot = await pTBReportPage.readTableSnapshot('commodity');
    expect(uiSnapshot.length).toBeGreaterThan(0);

    // Export & save file CSV
    const { filePath, fileName } = await pTBReportPage.exportCsvAndSave('commodity', testInfo.outputDir, `${stamp}-commodity.csv`);

    // File CSV open/read OK & validate value
    await pTBReportPage.assertCsvFileNonEmpty(filePath);
    const parsed = await pTBReportPage.readCsv(filePath);

    // Expected header (case-insensitive)
    await pTBReportPage.assertCsvHeaders(parsed.headers, ['Id', 'Commodity Code', 'Category']);

    // Compare CSV and UI by key (Id, Commodity Code, Category)
    await pTBReportPage.compareCsvWithUi({
      csv: parsed,
      ui: uiSnapshot,
      keyFields: ['Id', 'Commodity Code', 'Category'],
      strictEqualRowCount: false,
      sampleCount: 3,
    });

    test.info().attach('downloaded-csv-filename', {
      body: fileName,
      contentType: 'text/plain',
    });
  })
})