import { test, expect } from '@playwright/test'
import { FakeLevel } from './fake_level.js'
import { FakeStorage } from './fake_storage.js'

test.describe('class Level', () => {
  test('has name', () => {
    const level = new FakeLevel(1)
    expect(level.name).toBe('FakeLevel')
  })

  test('has description', () => {
    const level = new FakeLevel(1)
    expect(level.description).toBe('is it fizz or buzz')
  })

  test('has index', () => {
    const level = new FakeLevel(1)
    expect(level.index).toBe(1)
  })

  test('has high score', () => {
    const storage = new FakeStorage()
    storage.setItem('FakeLevel.score', '20')
    const level = new FakeLevel(1)
    expect(level.hasHighScore(storage)).toBeTruthy()
  })

  test('has no high score', () => {
    const storage = new FakeStorage()
    const level = new FakeLevel(1)
    expect(level.hasHighScore(storage)).toBeFalsy()
  })

  test('has button text with locked', () => {
    const storage = new FakeStorage()
    const level = new FakeLevel(1)
    expect(level.buttonText(storage, 0)).toBe('🔒 Level 1: FakeLevel - is it fizz or buzz (Locked)')
  })

  test('has button text with play now', () => {
    const storage = new FakeStorage()
    const level = new FakeLevel(1)
    expect(level.buttonText(storage, 1)).toBe('👉 Level 1: FakeLevel - is it fizz or buzz (Play Now)')
  })

  test('has button text with perfect high score', () => {
    const storage = new FakeStorage()
    storage.setItem('FakeLevel.score', '100')
    const level = new FakeLevel(1)
    expect(level.buttonText(storage, 2)).toBe('🥇 Level 1: FakeLevel - is it fizz or buzz (100%)')
  })

  test('has button text with highest sufficient high score', () => {
    const storage = new FakeStorage()
    storage.setItem('FakeLevel.score', '99')
    const level = new FakeLevel(1)
    expect(level.buttonText(storage, 2)).toBe('🥈 Level 1: FakeLevel - is it fizz or buzz (99%)')
  })

  test('has button text with lowest sufficient high score', () => {
    const storage = new FakeStorage()
    storage.setItem('FakeLevel.score', '60')
    const level = new FakeLevel(1)
    expect(level.buttonText(storage, 2)).toBe('🥈 Level 1: FakeLevel - is it fizz or buzz (60%)')
  })

  test('has button text with highest insufficient high score', () => {
    const storage = new FakeStorage()
    storage.setItem('FakeLevel.score', '59')
    const level = new FakeLevel(1)
    expect(level.buttonText(storage, 2)).toBe('🥉 Level 1: FakeLevel - is it fizz or buzz (59%)')
  })

  test('has button text with lowest insufficient high score', () => {
    const storage = new FakeStorage()
    storage.setItem('FakeLevel.score', '1')
    const level = new FakeLevel(1)
    expect(level.buttonText(storage, 2)).toBe('🥉 Level 1: FakeLevel - is it fizz or buzz (1%)')
  })

  test('has the right amount of parameters', () => {
    const level = new FakeLevel(1)
    expect(level.parameters.length).toBe(1)
  })

  test('has the right parameter', () => {
    const level = new FakeLevel(1)
    expect(level.parameters[0].name).toBe('number')
  })

  test('has the right unit', () => {
    const level = new FakeLevel(1)
    expect(level.unit.name).toBe('fizzBuzz')
  })

  test('has the right amount of candidates', () => {
    const level = new FakeLevel(1)
    expect(level.candidates.length).toBe(24)
  })

  test('has the right amount of perfect candidates', () => {
    const level = new FakeLevel(1)
    expect(level.perfectCandidates.length).toBe(1)
  })

  test('has the right perfect candidate', () => {
    const level = new FakeLevel(1)
    expect(level.perfectCandidate.toString()).toBe(
      'function fizzBuzz(number) {\n' +
      '  if (number % 15 === 0) return "FizzBuzz"\n' +
      '  if (number % 3 === 0) return "Fizz"\n' +
      '  if (number % 5 === 0) return "Buzz"\n' +
      '  return number.toString()\n' +
      '}')
  })

  test('has the right amount of hints', () => {
    const level = new FakeLevel(1)
    expect(level.hints.length).toBe(100)
  })

  test('has the right amount of minimal unit tests', () => {
    const level = new FakeLevel(1)
    expect(level.minimalUnitTests.length).toBe(4)
  })

  test('has no user defined unit tests', () => {
    const level = new FakeLevel(1)
    expect(level.userdefinedUnitTests.length).toBe(0)
  })

  test('has a perfect score', () => {
    const level = new FakeLevel(1)
    expect(level.score).toBe(100)
  })

  test('has no failing test result', () => {
    const level = new FakeLevel(1)
    expect(level.failingTestResult).toBe(undefined)
  })

  test('has no callback yet', () => {
    const level = new FakeLevel(1)
    expect(level.callback).toBe(undefined)
  })
})
