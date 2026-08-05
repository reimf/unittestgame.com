import { LocalStore, MapStore } from './store.js'
import { FixedPicker, RandomPicker } from './picker.js'
import { programmingLanguages } from './programming-languages.js'
import { Injector } from './injector.js'
import { Main } from './main.js'
import { conversationLanguages } from './conversation-languages.js'

window.onerror = (message, source, lineno, colno, error) => {
    alert(`${error?.name}: ${message}\n${source}:${lineno}:${colno}`)
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        const focusableElements = [...document.querySelectorAll<HTMLElement>('a, input, select, button:not([disabled])')]
        const currentElement = document.activeElement as HTMLElement
        if (focusableElements.includes(currentElement)) {
            const messages = document.querySelector('#messages')!
            const height = (element: HTMLElement) => (messages.contains(element) ? 0 : 1) * 1_000_000 + element.getBoundingClientRect().top
            const tops = new Map(focusableElements.map(element => [element, height(element)]))
            const uniqueTops = [...new Set(tops.values())].sort((a, b) => a - b)
            const currentIndex = uniqueTops.indexOf(tops.get(currentElement)!)
            const direction = event.key === 'ArrowUp' ? -1 : 1
            const targetTop = uniqueTops[(currentIndex + direction + uniqueTops.length) % uniqueTops.length]
            const possibleTargets = focusableElements.filter(element => tops.get(element) === targetTop)
            const preferableTargets = possibleTargets.filter(element => element instanceof HTMLInputElement && element.checked)
            const targetElement = preferableTargets[0] ?? possibleTargets[0]
            if (targetElement)
                targetElement.focus()
            event.preventDefault()
        }
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const injector = new Injector(new URL(window.location.href).searchParams)
    const [defaultConversationLanguage, ...otherConversationLanguages] = conversationLanguages
    const conversationLanguageId = injector.getOption('conversation_language', defaultConversationLanguage.id, otherConversationLanguages.map(conversationLanguage => conversationLanguage.id))
    const conversationLanguage = conversationLanguages.find(conversationLanguage => conversationLanguage.id === conversationLanguageId)!
    const [defaultProgrammingLanguage, ...otherProgrammingLanguages] = programmingLanguages
    const programmingLanguageId = injector.getOption('programming_language', defaultProgrammingLanguage.id, otherProgrammingLanguages.map(programmingLanguage => programmingLanguage.id))
    const programmingLanguage = programmingLanguages.find(programmingLanguage => programmingLanguage.id === programmingLanguageId)!
    const picker = injector.getOption('picker', 'random', ['fixed']) === 'fixed' ? new FixedPicker() : new RandomPicker()
    const store = injector.getOption('store', 'local', ['map']) === 'map' ? new MapStore() : new LocalStore()
    if (injector.getOption('speed', 'normal', ['fast']) === 'fast') {
        window.setTimeout = ((callback: () => void): void => callback()) as typeof setTimeout
        const style = document.createElement('style')
        style.textContent = '* { animation-duration: 0s !important; transition-duration: 0s !important; }'
        document.head.appendChild(style)
    }
    for (const setitem of injector.getAll('setitem')) {
        const [key, value] = setitem.split(':') as [string, string]
        store.set(key, Number(value))
    }
    injector.checkEmpty()
    new Main(conversationLanguage, programmingLanguage, picker, store).start()
})
