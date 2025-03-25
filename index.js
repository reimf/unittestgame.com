import { Main } from './src/main.js';
window.onerror = (message, source, lineno, colno, error) => {
    alert(`${error === null || error === void 0 ? void 0 : error.name}: ${message}\n${source}:${lineno}:${colno}`);
};
document.addEventListener('keydown', event => {
    const verticalDirection = event.key === 'ArrowDown' ? +1 : event.key === 'ArrowUp' ? -1 : 0;
    const horizontalDirection = event.key === 'ArrowRight' ? +1 : event.key === 'ArrowLeft' ? -1 : 0;
    const activeElement = document.activeElement;
    const isActiveButton = activeElement.nodeName === 'BUTTON';
    const isActiveSubmit = activeElement.nodeName === 'INPUT' && activeElement.type === 'submit';
    const direction = verticalDirection || (isActiveButton || isActiveSubmit ? horizontalDirection : 0);
    if (direction === 0)
        return;
    event.preventDefault();
    const focusables = document.querySelectorAll('input, button');
    const currentIndex = [...focusables].indexOf(activeElement);
    const newIndex = (currentIndex + direction + focusables.length) % focusables.length;
    const newFocused = focusables.item(newIndex);
    newFocused.focus();
});
document.addEventListener('DOMContentLoaded', () => new Main().start());
