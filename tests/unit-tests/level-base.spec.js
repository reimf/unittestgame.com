import { test, expect } from '@playwright/test';
import { MockLevel } from '../mocks/mock-level.js';
import { MockUseCase } from '../mocks/mock-use-case.js';
import { Locale } from '../../src/locale.js';
test.describe('class Level', () => {
    const locale = new Locale('en');
    const useCase = new MockUseCase(locale);
    const level = new MockLevel(locale, useCase, 1, 20);
    test('has a description', () => {
        expect(level.description()).toBe('Level 1 - Mock Use Case - Mock Level');
    });
    test('is playable', () => {
        expect(level.play).toBeInstanceOf(Function);
    });
});
