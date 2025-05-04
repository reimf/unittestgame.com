import { test, expect } from '@playwright/test';
import { Level } from '../../src/level.js';
import { MutationTesting } from '../../src/methodology_mutation_testing.js';
import { TestDrivenDevelopment } from '../../src/methodology_test_driven_development.js';
import { UnitTest } from '../../src/unit_test.js';
import { LeapYear } from '../../src/use_case_leap_year.js';
// make tests predictable
Math.random = () => 0;
test.describe('class LeapYear', () => {
    test('has perfect candidates', () => {
        const useCase = new LeapYear();
        expect(useCase.perfectCandidates).not.toHaveLength(0);
    });
    test('perfect candidates pass all hints', () => {
        const useCase = new LeapYear();
        const failingCandidates = useCase.perfectCandidates.filter(candidate => !candidate.passes(useCase.hints));
        expect(failingCandidates).toHaveLength(0);
    });
    test('all minimal unit tests are needed', () => {
        const useCase = new LeapYear();
        for (const unitTest of useCase.minimalUnitTests) {
            const allMinusOneUnitTests = useCase.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest);
            const almostPerfectCandidates = useCase.candidates.filter(candidate => candidate.passes(allMinusOneUnitTests));
            expect(almostPerfectCandidates.length).toBeGreaterThan(useCase.perfectCandidates.length);
        }
    });
    test.describe('with class TestDrivenDevelopment in class Level', () => {
        [
            { argumentLists: [], code: 'function isLeapYear(year) {\n  return undefined\n}' },
            { argumentLists: [[2024]], code: 'function isLeapYear(year) {\n  return true\n}' },
            { argumentLists: [[2025]], code: 'function isLeapYear(year) {\n  return false\n}' },
            { argumentLists: [[2024], [2025]], code: 'function isLeapYear(year) {\n  if (year % 4 === 0) return true\n  return false\n}' },
            { argumentLists: [[2800]], code: 'function isLeapYear(year) {\n  return true\n}' },
            { argumentLists: [[2800], [2700]], code: 'function isLeapYear(year) {\n  if (year % 400 === 0) return true\n  return false\n}' },
            { argumentLists: [[2800], [2700], [2024]], code: 'function isLeapYear(year) {\n  if (year % 400 === 0) return true\n  if (year % 100 === 0) return false\n  return true\n}' },
            { argumentLists: [[2800], [2700], [2024], [2025]], code: 'function isLeapYear(year) {\n  if (year % 200 === 0) return true\n  if (year % 100 === 0) return false\n  if (year % 4 === 0) return true\n  return false\n}' },
            { argumentLists: [[2800], [2700], [2024], [2025], [2600]], code: 'function isLeapYear(year) {\n  if (year % 400 === 0) return true\n  if (year % 100 === 0) return false\n  if (year % 4 === 0) return true\n  return false\n}' },
        ].forEach(({ argumentLists, code }) => {
            test(`has simplest passing candidate with unit tests ${argumentLists}`, () => {
                const useCase = new LeapYear();
                const level = new Level(new TestDrivenDevelopment(), useCase);
                const unitTests = argumentLists.map(argumentList => new UnitTest(useCase.parameters, argumentList, useCase.unit, useCase.perfectCandidate.execute(argumentList)));
                expect(level.findSimplestPassingCandidate(unitTests).toString()).toBe(code);
            });
        });
    });
    test.describe('with class MutationTesting in class Level', () => {
        [
            { argumentLists: [], code: 'function isLeapYear(year) {\n  return undefined\n}' },
            { argumentLists: [[2800]], code: 'function isLeapYear(year) {\n  if (year % 400 === 0) return true\n  return undefined\n}' },
            { argumentLists: [[2700]], code: 'function isLeapYear(year) {\n  if (year % 100 === 0) return false\n  return undefined\n}' },
            { argumentLists: [[2024]], code: 'function isLeapYear(year) {\n  if (year % 4 === 0) return true\n  return undefined\n}' },
            { argumentLists: [[2025]], code: 'function isLeapYear(year) {\n  return false\n}' },
            { argumentLists: [[2800], [2024]], code: 'function isLeapYear(year) {\n  if (year % 400 === 0) return true\n  if (year % 4 === 0) return true\n  return undefined\n}' },
            { argumentLists: [[2024], [2800]], code: 'function isLeapYear(year) {\n  if (year % 400 === 0) return true\n  if (year % 4 === 0) return true\n  return undefined\n}' },
            { argumentLists: [[2024], [2025]], code: 'function isLeapYear(year) {\n  if (year % 4 === 0) return true\n  return false\n}' },
            { argumentLists: [[2800], [2700]], code: 'function isLeapYear(year) {\n  if (year % 400 === 0) return true\n  if (year % 100 === 0) return false\n  return undefined\n}' },
            { argumentLists: [[2800], [2700], [2024]], code: 'function isLeapYear(year) {\n  if (year % 400 === 0) return true\n  if (year % 100 === 0) return false\n  if (year % 4 === 0) return true\n  return undefined\n}' },
            { argumentLists: [[2800], [2700], [2024], [2025]], code: 'function isLeapYear(year) {\n  if (year % 400 === 0) return true\n  if (year % 100 === 0) return false\n  if (year % 4 === 0) return true\n  return false\n}' },
        ].forEach(({ argumentLists, code }) => {
            test(`has covered candidate with unit tests ${argumentLists}`, () => {
                const useCase = new LeapYear();
                const level = new Level(new MutationTesting(), useCase);
                const unitTests = argumentLists.map(argumentList => new UnitTest(useCase.parameters, argumentList, useCase.unit, useCase.perfectCandidate.execute(argumentList)));
                expect(level.findSimplestCoveredCandidate(unitTests).toString()).toBe(code);
            });
        });
    });
});
