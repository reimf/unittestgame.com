import { test, expect } from '@playwright/test';
import { IntegerVariable, TextVariable } from '../../src/variable.js';
import { FakeUseCase } from '../mocks/fake_use_case.js';
test.describe('class UseCase', () => {
    test('has a specification', () => {
        const useCase = new FakeUseCase();
        expect(useCase.specification()).toBe('The usual FizzBuzz leet code challenge.');
    });
    test('has a name', () => {
        const useCase = new FakeUseCase();
        expect(useCase.name()).toBe('Fake Use Case');
    });
    test('has parameters', () => {
        const useCase = new FakeUseCase();
        expect(useCase.parameters.length).toBe(1);
        expect(useCase.parameters[0]).toBeInstanceOf(IntegerVariable);
        expect(useCase.parameters[0].name).toBe('number');
    });
    test('has a unit', () => {
        const useCase = new FakeUseCase();
        expect(useCase.unit).toBeInstanceOf(TextVariable);
        expect(useCase.unit.name).toBe('fizzBuzz');
    });
    test('has candidates', () => {
        const useCase = new FakeUseCase();
        expect(useCase.candidates.length).toBe(16);
    });
    test('has minimal unit tests', () => {
        const useCase = new FakeUseCase();
        expect(useCase.minimalUnitTests.length).toBe(4);
    });
    test('has perfect candidates', () => {
        const useCase = new FakeUseCase();
        expect(useCase.perfectCandidates.length).toBe(1);
    });
    test('has amputees of the perfect candidate', () => {
        const useCase = new FakeUseCase();
        expect(useCase.amputeesOfPerfectCandidate.length).toBe(8);
    });
    test('has hints', () => {
        const useCase = new FakeUseCase();
        expect(useCase.hints.length).toBe(100);
    });
});
