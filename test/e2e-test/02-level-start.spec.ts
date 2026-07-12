import { test, expect } from '../fixture/fixture-coverage'

test.describe('level start', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&picker=fixed')
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click()
    })

    test('has NO unittestgame panel', async ({ page }) => {
        const unittestgamePanel = page.getByTestId('unittestgame')
        await expect(unittestgamePanel).not.toBeVisible()
    })

    test('has specification panel', async ({ page }) => {
        const specificationPanel = page.getByTestId('specification')
        await expect(specificationPanel).toContainText('Specification (Level 1 - Battery Level)')
        await expect(specificationPanel).toContainText('A smartphone normally operates in NORMAL MODE, but when the battery level is less than 20, it operates in LOW POWER MODE.')
    })

    test('has NO unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).not.toBeVisible()
    })

    test('has the simplest candidate in the current function panel', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('function powerMode(batteryLevel) {  return ""}')
    })

    test('has NO the function panel', async ({ page }) => {
        const theFunctionPanel = page.getByTestId('the-function')
        await expect(theFunctionPanel).not.toBeVisible()
    })

    test('has read specification message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('First, read the Specification. Then write a unit test')
    })

    test('has submit message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('when you think the Current Function matches the Specification')
    })

    test('has before menu message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('The Specification contains the number 20')
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
