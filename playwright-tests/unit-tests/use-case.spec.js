import { test, expect } from '@playwright/test';
import { IntegerVariable, BooleanVariable } from '../../src/variable.js';
import { FakeUseCase } from '../mocks/fake-use-case.js';
test.describe('class UseCase', () => {
    const useCase = new FakeUseCase();
    test('has a specification', () => {
        expect(useCase.specification()).toBe('Fake Specification');
    });
    test('has a name', () => {
        expect(useCase.name()).toBe('Fake Use Case');
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
