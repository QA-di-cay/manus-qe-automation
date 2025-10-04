import { Page, expect, Locator } from "@playwright/test";

export class PushToTalkPage {
    readonly headerPushToTalk: Locator;
    readonly adminUsernameTextBox: Locator;
    readonly adminPasswordTextBox: Locator;
    readonly adminUsernameTextTip: Locator;
    readonly adminPasswordTextTip: Locator;

    constructor(private readonly page: Page) {
        this.headerPushToTalk = page.locator('span:has-text("Push to talk")');
        this.adminUsernameTextBox = page.locator('label:has-text("Admin Username") + input');
        this.adminPasswordTextBox = page.locator('label:has-text("Admin Password") + input');
        this.adminUsernameTextTip = page.locator('label[class="v-label theme--light"]:has-text("Admin Username")');
        this.adminPasswordTextTip = page.locator('label[class="v-label theme--light"]:has-text("Admin Password")');
    }

    async expectLoaded() {
        await Promise.all([
            expect(this.headerPushToTalk).toBeVisible(),
        ]);
    }

    async checkElementVisible(element: Locator) {
        await expect(element).toBeVisible();
    }

    async checkElementNotVisible(element: Locator) {
        await expect(element).not.toBeVisible();
    }

    async addText(element: Locator, text: string) {
        await element.fill(text);
    }

    async clearText(element: Locator) {
        await element.clear();
    }
}