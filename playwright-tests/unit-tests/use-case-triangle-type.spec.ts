import { test, expect } from '@playwright/test'
import { TriangleType } from '../../src/use-case-triangle-type.js'

test.describe('class TriangleType', () => {
    const useCase = new TriangleType()

    test('has the right amount of parameters', () => {
        expect(useCase.parameters).toHaveLength(3)
    })

    test('has the right amount of candidates', () => {
        expect(useCase.candidates).toHaveLength(216)
    })

    test('has the right amount of minimal unit tests', () => {
        expect(useCase.minimalUnitTests).toHaveLength(5)
    })

    test('has the right amount of subsets minimal unit tests', () => {
        expect(useCase.subsetsOfMinimalUnitTests).toHaveLength(32)
    })

    test('has the right amount of perfect candidates', () => {
        expect(useCase.perfectCandidates).toHaveLength(2)
    })

    test('has the right amount of amputees of the perfect candidate', () => {
        expect(useCase.amputeesOfPerfectCandidate).toHaveLength(8)
    })

    test('perfect candidates pass all hints', () => {
        const failingCandidates = useCase.perfectCandidates.filter(candidate => !candidate.passes(useCase.hints))
           expect(failingCandidates).toHaveLength(0)

    })

    test('all minimal unit tests are needed', () => {
        for (const unitTest of useCase.minimalUnitTests) {
            const allMinusOneUnitTests = useCase.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectCandidates = useCase.candidates.filter(candidate => candidate.passes(allMinusOneUnitTests))
            expect(almostPerfectCandidates.length).toBeGreaterThan(useCase.perfectCandidates.length)
        }
    })
})
