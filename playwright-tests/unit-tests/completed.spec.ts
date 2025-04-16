import { test, expect } from '@playwright/test'
import { Completed } from '../../src/completed.js'
import { FakeStorage } from '../mocks/fake_storage.js'

test.describe('class Completed', () => {
    test('gets 0 by default', () => {
        global.localStorage = new FakeStorage()
        const completed = new Completed('test')
        expect(completed.get()).toBe(0)
    })

    test('gets value after set', () => {
        global.localStorage = new FakeStorage()
        const completed = new Completed('test')
        completed.set(42)
        expect(completed.get()).toBe(42)
    })
})
