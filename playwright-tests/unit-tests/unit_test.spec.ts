import { test, expect } from '@playwright/test'
import UnitTest from '../../src/unit_test.js'

test.describe('class UnitTest', () => {
  test('converts to a string', () => {
    const unitTest = new UnitTest([6, 3], 2)
    expect(unitTest.toString()).toBe('6,3 -> 2')
  })
})
