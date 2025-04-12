import { Main } from './src/main.js'

window.onerror = (message, source, lineno, colno, error) => {
    alert(`${error?.name}: ${message}\n${source}:${lineno}:${colno}`)
}

document.addEventListener('keydown', event => {
    const verticalDirection = event.key === 'ArrowDown' ? +1 : event.key === 'ArrowUp' ? -1 : 0
    const horizontalDirection = event.key === 'ArrowRight' ? +1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!verticalDirection && !horizontalDirection)
        return
    const direction = verticalDirection || horizontalDirection
    const focusables = document.querySelectorAll('input, button')
    const oldFocused = document.activeElement!
    const oldIndex = [...focusables].indexOf(oldFocused)
    if (oldIndex === -1)
        return
    const newIndex = (oldIndex + direction + focusables.length) % focusables.length
    const newFocused = focusables.item(newIndex) as HTMLElement
    if (oldFocused.closest('p') !== newFocused.closest('p'))
        return
    event.preventDefault()
    newFocused.focus()
})

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hostname === 'localhost') {
        const originalSetTimeout = window.setTimeout
        window.setTimeout = ((callback: () => void, delay: number) => originalSetTimeout(callback, delay / 3)) as typeof setTimeout
    }
    new Main().start()
})
