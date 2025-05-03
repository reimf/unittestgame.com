import { test, expect } from '@playwright/test'
import { EvenOdd } from '../../src/use_case_even_odd.js'

test.describe('class EvenOdd', () => {
    test('has perfect candidates', () => {
        const useCase = new EvenOdd()
        expect(useCase.perfectCandidates).not.toBe([])
    })

    test('perfect candidates pass all hints', () => {
        const useCase = new EvenOdd()
        const failingCandidates = useCase.perfectCandidates.filter(candidate => !candidate.passes(useCase.hints))
        expect(failingCandidates).toStrictEqual([])
    })

    test('all minimal unit tests are needed', () => {
        const useCase = new EvenOdd()
        for (const unitTest of useCase.minimalUnitTests) {
            const allMinusOneUnitTests = useCase.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectCandidates = useCase.candidates.filter(candidate => candidate.passes(allMinusOneUnitTests))
            expect(almostPerfectCandidates.length).toBeGreaterThan(useCase.perfectCandidates.length)
        }
    })
})
