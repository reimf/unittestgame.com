import { test, expect } from '@playwright/test'
import { Level } from '../../src/level-base.js'
import { MutationTesting } from '../../src/level-mutation-testing.js'
import { TestDrivenDevelopment } from '../../src/level-test-driven-development.js'
import { Locale } from '../../src/locale.js'
import { UseCase } from '../../src/use-case-base.js'
import { BatteryLevel } from '../../src/use-case-battery-level.js'
import { VotingAge } from '../../src/use-case-voting-age.js'
import { EvenOdd } from '../../src/use-case-even-odd.js'
import { FizzBuzz } from '../../src/use-case-fizz-buzz.js'
import { TriangleType } from '../../src/use-case-triangle-type.js'
import { LeapYear } from '../../src/use-case-leap-year.js'
import { FloatFormat } from '../../src/use-case-float-format.js'
import { PasswordStrength } from '../../src/use-case-password-strength.js'
import { Review } from '../../src/use-case-review.js'
import { SpeedDisplay } from '../../src/use-case-speed-display.js'
import { BooleanVariable, RadioVariable } from '../../src/variable.js'

type LevelAndUseCase = [Level, UseCase]

test.describe('whole game', () => {
    test('plays whole game', async ({ browser }) => {
        test.slow()

        const locale = new Locale('en')
        const batteryLevel: UseCase = new BatteryLevel(locale)
        const votingAge: UseCase = new VotingAge(locale)
        const evenOdd: UseCase = new EvenOdd(locale)
        const fizzBuzz: UseCase = new FizzBuzz(locale)
        const triangleType: UseCase = new TriangleType(locale)
        const leapYear: UseCase = new LeapYear(locale)
        const floatFormat: UseCase = new FloatFormat(locale)
        const passwordStrength: UseCase = new PasswordStrength(locale)
        const review: UseCase = new Review(locale)
        const speedDisplay: UseCase = new SpeedDisplay(locale)

        const exampleTestDrivenDevelopment: Level = new TestDrivenDevelopment(locale, batteryLevel, 1, 20)
        const exampleMutationTesting: Level = new MutationTesting(locale, batteryLevel, 3, 20)
        const examples = [exampleTestDrivenDevelopment, exampleMutationTesting]
        const levelsAndUseCases: LevelAndUseCase[] = [
            [exampleTestDrivenDevelopment, batteryLevel],
            [new TestDrivenDevelopment(locale, votingAge, 2, 20), votingAge],
            [exampleMutationTesting, batteryLevel],
            [new MutationTesting(locale, evenOdd, 4, 20), evenOdd],
            [new TestDrivenDevelopment(locale, fizzBuzz, 5, 20), fizzBuzz],
            [new MutationTesting(locale, triangleType, 6, 20), triangleType],
            [new TestDrivenDevelopment(locale, review, 7, 20), review],
            [new MutationTesting(locale, votingAge, 8, 20), votingAge],
            [new TestDrivenDevelopment(locale, evenOdd, 9, 20), evenOdd],
            [new MutationTesting(locale, review, 10, 20), review],
            [new TestDrivenDevelopment(locale, triangleType, 11, 20), triangleType],
            [new MutationTesting(locale, fizzBuzz, 12, 20), fizzBuzz],
            [new TestDrivenDevelopment(locale, leapYear, 13, 20), leapYear],
            [new MutationTesting(locale, passwordStrength, 14, 20), passwordStrength],
            [new TestDrivenDevelopment(locale, speedDisplay, 15, 20), speedDisplay],
            [new MutationTesting(locale, floatFormat, 16, 20), floatFormat],
            [new TestDrivenDevelopment(locale, passwordStrength, 17, 20), passwordStrength],
            [new MutationTesting(locale, leapYear, 18, 20), leapYear],
            [new TestDrivenDevelopment(locale, floatFormat, 19, 20), floatFormat],
            [new MutationTesting(locale, speedDisplay, 20, 20), speedDisplay],
        ]

        const context = await browser.newContext()
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        const page = await context.newPage()
        await page.goto('/')

        for (let index = 0; index < levelsAndUseCases.length; index++) {
            const [level, useCase] = levelsAndUseCases[index]
            await page.getByRole('button', { name: `I want to play ${level.description()}` }).click()

            if (examples.includes(level)) {
                await page.getByRole('button', { name: 'I want to add this unit test' }).click()
                await page.getByRole('button', { name: 'I want to add this unit test' }).click()
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
                await page.getByRole('button', { name: 'I want to add this unit test' }).click()
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
                await page.getByRole('button', { name: 'I want to add this unit test' }).click()
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
            }
            else {
                const variables = [...useCase.parameters, useCase.unit]
                for (const unitTest of useCase.minimalUnitTests) {
                    const values = [...unitTest.argumentList, unitTest.expected]
                    for (let i = 0; i < variables.length; i++) {
                        const [variable, value] = [variables[i], values[i]]
                        if (variable instanceof RadioVariable || variable instanceof BooleanVariable)
                            await page.getByLabel(value.toString()).check()
                        else
                            await page.getByLabel(variable.label).fill(value.toString())
                    }
                    await page.getByRole('button', { name: 'I want to add this unit test' }).click()
                }
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
            }
        }

        const button = page.getByRole('button', { name: 'I played all the levels' })
        await expect(button).toBeInViewport()
    })
})
