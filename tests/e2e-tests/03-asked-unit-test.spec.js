import { test, expect } from '@playwright/test';
test.describe('asked unit test', () => {
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
    });
    test('has unit test message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('powerMode(20) === "Normal Mode"');
    });
    test('has NOT not asked message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).not.toContainText('That is NOT what I asked for!');
    });
    test('has added unit test message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('I added the unit test');
    });
    test('has added unit test in unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests');
        await expect(unitTestsPanel).toContainText('powerMode(20) === "Normal Mode"');
    });
    test('has updated the current function panel', async () => {
        const currentFunctionPanel = page.getByTestId('current-function');
        const codeLines = currentFunctionPanel.locator('code > div');
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '  return "Normal Mode"', '}']);
    });
    test('has before menu message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('The Current Function now always returns "Normal Mode".');
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
