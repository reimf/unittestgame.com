import { test, expect } from '../fixture/fixture-coverage'

test.describe('incorrect add button', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game-en.html?speed=fast')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true }).click()
        await page.getByLabel('batteryLevel').fill('20')
        await page.getByLabel('"NORMAL MODE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByLabel('batteryLevel').fill('19')
        await page.getByLabel('"LOW POWER MODE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByLabel('batteryLevel').fill('21')
        await page.getByLabel('"NORMAL MODE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
    })

    test('has unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('powerMode(21) === "NORMAL MODE"')
    })

    test('has not asked message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hmm, that\'s not quite right. Try again.')
    })

    test('has NOT added unit test in unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).not.toContainText('powerMode(21) === "NORMAL MODE"')
    })

    test('has NOT updated the current function panel', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '    if (batteryLevel === 20) return "NORMAL MODE"', '    return "LOW POWER MODE"', '}'])
    })

    test('has a battery level field', async ({ page }) => {
        const batteryLevel = page.getByRole('spinbutton', { name: 'Value of parameter batteryLevel', exact: true})
        await expect(batteryLevel).toBeVisible()
    })

    test('has a power mode field', async ({ page }) => {
        const powerMode = page.getByRole('radio', { name: '"LOW POWER MODE"', exact: true })
        await expect(powerMode).toBeVisible()
    })

    test('has add this unit test button', async ({ page }) => {
        const button = page.getByRole('button', { name: 'I want to add this unit test', exact: true })
        await expect(button).toBeVisible()
    })

    test('has submit unit tests button', async ({ page }) => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests', exact: true })
        await expect(button).toBeVisible()
    })
})
