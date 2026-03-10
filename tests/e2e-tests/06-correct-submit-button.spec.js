import { test, expect } from '@playwright/test';
test.describe('correct submit button test', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        page = await context.newPage();
        await page.goto('/');
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click();
        await page.getByLabel('Battery Level').fill('20');
        await page.getByLabel('Normal Mode').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByLabel('Battery Level').fill('19');
        await page.getByLabel('Low Power Mode').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has checked unit tests message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('I checked the unit tests.');
    });
    test('has NOT not asked message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).not.toContainText('That is NOT what I asked for!');
    });
    test('has NOT updated the current function panel', async () => {
        const currentFunctionPanel = page.getByTestId('current-function');
        const codeLines = currentFunctionPanel.locator('code > div');
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '    if (batteryLevel === 20) return "Normal Mode"', '  return "Low Power Mode"', '}']);
    });
    test('has not according message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('The Current Function is NOT according to the Specification');
    });
    test('has failing unit test message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('It produces the following incorrect result.powerMode(21) === "Low Power Mode"');
    });
    test('has hint message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('Write a unit test that is according to the Specification and does NOT pass the Current Function.');
    });
    test('has need message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('I think you need at least 2 more unit tests to make the Current Function according to the Specification.');
    });
    test('has a battery level field', async () => {
        const batteryLevel = page.getByRole('textbox', { name: 'Battery level' });
        await expect(batteryLevel).toBeVisible();
    });
    test('has a power mode field', async () => {
        const powerMode = page.getByRole('radio', { name: 'Power Mode' });
        await expect(powerMode).toBeVisible();
    });
    test('has add this unit test button', async () => {
        const button = page.getByRole('button', { name: 'I want to add this unit test' });
        await expect(button).toBeVisible();
    });
    test('has submit unit tests button', async () => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests' });
        await expect(button).toBeVisible();
    });
    test.afterAll(async () => {
        await page.close();
    });
});
