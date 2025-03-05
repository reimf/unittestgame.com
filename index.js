import { Main } from './src/main.js';
import { TestDrivenDevelopment } from './src/round_test_driven_development.js';
import { MutationTesting } from './src/round_mutation_testing.js';
window.onerror = (message, source, lineno, colno, error) => {
    alert(`${error === null || error === void 0 ? void 0 : error.name}: ${message}\n${source}:${lineno}:${colno}`);
};
document.addEventListener('keydown', event => {
    const direction = event.key === 'ArrowDown' ? +1 : event.key === 'ArrowUp' ? -1 : 0;
    if (direction === 0)
        return;
    event.preventDefault();
    const focusables = document.querySelectorAll('input, button');
    const oldFocused = document.activeElement;
    const oldIndex = [...focusables].indexOf(oldFocused);
    const newIndex = (oldIndex + direction + focusables.length) % focusables.length;
    const newFocused = focusables.item(newIndex);
    newFocused.focus();
});
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const round = urlParams.get('round');
    const main = new Main(round === 'mt' ? MutationTesting : TestDrivenDevelopment);
    main.start();
});
