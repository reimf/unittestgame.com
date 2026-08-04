import { test, expect } from '../fixture/fixture-coverage'

const languages = [
    {
        name: 'csharp',
        battery: {
            title: 'has the simplest candidate rendered in C# format in the current function panel',
            expected: 'static string powerMode(int batteryLevel){    return "UNKNOWN";}',
        },
        votingAge: {
            title: 'has a plain bool return type in the current function panel',
            expected: 'static bool isAllowedToVote(int age){    return true;}',
        },
        speedDisplay: {
            title: 'has an int parameter type in the current function panel of Speed Display',
            expected: 'static string display(int speed){',
        },
    },
    {
        name: 'java',
        battery: {
            title: 'has the simplest candidate rendered in Java format in the current function panel',
            expected: 'static String powerMode(int batteryLevel) {    return "UNKNOWN";}',
        },
        votingAge: {
            title: 'has a primitive boolean return type in the current function panel',
            expected: 'static boolean isAllowedToVote(int age) {    return true;}',
        },
        speedDisplay: {
            title: 'has an int parameter type in the current function panel of Speed Display',
            expected: 'static String display(int speed) {',
        },
    },
    {
        name: 'php',
        battery: {
            title: 'has the simplest candidate rendered in PHP format in the current function panel',
            expected: 'function powerMode(int $batteryLevel): string {    return "UNKNOWN";}',
        },
        votingAge: {
            title: 'has a bool return type in the current function panel',
            expected: 'function isAllowedToVote(int $age): bool {    return true;}',
        },
        speedDisplay: {
            title: 'has an int parameter type in the current function panel of Speed Display',
            expected: 'function display(int $speed): string {',
        },
    },
    {
        name: 'python',
        battery: {
            title: 'has the simplest candidate rendered in Python format in the current function panel',
            expected: 'def powerMode(batteryLevel: int) -> str:    return "UNKNOWN"',
        },
        votingAge: {
            title: 'has a plain bool return type in the current function panel',
            expected: 'def isAllowedToVote(age: int) -> bool:    return True',
        },
    },
    {
        name: 'ruby',
        battery: {
            title: 'has the simplest candidate rendered in Ruby format in the current function panel',
            expected: 'def powerMode(batteryLevel)    return "UNKNOWN"end',
        },
        votingAge: {
            title: 'has a plain boolean return value in the current function panel',
            expected: 'def isAllowedToVote(age)    return trueend',
        },
        speedDisplay: {
            title: 'has an untyped parameter in the current function panel of Speed Display',
            expected: 'def display(speed)',
        },
    },
    {
        name: 'typescript',
        battery: {
            title: 'has the simplest candidate rendered in TypeScript format in the current function panel',
            expected: 'function powerMode(batteryLevel: number): string {    return "UNKNOWN"}',
        },
        votingAge: {
            title: 'has a plain boolean return type in the current function panel',
            expected: 'function isAllowedToVote(age: number): boolean {    return true}',
        },
        speedDisplay: {
            title: 'has a number parameter type in the current function panel of Speed Display',
            expected: 'function display(speed: number): string {',
        },
    },
]

for (const language of languages) {
    test.describe(`${language.name} programming language`, () => {
        test(language.battery.title, async ({ page }) => {
            await page.goto(`/game?speed=fast&picker=fixed&programming_language=${language.name}`)
            await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true }).click()
            const currentFunctionPanel = page.getByTestId('current-function')
            const codeLines = currentFunctionPanel.locator('code')
            await expect(codeLines).toContainText(language.battery.expected)
        })

        test(language.votingAge.title, async ({ page }) => {
            await page.goto(`/game?speed=fast&programming_language=${language.name}&setitem=level-battery-level-finished:1`)
            await page.getByRole('button', { name: 'I want to play Level 1 - Voting Age', exact: true }).click()
            await page.getByLabel('Age').fill('18')
            await page.getByLabel('true').check()
            await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
            const currentFunctionPanel = page.getByTestId('current-function')
            const codeLines = currentFunctionPanel.locator('code')
            await expect(codeLines).toContainText(language.votingAge.expected)
        })

        if (language.speedDisplay) {
            test(language.speedDisplay.title, async ({ page }) => {
                await page.goto(`/game?speed=fast&programming_language=${language.name}&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:1&setitem=level-wind-scale-finished:1&setitem=level-review-finished:1&setitem=level-discount-finished:1&setitem=level-fizz-buzz-finished:1&setitem=level-leap-year-finished:1&setitem=level-triangle-type-finished:1`)
                await page.getByRole('button', { name: 'I want to play Level 8 - Speed Display', exact: true }).click()
                const currentFunctionPanel = page.getByTestId('current-function')
                const codeLines = currentFunctionPanel.locator('code')
                await expect(codeLines).toContainText(language.speedDisplay.expected)
            })
        }
    })
}
