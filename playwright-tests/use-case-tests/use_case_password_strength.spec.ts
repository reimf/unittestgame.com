import { test, expect, Page } from '@playwright/test'
import { PasswordStrength } from '../../src/use_case_password_strength.js'

test.describe('class PasswordStrength', () => {
    test('has perfect candidates', () => {
        const useCase = new PasswordStrength()
        expect(useCase.perfectCandidates).not.toHaveLength(0)
    })

    test('perfect candidates pass all hints', () => {
        const useCase = new PasswordStrength()
        const failingCandidates = useCase.perfectCandidates.filter(candidate => !candidate.passes(useCase.hints))
           expect(failingCandidates).toHaveLength(0)

    })

    test('all minimal unit tests are needed', () => {
        const useCase = new PasswordStrength()
        for (const unitTest of useCase.minimalUnitTests) {
            const allMinusOneUnitTests = useCase.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectCandidates = useCase.candidates.filter(candidate => candidate.passes(allMinusOneUnitTests))
            expect(almostPerfectCandidates.length).toBeGreaterThan(useCase.perfectCandidates.length)
        }
    })
})
