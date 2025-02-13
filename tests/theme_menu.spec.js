"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('theme menu', () => {
    test_1.test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
    });
    (0, test_1.test)('has title', async ({ page }) => {
        await (0, test_1.expect)(page).toHaveTitle('UnitTestGame.com');
    });
    (0, test_1.test)('has about panel', async ({ page }) => {
        const aboutPanel = page.locator('#about');
        await (0, test_1.expect)(aboutPanel).toContainText('About');
        await (0, test_1.expect)(aboutPanel).toContainText('Learn Unit Testing with UnitTestGame.com');
        await (0, test_1.expect)(aboutPanel).toContainText('Please send us feedback@unittestgame.com');
        await (0, test_1.expect)(aboutPanel.locator('a')).toHaveText('feedback@unittestgame.com');
    });
    (0, test_1.test)('has high scores panel', async ({ page }) => {
        const highScoresPanel = page.locator('#high-scores');
        await (0, test_1.expect)(highScoresPanel).toContainText('High Scores');
        await (0, test_1.expect)(highScoresPanel).toContainText('You have not played a game yet.');
    });
    (0, test_1.test)('has welcome message', async ({ page }) => {
        const messages = page.locator('#messages');
        await (0, test_1.expect)(messages).toContainText('Welcome to UnitTestGame.com!');
    });
    (0, test_1.test)('has theme menu message', async ({ page }) => {
        const messages = page.locator('#messages');
        const buttons = messages.locator('button');
        await (0, test_1.expect)(buttons).toHaveText([
            'I want to have a nice introduction into this game',
            'I want to ensure an AI-bot functions correctly',
            'I want to write better unit tests for student assignments',
            'I want to review the work of an external software company',
        ]);
    });
});
