import { test, expect } from '@playwright/test'
import { Level } from '../../src/level-base.js'
import { MutationTesting } from '../../src/level-mutation-testing.js'
import { TestDrivenDevelopment } from '../../src/level-test-driven-development.js'
import { UseCase } from '../../src/use-case-base.js'
import { BatteryLevel } from '../../src/use-case-battery-level.js'
import { VotingAge } from '../../src/use-case-voting-age.js'
import { EvenOdd } from '../../src/use-case-even-odd.js'
import { FizzBuzz } from '../../src/use-case-fizz-buzz.js'
import { TriangleType } from '../../src/use-case-triangle-type.js'
import { LeapYear } from '../../src/use-case-leap-year.js'
import { FloatFormat } from '../../src/use-case-float-format.js'
import { PasswordStrength } from '../../src/use-case-password-strength.js'
import { SpeedDisplay } from '../../src/use-case-speed-display.js'
import { BooleanVariable, RadioVariable } from '../../src/variable.js'

type LevelAndUseCase = [Level, UseCase]

test.describe('whole game', () => {
    test('plays whole game', async ({ browser }) => {
        test.slow()

        const batteryLevel: UseCase = new BatteryLevel()
        const votingAge: UseCase = new VotingAge()
        const evenOdd: UseCase = new EvenOdd()
        const fizzBuzz: UseCase = new FizzBuzz()
        const triangleType: UseCase = new TriangleType()
        const leapYear: UseCase = new LeapYear()
        const floatFormat: UseCase = new FloatFormat()
        const passwordStrength: UseCase = new PasswordStrength()
        const speedDisplay: UseCase = new SpeedDisplay()

        const exampleTestDrivenDevelopment: Level = new TestDrivenDevelopment(batteryLevel)
        const exampleMutationTesting: Level = new MutationTesting(batteryLevel)
        const examples = [exampleTestDrivenDevelopment, exampleMutationTesting]
        const levelsAndUseCases: LevelAndUseCase[] = [
            [exampleTestDrivenDevelopment, batteryLevel],
            [new TestDrivenDevelopment(votingAge), votingAge],
            [exampleMutationTesting, batteryLevel],
            [new MutationTesting(evenOdd), evenOdd],
            [new TestDrivenDevelopment(fizzBuzz), fizzBuzz],
            [new MutationTesting(triangleType), triangleType],
            [new TestDrivenDevelopment(evenOdd), evenOdd],
            [new MutationTesting(votingAge), votingAge],
            [new TestDrivenDevelopment(triangleType), triangleType],
            [new MutationTesting(fizzBuzz), fizzBuzz],
            [new TestDrivenDevelopment(leapYear), leapYear],
            [new MutationTesting(passwordStrength), passwordStrength],
            [new TestDrivenDevelopment(speedDisplay), speedDisplay],
            [new MutationTesting(floatFormat), floatFormat],
            [new TestDrivenDevelopment(passwordStrength), passwordStrength],
            [new MutationTesting(leapYear), leapYear],
            [new TestDrivenDevelopment(floatFormat), floatFormat],
            [new MutationTesting(speedDisplay), speedDisplay],
        ]

        const context = await browser.newContext()
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        const page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want a sidebar with information on terms with a purple background' }).click()

        for (let index = 0; index < levelsAndUseCases.length; index++) {
            const [level, useCase] = levelsAndUseCases[index]
            await page.getByRole('button', { name: `I want to play Level ${index + 1} - ${level.description()}` }).click()

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
