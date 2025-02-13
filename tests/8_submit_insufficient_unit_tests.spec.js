"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('submit insufficient unit test', () => {
    test_1.test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByText('I want to have a nice introduction into this game').click();
        await page.getByText('I want to write unit tests for a function that checks if a person is allowed to vote based on their age').click();
        await page.getByText('I want to submit the unit tests').click();
    });
    (0, test_1.test)('has bug found message', async ({ page }) => {
        const messages = page.locator('#messages');
        await (0, test_1.expect)(messages).toContainText('There are still bugs in the function.');
    });
    (0, test_1.test)('has unit test in bug found message', async ({ page }) => {
        const messages = page.locator('#messages');
        await (0, test_1.expect)(messages).toContainText(/\d+ -> (true|false)/);
    });
    (0, test_1.test)('has action menu message', async ({ page }) => {
        const messages = page.locator('#messages');
        const buttons = messages.locator('button');
        await (0, test_1.expect)(buttons).toHaveText([
            'I want to add a unit test',
            'I want to see a hint for a unit test',
            'I want to submit the unit tests',
            'I want to end the game',
        ]);
    });
});
