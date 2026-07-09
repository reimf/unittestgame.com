import { test, expect } from '@playwright/test'
import { Locale } from '../../src/locale.js'
import { FixedPicker } from '../../src/picker.js'
import { MapStore } from '../../src/store.js'
import { TriangleType } from '../../src/level-triangle-type.js'
import { JavaScript } from '../../src/programming-language.js'

test.describe('class TriangleType', () => {
    const locale = new Locale('en')
    const programmingLanguage = new JavaScript()
    const level = new TriangleType(locale, programmingLanguage, new FixedPicker(), new MapStore(), 6)

    test('has the correct description', () => {
        expect(level.description()).toBe('Level 6 - Triangle Type')
    })

    test('has the correct amount of parameters', () => {
        expect(level.parameters).toHaveLength(3)
    })

    test('has the correct amount of candidates', () => {
        expect(level.candidates).toHaveLength(216)
    })

    test('has the correct amount of minimal unit tests', () => {
        expect(level.minimalUnitTests).toHaveLength(5)
    })

    test('has the correct amount of subsets minimal unit tests', () => {
        expect(level.subsetsOfMinimalUnitTests).toHaveLength(32)
    })

    test('has the correct amount of perfect candidates', () => {
        expect(level.perfectCandidates).toHaveLength(2)
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
