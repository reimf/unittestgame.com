import { test, expect } from '@playwright/test'
import { Completed } from '../../src/completed.js'
import { FakeStorage } from '../mocks/fake_storage.js'

test.describe('class Completed', () => {
    test('gets false by default', () => {
        global.localStorage = new FakeStorage()
        const completed = new Completed('test')
        expect(completed.get()).toBe(false)
    })

    test('gets true after set', () => {
        global.localStorage = new FakeStorage()
        const completed = new Completed('test')
        completed.set()
        expect(completed.get()).toBe(true)
    })
})
