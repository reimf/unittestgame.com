import { Main } from './src/main.js';
window.onerror = (message, source, lineno, colno, error) => {
    alert(`${error === null || error === void 0 ? void 0 : error.name}: ${message}\n${source}:${lineno}:${colno}`);
};
document.addEventListener('keydown', event => {
    const up = event.key === 'ArrowUp' ? true : event.key === 'ArrowDown' ? false : undefined;
    if (up === undefined)
        return;
    const oldFocused = document.activeElement;
    if (!oldFocused)
        return;
    const allFocusables = Array.from(document.querySelectorAll('input, button'));
    const allTops = allFocusables.map(focusable => focusable.getBoundingClientRect().top);
    const oldTop = oldFocused.getBoundingClientRect().top;
    const newTop = up ? Math.max(...allTops.filter(top => top < oldTop)) : Math.min(...allTops.filter(top => top > oldTop));
    const sameLineFocusables = allFocusables.filter(focusable => focusable.getBoundingClientRect().top === newTop);
    if (sameLineFocusables.length === 0)
        return;
    const checkedFocusables = sameLineFocusables.filter(focusable => focusable instanceof HTMLInputElement && focusable.checked);
    const newFocused = (checkedFocusables.length === 1 ? checkedFocusables[0] : sameLineFocusables[0]);
    newFocused.focus();
    event.preventDefault();
});
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hostname === 'localhost') {
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = ((callback, delay) => originalSetTimeout(callback, delay / 3));
    }
    new Main().start();
});
