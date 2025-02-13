"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('game start', () => {
    test_1.test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        page.getByText('I want to have a nice introduction into this game').click();
        page.getByText('I want to write unit tests for a function that checks if a person is allowed to vote based on their age').click();
    });
    (0, test_1.test)('has no about panel', async ({ page }) => {
        const aboutPanel = page.locator('#about');
        await (0, test_1.expect)(aboutPanel).not.toBeAttached();
    });
    (0, test_1.test)('has no high scores panel', async ({ page }) => {
        const highScoresPanel = page.locator('#high-scores');
        await (0, test_1.expect)(highScoresPanel).not.toBeAttached();
    });
    (0, test_1.test)('has introduction message', async ({ page }) => {
        const messages = page.locator('#messages');
        await (0, test_1.expect)(messages).toContainText('A legal voting age is the minimum age that a person is allowed to vote in a democratic process.');
    });
    (0, test_1.test)('has contract message', async ({ page }) => {
        const messages = page.locator('#messages');
        await (0, test_1.expect)(messages).toContainText('It is your task to write unit tests for this function.');
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
