import { test, expect } from '@playwright/test'
import { BatteryLevel } from '../../src/use_case_battery_level.js'

test.describe('class BatteryLevel', () => {
    test('has perfect candidates', () => {
        const useCase = new BatteryLevel()
        expect(useCase.perfectCandidates).not.toHaveLength(0)
    })

    test('perfect candidates pass all hints', () => {
        const useCase = new BatteryLevel()
        const failingCandidates = useCase.perfectCandidates.filter(candidate => !candidate.passes(useCase.hints))
           expect(failingCandidates).toHaveLength(0)

    })

    test('all minimal unit tests are needed', () => {
        const useCase = new BatteryLevel()
        for (const unitTest of useCase.minimalUnitTests) {
            const allMinusOneUnitTests = useCase.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectCandidates = useCase.candidates.filter(candidate => candidate.passes(allMinusOneUnitTests))
            expect(almostPerfectCandidates.length).toBeGreaterThan(useCase.perfectCandidates.length)
        }
    })
})
