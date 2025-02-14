import { test, expect } from '@playwright/test'
import HighScore from '../../src/high_score.js'
import { MockStorage } from './mock_storage.js'

test.describe('class HighScore', () => {
  const mockLocalStorage = new MockStorage()

  test.beforeEach(() => mockLocalStorage.clear())

  test('converts to a string', () => {
    const highScore = new HighScore('Sillygame', 30, '30/100')
    expect(highScore.toString()).toBe('Sillygame: 30/100')
  })

  test('gets the saved high score', () => {
    mockLocalStorage.setItem('Sillygame.highScore', '20|20/100')
    expect(HighScore.fromStorage(mockLocalStorage, 'Sillygame')).toBeInstanceOf(HighScore)
  })

  test('gets missing high score as null', () => {
    expect(HighScore.fromStorage(mockLocalStorage, 'Sillygame')).toBe(null)
  })

  test('saves the high score on first play', () => {
    const highScore = new HighScore('Sillygame', 30, '30/100')
    highScore.save(mockLocalStorage)
    expect(mockLocalStorage.getItem('Sillygame.highScore')).toBe('30|30/100')
  })

  test('saves the high score if it is better', () => {
    mockLocalStorage.setItem('Sillygame.highScore', '20|20/100')
    const highScore = new HighScore('Sillygame', 30, '30/100')
    highScore.save(mockLocalStorage)
    expect(mockLocalStorage.getItem('Sillygame.highScore')).toBe('30|30/100')
  })

  test('does NOT save the high score if it is worse', () => {
    mockLocalStorage.setItem('Sillygame.highScore', '40|40/100')
    const highScore = new HighScore('Sillygame', 30, '30/100')
    highScore.save(mockLocalStorage)
    expect(mockLocalStorage.getItem('Sillygame.highScore')).toBe('40|40/100')
  })
})
