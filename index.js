import { Bug } from './src/bug.js';
import { Main } from './src/main.js';
window.onerror = (message, source, lineno, colno, error) => {
    alert(`${error?.name}: ${message}\n${source}:${lineno}:${colno}`);
};
document.addEventListener('keydown', event => {
    const direction = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0;
    if (!direction)
        return;
    const focusableElements = [...document.querySelectorAll('input, button')];
    const currentElement = document.activeElement;
    if (!currentElement || !focusableElements.includes(currentElement))
        return;
    const tops = new Map(focusableElements.map(focusable => [focusable, focusable.getBoundingClientRect().top]));
    const uniqueTops = [...new Set(tops.values())].sort();
    const currentIndex = uniqueTops.indexOf(tops.get(currentElement) ?? 0);
    const targetTop = uniqueTops[(currentIndex + direction + uniqueTops.length) % uniqueTops.length];
    const possibleTargets = focusableElements.filter(focusable => tops.get(focusable) === targetTop);
    const preferableTargets = possibleTargets.filter(focusable => focusable instanceof HTMLInputElement && focusable.checked);
    const targetElement = preferableTargets[0] ?? possibleTargets[0];
    targetElement.focus();
    event.preventDefault();
});
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hostname === 'localhost') {
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = ((callback, delay) => originalSetTimeout(callback, delay / 3));
    }
    else {
        new Bug().start();
    }
    new Main().start();
});
