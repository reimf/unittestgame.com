import { test, expect } from '@playwright/test'
import { FixedPicker, RandomPicker } from '../../src/picker.js'

test.describe('class FixedPicker', () => {
    const picker = new FixedPicker()

    test('integerUnder always returns 0', () => {
        expect(picker.integerUnder(10)).toBe(0)
    })

    test('elementFrom returns the first element', () => {
        const list = ['a', 'b', 'c', 'd'] as const
        expect(picker.elementFrom(list)).toBe('a')
    })

    test('elementFrom works with a single-element list', () => {
        expect(picker.elementFrom(['only'])).toBe('only')
    })
})

test.describe('class RandomPicker', () => {
    const picker = new RandomPicker()

    test('integerUnder returns an integer number', () => {
        expect(Number.isInteger(picker.integerUnder(10))).toBe(true)
    })

    test('integerUnder returns a number greater than or equal to 0', () => {
        expect(picker.integerUnder(10)).toBeGreaterThanOrEqual(0)
    })

    test('integerUnder returns a number less than x', () => {
        expect(picker.integerUnder(10)).toBeLessThan(10)
    })

    test('elementFrom returns an element from the list', () => {
        const list = ['a', 'b', 'c', 'd'] as const
        expect(list).toContain(picker.elementFrom(list))
    })
})
