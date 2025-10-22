// import { Page, expect, Locator } from "@playwright/test";
// import { exportCsvAndCompare } from '../../../utils/csvHelper';

// export class PTBReportPage {
//     readonly headerPTBReport: Locator;
//     // Contract number Page
//     readonly addConTractNumberBtn: Locator;
//     readonly addConTractNumberInput: Locator;
//     readonly saveConTractNumberBtn: Locator;
//     readonly addSuccessContracNumbertAlert: Locator;
//     readonly searchConTractNumberInput: Locator;
//     readonly firstContractNumber: Locator;
//     readonly firstContractNumberId: Locator;
//     readonly firstEditContractNumberBtn: Locator;
//     readonly saveEditContracNumberBtn: Locator;
//     readonly editSuccessContractNumberAlert: Locator;
//     readonly editConTractNumberInput: Locator;
//     readonly firstDeleteConTractNumberBtn: Locator;
//     readonly deleteSuccessContracNumberAlert: Locator;
//     readonly noContracNumberRecordsMessage: Locator;
//     readonly confirmDeleteBtn: Locator;
//     readonly sortIconByContractId: Locator;
//     readonly sortIconByContractNumber: Locator;
//     readonly table: Locator;
//     readonly exportCsvBtn: Locator;
//     // Commodity Code page
//     readonly commodityCodeTab: Locator;
//     readonly addCommodityCodeBtn: Locator;
//     readonly commodityNumberInput: Locator;
//     readonly categoryInput: Locator;
//     readonly saveCommodityBtn: Locator;
//     readonly addSuccessAlertCommodity: Locator;
//     readonly firstCommodityCodeId: Locator;
//     readonly firstCommodityCode: Locator;
//     readonly firstCategory: Locator;
//     readonly searchCommodityCodeInput: Locator;
//     readonly firstEditCommodityCodeBtn: Locator;
//     readonly editSuccessCommodityCodeAlert: Locator;
//     readonly editCommodityCodeInput: Locator;
//     readonly editCategoryInput: Locator;
//     readonly saveEditCommodityCodeBtn: Locator;
//     readonly firstDeleteCommodityCodeBtn: Locator;
//     readonly deleteSuccessCommodityCodeAlert: Locator;
//     readonly noCommodityCodeRecordsMessage: Locator;
//     readonly sortIconByCommodityId: Locator;
//     readonly sortIconByCommodityCode: Locator;
//     readonly sortIconByCategory: Locator;
//     readonly commodityTable: Locator;
//     readonly exportCommodityCsvBtn: Locator;

