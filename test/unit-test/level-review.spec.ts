import { test, expect } from '@playwright/test'
import { English } from '../../src/conversation-language-en.js'
import { FixedPicker } from '../../src/picker.js'
import { MapStore } from '../../src/store.js'
import { Review } from '../../src/level-review.js'
import { JavaScript } from '../../src/programming-language-javascript.js'

test.describe('class Review', () => {
    const conversationLanguage = new English()
    const programmingLanguage = new JavaScript()
    const level = new Review(conversationLanguage, programmingLanguage, new FixedPicker(), new MapStore(), 3)

    test('has the correct description', () => {
        expect(level.description()).toBe('Level 3 - Review')
    })

    test('has the correct amount of parameters', () => {
        expect(level.parameters).toHaveLength(2)
    })

    test('has the correct amount of candidates', () => {
        expect(level.candidates).toHaveLength(300)
    })

    test('has the correct amount of minimal unit tests', () => {
        expect(level.minimalUnitTests).toHaveLength(4)
    })

    test('has the correct amount of subsets of minimal unit tests', () => {
        expect(level.subsetsOfMinimalUnitTests).toHaveLength(16)
    })

    test('has the correct amount of perfect candidates', () => {
        expect(level.perfectCandidates.length).toBeGreaterThan(0)
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
