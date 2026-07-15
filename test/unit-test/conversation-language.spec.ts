import { test, expect } from '@playwright/test'
import { English } from '../../src/conversation-language-en.js'
import { Dutch } from '../../src/conversation-language-nl.js'
import { German } from '../../src/conversation-language-de.js'
import { French } from '../../src/conversation-language-fr.js'
import { Spanish } from '../../src/conversation-language-es.js'
import { Italian } from '../../src/conversation-language-it.js'
import { conversationLanguages } from '../../src/conversation-languages.js'

test.describe('conversation languages', () => {
    test('has English translations', () => {
        const conversationLanguage = new English()
        expect(conversationLanguage.welcome()).toBe('Hi! I\'m an AI bot that writes code. Your job is to guide me using unit tests.')
    })

    test('has Dutch translations', () => {
        const conversationLanguage = new Dutch()
        expect(conversationLanguage.welcome()).toBe('Hoi! Ik ben een AI bot die code schrijft. Jouw taak is om mij bij te sturen met unit testen.')
    })

    test('has German translations', () => {
        const conversationLanguage = new German()
        expect(conversationLanguage.welcome()).toBe('Hallo! Ich bin ein KI-Bot, der Code schreibt. Deine Aufgabe ist es, mich mit Unit-Tests zu steuern.')
    })

    test('has French translations', () => {
        const conversationLanguage = new French()
        expect(conversationLanguage.welcome()).toBe('Bonjour! Je suis un bot IA qui écrit du code. Ton rôle est de me guider avec des unit tests.')
    })

    test('has Spanish translations', () => {
        const conversationLanguage = new Spanish()
        expect(conversationLanguage.welcome()).toBe('¡Hola! Soy un bot de IA que escribe código. Tu trabajo es guiarme con unit tests.')
    })

    test('has Italian translations', () => {
        const conversationLanguage = new Italian()
        expect(conversationLanguage.welcome()).toBe('Ciao! Sono un bot IA che scrive codice. Il tuo compito è guidarmi con i unit tests.')
    })

    test('has unique ids', () => {
        const ids = conversationLanguages.map(conversationLanguage => conversationLanguage.id)
        expect(new Set(ids).size).toBe(conversationLanguages.length)
    })
})
