import { test, expect, Page } from '@playwright/test'

test.describe('level start', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click()
    })

    test('has NO unittestgame panel', async () => {
        const unittestgamePanel = page.getByTestId('unittestgame')
        await expect(unittestgamePanel).not.toBeVisible()
    })

    test('has specification panel', async () => {
        const specificationPanel = page.getByTestId('specification')
        await expect(specificationPanel).toContainText('Specification (Level 1 - Battery Level)')
        await expect(specificationPanel).toContainText('A smartphone normally operates in "Normal Mode", but when the battery level is less than 20%, it operates in "Low Power Mode".')
    })

    test('has NO unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).not.toBeVisible()
    })

    test('has the simplest candidate in the current function panel', async () => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('function powerMode(batteryLevel) {  return undefined}')
    })

    test('has NO the function panel', async () => {
        const theFunctionPanel = page.getByTestId('the-function')
        await expect(theFunctionPanel).not.toBeVisible()
    })

    test('has read specification message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('First, read the Specification. Then write a unit test')
    })

    test('has improve function message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('After adding a unit test, I\'ll improve the Current Function')
    })

    test('has submit message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('when you think the Current Function matches the Specification')
    })

    test('has before menu message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('The Specification contains the number 20')
    })

    test('has a battery level field', async () => {
        const batteryLevel = page.getByRole('textbox', { name: 'Battery level' })
        await expect(batteryLevel).toBeVisible()
    })

    test('has a power mode field', async () => {
        const powerMode = page.getByRole('radio', { name: 'Power Mode' })
        await expect(powerMode).toBeVisible()
    })

    test('has add this unit test button', async () => {
        const button = page.getByRole('button', { name: 'I want to add this unit test' })
        await expect(button).toBeVisible()
    })

    test('has submit unit tests button', async () => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests' })
        await expect(button).toBeVisible()
    })

    test.afterAll(async () => {
        await page.close()
    })
})
