import { test, expect } from '@playwright/test';
import { MutationTesting } from '../../src/level-mutation-testing.js';
import { TestDrivenDevelopment } from '../../src/level-test-driven-development.js';
import { Locale } from '../../src/locale.js';
import { BatteryLevel } from '../../src/use-case-battery-level.js';
import { VotingAge } from '../../src/use-case-voting-age.js';
import { EvenOdd } from '../../src/use-case-even-odd.js';
import { FizzBuzz } from '../../src/use-case-fizz-buzz.js';
import { TriangleType } from '../../src/use-case-triangle-type.js';
import { LeapYear } from '../../src/use-case-leap-year.js';
import { FloatFormat } from '../../src/use-case-float-format.js';
import { PasswordStrength } from '../../src/use-case-password-strength.js';
import { SpeedDisplay } from '../../src/use-case-speed-display.js';
import { BooleanVariable, RadioVariable } from '../../src/variable.js';
test.describe('whole game', () => {
    test('plays whole game', async ({ browser }) => {
        test.slow();
        const locale = new Locale('en');
        const batteryLevel = new BatteryLevel(locale);
        const votingAge = new VotingAge(locale);
        const evenOdd = new EvenOdd(locale);
        const fizzBuzz = new FizzBuzz(locale);
        const triangleType = new TriangleType(locale);
        const leapYear = new LeapYear(locale);
        const floatFormat = new FloatFormat(locale);
        const passwordStrength = new PasswordStrength(locale);
        const speedDisplay = new SpeedDisplay(locale);
        const exampleTestDrivenDevelopment = new TestDrivenDevelopment(locale, batteryLevel);
        const exampleMutationTesting = new MutationTesting(locale, batteryLevel);
        const examples = [exampleTestDrivenDevelopment, exampleMutationTesting];
        const levelsAndUseCases = [
            [exampleTestDrivenDevelopment, batteryLevel],
            [new TestDrivenDevelopment(locale, votingAge), votingAge],
            [exampleMutationTesting, batteryLevel],
            [new MutationTesting(locale, evenOdd), evenOdd],
            [new TestDrivenDevelopment(locale, fizzBuzz), fizzBuzz],
            [new MutationTesting(locale, triangleType), triangleType],
            [new TestDrivenDevelopment(locale, evenOdd), evenOdd],
            [new MutationTesting(locale, votingAge), votingAge],
            [new TestDrivenDevelopment(locale, triangleType), triangleType],
            [new MutationTesting(locale, fizzBuzz), fizzBuzz],
            [new TestDrivenDevelopment(locale, leapYear), leapYear],
            [new MutationTesting(locale, passwordStrength), passwordStrength],
            [new TestDrivenDevelopment(locale, speedDisplay), speedDisplay],
            [new MutationTesting(locale, floatFormat), floatFormat],
            [new TestDrivenDevelopment(locale, passwordStrength), passwordStrength],
            [new MutationTesting(locale, leapYear), leapYear],
            [new TestDrivenDevelopment(locale, floatFormat), floatFormat],
            [new MutationTesting(locale, speedDisplay), speedDisplay],
        ];
        const context = await browser.newContext();
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        const page = await context.newPage();
        await page.goto('/');
        for (let index = 0; index < levelsAndUseCases.length; index++) {
            const [level, useCase] = levelsAndUseCases[index];
            await page.getByRole('button', { name: `I want to play Level ${index + 1} of ${levelsAndUseCases.length} - ${level.description()}` }).click();
            if (examples.includes(level)) {
                await page.getByRole('button', { name: 'I want to add this unit test' }).click();
                await page.getByRole('button', { name: 'I want to add this unit test' }).click();
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
                await page.getByRole('button', { name: 'I want to add this unit test' }).click();
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
                await page.getByRole('button', { name: 'I want to add this unit test' }).click();
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
            }
            else {
                const variables = [...useCase.parameters, useCase.unit];
                for (const unitTest of useCase.minimalUnitTests) {
                    const values = [...unitTest.argumentList, unitTest.expected];
                    for (let i = 0; i < variables.length; i++) {
                        const [variable, value] = [variables[i], values[i]];
                        if (variable instanceof RadioVariable || variable instanceof BooleanVariable)
                            await page.getByLabel(value.toString()).check();
                        else
                            await page.getByLabel(variable.label).fill(value.toString());
                    }
                    await page.getByRole('button', { name: 'I want to add this unit test' }).click();
                }
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
            }
        }
        const button = page.getByRole('button', { name: 'I played all the levels' });
        await expect(button).toBeInViewport();
    });
});
