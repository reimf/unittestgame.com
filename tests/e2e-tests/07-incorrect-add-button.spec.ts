import { test, expect, Page } from '@playwright/test'

test.describe('incorrect add button test', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click()
        await page.getByLabel('Battery Level').fill('20')
        await page.getByLabel('Normal Mode').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByLabel('Battery Level').fill('19')
        await page.getByLabel('Low Power Mode').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByLabel('Battery Level').fill('21')
        await page.getByLabel('Normal Mode').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
    })

    test('has unit test message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('powerMode(21) === "Normal Mode"')
    })

    test('has not asked message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('That is NOT what I asked for!')
    })

    test('has NOT added unit test in unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).not.toContainText('powerMode(21) === "Normal Mode"')
    })

    test('has NOT updated the current function panel', async () => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '  if (batteryLevel === 20) return "Normal Mode"', '  return "Low Power Mode"', '}'])
    })

    test('has TWO before menu messages', async () => {
        const messages = page.getByTestId('messages')
        const beforeMenuMessages = messages.getByText('The Current Function now sometimes returns "Normal Mode" and sometimes "Low Power Mode".')
        await expect(beforeMenuMessages).toHaveCount(2)
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
