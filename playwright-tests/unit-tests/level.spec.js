import { test, expect } from '@playwright/test';
import { Level } from '../../src/level.js';
import { FakeMethodology } from '../mocks/fake_methodology.js';
import { FakeUseCase } from '../mocks/fake_use_case.js';
test.describe('class Level', () => {
    test('has a description', () => {
        const methodology = new FakeMethodology();
        const useCase = new FakeUseCase();
        const level = new Level(methodology, useCase);
        expect(level.description()).toBe('Fake Methodology - Fake Use Case');
    });
    test('has a methodology name', () => {
        const methodology = new FakeMethodology();
        const useCase = new FakeUseCase();
        const level = new Level(methodology, useCase);
        expect(level.methodologyName()).toBe('Fake Methodology');
    });
    test('is playable', () => {
        const methodology = new FakeMethodology();
        const useCase = new FakeUseCase();
        const level = new Level(methodology, useCase);
        expect(level.play).toBeInstanceOf(Function);
    });
});
