import { test, expect } from '@playwright/test';
import { Locale } from '../../src/locale.js';
import { IntegerVariable, BooleanVariable } from '../../src/variable.js';
import { MockUseCase } from '../mocks/mock-use-case.js';
test.describe('class UseCase', () => {
    const locale = new Locale('en');
    const useCase = new MockUseCase(locale);
    test('has a specification', () => {
        expect(useCase.specification().toString()).toBe('Mock Specification');
    });
    test('has a name', () => {
        expect(useCase.name()).toBe('Mock Use Case');
    });
    test('has parameters', () => {
        expect(useCase.parameters.length).toBe(1);
        expect(useCase.parameters[0]).toBeInstanceOf(IntegerVariable);
        expect(useCase.parameters[0].name).toBe('year');
    });
    test('has a unit', () => {
        expect(useCase.unit).toBeInstanceOf(BooleanVariable);
        expect(useCase.unit.name).toBe('isLeapYear');
    });
    test('has candidates', () => {
        expect(useCase.candidates.length).toBe(54);
    });
    test('has minimal unit tests', () => {
        expect(useCase.minimalUnitTests.length).toBe(4);
    });
    test('has perfect candidates', () => {
        expect(useCase.perfectCandidates.length).toBe(1);
    });
    test('has amputees of the perfect candidate', () => {
        expect(useCase.amputeesOfPerfectCandidate.length).toBe(16);
    });
    test('has hints', () => {
        expect(useCase.hints.length).toBe(51);
    });
});
