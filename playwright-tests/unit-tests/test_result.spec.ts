import { test, expect } from '@playwright/test'
import { TestResult } from '../../src/test_result.js'
import { Candidate } from '../../src/candidate.js'
import { UnitTest } from '../../src/unit_test.js'
import { NumberVariable } from '../../src/variable.js'

test.describe('class TestResult', () => {
  test('passes', () => {
    const candidate = new Candidate(['function divide(a, b) { return a / b }'], [])
    const parameters = [new NumberVariable('A', 'a'), new NumberVariable('B', 'b')]
    const unit = new NumberVariable('Divide', 'divide')
    const unitTest = new UnitTest(parameters, [6, 3], unit, 2)
    const testResult = new TestResult(candidate, unitTest)
    expect(testResult.passes).toBe(true)
  })

  test('fails', () => {
    const candidate = new Candidate(['function divide(a, b) { return a / b }'], [])
    const parameters = [new NumberVariable('A', 'a'), new NumberVariable('B', 'b')]
    const unit = new NumberVariable('Divide', 'divide')
    const unitTest = new UnitTest(parameters, [6, 3], unit, 5)
    const testResult = new TestResult(candidate, unitTest)
    expect(testResult.passes).toBe(false)
  })

  test('converts to a string', () => {
    const candidate = new Candidate(['function divide(a, b) { return a / b }'], [])
    const parameters = [new NumberVariable('A', 'a'), new NumberVariable('B', 'b')]
    const unit = new NumberVariable('Divide', 'divide')
    const unitTest = new UnitTest(parameters, [6, 3], unit, 5)
    const testResult = new TestResult(candidate, unitTest)
    expect(testResult.toString()).toBe('divide(6, 3) === 2')
  })
})
