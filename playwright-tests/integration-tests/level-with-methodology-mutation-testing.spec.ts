import { test, expect } from '@playwright/test'
import { Level } from '../../src/level.js'
import { MutationTesting } from '../../src/methodology-mutation-testing.js'
import { TestCases } from './test-cases.js'

test.describe('class Level with class Methodology Mutation Testing', () => {
    test.describe('method findSimplestPassingCandidate', () => {
        const testCases = new TestCases()
        const level = new Level(new MutationTesting(), testCases.useCase)

        testCases.all.forEach(({ unitTests, simplestPassingCandidatesMutationTesting }) => {
            test(`finds the simplest passing candidate for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                expect(simplestPassingCandidatesMutationTesting).toContain(level.findSimplestPassingCandidate(unitTests).toString())
            })
        })
    })

    test.describe('method findSimplestCoveredCandidate', () => {
        const testCases = new TestCases()
        const level = new Level(new MutationTesting(), testCases.useCase)

        testCases.all.forEach(({ unitTests, simplestCoveredCandidate }) => {
            test(`finds the simplest covered candidate with unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                expect(level.findSimplestCoveredCandidate(unitTests).toString()).toBe(simplestCoveredCandidate)
            })
        })
    })
})
