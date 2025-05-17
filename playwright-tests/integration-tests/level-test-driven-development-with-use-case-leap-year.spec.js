import { test, expect } from '@playwright/test';
import { TestDrivenDevelopment } from '../../src/level-test-driven-development.js';
import { TestCases } from './test-cases.js';
test.describe('class Level Test-Driven Development with use case Leap Year', () => {
    const testCases = new TestCases();
    const useCase = testCases.useCase;
    const level = new TestDrivenDevelopment(useCase);
    test.describe('method findSimplestPassingCandidate', () => {
        testCases.all.forEach(({ unitTests, simplestPassingCandidatesTestDrivenDevelopment }) => {
            test(`finds the simplest passing candidate for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const code = level.findSimplestPassingCandidate(useCase.candidates, useCase.perfectCandidates, unitTests).toString();
                expect(simplestPassingCandidatesTestDrivenDevelopment).toContain(code);
            });
        });
    });
    test.describe('method findNumberOfUnitTestsStillNeeded', () => {
        testCases.all.forEach(({ unitTests, numberOfUnitTestsStillNeeded }) => {
            test(`finds the number of unit tests still needed for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const result = level.findNumberOfUnitTestsStillNeeded(unitTests, useCase.subsetsOfMinimalUnitTests, useCase.candidates, useCase.perfectCandidates.length);
                expect(result).toBe(numberOfUnitTestsStillNeeded);
            });
        });
    });
});
