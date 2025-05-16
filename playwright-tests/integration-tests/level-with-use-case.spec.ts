import { test, expect } from '@playwright/test'
import { Level } from '../../src/level.js'
import { TestDrivenDevelopment } from '../../src/methodology-test-driven-development.js'
import { TestCases } from './test-cases.js'

test.describe('class Level with class UseCase', () => {
    test.describe('method findNumberOfUnitTestsStillNeeded', () => {
        const testCases = new TestCases()
        const level = new Level(new TestDrivenDevelopment(), testCases.useCase)

        testCases.all.forEach(({ unitTests, numberOfUnitTestsStillNeeded }) => {
            test(`finds the number of unit tests still needed for unit tests ${unitTests.map(unitTest => unitTest.argumentList)}`, () => {
                expect(level.findNumberOfUnitTestsStillNeeded(unitTests)).toBe(numberOfUnitTestsStillNeeded)
            })
        })
    })
})
