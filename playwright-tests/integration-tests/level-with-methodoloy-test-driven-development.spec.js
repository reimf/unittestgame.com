import { test, expect } from '@playwright/test';
import { Level } from '../../src/level.js';
import { TestDrivenDevelopment } from '../../src/methodology-test-driven-development.js';
import { TestCases } from './test-cases.js';
test.describe('class Level with class Methodology Test-Driven Development', () => {
    test.describe('method findSimplestPassingCandidate', () => {
        const testCases = new TestCases();
        const level = new Level(new TestDrivenDevelopment(), testCases.useCase);
        testCases.all.forEach(({ unitTests, simplestPassingCandidatesTestDrivenDevelopment }) => {
            test(`finds the simplest passing candidate for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                expect(simplestPassingCandidatesTestDrivenDevelopment).toContain(level.findSimplestPassingCandidate(unitTests).toString());
            });
        });
    });
});
