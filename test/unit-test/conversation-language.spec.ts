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
        expect(conversationLanguage.welcome('English', 'JavaScript')).toBe('Hi! I\'m an English speaking AI bot that writes JavaScript code. Your job is to guide me using unit tests.')
    })

    test('has Dutch translations', () => {
        const conversationLanguage = new Dutch()
        expect(conversationLanguage.welcome('Nederlands', 'JavaScript')).toBe('Hoi! Ik ben een Nederlands sprekende AI bot die JavaScript code schrijft. Jouw taak is om mij bij te sturen met unit testen.')
    })

    test('has German translations', () => {
        const conversationLanguage = new German()
        expect(conversationLanguage.welcome('Deutsch', 'JavaScript')).toBe('Hallo! Ich bin ein Deutsch sprechender KI-Bot, der JavaScript-Code schreibt. Deine Aufgabe ist es, mich mit Unit-Tests zu steuern.')
    })

    test('has French translations', () => {
        const conversationLanguage = new French()
        expect(conversationLanguage.welcome('Français', 'JavaScript')).toBe('Bonjour! Je suis un bot IA qui parle Français et écrit du code JavaScript. Ton rôle est de me guider avec des unit tests.')
    })

    test('has Spanish translations', () => {
        const conversationLanguage = new Spanish()
        expect(conversationLanguage.welcome('Español', 'JavaScript')).toBe('¡Hola! Soy un bot de IA que habla Español y escribe código JavaScript. Tu trabajo es guiarme con unit tests.')
    })

    test('has Italian translations', () => {
        const conversationLanguage = new Italian()
        expect(conversationLanguage.welcome('Italiano', 'JavaScript')).toBe('Ciao! Sono un bot IA che parla Italiano e scrive codice JavaScript. Il tuo compito è guidarmi con i unit tests.')
    })

    test('has unique ids', () => {
        const ids = conversationLanguages.map(conversationLanguage => conversationLanguage.id)
        expect(new Set(ids).size).toBe(conversationLanguages.length)
    })
})
