import { test, expect } from '@playwright/test'
import { Level } from '../../src/level.js'
import { MutationTesting } from '../../src/methodology-mutation-testing.js'
import { TestCases } from './test-cases.js'

test.describe('class Methodology Mutation Testing with use case Leap Year', () => {
    const testCases = new TestCases()
    const useCase = testCases.useCase
    const methodology = new MutationTesting()

    test.describe('method findSimplestPassingCandidate', () => {
        testCases.all.forEach(({ unitTests, simplestPassingCandidatesMutationTesting }) => {
            test(`finds the simplest passing candidate for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const code = methodology.findSimplestPassingCandidate(useCase.candidates, useCase.perfectCandidates, unitTests).toString()
                expect(simplestPassingCandidatesMutationTesting).toContain(code)
            })
        })
    })

    test.describe('method findSimplestCoveredCandidate', () => {
        testCases.all.forEach(({ unitTests, simplestCoveredCandidate }) => {
            test(`finds the simplest covered candidate with unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const code = methodology.findSimplestCoveredCandidate(useCase.amputeesOfPerfectCandidate, unitTests).toString()
                expect(code).toBe(simplestCoveredCandidate)
            })
        })
    })
})
