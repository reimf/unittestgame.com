import { test, expect } from '@playwright/test';
import { FakeMethodology } from '../mocks/fake-methodology.js';
test.describe('class Methodology', () => {
    test('has a name', () => {
        const methodology = new FakeMethodology();
        expect(methodology.name()).toBe('Fake Methodology');
    });
});
