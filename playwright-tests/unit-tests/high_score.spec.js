import { test, expect } from '@playwright/test';
import { HighScore } from '../../src/high_score.js';
import { MockStorage } from './mock_storage.js';
test.describe('class HighScore', () => {
    const mockLocalStorage = new MockStorage();
    test.beforeEach(() => mockLocalStorage.clear());
    test('converts to a string', () => {
        const highScore = new HighScore('Sillygame', 30);
        expect(highScore.toString()).toBe('Sillygame: 30%');
    });
    test('gets the saved high score', () => {
        mockLocalStorage.setItem('Sillygame.score', '20');
        expect(HighScore.fromStorage(mockLocalStorage, 'Sillygame')).toBeInstanceOf(HighScore);
    });
    test('gets missing high score as null', () => {
        expect(HighScore.fromStorage(mockLocalStorage, 'Sillygame')).toBe(null);
    });
    test('saves the high score on first play', () => {
        const highScore = new HighScore('Sillygame', 30);
        highScore.save(mockLocalStorage);
        expect(mockLocalStorage.getItem('Sillygame.score')).toBe('30');
    });
    test('saves the high score if it is better', () => {
        mockLocalStorage.setItem('Sillygame.score', '20');
        const highScore = new HighScore('Sillygame', 30);
        highScore.save(mockLocalStorage);
        expect(mockLocalStorage.getItem('Sillygame.score')).toBe('30');
    });
    test('does NOT save the high score if it is worse', () => {
        mockLocalStorage.setItem('Sillygame.score', '40');
        const highScore = new HighScore('Sillygame', 30);
        highScore.save(mockLocalStorage);
        expect(mockLocalStorage.getItem('Sillygame.score')).toBe('40');
    });
});
