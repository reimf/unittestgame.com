import { test, expect } from '@playwright/test';
import { TestCases } from './test-cases.js';
test.describe('class TestCases', () => {
    const testCases = new TestCases();
    test('attribute all subsets of size 0', () => {
        const list = testCases.all.filter(({ unitTests }) => unitTests.length === 0);
        expect(list).toHaveLength(1);
    });
    test('attribute all subsets of size 1', () => {
        const list = testCases.all.filter(({ unitTests }) => unitTests.length === 1);
        expect(list).toHaveLength(5);
    });
    test('attribute all subsets of size 2', () => {
        const list = testCases.all.filter(({ unitTests }) => unitTests.length === 2);
        expect(list).toHaveLength(20);
    });
    test('attribute all subsets of size 3', () => {
        const list = testCases.all.filter(({ unitTests }) => unitTests.length === 3);
        expect(list).toHaveLength(60);
    });
    test('attribute all subsets of size 4', () => {
        const list = testCases.all.filter(({ unitTests }) => unitTests.length === 4);
        expect(list).toHaveLength(120);
    });
    test('attribute all subsets of size 5', () => {
        const list = testCases.all.filter(({ unitTests }) => unitTests.length === 5);
        expect(list).toHaveLength(120);
    });
    test('attribute all subsets', () => {
        const list = testCases.all;
        expect(list).toHaveLength(326);
    });
});
