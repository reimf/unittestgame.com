"use strict";
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
document.addEventListener("DOMContentLoaded", () => new Main().start());
