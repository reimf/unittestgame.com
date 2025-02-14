import { test, expect } from '@playwright/test'
import Candidate from '../../src/candidate.js'

test.describe('candidate', () => {
  test('complexity simple', ({}) => {
    const candidate = new Candidate('function divide(a, b) { return a / b }')
    expect(candidate.complexity).toBe(10)
  })

  test('complexity complex', ({}) => {
    const candidate = new Candidate('function divide(a, b) { if (b === 0) return 0;return a / b }')
    expect(candidate.complexity).toBe(17)
  })

  test('execute normal', ({}) => {
    const candidate = new Candidate('function divide(a, b) { return a / b }')
    expect(candidate.execute([6, 2])).toBe(3)
  })

  test('execute error', ({}) => {
    const candidate = new Candidate('function divide(a, b) { return c }')
    expect(candidate.execute([6, 2])).toBe('ReferenceError')
  })
})
