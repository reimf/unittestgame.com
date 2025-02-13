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
    (0, test_1.test)('has specification panel', async ({ page }) => {
        const specificationPanel = page.locator('#specification');
        await (0, test_1.expect)(specificationPanel).toContainText('Specification');
    });
    (0, test_1.test)('has unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.locator('#unit-tests');
        await (0, test_1.expect)(unitTestsPanel).toContainText('Unit Tests');
    });
    (0, test_1.test)('has current candidate panel', async ({ page }) => {
        const currentCandidatePanel = page.locator('#current-candidate');
        await (0, test_1.expect)(currentCandidatePanel).toContainText('Current Function');
    });
    (0, test_1.test)('has the simplest candidate in the current candidate panel', async ({ page }) => {
        const currentCandidatePanel = page.locator('#current-candidate');
        await (0, test_1.expect)(currentCandidatePanel).toContainText(/function isAllowedToVote\(age\) \{\s+return (true|false)\s+\}/);
    });
    (0, test_1.test)('has score panel', async ({ page }) => {
        const scorePanel = page.locator('#score');
        await (0, test_1.expect)(scorePanel).toContainText('Score');
    });
    (0, test_1.test)('has introduction message', async ({ page }) => {
        const messages = page.locator('#messages');
        await (0, test_1.expect)(messages).toContainText('A government needs a function that determines whether someone is allowed to vote or not.');
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
