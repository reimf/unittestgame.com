"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('game menu', () => {
    test_1.test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        page.getByText('I want to have a nice introduction into this game').click();
    });
    (0, test_1.test)('has game menu message', async ({ page }) => {
        const messages = page.locator('#messages');
        const buttons = messages.locator('button');
        await (0, test_1.expect)(buttons).toHaveText([
            'I want to write unit tests for a function that checks if a person is allowed to vote based on their age',
        ]);
    });
});