//     constructor(private readonly page: Page) {
//         // Contract number Page
//         this.headerPTBReport = page.locator('span:has-text("PTB Report")');
//         this.addConTractNumberBtn = page.locator('button:has-text("Add Contract Number")');
//         this.addConTractNumberInput = page.locator('label:has-text("Contract number *") + input');
//         this.saveConTractNumberBtn = page.locator('header:has-text("Add Contract Number") + div + div button:has-text("Save")');
//         this.addSuccessContracNumbertAlert = page.locator('.v-alert__content:has-text("Add PTB report contract number")');
//         this.searchConTractNumberInput = page.locator('.v-input__slot:has(.v-input__append-inner) div[class="v-text-field__slot"] input').nth(0);
//         this.firstContractNumber = page.locator('tbody tr:first-child td:nth-child(2)');
//         this.firstContractNumberId = page.locator('tbody tr:first-child td:nth-child(1)');
//         this.firstEditContractNumberBtn = page.locator('tbody tr:first-child td:nth-child(3) button:has-text("Edit Contract Number")');
//         this.saveEditContracNumberBtn = page.locator('header:has-text("Edit Contract Number") + div + div button:has-text("Save")');
//         this.editSuccessContractNumberAlert = page.locator('.v-alert__content:has-text("Updated PTB report contract number")');
//         this.editConTractNumberInput = page.locator('header:has-text("Edit Contract Number") + div label:has-text("Contract number *") + input');
//         this.firstDeleteConTractNumberBtn = page.locator('tbody tr:first-child td:nth-child(3) [aria-label="Delete Contract Number"]');
//         this.deleteSuccessContracNumberAlert = page.locator('.v-alert__content:has-text("Deleted PTB report contract number")');
//         this.noContracNumberRecordsMessage = page.locator('td:has-text("No matching records found")');
//         this.confirmDeleteBtn = page.locator('header:has-text("Confirmation") + div + div button:has-text("OK")');
//         this.sortIconByContractId = page.getByRole('columnheader', { name: /^Id:/i });
//         this.sortIconByContractNumber = page.getByRole('columnheader', { name: /^Contract Number:/i });
//         this.table = page.locator('table:has-text("Contract Number")');
//         this.exportCsvBtn = page.locator('button:has-text("Export CSV")');
//         // Commodity Code page
//         this.commodityCodeTab = page.locator('.v-tab:has-text("Commodity Code")');
//         this.addCommodityCodeBtn = page.locator('button:has-text("Add Commodity Code")');
//         this.commodityNumberInput = page.locator('label:has-text("Commodity number *") + input');
//         this.categoryInput = page.locator('label:has-text("Category *") + input');
//         this.saveCommodityBtn = page.locator('button:has-text("Save")');
//         this.addSuccessAlertCommodity = page.locator('.v-alert__content:has-text("Add PTB report commodity number")');
//         this.firstCommodityCodeId = page.locator('thead:has-text("Commodity Code") + tbody tr:first-child td:nth-child(1)');
//         this.firstCommodityCode = page.locator('thead:has-text("Commodity Code") + tbody tr:first-child td:nth-child(2)');
//         this.firstCategory = page.locator('thead:has-text("Commodity Code") + tbody tr:first-child td:nth-child(3)');
//         this.searchCommodityCodeInput = page.locator('.v-input__slot:has(.v-input__append-inner) div[class="v-text-field__slot"] input').nth(1);
//         this.firstEditCommodityCodeBtn = page.locator('button:has-text("Edit Commodity Code")');
//         this.editSuccessCommodityCodeAlert = page.locator('.v-alert__content:has-text("Updated PTB report commodity code")');
//         this.editCommodityCodeInput = page.locator('label:has-text("Commodity code *") + input');
//         this.editCategoryInput = page.locator('header:has-text("Edit Commodity Code") + div label:has-text("Category *") + input');
//         this.saveEditCommodityCodeBtn = page.locator('header:has-text("Edit Commodity Code") + div + div button:has-text("Save")');
//         this.firstDeleteCommodityCodeBtn = page.locator('button[aria-label="Delete Commodity Number"]');
//         this.deleteSuccessCommodityCodeAlert = page.locator('.v-alert__content:has-text("Deleted PTB report commodity code.")');
//         this.noCommodityCodeRecordsMessage = page.locator('thead:has-text("Commodity Code") + tbody td:has-text("No matching records found")');
//         this.sortIconByCommodityId = page.locator('thead:has-text("Commodity Code")').getByRole('columnheader', { name: /^Id:/i });
//         this.sortIconByCommodityCode = page.getByRole('columnheader', { name: /^Commodity Code:/i });
//         this.sortIconByCategory = page.getByRole('columnheader', { name: /^Category:/i });
//         this.commodityTable = page.locator('table:has-text("Commodity Code")');
//         this.exportCommodityCsvBtn = page.locator('button:has-text("Add Commodity Code") ~ button');
//     }

//     async expectLoaded() {
//         await Promise.all([
//             expect(this.page).toHaveURL(/\/ptb_report/i),
//             expect(this.headerPTBReport).toBeVisible(),
//         ]);
//     }

//     // Contract number function
//     async addConTractNumber(contractNumber: string) {
//         await this.addConTractNumberBtn.click();
//         await this.addConTractNumberInput.fill(contractNumber);
//         await this.saveConTractNumberBtn.click();
//     }

//     async searchInConTractNumber(value: string) {
//         await this.searchConTractNumberInput.fill(value);
//     }

//     async verifyAddConTractNumberSuccess(contractNumber: string) {
//         await expect(this.addSuccessContracNumbertAlert).toBeVisible();
//         await this.searchInConTractNumber(contractNumber);
//         await expect(this.firstContractNumber).toContainText(contractNumber);
//     }

//     async editConTractNumber(contractNumber: string) {
//         await this.firstEditContractNumberBtn.click();
//         await this.editConTractNumberInput.fill(contractNumber + "edit");
//         await this.saveEditContracNumberBtn.click();
//     }

//     async verifyEditConTractNumberSuccess(contractNumber: string) {
//         await expect(this.editSuccessContractNumberAlert).toBeVisible();
//         await expect(this.firstContractNumber).toContainText(contractNumber + "edit");
//     }

//     async deleteConTractNumberSuccess() {
//         await this.firstDeleteConTractNumberBtn.click();
//         await this.confirmDeleteBtn.click();
//         await expect(this.deleteSuccessContracNumberAlert).toBeVisible();
//         await expect(this.noContracNumberRecordsMessage).toBeVisible();
//     }

//     async getId(element: Locator): Promise<string> {
//         await element.waitFor({ state: 'visible' });
//         return await element.innerText();
//     }

//     async verifyConTractNumberId(id: string) {
//         await expect(this.firstContractNumberId).toHaveText(id);
//     }

