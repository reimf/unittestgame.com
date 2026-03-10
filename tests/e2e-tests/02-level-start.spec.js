import { test, expect } from '@playwright/test';
test.describe('level start', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        page = await context.newPage();
        await page.goto('/');
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click();
    });
    test('has no unittestgame panel', async () => {
        const unittestgamePanel = page.getByTestId('unittestgame');
        await expect(unittestgamePanel).not.toBeAttached();
    });
    test('has specification panel', async () => {
        const specificationPanel = page.getByTestId('specification');
        await expect(specificationPanel).toContainText('Specification (Level 1 - Battery Level)');
        await expect(specificationPanel).toContainText('A smartphone normally operates in "Normal Mode", but when the battery level is less than 20%, it operates in "Low Power Mode".');
    });
    test('has no unit tests in the unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests');
        await expect(unitTestsPanel).toContainText('You have not written any unit tests yet');
    });
    test('has the simplest candidate in the current function panel', async () => {
        const currentFunctionPanel = page.getByTestId('current-function');
        const codeLines = currentFunctionPanel.locator('code');
        await expect(codeLines).toContainText('function powerMode(batteryLevel) {  return undefined}');
    });
    test('has no the function panel', async () => {
        const theFunctionPanel = page.getByTestId('the-function');
        await expect(theFunctionPanel).not.toBeAttached();
    });
    test('has instructions message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('In this level you only have to follow the instructions.');
    });
    test('has read specification message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('First, you read the Specification and then you write a unit test');
    });
    test('has improve function message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('After adding a unit test I will improve the Current Function');
    });
    test('has submit message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('When you think the Current Function is according to the Specification');
    });
    test('has before menu message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('The Specification contains the number 20.');
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
