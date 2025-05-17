import { test, expect } from '@playwright/test'
import { MutationTesting } from '../../src/level-mutation-testing.js'
import { TestCases } from './test-cases.js'

test.describe('class Level Mutation Testing with use case Leap Year', () => {
    const testCases = new TestCases()
    const useCase = testCases.useCase
    const level = new MutationTesting(useCase)

    test.describe('method findSimplestPassingCandidate', () => {
        testCases.all.forEach(({ unitTests, simplestPassingCandidatesMutationTesting }) => {
            test(`finds the simplest passing candidate for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const code = level.findSimplestPassingCandidate(useCase.candidates, useCase.perfectCandidates, unitTests).toString()
                expect(simplestPassingCandidatesMutationTesting).toContain(code)
            })
        })
    })

    test.describe('method findSimplestCoveredCandidate', () => {
        testCases.all.forEach(({ unitTests, simplestCoveredCandidate }) => {
            test(`finds the simplest covered candidate with unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const code = level.findSimplestCoveredCandidate(useCase.amputeesOfPerfectCandidate, unitTests).toString()
                expect(code).toBe(simplestCoveredCandidate)
            })
        })
    })
})
