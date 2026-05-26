import { test, expect } from '@playwright/test'
import { TemporaryStorage } from '../../src/temporary-storage.js'

test.describe('class TemporaryStorage', () => {
    test('starts empty', () => {
        const storage = new TemporaryStorage()
        expect(storage.length).toBe(0)
    })

    test('getItem returns null for missing key', () => {
        const storage = new TemporaryStorage()
        expect(storage.getItem('missing')).toBeNull()
    })

    test('setItem stores a value retrievable by getItem', () => {
        const storage = new TemporaryStorage()
        storage.setItem('key', 'value')
        expect(storage.getItem('key')).toBe('value')
    })

    test('setItem updates length', () => {
        const storage = new TemporaryStorage()
        storage.setItem('a', '1')
        expect(storage.length).toBe(1)
        storage.setItem('b', '2')
        expect(storage.length).toBe(2)
    })

    test('setItem overwrites an existing key without increasing length', () => {
        const storage = new TemporaryStorage()
        storage.setItem('key', 'first')
        storage.setItem('key', 'second')
        expect(storage.getItem('key')).toBe('second')
        expect(storage.length).toBe(1)
    })

    test('setItem returns this for chaining', () => {
        const storage = new TemporaryStorage()
        const result = storage.setItem('a', '1')
        expect(result).toBe(storage)
    })

    test('removeItem deletes a key', () => {
        const storage = new TemporaryStorage()
        storage.setItem('key', 'value')
        storage.removeItem('key')
        expect(storage.getItem('key')).toBeNull()
        expect(storage.length).toBe(0)
    })

    test('removeItem on a missing key does nothing', () => {
        const storage = new TemporaryStorage()
        storage.removeItem('missing')
        expect(storage.length).toBe(0)
    })

    test('removeItem returns this for chaining', () => {
        const storage = new TemporaryStorage()
        const result = storage.removeItem('key')
        expect(result).toBe(storage)
    })

    test('key returns the key at a given index', () => {
        const storage = new TemporaryStorage()
        storage.setItem('first', 'a')
        expect(storage.key(0)).toBe('first')
    })

    test('key returns null for an out-of-bounds index', () => {
        const storage = new TemporaryStorage()
        expect(storage.key(0)).toBeNull()
        storage.setItem('x', '1')
        expect(storage.key(1)).toBeNull()
    })

    test('clear removes all items', () => {
        const storage = new TemporaryStorage()
        storage.setItem('a', '1').setItem('b', '2').setItem('c', '3')
        storage.clear()
        expect(storage.length).toBe(0)
        expect(storage.getItem('a')).toBeNull()
    })

    test('clear returns this for chaining', () => {
        const storage = new TemporaryStorage()
        const result = storage.clear()
        expect(result).toBe(storage)
    })
})
