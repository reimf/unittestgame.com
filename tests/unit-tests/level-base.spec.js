import { test, expect } from '@playwright/test';
import { MockLevel } from '../mocks/mock-level.js';
import { MockUseCase } from '../mocks/mock-use-case.js';
test.describe('class Level', () => {
    const useCase = new MockUseCase();
    const level = new MockLevel(useCase);
    test('has a description', () => {
        expect(level.description()).toBe('Mock Level - Mock Use Case');
    });
    test('is playable', () => {
        expect(level.play).toBeInstanceOf(Function);
    });
});
