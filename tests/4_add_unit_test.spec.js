"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('add unit test', () => {
    test_1.test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByText('I want to have a nice introduction into this game').click();
        await page.getByText('I want to write unit tests for a function that checks if a person is allowed to vote based on their age').click();
        await page.getByText('I want to add a unit test').click();
    });
    (0, test_1.test)('has age number field', async ({ page }) => {
        const age = page.locator('input[name="age"][type="number"]');
        await (0, test_1.expect)(age).toBeInViewport();
    });
    (0, test_1.test)('has isAllowedToVote checkbox', async ({ page }) => {
        const isAllowedToVote = page.locator('input[name="isAllowedToVote"][type="checkbox"]');
        await (0, test_1.expect)(isAllowedToVote).toBeInViewport();
    });
    (0, test_1.test)('has submit button', async ({ page }) => {
        const submitButton = page.locator('input[type="submit"]');
        await (0, test_1.expect)(submitButton).toBeInViewport();
    });
    (0, test_1.test)('has cancel button', async ({ page }) => {
        const cancelButton = page.locator('button');
        await (0, test_1.expect)(cancelButton).toBeInViewport();
    });
});
