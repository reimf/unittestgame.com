import { test, expect } from '@playwright/test'
import { TriangleType } from '../../src/use_case_triangle_type.js'

test.describe('class TriangleType', () => {
    test('has perfect candidates', () => {
        const useCase = new TriangleType()
        expect(useCase.perfectCandidates).not.toBe([])
    })

    test('perfect candidates pass all hints', () => {
        const useCase = new TriangleType()
        const failingCandidates = useCase.perfectCandidates.filter(candidate => !candidate.passes(useCase.hints))
        expect(failingCandidates).toStrictEqual([])
    })

    test('all minimal unit tests are needed', () => {
        const useCase = new TriangleType()
        for (const unitTest of useCase.minimalUnitTests) {
            const allMinusOneUnitTests = useCase.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectCandidates = useCase.candidates.filter(candidate => candidate.passes(allMinusOneUnitTests))
            expect(almostPerfectCandidates.length).toBeGreaterThan(useCase.perfectCandidates.length)
        }
    })
})
