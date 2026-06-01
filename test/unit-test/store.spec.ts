import { test, expect } from '@playwright/test'
import { MapStore } from '../../src/store.js'

test.describe('class MapStore', () => {
    test('gets 0 by default', () => {
        const store = new MapStore()
        expect(store.get('test')).toBe(0)
    })

    test('gets value after set', () => {
        const store = new MapStore()
        store.set('test', 42)
        expect(store.get('test')).toBe(42)
    })
})
