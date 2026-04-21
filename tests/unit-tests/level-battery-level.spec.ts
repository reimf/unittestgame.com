import { test, expect } from '@playwright/test'
import { Locale } from '../../src/locale.js'
import { MockStorage } from '../mocks/mock-storage.js'
import { BatteryLevel } from '../../src/level-battery-level.js'

test.describe('class BatteryLevel', () => {
    const locale = new Locale('en')
    const level = new BatteryLevel(locale, 1, new MockStorage())

    test('has the right amount of parameters', () => {
        expect(level.parameters).toHaveLength(1)
    })

    test('has the right amount of candidates', () => {
        expect(level.candidates).toHaveLength(39)
    })

    test('has the right amount of minimal unit tests', () => {
        expect(level.minimalUnitTests).toHaveLength(4)
    })

    test('has the right amount of subsets minimal unit tests', () => {
        expect(level.subsetsOfMinimalUnitTests).toHaveLength(16)
    })

    test('has the right amount of perfect candidates', () => {
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
