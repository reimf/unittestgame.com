import { test, expect } from '@playwright/test';
import { PasswordStrength } from '../../src/use-case-password-strength.js';
test.describe('class PasswordStrength', () => {
    const useCase = new PasswordStrength();
    test('has the right amount of parameters', () => {
        expect(useCase.parameters).toHaveLength(1);
    });
    test('has the right amount of candidates', () => {
        expect(useCase.candidates).toHaveLength(240);
    });
    test('has the right amount of minimal unit tests', () => {
        expect(useCase.minimalUnitTests).toHaveLength(6);
    });
    test('has the right amount of subsets minimal unit tests', () => {
        expect(useCase.subsetsOfMinimalUnitTests).toHaveLength(64);
    });
    test('has the right amount of perfect candidates', () => {
        expect(useCase.perfectCandidates).toHaveLength(1);
    });
    test('has the right amount of amputees of the perfect candidate', () => {
        expect(useCase.amputeesOfPerfectCandidate).toHaveLength(32);
    });
    test('perfect candidates pass all hints', () => {
        const failingCandidates = useCase.perfectCandidates.filter(candidate => !candidate.passes(useCase.hints));
        expect(failingCandidates).toHaveLength(0);
    });
    test('all minimal unit tests are needed', () => {
        for (const unitTest of useCase.minimalUnitTests) {
            const allMinusOneUnitTests = useCase.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest);
            const almostPerfectCandidates = useCase.candidates.filter(candidate => candidate.passes(allMinusOneUnitTests));
            expect(almostPerfectCandidates.length).toBeGreaterThan(useCase.perfectCandidates.length);
        }
    });
});
