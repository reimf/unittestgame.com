import { test, expect } from '@playwright/test'
import { Level } from '../../src/level.js'
import { FakeMethodology } from '../mocks/fake-methodology.js'
import { FakeUseCase } from '../mocks/fake-use-case.js'

test.describe('class Level', () => {
    test('has a description', () => {
        const methodology = new FakeMethodology()
        const useCase = new FakeUseCase()
        const level = new Level(methodology, useCase)
        expect(level.description()).toBe('Fake Methodology - Fake Use Case')
    })

    test('is playable', () => {
        const methodology = new FakeMethodology()
        const useCase = new FakeUseCase()
        const level = new Level(methodology, useCase)
        expect(level.play).toBeInstanceOf(Function)
    })
})
