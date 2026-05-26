import { Main } from './main.js'
import { FixedPicker, RandomPicker } from './picker.js'
import { TemporaryStorage } from './temporary-storage.js'
import { Locale } from './locale.js'
import { Completed } from './completed.js'

window.onerror = (message, source, lineno, colno, error) => {
    alert(`${error?.name}: ${message}\n${source}:${lineno}:${colno}`)
}

document.addEventListener('keydown', event => {
    const direction = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0
    if (!direction)
        return
    const focusableElements = [...document.querySelectorAll<HTMLElement>('input, button')]
    const currentElement = document.activeElement as HTMLElement|null
    if (!currentElement || !focusableElements.includes(currentElement))
        return
    const tops = new Map(focusableElements.map(focusable => [focusable, focusable.getBoundingClientRect().top]))
    const uniqueTops = [...new Set(tops.values())].sort()
    const currentIndex = uniqueTops.indexOf(tops.get(currentElement) ?? 0)
    const targetTop = uniqueTops[(currentIndex + direction + uniqueTops.length) % uniqueTops.length]
    const possibleTargets = focusableElements.filter(focusable => tops.get(focusable) === targetTop)
    const preferableTargets = possibleTargets.filter(focusable => focusable instanceof HTMLInputElement && focusable.checked)
    const targetElement = preferableTargets[0] ?? possibleTargets[0]
    if (targetElement)
        targetElement.focus()
    event.preventDefault()
})

document.addEventListener('DOMContentLoaded', () => {
    const parameters = new URL(window.location.href).searchParams
    const language = parameters.get('language') || navigator.language.split('-')[0]!
    const locale = new Locale(language)
    const picker = parameters.get('picker') === 'fixed' ? new FixedPicker() : new RandomPicker()
    const storage = parameters.get('storage') === 'temporary' ? new TemporaryStorage() : localStorage
    if (parameters.get('speed') === 'fast')
        window.setTimeout = ((callback: () => void): void => callback()) as typeof setTimeout
    if (parameters.has('setitem')) {
        const [key, value] = parameters.get('setitem')!.split(':') as [string, string]
        new Completed(key, storage).set(Number(value))
    }
    new Main(locale, picker, storage).start()
})
