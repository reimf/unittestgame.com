import { test, expect } from '@playwright/test';
import { Level } from '../../src/level.js';
import { FakeMethodology } from '../mocks/fake_methodology.js';
import { FakeUseCase } from '../mocks/fake_use_case.js';
import { FakeStorage } from '../mocks/fake_storage.js';
test.describe('class Level', () => {
    test('has a description', () => {
        const methodology = new FakeMethodology();
        const useCase = new FakeUseCase();
        const level = new Level(methodology, useCase);
        expect(level.description()).toBe('Fake Methodology - Fake Use Case');
    });
    test('has no score by default', () => {
        const methodology = new FakeMethodology();
        const useCase = new FakeUseCase();
        const level = new Level(methodology, useCase);
        const storage = new FakeStorage();
        expect(level.getScore(storage)).toBe('');
    });
    test('has score from storage', () => {
        const methodology = new FakeMethodology();
        const useCase = new FakeUseCase();
        const level = new Level(methodology, useCase);
        const storage = new FakeStorage();
        storage.setItem('Fake Methodology - Fake Use Case', '800');
        expect(level.getScore(storage)).toBe('800');
    });
});
