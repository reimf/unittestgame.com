import { test, expect } from '@playwright/test';
import { TestResult } from '../../src/test_result.js';
import { Candidate } from '../../src/candidate.js';
import { UnitTest } from '../../src/unit_test.js';
test.describe('class TestResult', () => {
    test('passes', () => {
        const candidate = new Candidate('function divide(a, b) { return a / b }');
        const unitTest = new UnitTest([6, 3], 2);
        const testResult = new TestResult(candidate, unitTest);
        expect(testResult.passes).toBe(true);
    });
    test('fails', () => {
        const candidate = new Candidate('function divide(a, b) { return a / b }');
        const unitTest = new UnitTest([6, 3], 5);
        const testResult = new TestResult(candidate, unitTest);
        expect(testResult.passes).toBe(false);
    });
    test('converts to a string', () => {
        const candidate = new Candidate('function divide(a, b) { return a / b }');
        const unitTest = new UnitTest([6, 3], 5);
        const testResult = new TestResult(candidate, unitTest);
        expect(testResult.toString()).toBe('6,3 -> 2');
    });
});
