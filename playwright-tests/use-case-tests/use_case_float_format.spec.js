import { test, expect } from '@playwright/test';
import { FloatFormat } from '../../src/use_case_float_format.js';
test.describe('class FloatFormat', () => {
    test('has perfect candidates', () => {
        const useCase = new FloatFormat();
        expect(useCase.perfectCandidates).not.toHaveLength(0);
    });
    test('perfect candidates pass all hints', () => {
        const useCase = new FloatFormat();
        const failingCandidates = useCase.perfectCandidates.filter(candidate => !candidate.passes(useCase.hints));
        expect(failingCandidates).toHaveLength(0);
    });
    test('all minimal unit tests are needed', () => {
        const useCase = new FloatFormat();
        for (const unitTest of useCase.minimalUnitTests) {
            const allMinusOneUnitTests = useCase.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest);
            const almostPerfectCandidates = useCase.candidates.filter(candidate => candidate.passes(allMinusOneUnitTests));
            expect(almostPerfectCandidates.length).toBeGreaterThan(useCase.perfectCandidates.length);
        }
    });
});
