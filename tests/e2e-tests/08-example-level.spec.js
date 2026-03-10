import { test, expect } from '@playwright/test';
test.describe('example level', () => {
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
        await page.getByLabel('Battery Level').fill('21');
        await page.getByLabel('Normal Mode').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
        await page.getByLabel('Battery Level').fill('18');
        await page.getByLabel('Low Power Mode').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has updated the current function panel', async () => {
        const currentFunctionPanel = page.getByTestId('current-function');
        const codeLines = currentFunctionPanel.locator('code > div');
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '    if (batteryLevel >= 20) return "Normal Mode"', '  return "Low Power Mode"', '}']);
    });
    test('has all unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests');
        await expect(unitTestsPanel).toContainText('powerMode(20) === "Normal Mode"');
        await expect(unitTestsPanel).toContainText('powerMode(19) === "Low Power Mode"');
        await expect(unitTestsPanel).toContainText('powerMode(21) === "Normal Mode"');
        await expect(unitTestsPanel).toContainText('powerMode(18) === "Low Power Mode"');
    });
    test('has updatedlevel overview panel', async () => {
        const levelsPanel = page.getByTestId('level-overview');
        await expect(levelsPanel).toContainText('1🥇2▶️3🔒4🔒5🔒6🔒7🔒8🔒9🔒10🔒');
    });
    test('has play next level message', async () => {
        const messages = page.getByTestId('messages');
        const button = messages.getByRole('button');
        await expect(button).toHaveText('I want to play Level 2 - Voting Age');
    });
    test.afterAll(async () => {
        await page.close();
    });
});
