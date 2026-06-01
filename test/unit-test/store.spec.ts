import { test, expect } from '@playwright/test'
import { Completed } from '../../src/completed.js'
import { TemporaryStorage } from '../../src/temporary-storage.js'

test.describe('class Completed', () => {
    test('gets 0 by default', () => {
        const completed = new Completed('test', new TemporaryStorage())
        expect(completed.get()).toBe(0)
    })

    test('gets value after set', () => {
        const completed = new Completed('test', new TemporaryStorage())
        completed.set(42)
        expect(completed.get()).toBe(42)
    })
})
