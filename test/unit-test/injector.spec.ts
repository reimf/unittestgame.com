import { test, expect } from '@playwright/test'
import { Injector } from '../../src/injector.js'

test.describe('class Injector', () => {
    test.describe('getOption', () => {
        test('returns the value when key is present and value is in options', () => {
            const injector = new Injector(new URLSearchParams('mode=easy'))
            expect(injector.getOption('mode', ['easy', 'hard'])).toBe('easy')
        })

        test('throws when key is present but value is not in options', () => {
            const injector = new Injector(new URLSearchParams('mode=unknown'))
            expect(() => injector.getOption('mode', ['easy', 'hard'])).toThrow('Parameter mode=unknown, but unknown is not one of easy, hard')
        })

        test('returns the first option when key is absent', () => {
            const injector = new Injector(new URLSearchParams())
            expect(injector.getOption('mode', ['first', 'last'])).toBe('first')
        })

        test('deletes the key after reading', () => {
            const injector = new Injector(new URLSearchParams('mode=easy'))
            injector.getOption('mode', ['easy', 'hard'])
            expect(() => injector.checkEmpty()).not.toThrow()
        })
    })

    test.describe('getAll', () => {
        test('returns an empty array when key is absent', () => {
            const injector = new Injector(new URLSearchParams())
            expect(injector.getAll('tag')).toEqual([])
        })

        test('returns a single-element array when one value is present', () => {
            const injector = new Injector(new URLSearchParams('tag=a'))
            expect(injector.getAll('tag')).toEqual(['a'])
        })

        test('returns all values', () => {
            const injector = new Injector(new URLSearchParams('tag=a&tag=b&tag=c'))
            expect(injector.getAll('tag')).toEqual(['a', 'b', 'c'])
        })

        test('deletes the key', () => {
            const injector = new Injector(new URLSearchParams('tag=a'))
            injector.getAll('tag')
            expect(() => injector.checkEmpty()).not.toThrow()
        })
    })

    test.describe('checkEmpty', () => {
        test('does not throw when there are no parameters left', () => {
            const injector = new Injector(new URLSearchParams())
            expect(() => injector.checkEmpty()).not.toThrow()
        })

        test('throws when one or more parameters have not been consumed', () => {
            const injector = new Injector(new URLSearchParams('a=1&b=2'))
            expect(() => injector.checkEmpty()).toThrow('Unknown parameters a, b')
        })
    })
})
