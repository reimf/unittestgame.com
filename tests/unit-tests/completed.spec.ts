import { test, expect } from '@playwright/test'
import { Completed } from '../../src/completed.js'
import { MockStorage } from '../mocks/mock-storage.js'

test.describe('class Completed', () => {
    test('gets 0 by default', () => {
        const completed = new Completed('test', new MockStorage())
        expect(completed.get()).toBe(0)
    })

    test('gets value after set', () => {
        const completed = new Completed('test', new MockStorage())
        completed.set(42)
        expect(completed.get()).toBe(42)
    })
})
