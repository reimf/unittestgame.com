import { test, expect } from '@playwright/test';
import { Example } from '../../src/example.js';
import { Level } from '../../src/level.js';
import { MutationTesting } from '../../src/methodology_mutation_testing.js';
import { TestDrivenDevelopment } from '../../src/methodology_test_driven_development.js';
import { BatteryLevel } from '../../src/use_case_battery_level.js';
import { VotingAge } from '../../src/use_case_voting_age.js';
import { EvenOdd } from '../../src/use_case_even_odd.js';
import { FizzBuzz } from '../../src/use_case_fizz_buzz.js';
import { TriangleType } from '../../src/use_case_triangle_type.js';
import { LeapYear } from '../../src/use_case_leap_year.js';
import { FloatFormat } from '../../src/use_case_float_format.js';
import { PasswordStrength } from '../../src/use_case_password_strength.js';
import { SpeedDisplay } from '../../src/use_case_speed_display.js';
import { BooleanVariable, RadioVariable } from '../../src/variable.js';
test.describe('whole game', () => {
    test('plays whole game', async ({ browser }) => {
        test.slow();
        const testDrivenDevelopment = new TestDrivenDevelopment();
        const mutationTesting = new MutationTesting();
        const batteryLevel = new BatteryLevel();
        const votingAge = new VotingAge();
        const evenOdd = new EvenOdd();
        const fizzBuzz = new FizzBuzz();
        const triangleType = new TriangleType();
        const leapYear = new LeapYear();
        const floatFormat = new FloatFormat();
        const passwordStrength = new PasswordStrength();
        const speedDisplay = new SpeedDisplay();
        const levels = [
            new Example(testDrivenDevelopment, batteryLevel),
            new Level(testDrivenDevelopment, votingAge),
            new Example(mutationTesting, batteryLevel),
            new Level(mutationTesting, evenOdd),
            new Level(testDrivenDevelopment, fizzBuzz),
            new Level(mutationTesting, triangleType),
            new Level(testDrivenDevelopment, evenOdd),
            new Level(mutationTesting, votingAge),
            new Level(testDrivenDevelopment, triangleType),
            new Level(mutationTesting, fizzBuzz),
            new Level(testDrivenDevelopment, leapYear),
            new Level(mutationTesting, passwordStrength),
            new Level(testDrivenDevelopment, speedDisplay),
            new Level(mutationTesting, floatFormat),
            new Level(testDrivenDevelopment, passwordStrength),
            new Level(mutationTesting, leapYear),
            new Level(testDrivenDevelopment, floatFormat),
            new Level(mutationTesting, speedDisplay),
        ];
        const context = await browser.newContext();
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' });
        const page = await context.newPage();
        await page.goto('/');
        await page.getByRole('button', { name: 'I want a sidebar with information on terms with a purple background' }).click();
        for (let index = 0; index < levels.length; index++) {
            const level = levels[index];
            await page.getByRole('button', { name: `I want to play Level ${index + 1} - ${level.description()}` }).click();
            if (level instanceof Example) {
                await page.getByRole('button', { name: 'I want to add this unit test' }).click();
                await page.getByRole('button', { name: 'I want to add this unit test' }).click();
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
                await page.getByRole('button', { name: 'I want to add this unit test' }).click();
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
                await page.getByRole('button', { name: 'I want to add this unit test' }).click();
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
            }
            else {
                const useCase = level.useCase;
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
