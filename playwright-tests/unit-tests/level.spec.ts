import { test, expect } from '@playwright/test'
import { VotingAge } from '../../src/level_voting_age.js'
import { MockStorage } from './mock_storage.js'

test.describe('class Level', () => {
  test('has name', () => {
    const level = new VotingAge(1)
    expect(level.name).toBe('VotingAge')
  })

  test('has description', () => {
    const level = new VotingAge(1)
    expect(level.description).toBe('are you allowed to vote')
  })

  test('has index', () => {
    const level = new VotingAge(1)
    expect(level.index).toBe(1)
  })

  test('has high score', () => {
    const storage = new MockStorage()
    storage.setItem('VotingAge.score', '20')
    const level = new VotingAge(1)
    expect(level.hasHighScore(storage)).toBeTruthy()
  })

  test('has no high score', () => {
    const storage = new MockStorage()
    const level = new VotingAge(1)
    expect(level.hasHighScore(storage)).toBeFalsy()
  })

  test('has button text with locked', () => {
    const storage = new MockStorage()
    const level = new VotingAge(1)
    expect(level.buttonText(storage, 0)).toBe('🔒 Level 1: VotingAge - are you allowed to vote (Locked)')
  })

  test('has button text with play now', () => {
    const storage = new MockStorage()
    const level = new VotingAge(1)
    expect(level.buttonText(storage, 1)).toBe('👉 Level 1: VotingAge - are you allowed to vote (Play now)')
  })

  test('has button text with perfect high score', () => {
    const storage = new MockStorage()
    storage.setItem('VotingAge.score', '100')
    const level = new VotingAge(1)
    expect(level.buttonText(storage, 2)).toBe('🥇 Level 1: VotingAge - are you allowed to vote (Score 100%)')
  })

  test('has button text with highest sufficient high score', () => {
    const storage = new MockStorage()
    storage.setItem('VotingAge.score', '99')
    const level = new VotingAge(1)
    expect(level.buttonText(storage, 2)).toBe('🥈 Level 1: VotingAge - are you allowed to vote (Score 99%)')
  })

  test('has button text with lowest sufficient high score', () => {
    const storage = new MockStorage()
    storage.setItem('VotingAge.score', '60')
    const level = new VotingAge(1)
    expect(level.buttonText(storage, 2)).toBe('🥈 Level 1: VotingAge - are you allowed to vote (Score 60%)')
  })

  test('has button text with highest insufficient high score', () => {
    const storage = new MockStorage()
    storage.setItem('VotingAge.score', '59')
    const level = new VotingAge(1)
    expect(level.buttonText(storage, 2)).toBe('🥉 Level 1: VotingAge - are you allowed to vote (Score 59%)')
  })

  test('has button text with lowest insufficient high score', () => {
    const storage = new MockStorage()
    storage.setItem('VotingAge.score', '0')
    const level = new VotingAge(1)
    expect(level.buttonText(storage, 2)).toBe('🥉 Level 1: VotingAge - are you allowed to vote (Score 0%)')
  })
})
