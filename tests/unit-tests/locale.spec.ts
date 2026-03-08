import { test, expect } from '@playwright/test'
import { Locale } from '../../src/locale.js'

test.describe('class Locale', () => {
    test('has English translations', () => {
        const locale = new Locale('en')
        expect(locale.welcome()).toBe('Hi, I am an AI bot and I can write code to make unit tests pass.')
    })

    test('has Dutch translations', () => {
        const locale = new Locale('nl')
        expect(locale.welcome()).toBe('Hallo, ik ben een AI bot en ik kan code schrijven om unit testen te laten slagen.')
    })

    test('has English as fallback language', () => {
        const locale = new Locale('de')
        expect(locale.welcome()).toBe('Hi, I am an AI bot and I can write code to make unit tests pass.')
    })
})
