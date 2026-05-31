import { test, expect } from '../fixture/fixture-coverage'

test.describe('incorrect add button', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast')
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

    test('has unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('powerMode(21) === "Normal Mode"')
    })

    test('has not asked message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hmm, that\'s not quite right. Try again.')
    })

    test('has NOT added unit test in unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).not.toContainText('powerMode(21) === "Normal Mode"')
    })

    test('has NOT updated the current function panel', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '  if (batteryLevel === 20) return "Normal Mode"', '  return "Low Power Mode"', '}'])
    })

    test('has a battery level field', async ({ page }) => {
        const batteryLevel = page.getByRole('textbox', { name: 'Battery level' })
        await expect(batteryLevel).toBeVisible()
    })

    test('has a power mode field', async ({ page }) => {
        const powerMode = page.getByRole('radio', { name: 'Power Mode' })
        await expect(powerMode).toBeVisible()
    })

    test('has add this unit test button', async ({ page }) => {
        const button = page.getByRole('button', { name: 'I want to add this unit test' })
        await expect(button).toBeVisible()
    })

    test('has submit unit tests button', async ({ page }) => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests' })
        await expect(button).toBeVisible()
    })
})
