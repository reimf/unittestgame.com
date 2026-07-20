import { test, expect } from '@playwright/test'
import { English } from '../../src/conversation-language-en.js'
import { FixedPicker } from '../../src/picker.js'
import { MapStore } from '../../src/store.js'
import { WindScale } from '../../src/level-wind-scale.js'
import { JavaScript } from '../../src/programming-language-javascript.js'

test.describe('class WindScale', () => {
    const conversationLanguage = new English()
    const programmingLanguage = new JavaScript()
    const level = new WindScale(conversationLanguage, programmingLanguage, new FixedPicker(), new MapStore(), 2)

    test('has the correct description', () => {
        expect(level.description()).toBe('Level 2 - Wind Scale')
    })

    test('has the correct amount of parameters', () => {
        expect(level.parameters).toHaveLength(1)
    })

    test('has the correct amount of candidates', () => {
        expect(level.candidates).toHaveLength(500)
    })

    test('has the correct amount of minimal unit tests', () => {
        expect(level.minimalUnitTests).toHaveLength(6)
    })

    test('has the correct amount of subsets minimal unit tests', () => {
        expect(level.subsetsOfMinimalUnitTests).toHaveLength(64)
    })

    test('has the correct amount of perfect candidates', () => {
        expect(level.perfectCandidates).toHaveLength(8)
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
