import { test, expect } from '@playwright/test'
import { TestDrivenDevelopment } from '../../src/level-test-driven-development.js'
import { FixtureLevelStates } from '../fixtures/fixture-level-states.js'

test.describe('class Level Test-Driven Development', () => {
    const fixtureLevelStates = new FixtureLevelStates()
    const useCase = fixtureLevelStates.useCase
    const level = new TestDrivenDevelopment(useCase)

    test.describe('method findSimplestPassingCandidate', () => {
        fixtureLevelStates.states.forEach(({ unitTests, simplestPassingCandidatesTestDrivenDevelopment }) => {
            test(`finds the simplest passing candidate for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const code = level.findSimplestPassingCandidate(useCase.candidates, useCase.perfectCandidates, unitTests).toString()
                expect(simplestPassingCandidatesTestDrivenDevelopment).toContain(code)
            })
        })
    })

    test.describe('method findNumberOfUnitTestsStillNeeded', () => {
        fixtureLevelStates.states.forEach(({ unitTests, numberOfUnitTestsStillNeeded }) => {
            test(`finds the number of unit tests still needed for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const result = level.findNumberOfUnitTestsStillNeeded(unitTests, useCase.subsetsOfMinimalUnitTests, useCase.candidates, useCase.perfectCandidates.length)
                expect(result).toBe(numberOfUnitTestsStillNeeded)
            })
        })
    })
})
