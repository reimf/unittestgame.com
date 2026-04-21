import { test, expect } from '@playwright/test'
import { Locale } from '../../src/locale.js'
import { MockStorage } from '../mocks/mock-storage.js'
import { SpeedDisplay } from '../../src/level-speed-display.js'

test.describe('class SpeedDisplay', () => {
    const locale = new Locale('en')
    const level = new SpeedDisplay(locale, 7, new MockStorage())

    test('has the right amount of parameters', () => {
        expect(level.parameters).toHaveLength(1)
    })

    test('has the right amount of candidates', () => {
        expect(level.candidates).toHaveLength(400)
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
