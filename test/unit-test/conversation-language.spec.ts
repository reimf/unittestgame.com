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
        expect(conversationLanguage.welcome()).toBe('Hi! I\'m an AI bot. I write as little code as your unit tests allow.')
    })

    test('has Dutch translations', () => {
        const conversationLanguage = new Dutch()
        expect(conversationLanguage.welcome()).toBe('Hoi! Ik ben een AI bot. Ik schrijf zo weinig code als je unit testen toelaten.')
    })

    test('has German translations', () => {
        const conversationLanguage = new German()
        expect(conversationLanguage.welcome()).toBe('Hi! Ich bin ein KI-Bot. Ich schreibe so wenig Code, wie deine Unit-Tests zulassen.')
    })

    test('has French translations', () => {
        const conversationLanguage = new French()
        expect(conversationLanguage.welcome()).toBe('Salut ! Je suis un bot IA. J\'écris aussi peu de code que tes unit tests le permettent.')
    })

    test('has Spanish translations', () => {
        const conversationLanguage = new Spanish()
        expect(conversationLanguage.welcome()).toBe('¡Hola! Soy un bot de IA. Escribo tan poco código como permiten tus unit tests.')
    })

    test('has Italian translations', () => {
        const conversationLanguage = new Italian()
        expect(conversationLanguage.welcome()).toBe('Ciao! Sono un bot IA. Scrivo il minimo codice che i tuoi unit test permettono.')
    })

    test('has unique ids', () => {
        const ids = conversationLanguages.map(conversationLanguage => conversationLanguage.id)
        expect(new Set(ids).size).toBe(conversationLanguages.length)
    })
})
