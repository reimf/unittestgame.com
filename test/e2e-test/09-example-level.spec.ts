import { test, expect } from '../fixture/fixture-coverage'

test.describe('example level', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&picker=fixed&store=map')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level' }).click()
        await page.getByLabel('Battery Level').fill('20')
        await page.getByLabel('NORMAL MODE').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByLabel('Battery Level').fill('19')
        await page.getByLabel('LOW POWER MODE').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
        await page.getByLabel('Battery Level').fill('21')
        await page.getByLabel('NORMAL MODE').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
        await page.getByLabel('Battery Level').fill('18')
        await page.getByLabel('LOW POWER MODE').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
    })

    test('has updated the current function panel', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '    if (batteryLevel >= 20) return "NORMAL MODE"', '    return "LOW POWER MODE"', '}'])
    })

    test('has all unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).toContainText('powerMode(20) === "NORMAL MODE"')
        await expect(unitTestsPanel).toContainText('powerMode(19) === "LOW POWER MODE"')
        await expect(unitTestsPanel).toContainText('powerMode(21) === "NORMAL MODE"')
        await expect(unitTestsPanel).toContainText('powerMode(18) === "LOW POWER MODE"')
    })

    test('has updatedlevel overview panel', async ({ page }) => {
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText(
            '👍Level 0 - Battery Level' +
            '▶️Level 1 - Voting Age' +
            '🔒Level 2 - Wind Scale' +
            '🔒Level 3 - Review' +
            '🔒Level 4 - FizzBuzz' +
            '🔒Level 5 - Leap Year' +
            '🔒Level 6 - Triangle Type' +
            '🔒Level 7 - Speed Display' +
            '🔒Level 8 - Float Format' +
            '🔒Level 9 - Password Strength')
    })

    test('has play next level message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 1 - Voting Age')
    })
})
