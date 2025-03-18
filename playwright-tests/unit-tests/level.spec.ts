import { test, expect } from '@playwright/test'
import { Level } from '../../src/level.js'
import { FakeMethodology } from './fake_methodology.js'
import { FakeUseCase } from './fake_use_case.js'
import { FakeStorage } from './fake_storage.js'

test.describe('class Level', () => {
    test('has a description', () => {
        const methodology = new FakeMethodology()
        const useCase = new FakeUseCase()
        const level = new Level(methodology, useCase)
        expect(level.description).toBe('Fake Methodology - Fake Use Case')
    })

    test('has high score 0 by default', () => {
        const methodology = new FakeMethodology()
        const useCase = new FakeUseCase()
        const level = new Level(methodology, useCase)
        const storage = new FakeStorage()
        expect(level.getHighScore(storage)).toBe(0)
    })

    test('has high score from storage', () => {
        const methodology = new FakeMethodology()
        const useCase = new FakeUseCase()
        const level = new Level(methodology, useCase)
        const storage = new FakeStorage()
        storage.setItem('Fake Methodology - Fake Use Case', '80')
        expect(level.getHighScore(storage)).toBe(80)
    })
})
