import { test, expect } from '@playwright/test'
import { FixtureLevelStates } from '../fixture/fixture-level-states.js'

test.describe('class Level', () => {
    const fixtureLevelStates = new FixtureLevelStates()
    const level = fixtureLevelStates.level

    test.describe('method findSimplestPassingCandidate', () => {
        fixtureLevelStates.states.forEach(({ unitTests, simplestPassingCandidates }) => {
            test(`finds the simplest passing candidate for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const candidate = level.findSimplestPassingCandidate(level.candidates, level.perfectCandidates, unitTests)
                const code = candidate.nonEmptyLines.join('\n')
                expect(simplestPassingCandidates).toContain(code)
            })
        })
    })

    test.describe('method findNumberOfUnitTestsStillNeeded', () => {
        fixtureLevelStates.states.forEach(({ unitTests, numberOfUnitTestsStillNeeded }) => {
            test(`finds the number of unit tests still needed for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                const result = level.findNumberOfUnitTestsStillNeeded(unitTests, level.subsetsOfMinimalUnitTests, level.candidates, level.perfectCandidates.length)
                expect(result).toBe(numberOfUnitTestsStillNeeded)
            })
        })
    })
})
