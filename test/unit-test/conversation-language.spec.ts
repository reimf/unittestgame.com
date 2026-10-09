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
        expect(conversationLanguage.welcome()).toBe('Hi! I\'m an AI bot that writes code, but I don\'t write more than your unit tests force me to. A unit test is an example of an input with the outcome that goes with it. Your job is to guide me using unit tests until the code is right.')
    })

    test('has Dutch translations', () => {
        const conversationLanguage = new Dutch()
        expect(conversationLanguage.welcome()).toBe('Hoi! Ik ben een AI bot die code schrijft, maar ik schrijf niet meer dan jouw unit testen afdwingen. Een unit test is een voorbeeld van een invoer met de uitkomst die daarbij hoort. Jouw taak is om mij met unit testen bij te sturen tot de code klopt.')
    })

    test('has German translations', () => {
        const conversationLanguage = new German()
        expect(conversationLanguage.welcome()).toBe('Hallo! Ich bin ein KI-Bot, der Code schreibt, aber ich schreibe nicht mehr, als deine Unit-Tests erzwingen. Ein Unit-Test ist ein Beispiel für eine Eingabe mit dem dazugehörigen Ergebnis. Deine Aufgabe ist es, mich mit Unit-Tests zu steuern, bis der Code stimmt.')
    })

    test('has French translations', () => {
        const conversationLanguage = new French()
        expect(conversationLanguage.welcome()).toBe('Bonjour! Je suis un bot IA qui écrit du code, mais je n\'écris pas plus que ce que tes unit tests imposent. Un unit test est un exemple d\'entrée avec le résultat qui lui correspond. Ton rôle est de me guider avec des unit tests jusqu\'à ce que le code soit correct.')
    })

    test('has Spanish translations', () => {
        const conversationLanguage = new Spanish()
        expect(conversationLanguage.welcome()).toBe('¡Hola! Soy un bot de IA que escribe código, pero no escribo más de lo que tus unit tests exigen. Un unit test es un ejemplo de una entrada con el resultado que le corresponde. Tu trabajo es guiarme con unit tests hasta que el código sea correcto.')
    })

    test('has Italian translations', () => {
        const conversationLanguage = new Italian()
        expect(conversationLanguage.welcome()).toBe('Ciao! Sono un bot IA che scrive codice, ma non scrivo più di quanto i tuoi unit tests impongano. Un unit test è un esempio di un input con il risultato corrispondente. Il tuo compito è guidarmi con i unit tests finché il codice non è corretto.')
    })

    test('has unique ids', () => {
        const ids = conversationLanguages.map(conversationLanguage => conversationLanguage.id)
        expect(new Set(ids).size).toBe(conversationLanguages.length)
    })
})
