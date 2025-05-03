import { test, expect } from '@playwright/test';
import { SpeedDisplay } from '../../src/use_case_speed_display.js';
test.describe('class SpeedDisplay', () => {
    test('has perfect candidates', () => {
        const useCase = new SpeedDisplay();
        expect(useCase.perfectCandidates).not.toHaveLength(0);
    });
    test('perfect candidates pass all hints', () => {
        const useCase = new SpeedDisplay();
        const failingCandidates = useCase.perfectCandidates.filter(candidate => !candidate.passes(useCase.hints));
        expect(failingCandidates).toHaveLength(0);
    });
    test('all minimal unit tests are needed', () => {
        const useCase = new SpeedDisplay();
        for (const unitTest of useCase.minimalUnitTests) {
            const allMinusOneUnitTests = useCase.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest);
            const almostPerfectCandidates = useCase.candidates.filter(candidate => candidate.passes(allMinusOneUnitTests));
            expect(almostPerfectCandidates.length).toBeGreaterThan(useCase.perfectCandidates.length);
        }
    });
});
