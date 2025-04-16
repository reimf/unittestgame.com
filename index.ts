import { Main } from './src/main.js'

window.onerror = (message, source, lineno, colno, error) => {
    alert(`${error?.name}: ${message}\n${source}:${lineno}:${colno}`)
}

document.addEventListener('keydown', event => {
    const verticalDirection = event.key === 'ArrowDown' ? +1 : event.key === 'ArrowUp' ? -1 : 0
    if (!verticalDirection)
        return
    const oldFocused = document.activeElement
    if (!oldFocused)
        return
    const oldParagraph = oldFocused.closest('p')
    if (!oldParagraph)
        return
    const newParagraph = verticalDirection === -1 ? oldParagraph.previousElementSibling : oldParagraph.nextElementSibling
    if (!newParagraph)
        return
    const focusables = newParagraph.querySelectorAll('input, button')
    if (focusables.length === 0)
        return
    const newFocused = focusables.item(0) as HTMLElement
    newFocused.focus()
    event.preventDefault()
})
document.addEventListener('keydown', event => {
    const horizontalDirection = event.key === 'ArrowRight' ? +1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!horizontalDirection)
        return
    const oldFocused = document.activeElement
    if (!oldFocused)
        return
    const oldParagraph = oldFocused.closest('p')
    if (!oldParagraph)
        return
    const focusables = oldParagraph.querySelectorAll('input, button')
    const oldIndex = [...focusables].indexOf(oldFocused)
    if (oldIndex === -1)
        return
    const newIndex = oldIndex + horizontalDirection
    if (newIndex < 0 || newIndex >= focusables.length)
        return
    const newFocused = focusables.item(newIndex) as HTMLElement
    newFocused.focus()
})

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hostname === 'localhost') {
        const originalSetTimeout = window.setTimeout
        window.setTimeout = ((callback: () => void, delay: number) => originalSetTimeout(callback, delay / 3)) as typeof setTimeout
    }
    new Main().start()
})
