import { LocalStore, MapStore } from './store.js'
import { FixedPicker, RandomPicker } from './picker.js'
import { programmingLanguages } from './programming-languages.js'
import { Injector } from './injector.js'
import { Main } from './main.js'
import { Locale } from './locale.js'

window.onerror = (message, source, lineno, colno, error) => {
    alert(`${error?.name}: ${message}\n${source}:${lineno}:${colno}`)
}

document.addEventListener('keydown', event => {
    const direction = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0
    if (direction) {
        const currentElement = document.activeElement as HTMLElement|null
        if (currentElement) {
            const focusableElements = [...document.querySelectorAll<HTMLElement>('input, button')]
            if (focusableElements.includes(currentElement)) {
                const tops = new Map(focusableElements.map(focusable => [focusable, focusable.getBoundingClientRect().top]))
                const uniqueTops = [...new Set(tops.values())].sort()
                const currentIndex = uniqueTops.indexOf(tops.get(currentElement)!)
                const targetTop = uniqueTops[(currentIndex + direction + uniqueTops.length) % uniqueTops.length]
                const possibleTargets = focusableElements.filter(focusable => tops.get(focusable) === targetTop)
                const preferableTargets = possibleTargets.filter(focusable => focusable instanceof HTMLInputElement && focusable.checked)
                const targetElement = preferableTargets[0] ?? possibleTargets[0]
                if (targetElement)
                    targetElement.focus()
                event.preventDefault()
            }
        }
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const injector = new Injector(new URL(window.location.href).searchParams)
    const locale = new Locale(injector.getOption('language', Locale.languages))
    const programmingLanguageId = injector.getOption('programmingLanguage', programmingLanguages.map(programmingLanguage => programmingLanguage.id))
    const programmingLanguage = programmingLanguages.find(programmingLanguage => programmingLanguage.id === programmingLanguageId)!
    const picker = injector.getOption('picker', ['random', 'fixed']) === 'fixed' ? new FixedPicker() : new RandomPicker()
    const store = injector.getOption('store', ['local', 'map']) === 'map' ? new MapStore() : new LocalStore()
    if (injector.getOption('speed', ['normal', 'fast']) === 'fast') {
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
    new Main(locale, programmingLanguage, picker, store).start()
})
