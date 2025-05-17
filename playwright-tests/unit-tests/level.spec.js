import { test, expect } from '@playwright/test';
import { FakeLevel } from '../mocks/fake-level.js';
import { FakeUseCase } from '../mocks/fake-use-case.js';
test.describe('class Level', () => {
    const useCase = new FakeUseCase();
    const level = new FakeLevel(useCase);
    test('has a description', () => {
        expect(level.description()).toBe('Fake Level - Fake Use Case');
    });
    test('is playable', () => {
        expect(level.play).toBeInstanceOf(Function);
    });
});
