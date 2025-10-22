import { Page, expect, Locator } from "@playwright/test";

export class GeofenceRangePage {
    readonly geofenceForChangingInput: Locator;
    readonly geofenceForAlertingInput: Locator;
    readonly saveBtn: Locator;
    readonly successAlert: Locator;

    constructor(private readonly page: Page) {
        this.geofenceForChangingInput = page.locator('label:has-text("Geofence range for changing stop") + input');
        this.geofenceForAlertingInput = page.locator('label:has-text("Geofence range for alerting message") + input');
        this.saveBtn = page.locator('button:has-text("Save")');
        this.successAlert = page.getByText("Geofence Range Updated");

    }

    async expectLoaded() {
        await Promise.all([
            expect(this.page).toHaveURL(/\/geofence/i),
            expect(this.geofenceForChangingInput).toBeVisible(),
            expect(this.geofenceForAlertingInput).toBeVisible(),
        ]);
    }

    async addgeofenceRange(value: string) {
        await this.geofenceForChangingInput.fill(value);
        await this.geofenceForAlertingInput.fill(value);
        await this.saveBtn.click();
    }

    async verifyAddedSuccess() {
        await expect(this.successAlert).toBeVisible();
    }

    async verifyAddedValue(locator: Locator, value: string) {
        await expect(locator).toHaveValue(value);
    }

    async assertValidationError(type: 'changingStop' | 'alertingMessage') {
        let expectedError;
        let errorLocator;

        if (type === 'changingStop') {
            expectedError = 'Geofence range for changing stop cannot be less than 0.';
            errorLocator = this.page.locator('.v-messages__message:has-text("changing stop")');
        } else {
            expectedError = 'Geofence range for alerting message cannot be less than 0.';
            errorLocator = this.page.locator('.v-messages__message:has-text("alerting message")');
        }

        await expect(errorLocator).toHaveText(expectedError);
    }

    async typeLettersIntoInput(type: 'changingStop' | 'alertingMessage', letters: string) {
        const input = type === 'changingStop' ? this.geofenceForChangingInput : this.geofenceForAlertingInput;
        const mod = process.platform === 'darwin' ? 'Meta' : 'Control';

        await input.click();
        await this.page.keyboard.press(`${mod}+A`);
        await this.page.keyboard.type(letters);
    }

    async assertInputEmpty(type: 'changingStop' | 'alertingMessage') {
        const input = type === 'changingStop' ? this.geofenceForChangingInput : this.geofenceForAlertingInput;
        await expect(input).toHaveValue('');
    }

    async readValue(type: 'changingStop' | 'alertingMessage'): Promise<string> {
        const input = type === 'changingStop' ? this.geofenceForChangingInput : this.geofenceForAlertingInput;
        return input.inputValue();
    }

    async assertEmptyError(type: 'changingStop' | 'alertingMessage') {
        let expectedError;
        let errorLocator;

        if (type === 'changingStop') {
            expectedError = 'Geofence range for changing stop is required.';
            errorLocator = this.page.locator('.v-messages__message:has-text("changing stop")');
        } else {
            expectedError = 'Geofence range for alerting message is required.';
            errorLocator = this.page.locator('.v-messages__message:has-text("alerting message")');
        }

        await expect(errorLocator).toHaveText(expectedError);
    }

    async saveWithoutValue() {
        await this.geofenceForChangingInput.clear();
        await this.geofenceForAlertingInput.clear();
        await this.saveBtn.click();
    }
}
