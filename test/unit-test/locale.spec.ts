import { test, expect } from '@playwright/test'
import { Locale } from '../../src/locale.js'

test.describe('class Locale', () => {
    test('has English translations', () => {
        const locale = new Locale('en')
        expect(locale.welcome()).toBe('Hi! I\'m an AI bot that writes code. Your job is to guide me using unit tests.')
    })

    test('has Dutch translations', () => {
        const locale = new Locale('nl')
        expect(locale.welcome()).toBe('Hallo! Ik ben een AI bot die code schrijft. Jouw taak is om mij bij te sturen met unit testen.')
    })

    test('has English as fallback language', () => {
        const locale = new Locale('de')
        expect(locale.welcome()).toBe('Hi! I\'m an AI bot that writes code. Your job is to guide me using unit tests.')
    })
})
