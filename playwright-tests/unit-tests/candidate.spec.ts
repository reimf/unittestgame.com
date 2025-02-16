import { test, expect } from '@playwright/test'
import { Candidate } from '../../src/candidate.js'

test.describe('class Candidate', () => {
  test('computes complexity for simple function', () => {
    const candidate = new Candidate('function divide(a, b) { return a / b }')
    expect(candidate.complexity).toBe(10)
  })

  test('computes complexity for complex function', () => {
    const candidate = new Candidate('function divide(a, b) { if (b === 0) return 0; return a / b }')
    expect(candidate.complexity).toBe(17)
  })

  test('executes function', () => {
    const candidate = new Candidate('function divide(a, b) { return a / b }')
    expect(candidate.execute([6, 2])).toBe(3)
  })

  test('executes function with syntax error', () => {
    const candidate = new Candidate('function divide(a, b) { return c }')
    expect(candidate.execute([6, 2])).toBe('ReferenceError')
  })

  test('converts to a string', () => {
    const candidate = new Candidate('function divide(a, b) { return a / b }')
    expect(candidate.toString()).toBe('function divide(a, b) { return a / b }')
  })
})