//     async getContractNumberColumnValues(column: 'ID' | 'Contract Number'): Promise<(string | number)[]> {
//         const columnIndex = column === 'ID' ? 1 : 2; // col 1 = ID, col 2 = Contract Number
//         const cells = await this.page.locator(`tbody tr td:nth-child(${columnIndex})`).allTextContents();

//         if (column === 'ID') {
//             return cells.map(c => Number(c.trim()));
//         }
//         return cells.map(c => c.trim());
//     }

//     // Commodity Code function
//     async goTocommodityCode() {
//         await this.commodityCodeTab.click();
//     }

//     async addCommodityCode(commodityCode: string, category: string) {
//         await this.addCommodityCodeBtn.click();
//         await this.commodityNumberInput.fill(commodityCode);
//         await this.categoryInput.fill(category);
//         await this.saveCommodityBtn.click();
//     }

//     async searchInCommodityCode(value: string) {
//         await this.searchCommodityCodeInput.fill(value);
//     }

//     async verifyAddCommodityCodeSuccess(commodityCode: string) {
//         await expect(this.addSuccessAlertCommodity).toBeVisible();
//         await this.searchInCommodityCode(commodityCode);
//         await expect(this.firstCommodityCode).toContainText(commodityCode);
//     }

//     async editCommodityCode(commodityCode: string, category: string) {
//         await this.firstEditCommodityCodeBtn.click();
//         await this.editCommodityCodeInput.fill(commodityCode + "edit");
//         await this.editCategoryInput.fill(category + "edit");
//         await this.saveEditCommodityCodeBtn.click();
//     }

//     async verifyEditCommodityCodeSuccess(commodityCode: string, category: string) {
//         await expect(this.editSuccessCommodityCodeAlert).toBeVisible();
//         await expect(this.firstCommodityCode).toContainText(commodityCode + "edit");
//         await expect(this.firstCategory).toContainText(category + "edit");
//     }

//     async deleteCommodityCodeSuccess() {
//         await this.firstDeleteCommodityCodeBtn.click();
//         await this.confirmDeleteBtn.click();
//         await expect(this.deleteSuccessCommodityCodeAlert).toBeVisible();
//         await expect(this.noCommodityCodeRecordsMessage).toBeVisible();
//     }

//     async verifyCommodityCodeId(id: string) {
//         await expect(this.firstCommodityCodeId).toHaveText(id);
//     }

//     async verifyCategory(category: string) {
//         await expect(this.firstCategory).toHaveText(category);
//     }

//     async getCommodityCodeColumnValues(
//         column: 'ID' | 'Commodity Code' | 'Category'
//     ): Promise<(string | number)[]> {
//         const columnIndex =
//             column === 'ID'
//                 ? 1
//                 : column === 'Commodity Code'
//                     ? 2
//                     : 3; // col 1 = ID, col 2 = Commodity Code, col 3 = Category

//         const cells = await this.page
//             .locator(`thead:has-text("Commodity Code") + tbody tr td:nth-child(${columnIndex})`)
//             .allTextContents();

//         if (column === 'ID') {
//             return cells.map(c => Number(c.trim()));
//         }
//         return cells.map(c => c.trim());
//     }

//     async validateCsv(
//         kind: 'contract' | 'commodity',
//         {
//             outputDir,
//             keyField,
//             columns,
//             numericTolerance = 0,
//             strictEqualRowCount = false,
//             delimiter = ',',
//         }: {
//             outputDir: string;
//             keyField?: string | string[];
//             columns?: string[];
//             numericTolerance?: number;
//             strictEqualRowCount?: boolean;
//             delimiter?: string;
//         }
//     ) {
//         const cfg =
//             kind === 'contract'
//                 ? {
//                     exportButton: this.exportCsvBtn,
//                     table: this.table,
//                     fileName: 'contract.csv',
//                     keyFieldDefault: 'Id' as string,
//                     columnsDefault: ['Id', 'Contract Number'],
//                 }
//                 : {
//                     exportButton: this.exportCommodityCsvBtn,
//                     table: this.commodityTable,
//                     fileName: 'commodity.csv',
//                     keyFieldDefault: 'Id' as string,
//                     columnsDefault: ['Id', 'Commodity Code', 'Category'],
//                 };

//         return exportCsvAndCompare({
//             page: this.page,
//             exportButton: cfg.exportButton,
//             table: cfg.table,
//             outputDir,
//             fileName: cfg.fileName,
//             keyField: (keyField ?? cfg.keyFieldDefault) as string,
//             columns: columns ?? cfg.columnsDefault,
//             numericTolerance,
//             strictEqualRowCount,
//             delimiter,
//         });
//     }
// }