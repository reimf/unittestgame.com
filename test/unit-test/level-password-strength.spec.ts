import { test, expect } from '@playwright/test'
import { English } from '../../src/conversation-language-en.js'
import { FixedPicker } from '../../src/picker.js'
import { MapStore } from '../../src/store.js'
import { PasswordStrength } from '../../src/level-password-strength.js'
import { JavaScript } from '../../src/programming-language-javascript.js'

test.describe('class PasswordStrength', () => {
    const conversationLanguage = new English()
    const programmingLanguage = new JavaScript()
    const level = new PasswordStrength(conversationLanguage, programmingLanguage, new FixedPicker(), new MapStore(), 10)

    test('has the correct description', () => {
        expect(level.description()).toBe('Level 10 - Password Strength')
    })

    test('has the correct amount of parameters', () => {
        expect(level.parameters).toHaveLength(1)
    })

    test('has the correct amount of candidates', () => {
        expect(level.candidates).toHaveLength(160)
    })

    test('has the correct amount of minimal unit tests', () => {
        expect(level.minimalUnitTests).toHaveLength(6)
    })

    test('has the correct amount of subsets minimal unit tests', () => {
        expect(level.subsetsOfMinimalUnitTests).toHaveLength(64)
    })

    test('has the correct amount of perfect candidates', () => {
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
