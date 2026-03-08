import { test, expect } from '@playwright/test';
import { FixtureLevelStates } from '../fixtures/fixture-level-states.js';
import { BooleanVariable, IntegerVariable } from '../../src/variable.js';
test.describe('class Level', () => {
    const fixtureLevelStates = new FixtureLevelStates();
    const level = fixtureLevelStates.level;
    test('has a description', () => {
        expect(level.description()).toBe('Level 1 - Leap Year');
    });
    test('is playable', () => {
        expect(level.play).toBeInstanceOf(Function);
    });
    test('has a specification', () => {
        expect(level.specification()).toBe('Mock Specification');
    });
    test('has a name', () => {
        expect(level.name()).toBe('Mock Use Case');
    });
    test('has parameters', () => {
        expect(level.parameters.length).toBe(1);
        expect(level.parameters[0]).toBeInstanceOf(IntegerVariable);
        expect(level.parameters[0]?.name).toBe('year');
    });
    test('has a unit', () => {
        expect(level.unit).toBeInstanceOf(BooleanVariable);
        expect(level.unit.name).toBe('isLeapYear');
    });
    test('has candidates', () => {
        expect(level.candidates.length).toBe(54);
    });
    test('has minimal unit tests', () => {
        expect(level.minimalUnitTests.length).toBe(4);
    });
    test('has perfect candidates', () => {
        expect(level.perfectCandidates.length).toBe(1);
    });
    test('has hints', () => {
        expect(level.hints.length).toBe(51);
    });
    test.describe('method findSimplestPassingCandidate', () => {
        fixtureLevelStates.states.forEach(({ unitTests, simplestPassingCandidatesTestDrivenDevelopment }) => {
            test(`finds the simplest passing candidate for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const code = level.findSimplestPassingCandidate(level.candidates, level.perfectCandidates, unitTests).toString();
                expect(simplestPassingCandidatesTestDrivenDevelopment).toContain(code);
            });
        });
    });
    test.describe('method findNumberOfUnitTestsStillNeeded', () => {
        fixtureLevelStates.states.forEach(({ unitTests, numberOfUnitTestsStillNeeded }) => {
            test(`finds the number of unit tests still needed for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const result = level.findNumberOfUnitTestsStillNeeded(unitTests, level.subsetsOfMinimalUnitTests, level.candidates, level.perfectCandidates.length);
                expect(result).toBe(numberOfUnitTestsStillNeeded);
            });
        });
    });
});
