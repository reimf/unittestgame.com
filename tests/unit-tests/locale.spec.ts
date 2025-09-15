import { test, expect } from '@playwright/test'
import { Locale } from '../../src/locale.js'

test.describe('class Locale', () => {
    test('has English translations', () => {
        const locale = new Locale('en')
        expect(locale.welcomeToUnittestgame()).toBe('Welcome to *UnitTestGame* where you can learn to write effective unit tests.')
    })

    test('has Dutch translations', () => {
        const locale = new Locale('nl')
        expect(locale.welcomeToUnittestgame()).toBe('Welkom bij *UnitTestGame* waar je leert effectieve unit testen te schrijven.')
    })

    test('has English as fallback language', () => {
        const locale = new Locale('de')
        expect(locale.welcomeToUnittestgame()).toBe('Welcome to *UnitTestGame* where you can learn to write effective unit tests.')
    })
})
