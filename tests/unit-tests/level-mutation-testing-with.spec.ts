import { test, expect } from '@playwright/test'
import { MutationTesting } from '../../src/level-mutation-testing.js'
import { Locale } from '../../src/locale.js'
import { FixtureLevelStates } from '../fixtures/fixture-level-states.js'

test.describe('class Level Mutation Testing', () => {
    const fixtureLevelStates = new FixtureLevelStates()
    const useCase = fixtureLevelStates.useCase
    const locale = new Locale('en')
    const level = new MutationTesting(locale, useCase, 1)

    test.describe('method findSimplestPassingCandidate', () => {
        fixtureLevelStates.states.forEach(({ unitTests, simplestPassingCandidatesMutationTesting }) => {
            test(`finds the simplest passing candidate for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const code = level.findSimplestPassingCandidate(useCase.candidates, useCase.perfectCandidates, unitTests).toString()
                expect(simplestPassingCandidatesMutationTesting).toContain(code)
            })
        })
    })

    test.describe('method findSimplestCoveredCandidate', () => {
        fixtureLevelStates.states.forEach(({ unitTests, simplestCoveredCandidate }) => {
            test(`finds the simplest covered candidate with unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const code = level.findSimplestCoveredCandidate(useCase.amputeesOfPerfectCandidate, unitTests).toString()
                expect(code).toBe(simplestCoveredCandidate)
            })
        })
    })
})
