import { test, expect } from '@playwright/test'
import { Locale } from '../../src/locale.js'
import { MockStorage } from '../mocks/mock-storage.js'
import { PasswordStrength } from '../../src/level-password-strength.js'

test.describe('class PasswordStrength', () => {
    const locale = new Locale('en')
    const level = new PasswordStrength(locale, 10, new MockStorage())

    test('has the right amount of parameters', () => {
        expect(level.parameters).toHaveLength(1)
    })

    test('has the right amount of candidates', () => {
        expect(level.candidates).toHaveLength(240)
    })

    test('has the right amount of minimal unit tests', () => {
        expect(level.minimalUnitTests).toHaveLength(6)
    })

    test('has the right amount of subsets minimal unit tests', () => {
        expect(level.subsetsOfMinimalUnitTests).toHaveLength(64)
    })

    test('has the right amount of perfect candidates', () => {
        expect(level.perfectCandidates).toHaveLength(1)
    })

    test('perfect candidates pass all hints', () => {
        const failingCandidates = level.perfectCandidates.filter(candidate => !candidate.passes(level.hints))
           expect(failingCandidates).toHaveLength(0)

    })

    test('all minimal unit tests are needed', () => {
        for (const unitTest of level.minimalUnitTests) {
            const allMinusOneUnitTests = level.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectCandidates = level.candidates.filter(candidate => candidate.passes(allMinusOneUnitTests))
            expect(almostPerfectCandidates.length).toBeGreaterThan(level.perfectCandidates.length)
        }
    })
})
