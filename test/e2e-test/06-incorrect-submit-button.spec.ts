import { test, expect } from '../fixture/fixture-coverage'

test.describe('incorrect submit button', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game?speed=fast&picker=fixed')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests', exact: true }).click()
    })

    test('has NOT checked unit tests message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).not.toContainText('I checked the unit tests.')
    })

    test('has not asked message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hmm, that\'s not quite right. Try again.')
    })

    test('has NOT updated the current function panel', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '    return "UNKNOWN"', '}'])
    })

    test('has TWO before menu messages', async ({ page }) => {
        const messages = page.getByTestId('messages')
        const beforeMenuMessages = messages.getByText('The Specification contains the number 20', { exact: false })
        await expect(beforeMenuMessages).toHaveCount(2)
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
